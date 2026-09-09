import { useAuthActions } from "@convex-dev/auth/react";
import { FormEvent, useState } from "react";
import { Button, Input, Panel } from "../components/ui";

export function SignInPage() {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn("password", {
        flow: mode,
        email: email.trim().toLowerCase(),
        password,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign-in failed. Check your email and password.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
            Private workspace
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            NewRevGen CRM
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sign in with the owner email configured on this deployment.
          </p>
        </div>
        <Panel className="p-5">
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <div>
              <label className="mb-1 block text-xs text-neutral-500">
                Email
              </label>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-neutral-500">
                Password
              </label>
              <Input
                type="password"
                autoComplete={
                  mode === "signUp" ? "new-password" : "current-password"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={12}
                required
              />
              {mode === "signUp" ? (
                <p className="mt-1 text-[11px] text-neutral-600">
                  Use at least 12 characters.
                </p>
              ) : null}
            </div>
            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/5 p-2 text-xs text-red-300">
                {error}
              </p>
            ) : null}
            <Button type="submit" variant="primary" disabled={busy}>
              {busy
                ? "Working…"
                : mode === "signUp"
                  ? "Create owner login"
                  : "Sign in"}
            </Button>
          </form>
          <button
            type="button"
            onClick={() => {
              setMode((value) => (value === "signIn" ? "signUp" : "signIn"));
              setError(null);
            }}
            className="mt-4 w-full text-center text-xs text-neutral-500 transition-colors hover:text-white"
          >
            {mode === "signIn"
              ? "First time here? Create the owner login"
              : "Already created it? Sign in"}
          </button>
        </Panel>
      </div>
    </main>
  );
}
