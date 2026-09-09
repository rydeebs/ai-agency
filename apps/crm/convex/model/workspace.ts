import type { MutationCtx } from "../_generated/server";

export async function insertAgencyWorkspace(
  ctx: MutationCtx,
  args: {
    now: number;
    demoMode: boolean;
    allowedSignIn: Array<string>;
  },
): Promise<void> {
  await ctx.db.insert("workspace", {
    name: "NewRevGen",
    demoMode: args.demoMode,
    allowedSignIn: args.allowedSignIn,
    reportingCurrency: "USD",
    agentModel: "gpt-5-mini",
    lastResetAt: args.now,
  });
}
