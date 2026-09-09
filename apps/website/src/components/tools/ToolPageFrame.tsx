import Link from "next/link";
import type { ReactNode } from "react";
import { ToolHeader } from "./ToolHeader";

interface ToolPageFrameProps {
  children: ReactNode;
}

export function ToolPageFrame({ children }: ToolPageFrameProps) {
  return (
    <main className="min-h-screen bg-cp-body-bg">
      <div className="p-2 sm:p-3">
        <div className="relative overflow-hidden rounded-xl bg-cp-dark">
          <div className="grid-bg-dark" />
          <ToolHeader />
          {children}
        </div>
      </div>
      <footer className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5 py-8 text-sm text-cp-text md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 NewRevGen. Directional tools for better revenue operations.</p>
        <nav aria-label="Legal" className="flex gap-5">
          <Link className="underline-offset-4 hover:text-cp-dark hover:underline" href="/privacy">
            Privacy
          </Link>
          <Link className="underline-offset-4 hover:text-cp-dark hover:underline" href="/terms">
            Terms
          </Link>
        </nav>
      </footer>
    </main>
  );
}

