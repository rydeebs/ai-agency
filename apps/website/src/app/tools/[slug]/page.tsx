import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssessmentExperience } from "@/components/tools/AssessmentExperience";
import { PublicAuditExperience } from "@/components/tools/PublicAuditExperience";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { assessmentTools, getAssessmentTool } from "@/lib/lead-tools/catalog";

interface ToolRouteProps {
  params: Promise<{ slug: string }>;
}

function gateMode(): "preview" | "email-only" {
  return process.env.TOOL_RESULTS_GATE_MODE === "email-only" ? "email-only" : "preview";
}

export function generateStaticParams() {
  return [
    ...assessmentTools.map((tool) => ({ slug: tool.slug })),
    { slug: "website-revenue-audit" },
  ];
}

export async function generateMetadata({ params }: ToolRouteProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "website-revenue-audit") {
    return {
      title: "Three-Point Website Revenue-Funnel Assessment | NewRevGen",
      description: "Find three practical revenue-leak signals on your business website.",
      alternates: { canonical: "/tools/website-revenue-audit" },
    };
  }
  const tool = getAssessmentTool(slug);
  if (!tool) return {};
  return {
    title: `${tool.title} | NewRevGen`,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
  };
}

export default async function ToolRoute({ params }: ToolRouteProps) {
  const { slug } = await params;
  if (slug === "website-revenue-audit") {
    return <ToolPageFrame><PublicAuditExperience gateMode={gateMode()} /></ToolPageFrame>;
  }
  const tool = getAssessmentTool(slug);
  if (!tool) notFound();
  return <ToolPageFrame><AssessmentExperience tool={tool} gateMode={gateMode()} /></ToolPageFrame>;
}
