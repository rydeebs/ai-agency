import { AgentMail } from "@agentmail/convex";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { httpRouter } from "convex/server";
import { env, httpAction } from "./_generated/server";
import { components, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { auth } from "./auth";
import {
  commandsRoute,
  eventsRoute,
  interactivityRoute,
} from "./slackBot";

const http = httpRouter();

// Convex Auth discovery and session routes must be registered before the
// static-hosting catch-all.
auth.addHttpRoutes(http);

const leadTools = new Set([
  "revenue-leak-scorecard",
  "missed-call-calculator",
  "estimate-follow-up-gap",
  "seller-independence-check",
  "website-revenue-audit",
]);

const safeEqual = async (left: string, right: string): Promise<boolean> => {
  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const a = new Uint8Array(leftHash);
  const b = new Uint8Array(rightHash);
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
};

const optionalString = (value: unknown, max: number): string | undefined =>
  typeof value === "string" && value.length > 0 && value.length <= max ? value : undefined;

const benchmarkMetrics = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const source = value as Record<string, unknown>;
  const result: Record<string, number> = {};
  for (const key of [
    "missedCallRecovery",
    "responseTime",
    "estimateFollowUp",
    "crmCompleteness",
    "afterHoursCoverage",
    "ownerIndependence",
  ]) {
    const metric = source[key];
    if (typeof metric === "number" && Number.isFinite(metric) && metric >= 0 && metric <= 100) result[key] = metric;
  }
  return result;
};

// Private server-to-server ingress for NewRevGen's public assessment tools.
// The browser never receives the shared secret; the website's route handler
// validates and calculates each result before forwarding it here.
http.route({
  path: "/webhooks/website-lead",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const configuredSecret = env.WEBSITE_LEAD_INGEST_SECRET;
    const providedSecret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
    if (!configuredSecret || configuredSecret === "unset" || !(await safeEqual(providedSecret, configuredSecret))) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 150_000) return Response.json({ error: "Payload too large" }, { status: 413 });

    let body: unknown;
    try {
      body = JSON.parse(await request.text());
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }
    const value = body as Record<string, unknown>;
    const submissionId = optionalString(value.submissionId, 100);
    const brandCode = optionalString(value.brandCode, 50);
    const source = optionalString(value.source, 120);
    const toolSlug = optionalString(value.toolSlug, 80);
    const email = optionalString(value.email, 254)?.trim().toLowerCase();
    const company = optionalString(value.company, 120)?.trim();
    const responsesJson = optionalString(value.responsesJson, 30_000);
    const resultJson = optionalString(value.resultJson, 60_000);
    const emailSubject = optionalString(value.emailSubject, 200);
    const emailBody = optionalString(value.emailBody, 60_000);
    if (
      !submissionId || !brandCode || !source || !toolSlug || !leadTools.has(toolSlug) ||
      !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !company ||
      !responsesJson || !resultJson || !emailSubject || !emailBody ||
      typeof value.benchmarkConsent !== "boolean" ||
      typeof value.consentTermsAt !== "number" || !Number.isFinite(value.consentTermsAt)
    ) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }
    try {
      const assessmentId = await ctx.runMutation(internal.leadAssessments.ingestFromWebsite, {
        submissionId,
        brandCode,
        source,
        toolSlug: toolSlug as "revenue-leak-scorecard" | "missed-call-calculator" | "estimate-follow-up-gap" | "seller-independence-check" | "website-revenue-audit",
        email,
        company,
        websiteUrl: optionalString(value.websiteUrl, 500),
        responsesJson,
        resultJson,
        benchmarkConsent: value.benchmarkConsent,
        benchmarkMetrics: value.benchmarkConsent ? benchmarkMetrics(value.benchmarkMetrics) : undefined,
        consentTermsAt: value.consentTermsAt,
        emailSubject,
        emailBody,
      });
      return Response.json({ ok: true, assessmentId }, { status: 202 });
    } catch (error) {
      console.error("Website lead ingestion failed", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
      return Response.json({ error: "Ingestion failed" }, { status: 500 });
    }
  }),
});

// One-pixel open tracking for outreach emails. Mail clients and privacy
// proxies may prefetch this URL, so metrics are directional rather than exact.
http.route({
  path: "/email/open",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const recipientId = new URL(request.url).searchParams.get("recipientId");
    if (recipientId) {
      try { await ctx.runMutation(internal.outreach.recordOpen, { recipientId: recipientId as Id<"outreachRecipients"> }); } catch { /* invalid or deleted recipient */ }
    }
    const pixel = Uint8Array.from([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 0, 0, 0, 255, 255, 255, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 68, 1, 0, 59]);
    return new Response(pixel, { headers: { "Content-Type": "image/gif", "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }),
});

http.route({
  path: "/oauth/gmail/callback",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const state = requestUrl.searchParams.get("state");
    const denied = requestUrl.searchParams.get("error");
    const siteUrl =
      process.env.SITE_URL ?? process.env.CONVEX_SITE_URL ?? requestUrl.origin;
    const destination = new URL("/app/settings/email", siteUrl);
    if (denied || !code || !state) {
      destination.searchParams.set("gmail", "denied");
      return Response.redirect(destination, 302);
    }
    try {
      await ctx.runAction(internal.gmail.completeConnection, { code, state });
      destination.searchParams.set("gmail", "connected");
    } catch (error) {
      console.error("Gmail OAuth callback failed", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
      destination.searchParams.set("gmail", "error");
    }
    return Response.redirect(destination, 302);
  }),
});

// Inbound mail for the AgentMail component. Register the URL
// <deployment>.convex.site/agentmail/webhook in the AgentMail dashboard and
// set AGENTMAIL_WEBHOOK_SECRET. Harmless while unconfigured: unverified
// deliveries are rejected and nothing is written.
const agentmail = new AgentMail(components.agentmail);
http.route({
  path: "/agentmail/webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) =>
    // The component's bundled types expect a newer runMutation signature
    // than convex 1.43 declares; the shapes are compatible at runtime.
    agentmail.handleWebhook(
      ctx as unknown as Parameters<typeof agentmail.handleWebhook>[0],
      req,
    ),
  ),
});

// Slack /crm bot routes, all behind the slackBotEnabled toggle (503 while
// off) and Slack's v0 request signing. Handlers ack inside Slack's three
// second budget and schedule the real work; see convex/slackBot.ts.
http.route({
  path: "/webhooks/slack/commands",
  method: "POST",
  handler: commandsRoute,
});
http.route({
  path: "/webhooks/slack/interactivity",
  method: "POST",
  handler: interactivityRoute,
});
http.route({
  path: "/webhooks/slack/events",
  method: "POST",
  handler: eventsRoute,
});

// The built Vite app is served straight from Convex storage. Exact app routes
// registered above this call always win; everything else falls through to the
// static files with an index.html SPA fallback.
registerStaticRoutes(http, components.staticHosting, { spaFallback: true });

export default http;
