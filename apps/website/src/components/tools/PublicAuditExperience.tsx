"use client";

import { ArrowRight, Check, Globe2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import type { LeadIdentity, ToolResult } from "@/lib/lead-tools/types";
import { LeadGate } from "./LeadGate";
import { ResultView } from "./ResultView";

interface PublicAuditExperienceProps {
  gateMode: "preview" | "email-only";
}

export function PublicAuditExperience({ gateMode }: PublicAuditExperienceProps) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [phase, setPhase] = useState<"website" | "auditing" | "gate" | "result" | "emailed">("website");
  const [previewResult, setPreviewResult] = useState<ToolResult | null>(null);
  const [serverResult, setServerResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function runAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPhase("auditing");
    setError("");
    try {
      const response = await fetch("/api/tools/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteUrl }),
      });
      const body: unknown = await response.json();
      if (!response.ok || !body || typeof body !== "object" || !("result" in body)) {
        const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
          ? body.error
          : "We couldn’t assess that page. Please check the URL and try again.";
        throw new Error(message);
      }
      setPreviewResult(body.result as ToolResult);
      setPhase("gate");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn’t assess that page.");
      setPhase("website");
    }
  }

  async function submit(identity: LeadIdentity, honeypot: string) {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/tools/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: "website-revenue-audit",
          websiteUrl,
          answers: {},
          ...identity,
          website_confirm: honeypot,
        }),
      });
      const body: unknown = await response.json();
      if (!response.ok || !body || typeof body !== "object" || !("result" in body)) {
        const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
          ? body.error
          : "We couldn’t deliver the report. Please try again.";
        throw new Error(message);
      }
      setServerResult(body.result as ToolResult);
      setPhase(gateMode === "email-only" ? "emailed" : "result");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <div className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
        <span>{phase === "website" || phase === "auditing" ? "Public website check" : "Assessment complete"}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className={`h-full bg-cp-lime transition-[width] duration-500 ${phase === "website" ? "w-0" : phase === "auditing" ? "w-1/2" : "w-full"}`} />
        </div>
        <span>About 60 seconds</span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-cp-body-bg">
        {phase === "website" || phase === "auditing" ? (
          <div className="min-h-[520px] p-6 sm:p-10 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cp-text">Three-point public assessment</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.95] sm:text-6xl">
              Find Three Revenue-Leak Signals on Your Website
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-cp-text">
              We’ll inspect one public page for mobile contact paths, after-hours capture, form expectations, trackability, and a clear next step.
            </p>
            <form onSubmit={runAudit} className="mt-10 max-w-2xl">
              <label className="text-sm font-semibold text-cp-dark" htmlFor="website-url">Business website</label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <div className="flex h-14 flex-1 items-center rounded-xl border border-black/15 bg-white px-4 focus-within:border-cp-dark focus-within:ring-2 focus-within:ring-cp-lime">
                  <Globe2 aria-hidden="true" className="mr-3 size-5 shrink-0 text-cp-text" />
                  <input
                    id="website-url"
                    required
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    value={websiteUrl}
                    onChange={(event) => setWebsiteUrl(event.target.value)}
                    placeholder="yourcompany.com"
                    className="min-w-0 flex-1 bg-transparent text-base text-cp-dark outline-none placeholder:text-black/25"
                  />
                </div>
                <button
                  type="submit"
                  disabled={phase === "auditing"}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-cp-dark px-6 font-bold text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60"
                >
                  {phase === "auditing" ? (
                    <><LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> Checking page…</>
                  ) : (
                    <>Run free assessment <ArrowRight aria-hidden="true" className="size-4" /></>
                  )}
                </button>
              </div>
              {error ? <p role="alert" className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}
              <p className="mt-4 text-xs leading-5 text-cp-text">
                Public HTTP(S) pages only. We block private-network addresses and limit repeated assessments. No custom video or sales call is required.
              </p>
            </form>
          </div>
        ) : null}

        {phase === "gate" && previewResult ? (
          <div className="p-6 sm:p-10 lg:p-14">
            <LeadGate
              preview={gateMode === "preview" ? previewResult.preview : undefined}
              submitting={submitting}
              error={error}
              onSubmit={submit}
            />
          </div>
        ) : null}

        {phase === "result" && serverResult ? (
          <div className="p-6 sm:p-10 lg:p-14"><ResultView result={serverResult} /></div>
        ) : null}

        {phase === "emailed" ? (
          <div className="flex min-h-[480px] flex-col items-center justify-center p-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-cp-lime text-cp-dark">
              <Check aria-hidden="true" className="size-7" />
            </span>
            <h2 className="mt-6 text-4xl font-medium">Your assessment is on its way.</h2>
            <p className="mt-3 max-w-md leading-7 text-cp-text">Check your work inbox for all three findings.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
