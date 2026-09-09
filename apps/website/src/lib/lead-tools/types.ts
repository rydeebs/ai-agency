export const toolSlugs = [
  "revenue-leak-scorecard",
  "missed-call-calculator",
  "estimate-follow-up-gap",
  "seller-independence-check",
  "website-revenue-audit",
] as const;

export type ToolSlug = (typeof toolSlugs)[number];

export type AnswerValue = string | number | boolean;
export type ToolAnswers = Record<string, AnswerValue>;

export interface ToolOption {
  label: string;
  value: string;
}

export interface ToolQuestion {
  id: string;
  label: string;
  help?: string;
  type: "number" | "select" | "boolean";
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  options?: ToolOption[];
}

export interface ToolDefinition {
  slug: Exclude<ToolSlug, "website-revenue-audit">;
  eyebrow: string;
  title: string;
  description: string;
  timeEstimate: string;
  questions: ToolQuestion[];
}

export interface ResultMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ResultFinding {
  title: string;
  description: string;
  status?: "pass" | "warning";
}

export interface BenchmarkMetrics {
  missedCallRecovery?: number;
  responseTime?: number;
  estimateFollowUp?: number;
  crmCompleteness?: number;
  afterHoursCoverage?: number;
  ownerIndependence?: number;
}

export interface ToolResult {
  toolSlug: ToolSlug;
  preview: {
    label: string;
    value: string;
    context: string;
  };
  headline: string;
  summary: string;
  metrics: ResultMetric[];
  findings: ResultFinding[];
  nextAction: string;
  disclaimer: string;
  benchmarkMetrics: BenchmarkMetrics;
}

export interface LeadIdentity {
  email: string;
  company: string;
  benchmarkConsent: boolean;
}

