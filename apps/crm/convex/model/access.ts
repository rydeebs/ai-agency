import type { MutationCtx, QueryCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import type { Id } from "../_generated/dataModel";

/**
 * Convex Auth identity tokens do not always include the email claim. The
 * subject starts with the Convex Auth user id, so use the users table as a
 * reliable fallback for the single-owner allow list.
 */
async function identityEmail(
  ctx: QueryCtx | MutationCtx,
): Promise<string | undefined> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return undefined;
  const fromToken = identity.email?.trim().toLowerCase();
  if (fromToken) return fromToken;

  const userId = identity.subject.split("|")[0] as Id<"users">;
  const user = await ctx.db.get("users", userId);
  return user?.email?.trim().toLowerCase();
}

// The single place where write access is decided. In demo mode every visitor
// may read and write. When
// Convex Auth is wired (see "Not built yet" in AGENTS.md), this is the
// function that switches to ctx.auth.getUserIdentity() plus the workspace
// allow list.
export async function getWorkspace(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"workspace">> {
  const workspace = await ctx.db.query("workspace").first();
  if (!workspace) {
    throw new Error("Workspace not seeded yet. Run demo:seedPublic.");
  }
  return workspace;
}

export async function requireWriteAccess(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"workspace">> {
  const workspace = await getWorkspace(ctx);
  if (workspace.demoMode) {
    return workspace;
  }
  const email = await identityEmail(ctx);
  if (!email) {
    throw new Error("Not authenticated");
  }
  const allowed = workspace.allowedSignIn.map((item) =>
    item.trim().toLowerCase(),
  );
  if (!email || !allowed.includes(email)) {
    throw new Error("Not authorized");
  }
  return workspace;
}

// The read counterpart to requireWriteAccess, and the reason nothing but
// demo:info and the static-hosting deploy query is exposed unauthenticated.
// In demo mode every visitor may read, matching the public demo. When Convex
// Auth is wired (see "Not built yet" in AGENTS.md), turning demo mode off with
// demo:disableDemoMode makes every gated query require a signed-in session, so
// a fork with real data never serves the tables to an anonymous caller.
//
// Tolerant of the brief unseeded window: before seedPublic runs there is no
// workspace row, and the app boots by calling the still-public demo:info and
// then seeding, so an unseeded read is treated as open rather than throwing.
export async function requireReadAccess(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"workspace"> | null> {
  const workspace = await ctx.db.query("workspace").first();
  if (!workspace || workspace.demoMode) {
    return workspace;
  }
  const email = await identityEmail(ctx);
  if (!email) {
    throw new Error("Not authenticated");
  }
  const allowed = workspace.allowedSignIn.map((item) =>
    item.trim().toLowerCase(),
  );
  if (!email || !allowed.includes(email)) {
    throw new Error("Not authorized");
  }
  return workspace;
}
