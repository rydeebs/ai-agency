import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  FileSearch,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";

export const metadata: Metadata = {
  title: "Free Business AI Assessments | NewRevGen",
  description:
    "Use practical assessments and calculators to uncover revenue leaks, operational opportunities, owner dependence, and digital conversion gaps.",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    href: "/tools/revenue-leak-scorecard",
    title: "Booked-Revenue Leak Scorecard",
    description: "Score the complete system from inbound lead to booked job and identify your three largest leaks.",
    meta: "12 questions · Main assessment",
    icon: Gauge,
  },
  {
    href: "/tools/missed-call-calculator",
    title: "Missed-Call Revenue Calculator",
    description: "Model a conservative range of revenue potentially exposed by unanswered qualified calls.",
    meta: "6 inputs · 90 seconds",
    icon: Calculator,
  },
  {
    href: "/tools/estimate-follow-up-gap",
    title: "Estimate Follow-Up Gap Check",
    description: "Measure follow-up maturity and model the opportunity already sitting in open estimates.",
    meta: "8 inputs · Existing demand",
    icon: ClipboardCheck,
  },
  {
    href: "/tools/seller-independence-check",
    title: "Seller Independence Check",
    description: "Evaluate owner dependence and the transferability of the revenue operation.",
    meta: "8 questions · Succession readiness",
    icon: ShieldCheck,
  },
  {
    href: "/tools/website-revenue-audit",
    title: "Three-Point Website Revenue-Funnel Assessment",
    description: "Check one public page for five practical lead-capture signals and receive three priority findings.",
    meta: "Automated · About 60 seconds",
    icon: FileSearch,
  },
];

export default function ToolsPage() {
  return (
    <ToolPageFrame>
      <section className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-20 pt-14 text-white sm:px-8 sm:pb-28 sm:pt-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cp-lime">Free assessments and calculators</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.94] text-white sm:text-7xl">
          Find the next workflow worth improving.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
          Practical, directional tools for revenue, digital conversion, and business transferability. Use them to find a measurable place to start—not a promise of effortless results.
        </p>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group grid gap-4 py-7 transition hover:bg-white/[0.025] sm:grid-cols-[56px_1fr_auto] sm:items-center sm:px-2"
              >
                <span className={`flex size-12 items-center justify-center rounded-xl ${index === 0 ? "bg-cp-lime text-cp-dark" : "bg-white/8 text-cp-lime"}`}>
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block font-heading text-2xl font-semibold text-white sm:text-3xl">{tool.title}</span>
                  <span className="mt-1 block max-w-2xl text-sm leading-6 text-white/55">{tool.description}</span>
                  <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.12em] text-cp-lime/75">{tool.meta}</span>
                </span>
                <span className="hidden size-11 items-center justify-center rounded-full border border-white/15 text-white transition group-hover:border-cp-lime group-hover:bg-cp-lime group-hover:text-cp-dark sm:flex">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 max-w-2xl border-l-2 border-cp-lime pl-5">
          <p className="font-semibold text-white">Business AI Opportunity Benchmark</p>
          <p className="mt-1 text-sm leading-6 text-white/55">
            In development. We’re collecting only permissioned, de-identified assessment metrics and will publish useful comparisons after the sample is large enough.
          </p>
        </div>
      </section>
    </ToolPageFrame>
  );
}
