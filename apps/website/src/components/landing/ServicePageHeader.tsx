import Link from "next/link";
import { ToolHeader } from "../tools/ToolHeader";

interface ServicePageHeaderProps {
  breadcrumbs: Array<{ href: string; label: string }>;
  eyebrow: string;
  title: string;
  introduction: string;
}

export function ServicePageHeader({
  breadcrumbs,
  eyebrow,
  title,
  introduction,
}: ServicePageHeaderProps) {
  return (
    <div className="p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-xl bg-cp-dark">
        <div className="grid-bg-dark" />
        <ToolHeader />
        <header className="relative z-10 mx-auto max-w-[1120px] px-5 pb-16 pt-10 text-white sm:px-8 sm:pb-24 sm:pt-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/50">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-white/75">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link className="transition hover:text-cp-lime" href={crumb.href}>
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cp-lime">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.95] text-white sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            {introduction}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-lg bg-cp-lime px-5 py-3 text-sm font-bold text-cp-dark transition hover:opacity-85"
              href="/contact"
            >
              Get a free revenue leak assessment ↗
            </Link>
            <Link
              className="rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              href="/tools"
            >
              Try a free calculator
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
