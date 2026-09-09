import { ArrowUpRight, Check, TriangleAlert } from "lucide-react";
import type { ToolResult } from "@/lib/lead-tools/types";

const bookingUrl = "https://calendar.app.google/fvAx1yvcih4jMp346";

interface ResultViewProps {
  result: ToolResult;
}

export function ResultView({ result }: ResultViewProps) {
  return (
    <section aria-labelledby="results-heading" className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cp-text">
          Your complete result
        </p>
        <h2 id="results-heading" className="max-w-3xl text-4xl font-medium leading-[0.98] sm:text-5xl">
          {result.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-cp-text">{result.summary}</p>
      </div>

      <dl className="grid border-y border-black/10 sm:grid-cols-2">
        {result.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`py-5 sm:px-5 ${index % 2 === 0 ? "sm:border-r sm:border-black/10 sm:pl-0" : "sm:pr-0"}`}
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-cp-text">
              {metric.label}
            </dt>
            <dd className="mt-2 font-heading text-3xl font-semibold text-cp-dark">{metric.value}</dd>
            {metric.detail ? <p className="mt-1 text-sm text-cp-text">{metric.detail}</p> : null}
          </div>
        ))}
      </dl>

      <div>
        <h3 className="text-2xl font-semibold">What deserves attention</h3>
        <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
          {result.findings.map((finding) => (
            <div key={finding.title} className="grid gap-3 py-5 sm:grid-cols-[32px_180px_1fr] sm:items-start">
              <span
                className={`flex size-7 items-center justify-center rounded-full ${
                  finding.status === "pass" ? "bg-cp-lime" : "bg-cp-yellow"
                } text-cp-dark`}
              >
                {finding.status === "pass" ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <TriangleAlert aria-hidden="true" className="size-4" />
                )}
              </span>
              <h4 className="text-lg font-semibold">{finding.title}</h4>
              <p className="text-sm leading-6 text-cp-text">{finding.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-cp-dark p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cp-lime">Recommended next action</p>
        <p className="mt-3 max-w-3xl text-lg leading-7 text-white/85">{result.nextAction}</p>
        <a
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cp-lime px-5 py-3 font-bold text-cp-dark transition hover:opacity-85"
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
        >
          Walk through this result <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>

      <p className="text-xs leading-5 text-cp-text">{result.disclaimer}</p>
    </section>
  );
}

