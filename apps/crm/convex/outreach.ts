import { generateText } from "ai";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalAction, internalMutation, internalQuery } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { languageModelFor, missingKeyMessage, providerConfigured } from "./ai";
import { sendWithGmail } from "./gmail";
import { insertActivity } from "./model/activities";
import { deleteContactCascade } from "./model/cascade";
import { authedQuery, writeMutation } from "./model/functions";

const OUTREACH_SENDER = {
  name: "Ryan",
  title: "Founder",
  email: "team@newrevgen.com",
} as const;

const SUBJECT_VARIANTS = [
  { id: "1A", strategy: "Direct operational question; make it specific to the company." },
  { id: "1B", strategy: "Insight-led subject; point to one plausible efficiency opportunity." },
  { id: "1C", strategy: "Curiosity subject; concise and concrete, without clickbait." },
  { id: "1D", strategy: "Outcome subject; emphasize time, cost, or throughput improvement." },
  { id: "1E", strategy: "Peer-style subject; conversational and low-pressure." },
  { id: "1F", strategy: "Plain-text referral-style subject; simple and human." },
] as const;

const BODY_VARIANTS = [
  { id: "2A", strategy: "Problem/solution: name one operational friction and one AI-assisted improvement." },
  { id: "2B", strategy: "Observation/question: lead with a researched observation and ask one easy question." },
  { id: "2C", strategy: "Mini case hypothesis: describe a short, clearly labeled hypothesis for this company." },
  { id: "2D", strategy: "Outcome-first: lead with a measurable operational outcome, without inventing results." },
  { id: "2E", strategy: "Helpful teardown: offer one practical workflow idea before asking for a conversation." },
  { id: "2F", strategy: "Soft introduction: concise, highly conversational, and permission-based." },
] as const;

const status = v.union(
  v.literal("DRAFT"), v.literal("REVIEW"), v.literal("ACTIVE"),
  v.literal("PAUSED"), v.literal("COMPLETE"),
);

const matches = (contact: {
  name: string; email?: string; companyId?: Id<"companies">; outreachOptedOut?: boolean;
}, company: { name: string; industry?: string; segment?: string } | null, args: {
  segment?: string; industry?: string; companyId?: Id<"companies">; search?: string;
}) => {
  if (contact.outreachOptedOut || !contact.email || !company) return false;
  if (args.companyId && contact.companyId !== args.companyId) return false;
  if (args.segment && company.segment !== args.segment) return false;
  if (args.industry && company.industry !== args.industry) return false;
  const term = args.search?.trim().toLowerCase();
  return !term || contact.name.toLowerCase().includes(term) || contact.email.toLowerCase().includes(term) || company.name.toLowerCase().includes(term);
};

const stableHash = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  return hash >>> 0;
};

const trackingUrlFor = (recipientId: Id<"outreachRecipients">): string | undefined => {
  const siteUrl = process.env.CONVEX_SITE_URL;
  return siteUrl ? `${siteUrl}/email/open?recipientId=${encodeURIComponent(String(recipientId))}` : undefined;
};

export const list = authedQuery({
  args: {},
  returns: v.array(v.object({ _id: v.id("outreachCampaigns"), name: v.string(), status, dailyLimit: v.number(), createdAt: v.number(), recipientCount: v.number(), draftCount: v.number(), approvedCount: v.number(), sentCount: v.number() })),
  handler: async (ctx) => {
    const campaigns = await ctx.db.query("outreachCampaigns").order("desc").collect();
    const result = [];
    for (const campaign of campaigns) {
      const recipients = await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id)).collect();
      result.push({ _id: campaign._id, name: campaign.name, status: campaign.status, dailyLimit: campaign.dailyLimit, createdAt: campaign.createdAt, recipientCount: recipients.length, draftCount: recipients.filter((r) => r.status === "DRAFT").length, approvedCount: recipients.filter((r) => r.status === "APPROVED").length, sentCount: recipients.filter((r) => r.status === "SENT").length });
    }
    return result;
  },
});

export const metrics = authedQuery({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    const campaigns = await ctx.db.query("outreachCampaigns").collect();
    const rows = await ctx.db.query("outreachRecipients").collect();
    const byVariant = new Map<string, { subjectVariant: string; bodyVariant: string; generated: number; sent: number; opens: number; replies: number; bounces: number; stopped: number }>();
    for (const row of rows) {
      const key = `${row.subjectVariant ?? "legacy"}:${row.bodyVariant ?? "legacy"}`;
      const current = byVariant.get(key) ?? { subjectVariant: row.subjectVariant ?? "legacy", bodyVariant: row.bodyVariant ?? "legacy", generated: 0, sent: 0, opens: 0, replies: 0, bounces: 0, stopped: 0 };
      if (row.generatedAt) current.generated += 1;
      if (row.sentAt) current.sent += 1;
      if (row.openedAt && !row.bouncedAt) current.opens += 1;
      if (row.repliedAt) current.replies += 1;
      // A legacy bounce scan could flag unsent/follow-up rows for a contact.
      // Metrics should count delivery failures only for messages actually sent.
      if (row.bouncedAt && row.sentAt) current.bounces += 1;
      if (row.status === "STOPPED") current.stopped += 1;
      byVariant.set(key, current);
    }
    const sent = rows.filter((row) => row.sentAt).length;
    const opens = rows.filter((row) => row.openedAt && !row.bouncedAt).length;
    const replies = rows.filter((row) => row.repliedAt).length;
    const bounces = rows.filter((row) => row.bouncedAt && row.sentAt).length;
    const delivered = Math.max(0, sent - bounces);
    const opened = [];
    for (const row of rows.filter((item) => item.openedAt && !item.bouncedAt).sort((a, b) => (b.openedAt ?? 0) - (a.openedAt ?? 0)).slice(0, 100)) {
      const contact = await ctx.db.get("contacts", row.contactId);
      const company = contact?.companyId ? await ctx.db.get("companies", contact.companyId) : null;
      if (contact) opened.push({ recipientId: row._id, openedAt: row.openedAt!, openCount: row.openCount ?? 1, repliedAt: row.repliedAt ?? null, contactName: contact.name, contactEmail: contact.email ?? null, companyName: company?.name ?? null, subject: row.subject ?? "(no subject)", subjectVariant: row.subjectVariant ?? "legacy", bodyVariant: row.bodyVariant ?? "legacy", campaignId: row.campaignId });
    }
    return {
      totals: { campaigns: campaigns.length, generated: rows.filter((row) => row.generatedAt).length, sent, opens, replies, bounces, stopped: rows.filter((row) => row.status === "STOPPED").length, openRate: delivered ? opens / delivered : 0, replyRate: delivered ? replies / delivered : 0, bounceRate: sent ? bounces / sent : 0 },
      variants: [...byVariant.values()].map((row) => { const delivered = Math.max(0, row.sent - row.bounces); return { ...row, openRate: delivered ? row.opens / delivered : 0, replyRate: delivered ? row.replies / delivered : 0, bounceRate: row.sent ? row.bounces / row.sent : 0 }; }),
      opened,
    };
  },
});

export const get = authedQuery({
  args: { campaignId: v.id("outreachCampaigns") },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
    if (!campaign) return null;
    const rows = await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId)).take(200);
    const recipients = [];
    for (const row of rows) {
      const contact = await ctx.db.get("contacts", row.contactId);
      const company = contact?.companyId ? await ctx.db.get("companies", contact.companyId) : null;
      recipients.push({ ...row, contact: contact ? { name: contact.name, email: contact.email ?? null, title: contact.title ?? null } : null, company: company ? { name: company.name, industry: company.industry ?? null, segment: company.segment ?? null } : null });
    }
    return { campaign, recipients };
  },
});

export const create = writeMutation({
  args: { name: v.string(), segment: v.optional(v.string()), industry: v.optional(v.string()), companyId: v.optional(v.id("companies")), search: v.optional(v.string()), randomSelection: v.optional(v.boolean()), dailyLimit: v.number(), followUpDays: v.array(v.number()), instructions: v.string() },
  returns: v.id("outreachCampaigns"),
  handler: async (ctx, args) => ctx.db.insert("outreachCampaigns", { ...args, status: "DRAFT", createdAt: Date.now() }),
});

// Populate in bounded pages; the UI calls this until done for large lists.
export const populate = writeMutation({
  args: { campaignId: v.id("outreachCampaigns"), offset: v.number(), limit: v.number() },
  returns: v.object({ added: v.number(), nextOffset: v.number(), done: v.boolean() }),
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
    if (!campaign) throw new Error("Campaign not found");
    const companies = await ctx.db.query("companies").collect();
    const byId = new Map(companies.map((company) => [company._id, company]));
    const contacts = await ctx.db.query("contacts").collect();
    const matching = contacts.filter((contact) => matches(contact, contact.companyId ? byId.get(contact.companyId) ?? null : null, campaign));
    const existing = new Set((await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId)).collect()).map((row) => row.contactId));
    let selectable = matching;
    if (campaign.randomSelection) {
      const randomized = [...matching].sort((a, b) => stableHash(`${campaign._id}:${a._id}`) - stableHash(`${campaign._id}:${b._id}`));
      const seenCompanies = new Set<string>();
      selectable = randomized.filter((contact) => {
        const companyId = String(contact.companyId);
        if (seenCompanies.has(companyId)) return false;
        seenCompanies.add(companyId);
        return true;
      }).slice(0, campaign.dailyLimit);
    }
    const page = selectable.slice(args.offset, args.offset + Math.min(args.limit, 500));
    for (const contact of page) {
      if (!existing.has(contact._id)) await ctx.db.insert("outreachRecipients", { campaignId: args.campaignId, contactId: contact._id, step: 0, status: "PENDING" });
    }
    const nextOffset = args.offset + page.length;
    return { added: page.filter((contact) => !existing.has(contact._id)).length, nextOffset, done: nextOffset >= selectable.length };
  },
});

export const approve = writeMutation({
  args: { campaignId: v.id("outreachCampaigns"), recipientIds: v.optional(v.array(v.id("outreachRecipients"))), allDrafts: v.optional(v.boolean()) },
  returns: v.number(),
  handler: async (ctx, args) => {
    const rows = args.allDrafts ? await ctx.db.query("outreachRecipients").withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId).eq("status", "DRAFT")).collect() : (await Promise.all((args.recipientIds ?? []).map((id) => ctx.db.get("outreachRecipients", id)))).filter((row): row is NonNullable<typeof row> => !!row && row.campaignId === args.campaignId && row.status === "DRAFT");
    for (const row of rows) await ctx.db.patch("outreachRecipients", row._id, { status: "APPROVED", approvedAt: Date.now(), scheduledAt: Date.now() });
    if (rows.length) await ctx.db.patch("outreachCampaigns", args.campaignId, { status: "REVIEW" });
    return rows.length;
  },
});

export const resetRecipientForGeneration = writeMutation({
  args: { recipientId: v.id("outreachRecipients") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const row = await ctx.db.get("outreachRecipients", args.recipientId);
    if (!row || !["DRAFT", "APPROVED"].includes(row.status)) return null;
    await ctx.db.patch("outreachRecipients", row._id, { status: "PENDING", subject: undefined, body: undefined, generatedAt: undefined, approvedAt: undefined, scheduledAt: undefined });
    return null;
  },
});

// Put unsent drafts back into the generation queue so a changed prompt or
// sender identity can be applied without touching messages that were sent.
export const regenerateDrafts = writeMutation({
  args: { campaignId: v.id("outreachCampaigns") },
  returns: v.number(),
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
    if (!campaign) throw new Error("Campaign not found");
    if (campaign.status === "ACTIVE") throw new Error("Pause the campaign before regenerating drafts");
    const rows = await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId)).collect();
    let reset = 0;
    for (const row of rows) {
      if (!["DRAFT", "APPROVED"].includes(row.status)) continue;
      await ctx.db.patch("outreachRecipients", row._id, { status: "PENDING", subject: undefined, body: undefined, generatedAt: undefined, approvedAt: undefined, scheduledAt: undefined });
      reset += 1;
    }
    if (reset) await ctx.db.patch("outreachCampaigns", args.campaignId, { status: "REVIEW" });
    return reset;
  },
});

export const activate = writeMutation({
  args: { campaignId: v.id("outreachCampaigns") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
    if (!campaign) throw new Error("Campaign not found");
    const approved = await ctx.db.query("outreachRecipients").withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId).eq("status", "APPROVED")).first();
    if (!approved) throw new Error("Approve at least one drafted email first");
    await ctx.db.patch("outreachCampaigns", args.campaignId, { status: "ACTIVE" });
    await ctx.scheduler.runAfter(0, internal.outreach.sendBatch, {
      campaignId: args.campaignId,
    });
    return null;
  },
});

export const removeBatch = writeMutation({
  args: { campaignId: v.id("outreachCampaigns"), limit: v.number() },
  returns: v.object({ deleted: v.number(), done: v.boolean() }),
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
    if (!campaign) return { deleted: 0, done: true };
    const rows = await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId)).take(Math.min(args.limit, 500));
    for (const row of rows) await ctx.db.delete("outreachRecipients", row._id);
    if (rows.length === 0) {
      await ctx.db.delete("outreachCampaigns", args.campaignId);
      return { deleted: 0, done: true };
    }
    return { deleted: rows.length, done: false };
  },
});

export const stop = writeMutation({
  args: { recipientId: v.id("outreachRecipients"), reason: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const row = await ctx.db.get("outreachRecipients", args.recipientId);
    if (!row) return null;
    await ctx.db.patch("outreachRecipients", row._id, { status: "STOPPED", stopReason: args.reason });
    await ctx.db.patch("contacts", row.contactId, { outreachOptedOut: true });
    return null;
  },
});

export const stopForReply = internalMutation({
  args: { campaignId: v.id("outreachCampaigns"), contactId: v.id("contacts"), reason: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const rows = await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId)).collect();
    for (const row of rows) {
      if (row.contactId === args.contactId && ["PENDING", "GENERATING", "DRAFT", "APPROVED", "SCHEDULED"].includes(row.status)) await ctx.db.patch("outreachRecipients", row._id, { status: "STOPPED", stopReason: args.reason, ...(args.reason === "Recipient replied" ? { repliedAt: Date.now() } : {}) });
    }
    return null;
  },
});

export const pendingForGeneration = internalQuery({
  args: { campaignId: v.id("outreachCampaigns"), limit: v.number(), recipientId: v.optional(v.id("outreachRecipients")) },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
    if (!campaign) return [];
    const rows = (args.recipientId ? [await ctx.db.get("outreachRecipients", args.recipientId)] : await ctx.db.query("outreachRecipients").withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId).eq("status", "PENDING")).take(Math.min(args.limit, 20))).filter((row): row is NonNullable<typeof row> => !!row && row.campaignId === args.campaignId && row.status === "PENDING" && (!row.scheduledAt || row.scheduledAt <= Date.now()));
    const result = [];
    for (const row of rows) {
      const contact = await ctx.db.get("contacts", row.contactId);
      const company = contact?.companyId ? await ctx.db.get("companies", contact.companyId) : null;
      if (contact && !contact.outreachOptedOut && company) result.push({ row, contact, company, campaign });
    }
    return result;
  },
});

export const saveDraft = internalMutation({
  args: { recipientId: v.id("outreachRecipients"), subject: v.string(), body: v.string(), subjectVariant: v.string(), bodyVariant: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => { await ctx.db.patch("outreachRecipients", args.recipientId, { status: "DRAFT", subject: args.subject, body: args.body, subjectVariant: args.subjectVariant, bodyVariant: args.bodyVariant, generatedAt: Date.now() }); return null; },
});

export const generate = action({
  args: { campaignId: v.id("outreachCampaigns"), limit: v.number(), recipientId: v.optional(v.id("outreachRecipients")) },
  returns: v.object({ generated: v.number(), remaining: v.number(), message: v.optional(v.string()) }),
  handler: async (ctx, args): Promise<{ generated: number; remaining: number; message?: string }> => {
    const provider: import("./ai").AiProvider = await ctx.runQuery(internal.ask.providerInternal, {});
    if (!providerConfigured(provider)) return { generated: 0, remaining: 0, message: missingKeyMessage(provider) };
    const rows = await ctx.runQuery(internal.outreach.pendingForGeneration, { campaignId: args.campaignId, limit: args.limit, recipientId: args.recipientId });
    let generated = 0;
    for (const item of rows) {
      const variantIndex = stableHash(`${item.campaign._id}:${item.row.contactId}:${item.row.step}:${Date.now()}`) % SUBJECT_VARIANTS.length;
      const subjectVariant = SUBJECT_VARIANTS[variantIndex];
      const bodyVariant = BODY_VARIANTS[variantIndex];
      let research = item.company.description ?? "";
      if (item.company.domain) {
        const website = await ctx.runAction(internal.web.scrapePage, { url: `https://${item.company.domain}` });
        research += `\nWebsite research:\n${website}`;
      }
      const result = await generateText({
        model: languageModelFor(provider),
        system: `Write truthful, concise B2B outreach. Never invent facts. Return exactly SUBJECT: on one line and BODY: followed by the email body.
The sender is ${OUTREACH_SENDER.name}, ${OUTREACH_SENDER.title}, ${OUTREACH_SENDER.email}.
Subject variant ${subjectVariant.id}: ${subjectVariant.strategy}
Body variant ${bodyVariant.id}: ${bodyVariant.strategy}
Do not write a signature or sign-off; the CRM will append the signature configured in the connected Gmail account. Never output placeholders such as [Your Name], [your position], or [your contact information].`,
        prompt: `Contact: ${item.contact.name}, title: ${item.contact.title ?? "unknown"}, email: ${item.contact.email}\nUse the contact's exact name (${item.contact.name}); never write {Name}, [Name], or another placeholder.\nCompany: ${item.company.name}\nIndustry: ${item.company.industry ?? "unknown"}\nSegment: ${item.company.segment ?? "unknown"}\nCompany research:\n${research}\nCampaign instructions: ${item.campaign.instructions}`,
      });
      const text = result.text.replace(/\r/g, "");
      const subjectMatch = text.match(/(?:^|\n)\s*SUBJECT\s*:\s*([^\n]*)/i);
      const bodyMatch = text.match(/(?:^|\n)\s*BODY\s*:\s*([\s\S]+)/i);
      const parsedSubject = subjectMatch?.[1]?.trim().replace(/^BODY\s*:\s*/i, "");
      const subject = parsedSubject && !/^Hi[, ]/i.test(parsedSubject) ? parsedSubject : `${subjectVariant.strategy.split(";")[0]} — ${item.company.name}`;
      const body = bodyMatch?.[1]?.trim().replace(/\{(?:name|first name)\}|\[name\]/gi, item.contact.name);
      if (body) { await ctx.runMutation(internal.outreach.saveDraft, { recipientId: item.row._id, subject, body, subjectVariant: subjectVariant.id, bodyVariant: bodyVariant.id }); generated += 1; }
    }
    return { generated, remaining: Math.max(0, rows.length - generated) };
  },
});

export const sendRecipientNow = action({
  args: { recipientId: v.id("outreachRecipients") },
  returns: v.string(),
  handler: async (ctx, args) => {
    const item = await ctx.runQuery(internal.outreach.recipientForManualSend, { recipientId: args.recipientId });
    if (!item) throw new Error("This recipient is not ready to send");
    const sentToday = await ctx.runQuery(internal.outreach.sentToday, { campaignId: item.row.campaignId });
    if (sentToday >= item.campaign.dailyLimit) throw new Error(`Daily campaign limit reached (${item.campaign.dailyLimit})`);
    const gmailMessageId = await sendWithGmail(ctx, { to: item.contact.email!, subject: item.subject!, body: item.body!, fromName: undefined, trackingUrl: trackingUrlFor(item.row._id) });
    await ctx.runMutation(internal.outreach.markSent, { recipientId: item.row._id, gmailMessageId });
    await ctx.runMutation(internal.outreach.recordEmail, { contactId: item.contact._id, companyId: item.contact.companyId, subject: item.subject, body: item.body });
    return "Email sent; any configured follow-up was scheduled";
  },
});

export const sendBatch = internalAction({
  args: { campaignId: v.id("outreachCampaigns") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const campaign = await ctx.runQuery(internal.outreach.activeCampaign, args);
    if (!campaign) return null;
    const sentToday = await ctx.runQuery(internal.outreach.sentToday, { campaignId: campaign._id });
    const rows = await ctx.runQuery(internal.outreach.approvedDue, { campaignId: campaign._id, limit: Math.max(0, campaign.dailyLimit - sentToday) });
    for (const item of rows) {
      try {
        const id = await sendWithGmail(ctx, { to: item.contact.email!, subject: item.subject!, body: item.body!, fromName: undefined, trackingUrl: trackingUrlFor(item._id) });
        await ctx.runMutation(internal.outreach.markSent, { recipientId: item._id, gmailMessageId: id });
        await ctx.runMutation(internal.outreach.recordEmail, { contactId: item.contactId, companyId: item.contact.companyId, subject: item.subject!, body: item.body! });
      } catch (error) { await ctx.runMutation(internal.outreach.markFailed, { recipientId: item._id, error: error instanceof Error ? error.message : "Gmail send failed" }); }
    }
    return null;
  },
});

export const removeBouncedContact = internalMutation({
  args: { email: v.string(), messageId: v.string(), bouncedAt: v.optional(v.number()) },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (!contact) return false;
    const recipients = await ctx.db.query("outreachRecipients").withIndex("by_contact", (q) => q.eq("contactId", contact._id)).collect();
    // A contact can have multiple sequence steps and variants. Associate the
    // delivery failure with only the sent message closest to the bounce time,
    // rather than marking every row for the contact as bounced.
    const bounceTime = args.bouncedAt ?? Date.now();
    const candidate = recipients
      .filter((row) => row.sentAt)
      .sort((a, b) => Math.abs((a.sentAt ?? 0) - bounceTime) - Math.abs((b.sentAt ?? 0) - bounceTime))[0];
    if (candidate) {
      // Repair rows written by the previous all-rows handler when the same
      // bounce is scanned again: only the selected sent message remains a
      // bounce, so metrics no longer attribute it to unrelated variants.
      for (const row of recipients) {
        if (row._id !== candidate._id && row.bounceMessageId === args.messageId) {
          await ctx.db.patch("outreachRecipients", row._id, {
            status: row.sentAt ? "SENT" : row.status,
            bouncedAt: undefined,
            bounceMessageId: undefined,
            error: undefined,
          });
        }
      }
      await ctx.db.patch("outreachRecipients", candidate._id, { status: "FAILED", bouncedAt: bounceTime, bounceMessageId: args.messageId, error: "Gmail delivery failure" });
    }
    await deleteContactCascade(ctx, contact._id);
    await ctx.db.insert("logEvents", {
      kind: "M",
      fn: "outreach:removeBouncedContact",
      status: "success",
      message: `Bounce detected for ${email}; contact and any now-empty company deleted. Gmail message ${args.messageId}.`,
    });
    return true;
  },
});

const bounceItem = v.object({
  email: v.string(),
  messageId: v.string(),
  bouncedAt: v.optional(v.number()),
});

export const unprocessedBounces = internalQuery({
  args: { items: v.array(bounceItem) },
  returns: v.array(bounceItem),
  handler: async (ctx, args) => {
    const result = [];
    for (const item of args.items.slice(0, 500)) {
      const email = item.email.trim().toLowerCase();
      const contact = await ctx.db
        .query("contacts")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();
      if (contact) result.push({ ...item, email });
    }
    return result;
  },
});

// Older bounce scans created open CUSTOM tasks after already deleting the
// contact. They cannot perform useful work and were repeatedly claimed by the
// former queue poller, so remove that legacy bookkeeping once during rollout.
export const removeLegacyBounceTasks = internalMutation({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const openTasks = await ctx.db
      .query("agentTasks")
      .withIndex("by_state_and_dueAt", (q) => q.eq("state", "open"))
      .take(500);
    const legacy = openTasks.filter(
      (task) =>
        task.kind === "CUSTOM" &&
        task.reason.startsWith("Bounce detected for ") &&
        task.reason.includes("The contact was deleted from the CRM."),
    );
    for (const task of legacy) await ctx.db.delete("agentTasks", task._id);
    return legacy.length;
  },
});

export const processBounces = internalAction({
  args: {},
  returns: v.object({ found: v.number(), deleted: v.number(), searched: v.number(), message: v.string() }),
  handler: async (ctx): Promise<{ found: number; deleted: number; searched: number; message: string }> => {
    let search;
    try {
      search = await ctx.runAction(internal.gmail.findBouncedAddresses, { newerThanDays: 30 });
    } catch (error) {
      return { found: 0, deleted: 0, searched: 0, message: error instanceof Error ? `Gmail scan failed: ${error.message}` : "Gmail scan failed" };
    }
    const bounced = await ctx.runQuery(internal.outreach.unprocessedBounces, {
      items: search.emails,
    });
    let deleted = 0;
    for (const item of bounced) {
      if (await ctx.runMutation(internal.outreach.removeBouncedContact, item)) deleted += 1;
    }
    return { found: search.emails.length, deleted, searched: search.searched, message: search.message };
  },
});

export const scanBounces = action({
  args: {},
  returns: v.object({ found: v.number(), deleted: v.number(), searched: v.number(), message: v.string() }),
  handler: async (ctx): Promise<{ found: number; deleted: number; searched: number; message: string }> => await ctx.runAction(internal.outreach.processBounces, {}),
});

export const sentForReplyCheck = internalQuery({
  args: {},
  handler: async (ctx) => {
    const campaigns = (await ctx.db.query("outreachCampaigns").collect()).filter((campaign) => campaign.status === "ACTIVE");
    const result = [];
    for (const campaign of campaigns) {
      const rows = await ctx.db.query("outreachRecipients").withIndex("by_campaign_status", (q) => q.eq("campaignId", campaign._id).eq("status", "SENT")).take(100);
      for (const row of rows) { const contact = await ctx.db.get("contacts", row.contactId); if (contact?.email && row.sentAt) result.push({ campaignId: campaign._id, contactId: contact._id, email: contact.email, sentAt: row.sentAt }); }
    }
    return result;
  },
});

export const checkReplies = internalAction({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const rows = await ctx.runQuery(internal.outreach.sentForReplyCheck, {});
    for (const row of rows) {
      if (await ctx.runAction(internal.gmail.hasInboundReply, { email: row.email, since: row.sentAt })) await ctx.runMutation(internal.outreach.stopForReply, { campaignId: row.campaignId, contactId: row.contactId, reason: "Recipient replied" });
    }
    return null;
  },
});

export const scanReplies = action({
  args: {},
  returns: v.null(),
  handler: async (ctx): Promise<null> => {
    await ctx.runAction(internal.outreach.checkReplies, {});
    return null;
  },
});

export const activeCampaign = internalQuery({ args: { campaignId: v.id("outreachCampaigns") }, handler: async (ctx, args) => {
  const campaign = await ctx.db.get("outreachCampaigns", args.campaignId);
  return campaign?.status === "ACTIVE" ? campaign : null;
} });
export const sentToday = internalQuery({ args: { campaignId: v.id("outreachCampaigns") }, handler: async (ctx, args) => { const start = new Date(); start.setHours(0, 0, 0, 0); return (await ctx.db.query("outreachRecipients").withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId).eq("status", "SENT")).collect()).filter((row) => (row.sentAt ?? 0) >= start.getTime()).length; } });
export const recipientForManualSend = internalQuery({ args: { recipientId: v.id("outreachRecipients") }, handler: async (ctx, args) => {
  const row = await ctx.db.get("outreachRecipients", args.recipientId);
  if (!row || !["DRAFT", "APPROVED"].includes(row.status) || !row.subject || !row.body) return null;
  const contact = await ctx.db.get("contacts", row.contactId);
  if (!contact?.email || contact.outreachOptedOut) return null;
  const campaign = await ctx.db.get("outreachCampaigns", row.campaignId);
  if (!campaign) return null;
  return { row, contact, campaign, subject: row.subject, body: row.body };
} });
export const approvedDue = internalQuery({ args: { campaignId: v.id("outreachCampaigns"), limit: v.number() }, handler: async (ctx, args) => { const rows = await ctx.db.query("outreachRecipients").withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId).eq("status", "APPROVED")).take(Math.min(args.limit, 20)); const result = []; for (const row of rows) { if ((row.scheduledAt ?? 0) > Date.now()) continue; const contact = await ctx.db.get("contacts", row.contactId); if (contact?.email && !contact.outreachOptedOut && row.subject && row.body) result.push({ ...row, contact }); } return result; } });
export const markSent = internalMutation({ args: { recipientId: v.id("outreachRecipients"), gmailMessageId: v.string() }, returns: v.null(), handler: async (ctx, args) => {
  const row = await ctx.db.get("outreachRecipients", args.recipientId);
  if (!row) return null;
  const now = Date.now();
  await ctx.db.patch("outreachRecipients", args.recipientId, { status: "SENT", sentAt: now, gmailMessageId: args.gmailMessageId });
  const campaign = await ctx.db.get("outreachCampaigns", row.campaignId);
  const delayDays = campaign?.followUpDays[row.step];
  if (campaign && delayDays) {
    const existing = await ctx.db.query("outreachRecipients").withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id)).collect();
    if (!existing.some((item) => item.contactId === row.contactId && item.step === row.step + 1)) {
      await ctx.db.insert("outreachRecipients", { campaignId: campaign._id, contactId: row.contactId, step: row.step + 1, status: "PENDING", scheduledAt: now + delayDays * 24 * 60 * 60 * 1000 });
    }
  }
  return null;
} });
export const markFailed = internalMutation({ args: { recipientId: v.id("outreachRecipients"), error: v.string() }, returns: v.null(), handler: async (ctx, args) => { await ctx.db.patch("outreachRecipients", args.recipientId, { status: "FAILED", error: args.error }); return null; } });
export const recordOpen = internalMutation({ args: { recipientId: v.id("outreachRecipients") }, returns: v.null(), handler: async (ctx, args) => {
  const row = await ctx.db.get("outreachRecipients", args.recipientId);
  // A tracking pixel can be fetched by a delivery system even when delivery
  // ultimately fails. Never count those fetches as opens.
  if (!row || row.status !== "SENT" || row.bouncedAt) return null;
  await ctx.db.patch("outreachRecipients", row._id, { openedAt: row.openedAt ?? Date.now(), openCount: (row.openCount ?? 0) + 1 });
  return null;
} });
export const recordEmail = internalMutation({ args: { contactId: v.id("contacts"), companyId: v.optional(v.id("companies")), subject: v.string(), body: v.string() }, returns: v.null(), handler: async (ctx, args) => { await insertActivity(ctx, { type: "EMAIL", body: `Outreach: ${args.subject}\n${bodyClip(args.body)}`, contactId: args.contactId, companyId: args.companyId }); return null; } });
const bodyClip = (body: string) => body.length > 500 ? `${body.slice(0, 500)}…` : body;
