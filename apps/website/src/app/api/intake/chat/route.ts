import { NextResponse } from "next/server";
import { INTAKE_SYSTEM_PROMPT, saveRequestTool } from "@/lib/intake/agent";
import { deliverIntake } from "@/lib/intake/deliver";
import { parseIntake } from "@/lib/intake/schema";
import { clientKey, consumeRateLimit } from "@/lib/lead-tools/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

// Override with INTAKE_CHAT_MODEL if this model is ever retired.
const MODEL = process.env.INTAKE_CHAT_MODEL ?? "gpt-5-mini";
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

interface ToolCall {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
}

type ChatMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

interface CompletionResponse {
  choices?: Array<{
    finish_reason?: string;
    message?: { content?: string | null; refusal?: string | null; tool_calls?: ToolCall[] };
  }>;
  error?: { message?: string };
}

class ModelError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function complete(apiKey: string, messages: ChatMessage[]): Promise<CompletionResponse> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(45_000),
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools: [
        {
          type: "function",
          function: {
            name: saveRequestTool.name,
            description: saveRequestTool.description,
            parameters: saveRequestTool.parameters,
            strict: true,
          },
        },
      ],
      tool_choice: "auto",
      max_completion_tokens: 2000,
      reasoning_effort: "low",
    }),
  });
  const data = (await response.json().catch(() => ({}))) as CompletionResponse;
  if (!response.ok) throw new ModelError(response.status, data.error?.message ?? `HTTP ${response.status}`);
  return data;
}

/**
 * Conversational intake. The client sends the visible conversation (minus the
 * static greeting); the agent replies and, once it has contact details, calls
 * save_request, which is validated and delivered server-side.
 */
export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
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

  const messages: ChatMessage[] = [
    { role: "system", content: INTAKE_SYSTEM_PROMPT },
    ...turns.map((t) => ({ role: t.role, content: t.content }) as ChatMessage),
  ];
  let saved = false;
  let deliveryFailed = false;

  try {
    for (let step = 0; step < 4; step += 1) {
      const data = await complete(apiKey, messages);
      const message = data.choices?.[0]?.message;
      if (message?.refusal) {
        return NextResponse.json({
          reply:
            "I can't help with that one here. If it's about your business, email team@newrevgen.com and a person will take a look.",
          saved,
          deliveryFailed,
        });
      }

      const toolCalls = message?.tool_calls ?? [];
      if (toolCalls.length === 0) {
        const reply = (message?.content ?? "").trim();
        return NextResponse.json({
          reply: reply || "Sorry, I lost my train of thought. Could you say that again?",
          saved,
          deliveryFailed,
        });
      }

      messages.push({ role: "assistant", content: message?.content ?? null, tool_calls: toolCalls });
      for (const call of toolCalls) {
        let output: Record<string, unknown>;
        if (call.function.name !== saveRequestTool.name) {
          output = { error: "Unknown tool." };
        } else if (saved) {
          output = { saved: true, note: "Already sent in this reply." };
        } else {
          let args: unknown = {};
          try {
            args = JSON.parse(call.function.arguments || "{}");
          } catch {
            /* invalid JSON is rejected by parseIntake below */
          }
          const parsed = parseIntake(args);
          if (!parsed.ok) {
            output = { saved: false, problem: parsed.error };
          } else {
            const delivery = await deliverIntake(parsed.value, {
              source: alreadySaved ? "newrevgen.com/#intake (chat update)" : "newrevgen.com/#intake (chat)",
              transcript: transcriptOf(turns),
            });
            saved = delivery.ok;
            deliveryFailed = !delivery.ok;
            output = { saved: delivery.ok };
          }
        }
        messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(output) });
      }
    }
  } catch (error) {
    console.error("[intake-chat] model error", {
      status: error instanceof ModelError ? error.status : undefined,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ error: "Chat is unavailable.", fallback: "simple" }, { status: 503 });
  }

  return NextResponse.json({
    reply: "Thanks — that's everything I need for now. Anything else you want the team to know?",
    saved,
    deliveryFailed,
  });
}
