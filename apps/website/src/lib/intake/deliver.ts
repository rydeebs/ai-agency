import { randomUUID } from "node:crypto";
import { formatIntake, type IntakeSubmission } from "./schema";

export type DeliveryResult =
  | { ok: true; submissionId: string }
  | { ok: false; reason: "not_configured" | "failed" };

interface TeamMessage {
  subject: string;
  text: string;
  replyTo?: string;
  source: string;
  payload: Record<string, unknown>;
}

/**
 * Email via Resend's REST API. Needs RESEND_API_KEY and a verified sending
 * domain for INTAKE_EMAIL_FROM. INTAKE_EMAIL_TO accepts a comma-separated list.
 */
async function sendEmail(message: TeamMessage): Promise<boolean | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const to = (process.env.INTAKE_EMAIL_TO ?? "team@newrevgen.com")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const from = process.env.INTAKE_EMAIL_FROM ?? "NewRevGen Intake <intake@newrevgen.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: message.subject,
      text: message.text,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
    }),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return true;
}

/** Slack/Zapier/Make-style webhook; body carries a Slack-compatible `text`. */
async function sendWebhook(message: TeamMessage, submissionId: string): Promise<boolean | null> {
  const webhookUrl = process.env.INTAKE_WEBHOOK_URL;
  if (!webhookUrl) return null;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.INTAKE_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.INTAKE_WEBHOOK_SECRET}`;
  }
  const response = await fetch(webhookUrl, {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers,
    body: JSON.stringify({
      text: `${message.subject}\n\n${message.text}`,
      submissionId,
      source: message.source,
      receivedAt: new Date().toISOString(),
      ...message.payload,
    }),
  });
  if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  return true;
}

/**
 * Sends a message to the team by every configured channel (email and/or
 * webhook). Succeeds when at least one channel accepts it. Never logs the
 * content: it contains contact details.
 */
async function sendToTeam(message: TeamMessage): Promise<DeliveryResult> {
  const submissionId = randomUUID();
  const outcomes = await Promise.allSettled([
    sendEmail(message),
    sendWebhook(message, submissionId),
  ]);
  const configured = outcomes.filter((o) => !(o.status === "fulfilled" && o.value === null));
  if (configured.length === 0) {
    console.warn("[intake] delivery not configured; set RESEND_API_KEY and/or INTAKE_WEBHOOK_URL");
    return { ok: false, reason: "not_configured" };
  }
  outcomes.forEach((o, i) => {
    if (o.status === "rejected") {
      console.error("[intake] delivery channel failed", {
        submissionId,
        channel: i === 0 ? "email" : "webhook",
        message: o.reason instanceof Error ? o.reason.message : "Unknown error",
      });
    }
  });
  const delivered = outcomes.some((o) => o.status === "fulfilled" && o.value === true);
  if (!delivered) return { ok: false, reason: "failed" };
  console.info("[intake] delivered", { submissionId, source: message.source });
  return { ok: true, submissionId };
}

export async function deliverIntake(
  intake: IntakeSubmission,
  extra: { source: string; transcript?: string },
): Promise<DeliveryResult> {
  const summary = formatIntake(intake);
  return sendToTeam({
    subject: `New intake: ${intake.company} (${intake.name})`,
    text: extra.transcript
      ? `${summary}\n\n--- Conversation ---\n${extra.transcript}`
      : summary,
    replyTo: intake.email,
    source: extra.source,
    payload: { intake, transcript: extra.transcript },
  });
}

/** Notes from a conversation where the visitor never shared contact details. */
export async function deliverAnonymousNotes(extra: {
  source: string;
  transcript: string;
}): Promise<DeliveryResult> {
  return sendToTeam({
    subject: "Website conversation (no contact details left)",
    text: `The visitor ended the conversation without sharing contact details.\n\n--- Conversation ---\n${extra.transcript}`,
    source: extra.source,
    payload: { transcript: extra.transcript },
  });
}
