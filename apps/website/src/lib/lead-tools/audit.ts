import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { ResultFinding, ToolResult } from "./types";

const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 1_000_000;
const REQUEST_TIMEOUT_MS = 10_000;

function isPrivateIp(address: string): boolean {
  if (address.includes("%")) return true;
  const normalized = address.toLowerCase();
  if (normalized === "::1" || normalized === "::" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) {
    return true;
  }
  const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  const ipv4 = mapped ?? (isIP(address) === 4 ? address : null);
  if (!ipv4) return false;
  const parts = ipv4.split(".").map(Number);
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

async function validatePublicUrl(value: string): Promise<URL> {
  const candidate = value.includes("://") ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error("Enter a valid business website URL.");
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error("Only public HTTP or HTTPS websites can be assessed.");
  }
  if (url.port && !["80", "443"].includes(url.port)) {
    throw new Error("That website uses a port this assessment does not access.");
  }
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
    throw new Error("Private or local websites cannot be assessed.");
  }
  if (isIP(hostname) && isPrivateIp(hostname)) {
    throw new Error("Private or local websites cannot be assessed.");
  }
  let addresses: Array<{ address: string; family: number }>;
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("We could not resolve that website.");
  }
  if (addresses.length === 0 || addresses.some((entry) => isPrivateIp(entry.address))) {
    throw new Error("Private or local websites cannot be assessed.");
  }
  url.hash = "";
  return url;
}

async function readLimitedHtml(response: Response): Promise<string> {
  const declaredLength = Number(response.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_HTML_BYTES) throw new Error("That page is too large to assess safely.");
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let html = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_HTML_BYTES) {
      await reader.cancel();
      throw new Error("That page is too large to assess safely.");
    }
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}

async function fetchPublicHtml(initialUrl: string): Promise<{ html: string; finalUrl: URL }> {
  let url = await validatePublicUrl(initialUrl);
  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    url = await validatePublicUrl(url.toString());
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "NewRevGen-Revenue-Audit/1.0 (+https://newrevgen.com/tools)",
      },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || redirect === MAX_REDIRECTS) throw new Error("The website redirected too many times.");
      url = new URL(location, url);
      continue;
    }
    if (!response.ok) throw new Error(`The website returned HTTP ${response.status}.`);
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      throw new Error("The submitted URL did not return a web page.");
    }
    return { html: await readLimitedHtml(response), finalUrl: url };
  }
  throw new Error("We could not load that website.");
}

function finding(
  passed: boolean,
  title: string,
  passDescription: string,
  warningDescription: string,
): ResultFinding {
  return {
    title,
    description: passed ? passDescription : warningDescription,
    status: passed ? "pass" : "warning",
  };
}

export async function auditWebsite(websiteUrl: string): Promise<ToolResult> {
  const { html, finalUrl } = await fetchPublicHtml(websiteUrl);
  const normalized = html.toLowerCase();
  const hasTelLink = /href\s*=\s*["']tel:/i.test(html);
  const hasContactLink = /<(?:a|button)[^>]*>[^<]*(?:contact|call|quote|estimate|book|schedule)/i.test(html);
  const hasViewport = /<meta[^>]+name\s*=\s*["']viewport["']/i.test(html);
  const hasForm = /<form\b/i.test(html);
  const hasAfterHoursLanguage = /24\s*\/\s*7|after.?hours|emergency service|book online|request (?:a )?(?:quote|estimate|service)/i.test(normalized);
  const hasExpectationLanguage = /we(?:'|’)ll (?:call|contact|respond)|within \d+ (?:minute|hour|business day)|next (?:step|business day)|confirmation|thank you/i.test(normalized);
  const hasTracking = /googletagmanager|google-analytics|gtag\(|dataLayer|callrail|calltrackingmetrics|hubspot|hs-script-loader|utm_source/i.test(html);
  const hasNextStep = /<(?:a|button)[^>]*>[^<]*(?:get (?:a )?(?:quote|estimate)|book|schedule|request service|call (?:now|us)|contact us|start)/i.test(html);

  const allFindings = [
    finding(
      hasViewport && (hasTelLink || hasContactLink),
      "Mobile contact path",
      "The page exposes a contact action and includes mobile viewport support.",
      "We did not find a strong mobile-ready phone or contact path in the page markup. Make the primary contact action visible and tappable without hunting.",
    ),
    finding(
      hasForm && hasAfterHoursLanguage,
      "After-hours capture",
      "The page pairs an inquiry form with language that supports online or after-hours response.",
      "The page does not clearly pair after-hours availability with a capture path. Set expectations and collect the inquiry even when the office is closed.",
    ),
    finding(
      hasForm && hasExpectationLanguage,
      "Form expectations and routing",
      "The page includes a form and language that tells prospects what happens after submission.",
      hasForm
        ? "A form is present, but we did not find a clear response-time or next-step expectation near the public page content."
        : "We did not find a form on the submitted page. Prospects who cannot call may not have a clear handoff.",
    ),
    finding(
      hasTracking,
      "Source and conversion tracking",
      "Recognizable analytics, CRM, or call-tracking markers appear in the page source.",
      "We did not detect common analytics, CRM, UTM, or call-tracking markers. This does not prove tracking is absent, but attribution deserves verification.",
    ),
    finding(
      hasNextStep,
      "Clear next action",
      "The page contains a direct action such as requesting service, booking, or calling now.",
      "We did not find a clear action-oriented next step in the page markup. Use one literal primary CTA tied to the sales process.",
    ),
  ];
  const ordered = [
    ...allFindings.filter((item) => item.status === "warning"),
    ...allFindings.filter((item) => item.status === "pass"),
  ];
  const selected = ordered.slice(0, 3);
  const passCount = allFindings.filter((item) => item.status === "pass").length;

  return {
    toolSlug: "website-revenue-audit",
    preview: {
      label: selected[0]?.status === "warning" ? "First revenue-leak signal" : "First positive signal",
      value: selected[0]?.title ?? "Assessment complete",
      context: selected[0]?.description ?? "Your three-point review is ready.",
    },
    headline: `${3 - selected.filter((item) => item.status === "pass").length} of your three priority findings need attention.`,
    summary:
      "This automated check reviewed the submitted page’s public HTML for contact paths, inquiry capture, expectation setting, trackability, and a clear next action.",
    metrics: [
      { label: "Signals checked", value: "5" },
      { label: "Signals detected", value: `${passCount}/5` },
      { label: "Page reviewed", value: finalUrl.hostname },
    ],
    findings: selected,
    nextAction:
      selected[0]?.status === "warning"
        ? `Fix and test the ${selected[0].title.toLowerCase()} first, then confirm the change on a real phone and with a test submission.`
        : "Run one real mobile call and form submission through the complete handoff to verify what page markup alone cannot see.",
    disclaimer:
      "This is a tightly scoped automated assessment of one public page, not a full accessibility, SEO, analytics, security, or conversion review. Some tools load only after interaction and may not be detectable from server-rendered HTML.",
    benchmarkMetrics: {},
  };
}
