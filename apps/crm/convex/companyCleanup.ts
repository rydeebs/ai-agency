import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { deleteCompanyIfEmpty } from "./model/cascade";

export const emptyPage = internalQuery({
  args: { cursor: v.union(v.string(), v.null()), startedAt: v.number() },
  returns: v.object({
    companyIds: v.array(v.id("companies")),
    scanned: v.number(),
    cursor: v.string(),
    done: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const page = await ctx.db.query("companies")
      .withIndex("by_creation_time", (q) => q.lte("_creationTime", args.startedAt))
      .paginate({ cursor: args.cursor, numItems: 100 });
    const companyIds = [];
    for (const company of page.page) {
      const contact = await ctx.db.query("contacts")
        .withIndex("by_company", (q) => q.eq("companyId", company._id)).first();
      if (!contact) companyIds.push(company._id);
    }
    return { companyIds, scanned: page.page.length, cursor: page.continueCursor, done: page.isDone };
  },
});

export const removeEmpty = internalMutation({
  args: { companyId: v.id("companies") },
  returns: v.boolean(),
  handler: (ctx, args) => deleteCompanyIfEmpty(ctx, args.companyId),
});

const resultValidator = v.object({
  scanned: v.number(), deleted: v.number(), failed: v.number(), done: v.boolean(),
});

// Each company has its own transaction. A failed cascade cannot roll back
// unrelated deletions, and the next sweep retries any company left behind.
export const sweep = internalAction({
  args: {
    cursor: v.optional(v.string()), startedAt: v.optional(v.number()),
    scanned: v.optional(v.number()), deleted: v.optional(v.number()), failed: v.optional(v.number()),
  },
  returns: resultValidator,
  handler: async (ctx, args): Promise<{ scanned: number; deleted: number; failed: number; done: boolean }> => {
    const startedAt = args.startedAt ?? Date.now();
    const page = await ctx.runQuery(internal.companyCleanup.emptyPage, {
      cursor: args.cursor ?? null, startedAt,
    });
    const scanned = (args.scanned ?? 0) + page.scanned;
    let deleted = args.deleted ?? 0;
    let failed = args.failed ?? 0;
    for (const companyId of page.companyIds) {
      try {
        if (await ctx.runMutation(internal.companyCleanup.removeEmpty, { companyId })) deleted++;
      } catch (error) {
        failed++;
        await ctx.runMutation(internal.logs.record, {
          kind: "A", fn: "companyCleanup:sweep", status: "error",
          message: `Company ${companyId} cleanup failed; next sweep will retry: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }
    if (!page.done) {
      await ctx.scheduler.runAfter(0, internal.companyCleanup.sweep, {
        cursor: page.cursor, startedAt, scanned, deleted, failed,
      });
    } else {
      await ctx.runMutation(internal.logs.record, {
        kind: "C", fn: "companyCleanup:sweep", status: failed ? "error" : "success",
        message: `Zero-contact company cleanup complete: scanned ${scanned}, deleted ${deleted}, failed ${failed}. Started ${new Date(startedAt).toISOString()}.`,
      });
    }
    return { scanned, deleted, failed, done: page.done };
  },
});
