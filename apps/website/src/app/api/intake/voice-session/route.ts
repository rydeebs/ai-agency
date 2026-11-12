import { NextResponse } from "next/server";
import { VOICE_INSTRUCTIONS, voiceTools } from "@/lib/intake/voice";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";

export const runtime = "nodejs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Lets the page hide the Talk button when voice isn't configured. */
export function GET() {
  return NextResponse.json(
    { available: Boolean(process.env.OPENAI_API_KEY) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/**
 * Mints a short-lived OpenAI Realtime client secret so the browser can open a
 * WebRTC call without ever seeing the real key. Instructions and tools are
 * fixed server-side; the browser cannot change what the agent does.
 */
export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Voice isn't available right now. Type instead?" }, { status: 503 });
  }

  const rate = consumeRateLimit({
    namespace: "intake-voice",
    key: clientKey(request),
    limit: 6,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "That's a lot of calls for one hour. Please type instead, or try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  const body = JSON.stringify({
    expires_after: { anchor: "created_at", seconds: 120 },
    session: {
      type: "realtime",
      model: "gpt-realtime-2.1",
      instructions: VOICE_INSTRUCTIONS,
      tools: voiceTools,
      tool_choice: "auto",
      audio: {
        output: { voice: "marin" },
        input: {
          transcription: { model: "gpt-4o-mini-transcribe" },
          turn_detection: { type: "semantic_vad", eagerness: "medium" },
          noise_reduction: { type: "near_field" },
        },
      },
    },
  });

  // OpenAI occasionally returns transient 5xx here, so retry a few times.
  let lastError = "";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (attempt) await sleep(400 * attempt);
    try {
      const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body,
      });
      const data = (await response.json().catch(() => ({}))) as {
        value?: string;
        error?: { message?: string };
      };
      if (response.ok && data.value) return NextResponse.json({ value: data.value });
      lastError = data.error?.message ?? `HTTP ${response.status}`;
      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }
  console.error("[intake-voice] client secret failed", { message: lastError });
  return NextResponse.json(
    { error: "The line is busy for a moment. Please try again, or type instead." },
    { status: 503 },
  );
}
