import { NextResponse } from "next/server";
import { deliverAnonymousNotes, deliverIntake } from "@/lib/intake/deliver";
import { parseIntake } from "@/lib/intake/schema";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";

export const runtime = "nodejs";

const MAX_TRANSCRIPT = 20_000;

/**
 * Receives notes from a browser voice call.
 * - With `intake` (the agent's save_request arguments): validated and sent
 *   to the team with the transcript, reply-to set to the visitor.
 * - With only `transcript` (call ended before contact details): sent as
 *   anonymous notes so the conversation isn't lost.
 */
export async function POST(request: Request) {
  const rate = consumeRateLimit({
    namespace: "intake-voice-notes",
    key: clientKey(request),
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json({ saved: false, error: "Too many submissions." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ saved: false, error: "Invalid notes." }, { status: 400 });
  }

  const transcript =
    typeof body.transcript === "string" ? body.transcript.trim().slice(0, MAX_TRANSCRIPT) : "";
  const isUpdate = body.update === true;

  if (body.intake !== undefined) {
    const parsed = parseIntake(body.intake);
    if (!parsed.ok) {
      return NextResponse.json({ saved: false, problem: parsed.error });
    }
    const delivery = await deliverIntake(parsed.value, {
      source: isUpdate ? "newrevgen.com/#intake (voice update)" : "newrevgen.com/#intake (voice)",
      transcript: transcript || undefined,
    });
    return NextResponse.json({ saved: delivery.ok }, { status: delivery.ok ? 200 : 503 });
  }

  // Anonymous notes need some real content from the visitor.
  if (!/^Visitor:/m.test(transcript) || transcript.length < 40) {
    return NextResponse.json({ saved: false, error: "Nothing to send." }, { status: 400 });
  }
  const delivery = await deliverAnonymousNotes({
    source: "newrevgen.com/#intake (voice, no contact)",
    transcript,
  });
  return NextResponse.json({ saved: delivery.ok }, { status: delivery.ok ? 200 : 503 });
}
