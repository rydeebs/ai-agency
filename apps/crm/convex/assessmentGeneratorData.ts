import { v } from "convex/values";
import { internalQuery } from "./_generated/server";
import { requireReadAccess } from "./model/access";

export const loadSettings = internalQuery({
  args: {},
  returns: v.object({
    provider: v.union(
      v.literal("openai"),
      v.literal("anthropic"),
      v.literal("openrouter"),
      v.literal("deepseek"),
      v.literal("grok"),
    ),
  }),
  handler: async (ctx) => {
    const workspace = await requireReadAccess(ctx);
    if (!workspace) {
      throw new Error("Workspace not initialized");
    }
    return { provider: workspace.aiProvider ?? "openai" };
  },
});
