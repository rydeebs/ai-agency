import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

const normalizedEmail = (value: unknown): string => {
  if (typeof value !== "string") throw new Error("Enter your email address");
  const email = value.trim().toLowerCase();
  if (!email.includes("@")) throw new Error("Enter a valid email address");
  return email;
};

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = normalizedEmail(params.email);
        return {
          email,
          name: email.split("@")[0] ?? "Owner",
          role: "owner" as const,
        };
      },
      validatePasswordRequirements(password) {
        if (password.length < 12) {
          throw new Error("Use at least 12 characters for your password");
        }
      },
    }),
  ],
  callbacks: {
    async beforeSessionCreation(ctx, { userId }) {
      const workspace = await ctx.db.query("workspace").first();
      if (!workspace || workspace.demoMode) {
        throw new Error("Owner access has not been initialized yet");
      }
      const user = await ctx.db.get("users", userId);
      const email = user?.email?.trim().toLowerCase();
      const allowed = workspace.allowedSignIn.map((item: string) =>
        item.trim().toLowerCase(),
      );
      if (!email || !allowed.includes(email)) {
        throw new Error("This email is not allowed to access the CRM");
      }
    },
  },
});
