import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { auditWebsite } from "@/lib/lead-tools/audit";
import { buildResultEmail, calculateToolResult } from "@/lib/lead-tools/calculators";
import { getAssessmentTool } from "@/lib/lead-tools/catalog";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";
import { toolSlugs, type ToolAnswers, type ToolResult, type ToolSlug } from "@/lib/lead-tools/types";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseToolSlug(value: unknown): ToolSlug | null {
  return typeof value === "string" && toolSlugs.includes(value as ToolSlug)
    ? (value as ToolSlug)
    : null;
}

function validateAnswers(toolSlug: Exclude<ToolSlug, "website-revenue-audit">, value: unknown): ToolAnswers {
  if (!isRecord(value)) throw new Error("Assessment answers are missing.");
  const tool = getAssessmentTool(toolSlug);
  if (!tool) throw new Error("Unknown assessment.");
  const answers: ToolAnswers = {};
  for (const question of tool.questions) {
    const answer = value[question.id];
    if (question.type === "number") {
      const numeric = typeof answer === "number" ? answer : Number(answer);
      if (!Number.isFinite(numeric) || numeric < (question.min ?? 0) || numeric > (question.max ?? Number.MAX_SAFE_INTEGER)) {
        throw new Error(`Check the answer for “${question.label}”`);
      }
      answers[question.id] = numeric;
      continue;
    }
    if (question.type === "boolean") {
      if (typeof answer !== "boolean") throw new Error(`Check the answer for “${question.label}”`);
      answers[question.id] = answer;
      continue;
    }
    if (typeof answer !== "string" || !question.options?.some((option) => option.value === answer)) {
      throw new Error(`Check the answer for “${question.label}”`);
    }
    answers[question.id] = answer;
  }
  return answers;
}

async function deliverToConvex(args: {
  toolSlug: ToolSlug;
  email: string;
  company: string;
  websiteUrl?: string;
  answers: ToolAnswers;
  result: ToolResult;
  benchmarkConsent: boolean;
}) {
  const siteUrl = process.env.CRM_CONVEX_SITE_URL?.replace(/\/$/, "");
  const secret = process.env.CONVEX_LEAD_INGEST_SECRET;
  if (!siteUrl || !secret) {
    throw new Error("Lead delivery is not configured.");
  }
  const emailContent = buildResultEmail(args.result, args.company);
  const response = await fetch(`${siteUrl}/webhooks/website-lead`, {
    method: "POST",
    signal: AbortSignal.timeout(12_000),
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submissionId: randomUUID(),
      brandCode: "newrevgen",
      source: "newrevgen.com/tools",
      toolSlug: args.toolSlug,
      email: args.email,
      company: args.company,
      websiteUrl: args.websiteUrl,
      responsesJson: JSON.stringify(args.answers),
      resultJson: JSON.stringify(args.result),
      benchmarkConsent: args.benchmarkConsent,
      benchmarkMetrics: args.benchmarkConsent ? args.result.benchmarkMetrics : undefined,
      consentTermsAt: Date.now(),
      emailSubject: emailContent.subject,
      emailBody: emailContent.body,
    }),
  });
  if (!response.ok) {
    throw new Error(`Convex lead delivery returned ${response.status}.`);
  }
}

export async function POST(request: Request) {
  const rate = consumeRateLimit({
    namespace: "tool-submit",
    key: clientKey(request),
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "You’ve reached the report limit. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  try {
    const body: unknown = await request.json();
    if (!isRecord(body)) return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    if (typeof body.website_confirm === "string" && body.website_confirm.length > 0) {
      return NextResponse.json({ ok: true });
    }
    const toolSlug = parseToolSlug(body.toolSlug);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const benchmarkConsent = body.benchmarkConsent === true;
    if (!toolSlug) return NextResponse.json({ error: "Unknown assessment." }, { status: 400 });
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
    }
    if (company.length < 2 || company.length > 120) {
      return NextResponse.json({ error: "Enter your company name." }, { status: 400 });
    }

    let answers: ToolAnswers = {};
    let websiteUrl: string | undefined;
    let result: ToolResult;
    if (toolSlug === "website-revenue-audit") {
      websiteUrl = typeof body.websiteUrl === "string" ? body.websiteUrl.trim() : "";
      if (!websiteUrl || websiteUrl.length > 500) {
        return NextResponse.json({ error: "Enter a valid business website URL." }, { status: 400 });
      }
      result = await auditWebsite(websiteUrl);
    } else {
      answers = validateAnswers(toolSlug, body.answers);
      result = calculateToolResult(toolSlug, answers);
    }

    await deliverToConvex({
      toolSlug,
      email,
      company,
      websiteUrl,
      answers,
      result,
      benchmarkConsent,
    });

    return NextResponse.json({ ok: true, result });
  } catch (reason) {
    console.error("Tool submission failed", {
      message: reason instanceof Error ? reason.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "We couldn’t save or email the report. Please try again shortly." },
      { status: 503 },
    );
  }
}
