"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { toolDirectory } from "@/components/tools/toolDirectory";
import { calculateToolResult } from "@/lib/lead-tools/calculators";

const MISSED_CALL_HREF = "/tools/missed-call-calculator";

/** Fixed assumptions for the teaser; they match the full calculator's example values. */
const TEASER_DEFAULTS = {
  salesOpportunityPercentage: 65,
  bookingRate: 35,
  grossMarginRange: "25-35",
};

function MissedCallTeaser() {
  const [calls, setCalls] = useState(300);
  const [missedPct, setMissedPct] = useState(18);
  const [jobValue, setJobValue] = useState(3500);
  const ids = useId();

  const result = useMemo(
    () =>
      calculateToolResult("missed-call-calculator", {
        callsPerMonth: calls,
        missedCallPercentage: missedPct,
        averageJobValue: jobValue,
        ...TEASER_DEFAULTS,
      }),
    [calls, missedPct, jobValue],
  );

  const sliders = [
    {
      id: `${ids}-calls`,
      label: "Inbound calls / month",
      value: calls,
      display: calls.toLocaleString("en-US"),
      min: 50,
      max: 2000,
      step: 10,
      set: setCalls,
    },
    {
      id: `${ids}-missed`,
      label: "Calls missed",
      value: missedPct,
      display: `${missedPct}%`,
      min: 0,
      max: 50,
      step: 1,
      set: setMissedPct,
    },
    {
      id: `${ids}-job`,
      label: "Average job value",
      value: jobValue,
      display: `$${jobValue.toLocaleString("en-US")}`,
      min: 200,
      max: 20000,
      step: 100,
      set: setJobValue,
    },
  ];

  return (
    <div className="teaser">
      {sliders.map((s) => (
        <div key={s.id} className="teaser-row">
          <div className="teaser-label">
            <label htmlFor={s.id}>{s.label}</label>
            <output htmlFor={s.id}>{s.display}</output>
          </div>
          <input
            id={s.id}
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={s.value}
            onChange={(e) => s.set(Number(e.target.value))}
            style={{ "--fill": `${((s.value - s.min) / (s.max - s.min)) * 100}%` } as React.CSSProperties}
          />
        </div>
      ))}

      <div className="teaser-result" aria-live="polite">
        <span className="teaser-result-label">{result.preview.label}</span>
        <strong>{result.preview.value}</strong>
        <span className="teaser-result-context">{result.preview.context}</span>
      </div>

      <p className="teaser-note">
        Assumes 65% of calls are real opportunities and 35% of those book. A scenario, not a
        promise.
      </p>

      <Link href={MISSED_CALL_HREF} className="tool-start">
        Tune every input in the full calculator <ArrowRight aria-hidden="true" size={16} />
      </Link>

      <style jsx>{`
        .teaser {
          display: grid;
          gap: 10px;
        }
        .teaser-label {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 2px;
        }
        .teaser-label output {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          color: #fff;
          font-size: 13px;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #d3f463 0 var(--fill),
            rgba(255, 255, 255, 0.14) var(--fill) 100%
          );
          outline: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #d3f463;
          border: 3px solid #17181b;
          box-shadow: 0 0 0 1px #d3f463;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d3f463;
          border: 3px solid #17181b;
        }
        input[type="range"]:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px rgba(211, 244, 99, 0.35);
        }
        .teaser-result {
          margin-top: 2px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(211, 244, 99, 0.08);
          border: 1px solid rgba(211, 244, 99, 0.25);
          display: grid;
          gap: 2px;
        }
        .teaser-result-label {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }
        .teaser-result strong {
          font-family: var(--font-darker-grotesque), sans-serif;
          font-size: clamp(28px, 4.5vw, 34px);
          font-weight: 600;
          color: #d3f463;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .teaser-result-context {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
        }
        .teaser-note {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

export function CTASection() {
  const [open, setOpen] = useState(MISSED_CALL_HREF);
  const baseId = useId();

  return (
    <section className="section_cta">
      <div className="cta-card">
        <div className="grid-bg-dark" style={{ borderRadius: "inherit" }} />
        <div className="cta-glow" aria-hidden="true" />

        <div className="cta-grid">
          <div className="cta-copy">
            <span className="cta-eyebrow">Free assessments &amp; calculators</span>
            <h2>
              Find where AI can <span>create real value.</span>
            </h2>
            <p>
              Start with a free assessment or calculator. We&apos;ll help you identify the right
              workflow, understand the opportunity, and choose a practical next step.
            </p>
            <div className="cta-actions">
              <Link href="/tools" className="cta-primary">
                Explore Free Assessments ↗
              </Link>
              <Link href="#intake" className="cta-secondary">
                Or just tell us what&apos;s broken
              </Link>
            </div>
          </div>

          <div className="tool-panel">
            {toolDirectory.map((tool, index) => {
              const Icon = tool.icon;
              const isOpen = open === tool.href;
              const panelId = `${baseId}-${index}`;
              return (
                <div key={tool.href} className={`tool-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="tool-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? "" : tool.href)}
                  >
                    <span className={`tool-icon${index === 0 ? " is-main" : ""}`}>
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <span className="tool-text">
                      <span className="tool-title">{tool.shortTitle}</span>
                      <span className="tool-meta">{tool.meta}</span>
                    </span>
                    <ChevronDown aria-hidden="true" size={18} className="tool-chevron" />
                  </button>
                  <div id={panelId} className="tool-body" hidden={!isOpen}>
                    <p className="tool-desc">{tool.description}</p>
                    {tool.href === MISSED_CALL_HREF ? (
                      <MissedCallTeaser />
                    ) : (
                      <Link href={tool.href} className="tool-start">
                        Start the {tool.shortTitle.toLowerCase()} <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .section_cta {
          background-color: #efefef;
          padding: 0 clamp(20px, 5vw, 60px) clamp(40px, 8vw, 80px);
          max-width: 1440px;
          margin: 0 auto;
        }
        .cta-card {
          position: relative;
          overflow: hidden;
          border-radius: clamp(12px, 3vw, 20px);
          background: #17181b;
        }
        .cta-glow {
          position: absolute;
          width: 620px;
          height: 620px;
          left: -220px;
          bottom: -320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(211, 244, 99, 0.22), transparent 65%);
          pointer-events: none;
        }
        .cta-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 56px);
          align-items: center;
          padding: clamp(20px, 6vw, 72px);
        }
        @media (min-width: 1024px) {
          .cta-grid {
            grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
          }
        }
        .cta-eyebrow {
          display: block;
          font-size: clamp(10px, 2vw, 12px);
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          font-weight: 600;
          margin-bottom: 16px;
        }
        h2 {
          font-family: var(--font-darker-grotesque), sans-serif;
          font-size: clamp(36px, 6.5vw, 76px);
          font-weight: 500;
          color: #fff;
          margin: 0;
          line-height: 1;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }
        h2 span {
          color: #d3f463;
        }
        .cta-copy p {
          font-size: clamp(15px, 2.4vw, 18px);
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.6;
          margin: clamp(16px, 3vw, 24px) 0 0;
          max-width: 480px;
        }
        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 20px;
          margin-top: clamp(24px, 4vw, 36px);
        }
        .cta-actions :global(.cta-primary) {
          background: #d3f463;
          color: #17181b;
          border-radius: 8px;
          padding: clamp(14px, 3vw, 18px) clamp(22px, 4vw, 32px);
          font-size: clamp(15px, 2.5vw, 17px);
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s ease;
        }
        .cta-actions :global(.cta-primary:hover) {
          transform: translateY(-2px);
        }
        .cta-actions :global(.cta-secondary) {
          color: rgba(255, 255, 255, 0.75);
          font-size: 15px;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(255, 255, 255, 0.3);
        }
        .cta-actions :global(.cta-secondary:hover) {
          color: #fff;
        }

        .tool-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 6px;
          min-width: 0;
        }
        .tool-item {
          border-radius: 12px;
          transition: background-color 0.15s ease;
        }
        .tool-item + .tool-item {
          margin-top: 2px;
        }
        .tool-item.is-open {
          background: rgba(255, 255, 255, 0.05);
        }
        .tool-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 12px;
          background: none;
          border: 0;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          color: #fff;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .tool-trigger:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .tool-trigger:focus-visible {
          outline: 2px solid #d3f463;
          outline-offset: -2px;
        }
        .tool-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.07);
          color: #d3f463;
          transition: background-color 0.15s ease, color 0.15s ease;
        }
        .tool-icon.is-main,
        .tool-item.is-open .tool-icon,
        .tool-trigger:hover .tool-icon {
          background: #d3f463;
          color: #17181b;
        }
        .tool-text {
          flex: 1;
          min-width: 0;
          display: grid;
          gap: 2px;
        }
        .tool-title {
          font-size: 16px;
          font-weight: 600;
        }
        .tool-meta {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(211, 244, 99, 0.75);
          font-weight: 600;
        }
        .tool-trigger :global(.tool-chevron) {
          color: rgba(255, 255, 255, 0.45);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .tool-item.is-open .tool-trigger :global(.tool-chevron) {
          transform: rotate(180deg);
        }
        .tool-body {
          padding: 0 16px 16px 66px;
        }
        @media (max-width: 520px) {
          .tool-body {
            padding: 0 12px 14px;
          }
        }
        .tool-desc {
          margin: 0 0 12px;
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.6);
        }
        .tool-panel :global(.tool-start) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #17181b;
          background: #d3f463;
          border-radius: 8px;
          padding: 10px 14px;
          text-decoration: none;
          width: fit-content;
          transition: transform 0.15s ease;
        }
        .tool-panel :global(.tool-start:hover) {
          transform: translateX(2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .tool-trigger :global(.tool-chevron),
          .tool-panel :global(.tool-start),
          .cta-actions :global(.cta-primary) {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
