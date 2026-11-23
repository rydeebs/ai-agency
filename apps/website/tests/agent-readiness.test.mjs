import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import http from "node:http";
import { fileURLToPath } from "node:url";
import net from "node:net";
import path from "node:path";
import { after, before, test } from "node:test";

const websiteRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const nextBin = path.resolve(
  websiteRoot,
  "../../node_modules/next/dist/bin/next",
);

const publicPages = [
  "/",
  "/about",
  "/contact",
  "/operations",
  "/roofing",
  "/roofing/ai-for-roofing-contractors",
  "/roofing/missed-call-recovery",
  "/roofing/estimate-follow-up",
  "/roofing/storm-lead-response",
  "/firms",
  "/101",
  "/tools",
  "/tools/website-revenue-audit",
  "/tools/revenue-leak-scorecard",
  "/tools/missed-call-calculator",
  "/tools/estimate-follow-up-gap",
  "/tools/seller-independence-check",
  "/privacy",
  "/terms",
];

const roofingServicePages = publicPages.filter((pathname) =>
  pathname.startsWith("/roofing/"),
);

let baseUrl;
let server;
let serverOutput = "";

async function availablePort() {
  const socket = net.createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const address = socket.address();
  assert.notEqual(address, null);
  assert.equal(typeof address, "object");
  const port = address.port;
  socket.close();
  await once(socket, "close");
  return port;
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before startup:\n${serverOutput}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server has not bound the port yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for Next.js:\n${serverOutput}`);
}

function includesVary(response, field) {
  return (response.headers.get("vary") ?? "")
    .split(",")
    .some((value) => value.trim().toLowerCase() === field.toLowerCase());
}

function jsonLdNodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const parsed = JSON.parse(match[1]);
      return parsed["@graph"] ?? [parsed];
    });
}

function requestWithHost(pathname, host) {
  const { hostname, port } = new URL(baseUrl);
  return new Promise((resolve, reject) => {
    const request = http.request(
      { hostname, port, path: pathname, method: "GET", headers: { Host: host, Accept: "text/html" } },
      (response) => {
        response.resume();
        resolve({ status: response.statusCode, location: response.headers.location });
      },
    );
    request.on("error", reject);
    request.end();
  });
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#x27|#39);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

before(async () => {
  const port = await availablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: websiteRoot,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });

  await waitForServer(`${baseUrl}/`);
}, { timeout: 40_000 });

after(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    once(server, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
}, { timeout: 10_000 });

test("every indexed public page serves HTML and an authored Markdown variant", async () => {
  for (const pathname of publicPages) {
    const htmlResponse = await fetch(`${baseUrl}${pathname}`, {
      headers: { Accept: "text/html" },
    });
    assert.equal(htmlResponse.status, 200, `${pathname} HTML status`);
    assert.match(
      htmlResponse.headers.get("content-type") ?? "",
      /^text\/html\b/,
      `${pathname} HTML content type`,
    );
    assert.match(
      htmlResponse.headers.get("link") ?? "",
      /rel="alternate"; type="text\/markdown"/,
      `${pathname} alternate link`,
    );
    const html = await htmlResponse.text();
    const canonicalUrl = `https://newrevgen.com${pathname === "/" ? "" : pathname}`;
    assert.match(
      html,
      new RegExp(`<link rel="canonical" href="${canonicalUrl.replaceAll(".", "\\.")}"\\/?>`),
      `${pathname} canonical URL`,
    );
    assert.doesNotMatch(html, /newrevegen/i, `${pathname} brand domain`);

    const markdownResponse = await fetch(`${baseUrl}${pathname}`, {
      headers: { Accept: "text/markdown" },
    });
    assert.equal(markdownResponse.status, 200, `${pathname} Markdown status`);
    assert.match(
      markdownResponse.headers.get("content-type") ?? "",
      /^text\/markdown; charset=utf-8$/i,
      `${pathname} Markdown content type`,
    );
    assert.equal(
      includesVary(markdownResponse, "Accept"),
      true,
      `${pathname} Markdown Vary`,
    );
    assert.match(await markdownResponse.text(), /^#\s+\S/m, `${pathname} Markdown body`);

    const directMarkdownPath =
      pathname === "/" ? "/index.md" : `${pathname}.md`;
    const directMarkdownResponse = await fetch(`${baseUrl}${directMarkdownPath}`);
    assert.equal(
      directMarkdownResponse.status,
      200,
      `${directMarkdownPath} direct Markdown status`,
    );
    assert.match(
      directMarkdownResponse.headers.get("content-type") ?? "",
      /^text\/markdown\b/,
      `${directMarkdownPath} direct Markdown content type`,
    );
  }
});

test("the root layout enables Vercel Analytics and Speed Insights", async () => {
  const layout = await readFile(
    path.join(websiteRoot, "src/app/layout.tsx"),
    "utf8",
  );

  assert.match(layout, /from "@vercel\/analytics\/next"/);
  assert.match(layout, /<Analytics \/>/);
  assert.match(layout, /from "@vercel\/speed-insights\/next"/);
  assert.match(layout, /<SpeedInsights \/>/);
});

test("content negotiation honors q-values, specificity, direct .md URLs, and 406", async () => {
  const prefersHtml = await fetch(`${baseUrl}/`, {
    headers: { Accept: "text/html;q=1, text/markdown;q=0.5" },
  });
  assert.match(prefersHtml.headers.get("content-type") ?? "", /^text\/html\b/);

  const prefersMarkdown = await fetch(`${baseUrl}/`, {
    headers: { Accept: "text/html;q=0.8, text/markdown" },
  });
  assert.match(
    prefersMarkdown.headers.get("content-type") ?? "",
    /^text\/markdown\b/,
  );

  const rejectsSpecificMarkdown = await fetch(`${baseUrl}/`, {
    headers: { Accept: "text/markdown;q=0, */*;q=1" },
  });
  assert.match(
    rejectsSpecificMarkdown.headers.get("content-type") ?? "",
    /^text\/html\b/,
  );

  const directMarkdown = await fetch(`${baseUrl}/about.md`);
  assert.equal(directMarkdown.status, 200);
  assert.match(
    directMarkdown.headers.get("content-type") ?? "",
    /^text\/markdown\b/,
  );
  assert.match(await directMarkdown.text(), /^# About NewRevGen/m);

  const unacceptable = await fetch(`${baseUrl}/`, {
    headers: { Accept: "application/pdf" },
  });
  assert.equal(unacceptable.status, 406);
  assert.equal(includesVary(unacceptable, "Accept"), true);
  assert.match(await unacceptable.text(), /Available representations/);
});

test("unknown paths return recoverable 404 responses in HTML and Markdown", async () => {
  const pathname = "/agent-readiness-path-that-does-not-exist";
  const htmlResponse = await fetch(`${baseUrl}${pathname}`, {
    headers: { Accept: "text/html" },
  });
  const html = await htmlResponse.text();
  assert.equal(htmlResponse.status, 404);
  assert.match(html, /That page isn&#x27;t here\./);
  assert.match(html, /href="\/sitemap\.xml"/);
  assert.match(html, /href="\/llms\.txt"/);
  assert.match(html, /href="\/contact"/);

  const markdownResponse = await fetch(`${baseUrl}${pathname}`, {
    headers: { Accept: "text/markdown" },
  });
  const markdown = await markdownResponse.text();
  assert.doesNotMatch(html, /<link rel="canonical"/, "404 pages set no canonical");
  assert.doesNotMatch(html, /<meta property="og:url"/, "404 pages set no og:url");
  assert.match(html, /<meta name="robots" content="noindex/);
  assert.doesNotMatch(html, /<meta name="robots" content="index/);

  assert.equal(markdownResponse.status, 404);
  assert.match(
    markdownResponse.headers.get("content-type") ?? "",
    /^text\/markdown\b/,
  );
  assert.equal(includesVary(markdownResponse, "Accept"), true);
  assert.match(markdown, /^# 404: Page not found/m);
  assert.match(markdown, /https:\/\/newrevgen\.com\/sitemap\.xml/);
  assert.match(markdown, /https:\/\/newrevgen\.com\/llms\.txt/);
});

test("homepage metadata and JSON-LD identify NewRevGen consistently", async () => {
  const response = await fetch(`${baseUrl}/`, {
    headers: { Accept: "text/html" },
  });
  const html = await response.text();

  assert.match(html, /<html[^>]+lang="en"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/newrevgen\.com\/?"\/?>/,
  );
  assert.match(html, /<meta property="og:type" content="website"\/?>/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/newrevgen\.com\/images\/cta-background\.png"\/?>/,
  );
  assert.doesNotMatch(html, /newrevegen/i);

  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(jsonLdMatch, "homepage has JSON-LD");
  const jsonLd = JSON.parse(jsonLdMatch[1]);
  const organization = jsonLd["@graph"].find(
    (entry) => entry["@type"] === "Organization",
  );
  assert.equal(organization.name, "NewRevGen");
  assert.equal(organization.url, "https://newrevgen.com/");
  assert.equal(organization.contactPoint.email, "team@newrevgen.com");
  assert.equal(organization.contactPoint.contactType, "sales and customer support");
  assert.equal(organization.address["@type"], "PostalAddress");
  assert.equal(organization.address.addressCountry, "US");
});

test("trust pages contain substantive, specific content", async () => {
  for (const pathname of ["/about", "/contact", "/privacy"]) {
    const response = await fetch(`${baseUrl}${pathname}`, {
      headers: { Accept: "text/html" },
    });
    const text = visibleText(await response.text());
    assert.ok(text.length >= 500, `${pathname} has ${text.length} visible characters`);
  }
});

test("machine-readable discovery files are valid and reference canonical routes", async () => {
  const llmsResponse = await fetch(`${baseUrl}/llms.txt`);
  const llms = await llmsResponse.text();
  assert.equal(llmsResponse.status, 200);
  assert.match(llmsResponse.headers.get("content-type") ?? "", /^text\/plain\b/);
  assert.match(llms, /^# NewRevGen\n\n> /);
  assert.match(llms, /\*\*When to use NewRevGen\*\*/);
  assert.match(llms, /## Primary pages\n\n- \[Homepage\]/);
  assert.match(llms, /https:\/\/newrevgen\.com\/contact\.md/);
  for (const pathname of publicPages.filter((page) => page.startsWith("/roofing"))) {
    assert.match(
      llms,
      new RegExp(`https://newrevgen\\.com${pathname}\\.md`),
      `${pathname} is in llms.txt`,
    );
  }

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/);
  for (const pathname of publicPages) {
    assert.match(
      sitemap,
      new RegExp(`<loc>https://newrevgen\\.com${pathname === "/" ? "" : pathname}</loc>`),
      `${pathname} is in sitemap.xml`,
    );
  }

  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain\b/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(robots, /Sitemap: https:\/\/newrevgen\.com\/sitemap\.xml/);
  assert.match(robots, /Host: https:\/\/newrevgen\.com/);
});

test("www host permanently redirects to the apex, preserving path and query", async () => {
  const root = await requestWithHost("/", "www.newrevgen.com");
  assert.equal(root.status, 308);
  assert.match(root.location ?? "", /^https:\/\/newrevgen\.com\/?$/);

  const deep = await requestWithHost("/roofing/estimate-follow-up?ref=test", "www.newrevgen.com");
  assert.equal(deep.status, 308);
  assert.equal(deep.location, "https://newrevgen.com/roofing/estimate-follow-up?ref=test");

  const apex = await requestWithHost("/", "newrevgen.com");
  assert.equal(apex.status, 200);
});

test("roofing service pages have unique metadata and Service, FAQPage, and breadcrumb JSON-LD", async () => {
  const titles = new Set();
  for (const pathname of roofingServicePages) {
    const html = await (await fetch(`${baseUrl}${pathname}`, { headers: { Accept: "text/html" } })).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${pathname} has a unique title`);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]{80,160}"/, `${pathname} description`);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${pathname} has one H1`);

    const nodes = jsonLdNodes(html);
    const service = nodes.find((node) => node["@type"] === "Service");
    assert.ok(service, `${pathname} has Service JSON-LD`);
    assert.equal(service.url, `https://newrevgen.com${pathname}`);
    assert.equal(service.provider.name, "NewRevGen");

    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    assert.ok(faq && faq.mainEntity.length >= 5, `${pathname} has FAQPage JSON-LD`);
    const text = visibleText(html);
    for (const question of faq.mainEntity) {
      assert.equal(question["@type"], "Question");
      assert.ok(question.acceptedAnswer.text.length > 0);
      const visibleQuestion = question.name.replace(/'/g, " ").replace(/\s+/g, " ");
      assert.ok(text.includes(visibleQuestion), `${pathname} shows "${question.name}"`);
    }
    assert.ok(nodes.some((node) => node["@type"] === "BreadcrumbList"));
    assert.match(html, /href="\/contact"/, `${pathname} links to contact`);
    assert.doesNotMatch(text, /[\u2013\u2014]/, `${pathname} copy has no en or em dashes`);
  }

  const hub = await (await fetch(`${baseUrl}/roofing`, { headers: { Accept: "text/html" } })).text();
  for (const pathname of roofingServicePages) {
    assert.match(hub, new RegExp(`href="${pathname}"`), `/roofing links to ${pathname}`);
  }
});

test("missed-call and estimate tools serve crawlable guidance linked to roofing pages", async () => {
  const expectations = {
    "/tools/missed-call-calculator": "/roofing/missed-call-recovery",
    "/tools/estimate-follow-up-gap": "/roofing/estimate-follow-up",
  };
  for (const [pathname, roofingPath] of Object.entries(expectations)) {
    const html = await (await fetch(`${baseUrl}${pathname}`, { headers: { Accept: "text/html" } })).text();
    const words = visibleText(html).split(" ").length;
    assert.ok(words >= 300, `${pathname} has ${words} visible words`);
    assert.match(html, new RegExp(`href="${roofingPath}"`));
    assert.match(html, /href="\/operations"/);
    assert.ok(jsonLdNodes(html).some((node) => node["@type"] === "FAQPage"));

    const roofingHtml = await (await fetch(`${baseUrl}${roofingPath}`, { headers: { Accept: "text/html" } })).text();
    assert.match(roofingHtml, new RegExp(`href="${pathname}"`), `${roofingPath} links back to ${pathname}`);
  }
});

test("global navigation links the roofing hub and the contractor page", async () => {
  for (const pathname of ["/", "/tools", "/about", "/roofing"]) {
    const html = await (await fetch(`${baseUrl}${pathname}`, { headers: { Accept: "text/html" } })).text();
    assert.match(html, /href="\/roofing"/, `${pathname} links /roofing`);
    assert.match(html, /href="\/operations"/, `${pathname} links /operations`);
  }
});

test("operations page declares Service and FAQPage JSON-LD", async () => {
  const html = await (await fetch(`${baseUrl}/operations`, { headers: { Accept: "text/html" } })).text();
  const types = jsonLdNodes(html).map((node) => node["@type"]);
  assert.ok(types.includes("Service"));
  assert.ok(types.includes("FAQPage"));
});
