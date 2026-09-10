import type { Metadata } from "next";
import Link from "next/link";
import { ToolHeader } from "@/components/tools/ToolHeader";

export const metadata: Metadata = {
  title: "Page Not Found | NewRevGen",
  description:
    "The requested NewRevGen page does not exist. Use the site map or agent guidance to find the right page.",
};

const recoveryLinks = [
  { href: "/", label: "Homepage" },
  { href: "/tools", label: "Free assessments" },
  { href: "/about", label: "About NewRevGen" },
  { href: "/contact", label: "Contact" },
  { href: "/sitemap.xml", label: "XML sitemap" },
  { href: "/llms.txt", label: "Agent guidance" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cp-body-bg p-2 sm:p-3">
      <div className="relative min-h-[calc(100vh-1rem)] overflow-hidden rounded-xl bg-cp-dark text-white sm:min-h-[calc(100vh-1.5rem)]">
        <div className="grid-bg-dark" />
        <ToolHeader />
        <section className="relative z-10 mx-auto flex max-w-[1120px] flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cp-lime">
            404 · Page not found
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[0.95] text-white sm:text-7xl">
            That page isn&apos;t here.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            The requested path does not exist. Use one of these verified routes
            to continue, or open the machine-readable site index.
          </p>
          <nav
            aria-label="Page recovery links"
            className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
          >
            {recoveryLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-lg border border-white/15 px-5 py-4 font-semibold text-white transition hover:border-cp-lime hover:text-cp-lime"
                href={link.href}
              >
                {link.label} ↗
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
