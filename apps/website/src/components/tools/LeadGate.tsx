"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { LeadIdentity, ToolResult } from "@/lib/lead-tools/types";

interface LeadGateProps {
  preview?: ToolResult["preview"];
  submitting: boolean;
  error: string;
  onSubmit: (identity: LeadIdentity, honeypot: string) => Promise<void>;
}

export function LeadGate({ preview, submitting, error, onSubmit }: LeadGateProps) {
  const [benchmarkConsent, setBenchmarkConsent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await onSubmit(
      {
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("company") ?? ""),
        benchmarkConsent,
      },
      String(formData.get("website_confirm") ?? ""),
    );
  }

  return (
    <section aria-labelledby="unlock-heading" className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div>
        {preview ? (
          <div className="inline-flex min-w-[240px] flex-col rounded-xl bg-cp-lime p-6 text-cp-dark">
            <span className="text-xs font-bold uppercase tracking-[0.14em]">{preview.label}</span>
            <strong className="mt-2 font-heading text-5xl font-semibold leading-none">{preview.value}</strong>
            <span className="mt-2 text-sm">{preview.context}</span>
          </div>
        ) : (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-text">Assessment complete</p>
        )}
        <h2 id="unlock-heading" className="mt-6 text-4xl font-medium leading-none sm:text-5xl">
          Get the complete result.
        </h2>
        <p className="mt-4 max-w-xl leading-7 text-cp-text">
          Enter your work email and company. We’ll save the assessment to NewRevGen’s CRM and email your complete report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 sm:p-8">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-cp-dark">
            Work email
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="h-12 rounded-lg border border-black/15 bg-[#FAFAFA] px-4 text-base font-normal outline-none transition focus:border-cp-dark focus:ring-2 focus:ring-cp-lime"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-cp-dark">
            Company
            <input
              required
              type="text"
              name="company"
              autoComplete="organization"
              minLength={2}
              maxLength={120}
              placeholder="Company name"
              className="h-12 rounded-lg border border-black/15 bg-[#FAFAFA] px-4 text-base font-normal outline-none transition focus:border-cp-dark focus:ring-2 focus:ring-cp-lime"
            />
          </label>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Confirm website
              <input name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-cp-text">
            <input
              type="checkbox"
              checked={benchmarkConsent}
              onChange={(event) => setBenchmarkConsent(event.target.checked)}
              className="mt-0.5 size-4 accent-cp-dark"
            />
            Include my de-identified assessment metrics in NewRevGen’s future contractor benchmark.
          </label>
          {error ? <p role="alert" className="text-sm font-medium text-red-700">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="h-13 rounded-lg bg-cp-dark px-5 font-bold text-white transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cp-dark disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Preparing your report…" : "Email my complete result ↗"}
          </button>
          <p className="text-xs leading-5 text-cp-text">
            By continuing, you agree to our <Link className="underline" href="/terms" target="_blank">Terms</Link> and acknowledge our <Link className="underline" href="/privacy" target="_blank">Privacy Policy</Link>. We may follow up about this assessment. No spam or sold data.
          </p>
        </div>
      </form>
    </section>
  );
}

