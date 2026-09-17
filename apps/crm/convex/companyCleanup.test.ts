/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import aggregateTest from "@convex-dev/aggregate/test";
import { afterEach, expect, test, vi } from "vitest";
import { api, internal } from "./_generated/api";
import { trackDealInsert, dealsByStage } from "./aggregates";
import { insertAgencyWorkspace } from "./model/workspace";
import schema from "./schema";

const modules = import.meta.glob(["./**/*.ts", "!./**/*.test.ts"]);
const owner = { subject: "owner", email: "owner@example.test" };

async function setup() {
  const t = convexTest(schema, modules);
  aggregateTest.register(t, "dealsByStage");
  await t.run((ctx) => insertAgencyWorkspace(ctx, {
    now: 1, demoMode: false, allowedSignIn: [owner.email],
  }));
  const companyId = await t.run((ctx) => ctx.db.insert("companies", {
    name: "Empty company", enrichmentStatus: "NONE",
  }));
  return { t, companyId };
}

afterEach(() => vi.useRealTimers());

test("empty company cleanup deletes related rows and deal rollups, logs once, and is replay safe", async () => {
  const { t, companyId } = await setup();
  const related = await t.run(async (ctx) => {
    const dealId = await ctx.db.insert("deals", {
      name: "Deal", companyId, stage: "QUALIFIED", amountMinor: 5000, currency: "USD",
    });
    await trackDealInsert(ctx, (await ctx.db.get("deals", dealId))!);
    const activityId = await ctx.db.insert("activities", { type: "NOTE", body: "Note", companyId, dealId });
    const taskId = await ctx.db.insert("agentTasks", {
      kind: "CUSTOM", state: "open", reason: "Test", priority: 1, dueAt: 1, attempts: 0, companyId,
    });
    const threadId = await ctx.db.insert("chatThreads", { companyId, threadId: "test-thread" });
    return { dealId, activityId, taskId, threadId };
  });
  expect(await t.mutation(internal.companyCleanup.removeEmpty, { companyId })).toBe(true);
  expect(await t.mutation(internal.companyCleanup.removeEmpty, { companyId })).toBe(false);
  await t.run(async (ctx) => {
    expect(await ctx.db.get("companies", companyId)).toBeNull();
    expect(await ctx.db.get("deals", related.dealId)).toBeNull();
    expect(await ctx.db.get("activities", related.activityId)).toBeNull();
    expect(await ctx.db.get("agentTasks", related.taskId)).toBeNull();
    expect(await ctx.db.get("chatThreads", related.threadId)).toBeNull();
    expect(await dealsByStage.count(ctx, { namespace: "QUALIFIED" })).toBe(0);
    expect(await ctx.db.query("logEvents").take(10)).toHaveLength(1);
  });
});

test("a contact added after the scan protects the company at deletion time", async () => {
  const { t, companyId } = await setup();
  const page = await t.query(internal.companyCleanup.emptyPage, { cursor: null, startedAt: Date.now() + 1000 });
  expect(page.companyIds).toContain(companyId);
  await t.run((ctx) => ctx.db.insert("contacts", { name: "Keep", companyId }));
  expect(await t.mutation(internal.companyCleanup.removeEmpty, { companyId })).toBe(false);
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).not.toBeNull();
});

test("manual contact deletion keeps the company until its last contact is deleted", async () => {
  const { t, companyId } = await setup();
  const ids = await t.run(async (ctx) => [
    await ctx.db.insert("contacts", { name: "First", companyId }),
    await ctx.db.insert("contacts", { name: "Last", companyId }),
  ]);
  await t.withIdentity(owner).mutation(api.contacts.remove, { contactId: ids[0] });
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).not.toBeNull();
  await t.withIdentity(owner).mutation(api.contacts.remove, { contactId: ids[1] });
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).toBeNull();
});

test("bounce deletion removes the last contact's company and preserves the bounce audit", async () => {
  const { t, companyId } = await setup();
  const contactId = await t.run((ctx) => ctx.db.insert("contacts", { name: "Bounced", email: "bounce@example.test", companyId }));
  expect(await t.query(internal.outreach.unprocessedBounces, { items: [
    { email: "bounce@example.test", messageId: "bounce-test", bouncedAt: 1000 },
    { email: "already-gone@example.test", messageId: "old-bounce", bouncedAt: 900 },
  ] })).toEqual([{ email: "bounce@example.test", messageId: "bounce-test", bouncedAt: 1000 }]);
  expect(await t.mutation(internal.outreach.removeBouncedContact, {
    email: "bounce@example.test", messageId: "bounce-test", bouncedAt: 1000,
  })).toBe(true);
  expect(await t.run((ctx) => ctx.db.get("contacts", contactId))).toBeNull();
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).toBeNull();
  expect(await t.query(internal.outreach.unprocessedBounces, { items: [
    { email: "bounce@example.test", messageId: "bounce-test", bouncedAt: 1000 },
  ] })).toEqual([]);
  const tasks = await t.run((ctx) => ctx.db.query("agentTasks").take(10));
  expect(tasks).toHaveLength(0);
});

test("legacy bounce audit tasks are removed without touching real agent work", async () => {
  const { t, companyId } = await setup();
  const { legacyTaskId, realTaskId } = await t.run(async (ctx) => ({
    legacyTaskId: await ctx.db.insert("agentTasks", {
      kind: "CUSTOM",
      state: "open",
      reason: "Bounce detected for gone@example.test (Gmail message old). The contact was deleted from the CRM. Do not re-add this address without verification.",
      priority: 1,
      dueAt: 1,
      attempts: 0,
    }),
    realTaskId: await ctx.db.insert("agentTasks", {
      kind: "ENRICH_COMPANY",
      state: "open",
      reason: "Research requested by the owner.",
      companyId,
      priority: 1,
      dueAt: 1,
      attempts: 0,
    }),
  }));

  expect(await t.mutation(internal.outreach.removeLegacyBounceTasks)).toBe(1);
  expect(await t.run((ctx) => ctx.db.get("agentTasks", legacyTaskId))).toBeNull();
  expect(await t.run((ctx) => ctx.db.get("agentTasks", realTaskId))).not.toBeNull();
});

test("moving the last contact removes the old company but keeps its new company", async () => {
  const { t, companyId } = await setup();
  const otherId = await t.run((ctx) => ctx.db.insert("companies", { name: "Destination", enrichmentStatus: "NONE" }));
  const contactId = await t.run((ctx) => ctx.db.insert("contacts", { name: "Moving", companyId }));
  await t.withIdentity(owner).mutation(api.contacts.update, { contactId, companyId: otherId });
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).toBeNull();
  expect(await t.run((ctx) => ctx.db.get("companies", otherId))).not.toBeNull();
  expect((await t.run((ctx) => ctx.db.get("contacts", contactId)))?.companyId).toBe(otherId);
});

test("contact writes reject missing companies and unauthorized callers", async () => {
  const { t, companyId } = await setup();
  const contactId = await t.run((ctx) => ctx.db.insert("contacts", { name: "Keep", companyId }));
  await expect(t.mutation(api.contacts.remove, { contactId })).rejects.toThrow("Not authenticated");
  await expect(t.withIdentity({ subject: "stranger", email: "stranger@example.test" })
    .mutation(api.contacts.remove, { contactId })).rejects.toThrow("Not authorized");
  await t.run((ctx) => ctx.db.delete("companies", companyId));
  await expect(t.withIdentity(owner).mutation(api.contacts.create, { name: "New", companyId })).rejects.toThrow("Company not found");
  await expect(t.withIdentity(owner).mutation(api.contacts.update, { contactId, companyId })).rejects.toThrow("Company not found");
  expect(await t.run((ctx) => ctx.db.get("contacts", contactId))).not.toBeNull();
});

test("the sweep continues across pages and preserves companies that have contacts", async () => {
  vi.useFakeTimers();
  const { t, companyId } = await setup();
  await t.run(async (ctx) => {
    for (let i = 0; i < 104; i++) {
      await ctx.db.insert("companies", { name: `Empty ${i}`, enrichmentStatus: "NONE" });
    }
    await ctx.db.insert("contacts", { name: "Keep", companyId });
  });
  const first = await t.action(internal.companyCleanup.sweep, { startedAt: Date.now() + 1000 });
  expect(first.done).toBe(false);
  expect(first.scanned).toBe(100);
  await t.finishAllScheduledFunctions(vi.runAllTimers);
  const remaining = await t.run((ctx) => ctx.db.query("companies").take(200));
  expect(remaining.map((c) => c._id)).toEqual([companyId]);
  const logs = await t.run((ctx) => ctx.db.query("logEvents").order("desc").take(1));
  expect(logs[0].message).toContain("scanned 105, deleted 104, failed 0");
});

test("full company cleanup starts only from an explicit owner action", async () => {
  const { t } = await setup();
  await expect(t.mutation(api.companyCleanup.start)).rejects.toThrow("Not authenticated");
  await t.withIdentity(owner).mutation(api.companyCleanup.start);
  const scheduled = await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect());
  expect(scheduled).toHaveLength(1);
  expect(scheduled[0].name).toBe("companyCleanup:sweep");
  expect(scheduled[0].state).toEqual({ kind: "pending" });
});

test("future agent work schedules its exact task without a queue poller", async () => {
  const { t, companyId } = await setup();
  const taskId = await t.withIdentity(owner).mutation(api.agentTasks.scheduleRecheck, {
    companyId, reason: "Recheck this company after the requested delay.", dueInDays: 2,
  });
  const scheduled = await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect());
  expect(scheduled).toHaveLength(1);
  expect(scheduled[0].name).toBe("agentTasks:dispatchTask");
  expect(scheduled[0].args).toEqual([{ taskId }]);
});

test("activating a campaign schedules one send for that campaign", async () => {
  const { t, companyId } = await setup();
  const { campaignId } = await t.run(async (ctx) => {
    const contactId = await ctx.db.insert("contacts", { name: "Recipient", email: "recipient@example.test", companyId });
    const campaignId = await ctx.db.insert("outreachCampaigns", {
      name: "Manual send", status: "REVIEW", dailyLimit: 10, followUpDays: [], instructions: "Test", createdAt: 1,
    });
    await ctx.db.insert("outreachRecipients", {
      campaignId, contactId, step: 0, status: "APPROVED", subject: "Hello", body: "Body",
    });
    return { campaignId };
  });
  await t.withIdentity(owner).mutation(api.outreach.activate, { campaignId });
  const scheduled = await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect());
  expect(scheduled).toHaveLength(1);
  expect(scheduled[0].name).toBe("outreach:sendBatch");
  expect(scheduled[0].args).toEqual([{ campaignId }]);
});

test("a failed cascade rolls back its company and is retried without blocking other deletions", async () => {
  const { t, companyId } = await setup();
  const { dealId, otherId } = await t.run(async (ctx) => {
    // A legacy deal missing its aggregate entry makes the normal cascade fail.
    const dealId = await ctx.db.insert("deals", {
      name: "Untracked", companyId, stage: "QUALIFIED", amountMinor: 100, currency: "USD",
    });
    const otherId = await ctx.db.insert("companies", { name: "Other empty", enrichmentStatus: "NONE" });
    return { dealId, otherId };
  });
  const first = await t.action(internal.companyCleanup.sweep, { startedAt: Date.now() + 1000 });
  expect(first).toMatchObject({ deleted: 1, failed: 1, done: true });
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).not.toBeNull();
  expect(await t.run((ctx) => ctx.db.get("companies", otherId))).toBeNull();
  await t.run(async (ctx) => {
    await trackDealInsert(ctx, (await ctx.db.get("deals", dealId))!);
  });
  const retry = await t.action(internal.companyCleanup.sweep, { startedAt: Date.now() + 1000 });
  expect(retry).toMatchObject({ deleted: 1, failed: 0, done: true });
  expect(await t.run((ctx) => ctx.db.get("companies", companyId))).toBeNull();
});
