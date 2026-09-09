import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation } from "./_generated/server";
import { insertAgencyWorkspace } from "./model/workspace";

const ownerEmailFromEnvironment = (): string => {
  const email = process.env.OWNER_EMAIL?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error(
      "Set OWNER_EMAIL on this Convex deployment before initializing access",
    );
  }
  return email;
};

// Safe to expose: the caller cannot choose the owner. The deployment's
// OWNER_EMAIL value is the sole source of truth, and the mutation only ever
// locks the workspace to that address.
export const initializeOwner = action({
  args: {},
  returns: v.object({ email: v.string() }),
  handler: async (ctx) => {
    const email = ownerEmailFromEnvironment();
    await ctx.runMutation(internal.setup.applyOwner, { email });
    return { email };
  },
});

export const applyOwner = internalMutation({
  args: { email: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const workspace = await ctx.db.query("workspace").first();
    if (!workspace) {
      await insertAgencyWorkspace(ctx, {
        now: Date.now(),
        demoMode: false,
        allowedSignIn: [email],
      });
      return null;
    }
    const existing = workspace.allowedSignIn.map((item) =>
      item.trim().toLowerCase(),
    );
    if (existing.length > 0 && !existing.includes(email)) {
      throw new Error("This workspace is already assigned to another owner");
    }
    await ctx.db.patch("workspace", workspace._id, {
      demoMode: false,
      allowedSignIn: [email],
    });
    return null;
  },
});

// One-time owner utility for assigning the current company set to a segment.
// The work is chunked so large CRM datasets stay within Convex transaction limits.
