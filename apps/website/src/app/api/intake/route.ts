import { NextResponse } from "next/server";
import { deliverIntake } from "@/lib/intake/deliver";
import { parseIntake } from "@/lib/intake/schema";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";

export const runtime = "nodejs";

/**
 * Direct intake submission. Used by the chat box's plain fallback mode when
 * the AI agent is unavailable. Answers 503 when delivery isn't configured so
 * the client can offer email instead of pretending it was received.
 */
export async function POST(request: Request) {
  const rate = consumeRateLimit({
    namespace: "intake",
    key: clientKey(request),
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  if (typeof record.company_url === "string" && record.company_url.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseIntake(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const transcript = typeof record.transcript === "string" ? record.transcript.slice(0, 12_000) : undefined;
  const delivery = await deliverIntake(parsed.value, {
    source: "newrevgen.com/#intake",
    transcript,
  });
  if (!delivery.ok) {
    return NextResponse.json(
      { error: "We couldn't send that automatically.", fallback: "email" },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
