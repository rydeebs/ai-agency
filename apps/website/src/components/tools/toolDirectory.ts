import {
  Calculator,
  ClipboardCheck,
  FileSearch,
  Gauge,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface ToolDirectoryEntry {
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  meta: string;
  icon: LucideIcon;
}

/** Public assessment tools, shared by /tools and the homepage tool panel. */
export const toolDirectory: ToolDirectoryEntry[] = [
  {
    href: "/tools/revenue-leak-scorecard",
    title: "Booked-Revenue Leak Scorecard",
    shortTitle: "Revenue Leak Scorecard",
    description: "Score the complete system from inbound lead to booked job and identify your three largest leaks.",
    meta: "12 questions · Main assessment",
    icon: Gauge,
  },
  {
    href: "/tools/missed-call-calculator",
    title: "Missed-Call Revenue Calculator",
    shortTitle: "Missed-Call Calculator",
    description: "Model a conservative range of revenue potentially exposed by unanswered qualified calls.",
    meta: "6 inputs · 90 seconds",
    icon: Calculator,
  },
  {
    href: "/tools/estimate-follow-up-gap",
    title: "Estimate Follow-Up Gap Check",
    shortTitle: "Estimate Follow-Up Gap",
    description: "Measure follow-up maturity and model the opportunity already sitting in open estimates.",
    meta: "8 inputs · Existing demand",
    icon: ClipboardCheck,
  },
  {
    href: "/tools/seller-independence-check",
    title: "Seller Independence Check",
    shortTitle: "Seller Independence Check",
    description: "Evaluate owner dependence and the transferability of the revenue operation.",
    meta: "8 questions · Succession readiness",
    icon: ShieldCheck,
  },
  {
    href: "/tools/website-revenue-audit",
    title: "Three-Point Website Revenue-Funnel Assessment",
    shortTitle: "Website Funnel Audit",
    description: "Check one public page for five practical lead-capture signals and receive three priority findings.",
    meta: "Automated · About 60 seconds",
    icon: FileSearch,
  },
];
