import Link from "next/link";
import type { ReactNode } from "react";
import { ToolHeader } from "./tools/ToolHeader";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  introduction: string;
  lastUpdated?: string | null;
  children: ReactNode;
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  lastUpdated = "September 8, 2026",
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-cp-body-bg">
      <div className="p-2 sm:p-3">
        <div className="overflow-hidden rounded-xl bg-cp-dark">
          <ToolHeader />
          <header className="relative z-10 mx-auto max-w-[1120px] px-5 pb-16 pt-12 text-white sm:px-8 sm:pb-24 sm:pt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cp-lime">{eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[0.95] text-white sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">{introduction}</p>
            {lastUpdated ? (
              <p className="mt-6 text-sm text-white/45">
                Last updated {lastUpdated}
              </p>
            ) : null}
          </header>
        </div>
      </div>
      <article className="legal-content mx-auto max-w-[840px] px-5 py-16 sm:px-8 sm:py-24">{children}</article>
      <footer className="border-t border-black/10 px-5 py-8 text-center text-sm text-cp-text">
        © 2026 NewRevGen · <Link className="underline" href="/about">About</Link> · <Link className="underline" href="/contact">Contact</Link> · <Link className="underline" href="/privacy">Privacy</Link> · <Link className="underline" href="/terms">Terms</Link>
      </footer>
    </main>
  );
}
