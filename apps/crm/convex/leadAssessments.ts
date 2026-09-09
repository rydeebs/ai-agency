import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { leadAssessmentTool } from "./schema";
import { insertActivity } from "./model/activities";

const benchmarkMetricsValidator = v.object({
  missedCallRecovery: v.optional(v.number()),
  responseTime: v.optional(v.number()),
  estimateFollowUp: v.optional(v.number()),
  crmCompleteness: v.optional(v.number()),
  afterHoursCoverage: v.optional(v.number()),
  ownerIndependence: v.optional(v.number()),
});

export const ingestFromWebsite = internalMutation({
  args: {
    submissionId: v.string(),
    brandCode: v.string(),
    source: v.string(),
    toolSlug: leadAssessmentTool,
    email: v.string(),
    company: v.string(),
    websiteUrl: v.optional(v.string()),
    responsesJson: v.string(),
    resultJson: v.string(),
    benchmarkConsent: v.boolean(),
    benchmarkMetrics: v.optional(benchmarkMetricsValidator),
    consentTermsAt: v.number(),
    emailSubject: v.string(),
    emailBody: v.string(),
  },
  returns: v.id("leadAssessments"),
  handler: async (ctx, args) => {
    const duplicate = await ctx.db
      .query("leadAssessments")
      .withIndex("by_submissionId", (query) => query.eq("submissionId", args.submissionId))
      .unique();
    if (duplicate) return duplicate._id;

    let company = await ctx.db
      .query("companies")
      .withIndex("by_name", (query) => query.eq("name", args.company))
      .first();
    if (!company) {
      const companyId = await ctx.db.insert("companies", {
        name: args.company,
        domain: args.websiteUrl ? new URL(args.websiteUrl.includes("://") ? args.websiteUrl : `https://${args.websiteUrl}`).hostname : undefined,
        enrichmentStatus: "NONE",
        lastActivityAt: Date.now(),
      });
      company = await ctx.db.get("companies", companyId);
    }

    let contact = await ctx.db
      .query("contacts")
      .withIndex("by_email", (query) => query.eq("email", args.email))
      .unique();
    if (!contact) {
      const contactId = await ctx.db.insert("contacts", {
        name: args.email,
        email: args.email,
        title: "Website assessment lead",
        companyId: company?._id,
        lastActivityAt: Date.now(),
      });
      contact = await ctx.db.get("contacts", contactId);
    } else if (!contact.companyId && company) {
      await ctx.db.patch("contacts", contact._id, {
        companyId: company._id,
        lastActivityAt: Date.now(),
      });
    }

    const emailQueuedAt = Date.now();
    const assessmentId = await ctx.db.insert("leadAssessments", {
      submissionId: args.submissionId,
      brandCode: args.brandCode,
      source: args.source,
      toolSlug: args.toolSlug,
      email: args.email,
      companyName: args.company,
      websiteUrl: args.websiteUrl,
      companyId: company?._id,
      contactId: contact?._id,
      responsesJson: args.responsesJson,
      resultJson: args.resultJson,
      benchmarkConsent: args.benchmarkConsent,
      benchmarkMetrics: args.benchmarkConsent ? args.benchmarkMetrics : undefined,
      consentTermsAt: args.consentTermsAt,
      emailQueuedAt,
    });

    await insertActivity(ctx, {
      type: "NOTE",
      body: `Completed website assessment: ${args.toolSlug}. Result email queued.${args.benchmarkConsent ? " Permissioned de-identified metrics for the future benchmark." : " Benchmark use not permitted."}`,
      companyId: company?._id,
      contactId: contact?._id,
    });
    await ctx.scheduler.runAfter(0, internal.email.sendNotification, {
      to: args.email,
      subject: args.emailSubject,
      body: args.emailBody,
    });
    return assessmentId;
  },
});

