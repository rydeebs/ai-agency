import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { INTAKE_SYSTEM_PROMPT, saveRequestTool } from "@/lib/intake/agent";
import { deliverIntake } from "@/lib/intake/deliver";
import { parseIntake } from "@/lib/intake/schema";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 40;
const MAX_MESSAGE_CHARS = 4000;
const MAX_TOTAL_CHARS = 40_000;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

function parseTurns(body: unknown): ChatTurn[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as Record<string, unknown>).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_TURNS) return null;
  const turns: ChatTurn[] = [];
  let total = 0;
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_MESSAGE_CHARS) return null;
    total += text.length;
    turns.push({ role, content: text });
  }
  if (total > MAX_TOTAL_CHARS) return null;
  // A voice call may have opened with the agent speaking; the API needs a user turn first.
  while (turns.length && turns[0].role === "assistant") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

function transcriptOf(turns: ChatTurn[]): string {
  return turns.map((t) => `${t.role === "user" ? "Visitor" : "Agent"}: ${t.content}`).join("\n\n");
}

/**
 * Conversational intake. The client sends the visible conversation (minus the
 * static greeting); the agent replies and, once it has contact details, calls
 * save_request, which is validated and delivered server-side.
 */
export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Chat is unavailable.", fallback: "simple" }, { status: 503 });
  }

  const rate = consumeRateLimit({
    namespace: "intake-chat",
    key: clientKey(request),
    limit: 60,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "That's a lot of messages — please try again a bit later, or email team@newrevgen.com." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }
  const turns = parseTurns(body);
  if (!turns) {
    return NextResponse.json({ error: "That message couldn't be sent." }, { status: 400 });
  }
  const alreadySaved = Boolean((body as Record<string, unknown>).saved);

  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = turns.map((t) => ({
    role: t.role,
    content: t.content,
  }));
  let saved = false;
  let deliveryFailed = false;

  try {
    for (let step = 0; step < 4; step += 1) {
      const response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 2000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: "low" },
        system: [{ type: "text", text: INTAKE_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        tools: [saveRequestTool],
        messages,
      });

      if (response.stop_reason === "refusal") {
        return NextResponse.json({
          reply:
            "I can't help with that one here. If it's about your business, email team@newrevgen.com and a person will take a look.",
          saved,
          deliveryFailed,
        });
      }

      const toolUses = response.content.filter(
        (b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use",
      );
      if (response.stop_reason !== "tool_use" || toolUses.length === 0) {
        const reply = response.content
          .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return NextResponse.json({
          reply: reply || "Sorry, I lost my train of thought. Could you say that again?",
          saved,
          deliveryFailed,
        });
      }

      messages.push({ role: "assistant", content: response.content });
      const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
      for (const use of toolUses) {
        if (use.name !== saveRequestTool.name) {
          results.push({ type: "tool_result", tool_use_id: use.id, content: "Unknown tool.", is_error: true });
          continue;
        }
        if (saved) {
          results.push({
            type: "tool_result",
            tool_use_id: use.id,
            content: JSON.stringify({ saved: true, note: "Already sent in this reply." }),
          });
          continue;
        }
        const parsed = parseIntake(use.input);
        if (!parsed.ok) {
          results.push({
            type: "tool_result",
            tool_use_id: use.id,
            content: JSON.stringify({ saved: false, problem: parsed.error }),
            is_error: true,
          });
          continue;
        }
        const delivery = await deliverIntake(parsed.value, {
          source: alreadySaved ? "newrevgen.com/#intake (chat update)" : "newrevgen.com/#intake (chat)",
          transcript: transcriptOf(turns),
        });
        saved = delivery.ok;
        deliveryFailed = !delivery.ok;
        results.push({
          type: "tool_result",
          tool_use_id: use.id,
          content: JSON.stringify({ saved: delivery.ok }),
        });
      }
      messages.push({ role: "user", content: results });
    }
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.warn("[intake-chat] rate limited by model API");
    } else if (error instanceof Anthropic.APIError) {
      console.error("[intake-chat] model API error", { status: error.status });
    } else {
      console.error("[intake-chat] unexpected error", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
    return NextResponse.json({ error: "Chat is unavailable.", fallback: "simple" }, { status: 503 });
  }

  return NextResponse.json({
    reply: "Thanks — that's everything I need for now. Anything else you want the team to know?",
    saved,
    deliveryFailed,
  });
}
