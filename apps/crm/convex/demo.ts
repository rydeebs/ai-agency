import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { insertAgencyWorkspace } from "./model/workspace";

// First-boot setup. Idempotent and intentionally blank: a fresh deployment
// starts as the agency CRM rather than recreating the source repository's
// public demo records.
export const seedPublic = mutation({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const existing = await ctx.db.query("workspace").first();
    if (existing) return false;
    await insertAgencyWorkspace(ctx, {
      now: Date.now(),
      demoMode: false,
      allowedSignIn: [],
    });
    return true;
  },
});

// Retained for the future authentication setup. Do not run this until a real
// auth provider is wired into the frontend, or anonymous CRM access will stop.
export const disableDemoMode = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const workspace = await ctx.db.query("workspace").first();
    if (!workspace || !workspace.demoMode) return null;
    await ctx.db.patch("workspace", workspace._id, { demoMode: false });
    return null;
  },
});

// Public because the app shell needs to know whether the workspace exists
// before it can call the first-boot initializer.
export const info = query({
  args: {},
  returns: v.union(
    v.object({
      demoMode: v.boolean(),
      lastResetAt: v.number(),
      resetIntervalMs: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    const workspace = await ctx.db.query("workspace").first();
    if (!workspace) return null;
    return {
      demoMode: workspace.demoMode,
      lastResetAt: workspace.lastResetAt,
      resetIntervalMs: 0,
    };
  },
});
