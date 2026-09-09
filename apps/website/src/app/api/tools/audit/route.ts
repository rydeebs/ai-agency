import { NextResponse } from "next/server";
import { auditWebsite } from "@/lib/lead-tools/audit";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rate = consumeRateLimit({
    namespace: "website-audit",
    key: clientKey(request),
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "You’ve reached the assessment limit. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  try {
    const body: unknown = await request.json();
    const websiteUrl =
      body && typeof body === "object" && "websiteUrl" in body && typeof body.websiteUrl === "string"
        ? body.websiteUrl.trim()
        : "";
    if (websiteUrl.length < 4 || websiteUrl.length > 500) {
      return NextResponse.json({ error: "Enter a valid business website URL." }, { status: 400 });
    }
    const result = await auditWebsite(websiteUrl);
    return NextResponse.json({ result });
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "We could not assess that website.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
