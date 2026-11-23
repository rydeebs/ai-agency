# Roofing service pages and host canonicalization

Date: 2026-11-23

Status: Accepted

## Context

The 2026-11-23 SEO and answer-engine baseline found no page on the site for the primary ICP, owner-led roofing contractors, and no mention of NewRevGen across the roofing buyer prompts it tested. The technical audit also found that `www.newrevgen.com` served a duplicate 200 response, 404 pages inherited the root layout's homepage canonical, and the site had no Service or FAQPage structured data.

## Decision

- Roofing pages live under `/roofing`: one hub plus one page per search intent (AI for roofing contractors, missed-call recovery, estimate follow-up, storm lead response). Copy lives in `src/content/landing/roofing.ts` as typed `ServicePageContent`. A single server-rendered `ServicePage` component renders it, built from existing pieces (`ToolHeader`, `FAQVariant`, `CTAVariant`, `Footer`, and the `legal-content` prose styles). The same content objects generate each page's metadata, JSON-LD, sitemap entry, and Markdown alternate, so these cannot drift apart.
- Each service page emits a `@graph` with Service, FAQPage, and BreadcrumbList. The FAQPage includes only questions that are visible on the page. Service nodes reference the homepage Organization by `@id`. `/operations` gets Service and FAQPage, and the homepage graph gains FAQPage.
- `www.newrevgen.com` redirects to the apex with a permanent (308) `has: host` redirect in `next.config.ts`. The repository has no `vercel.json`, and Next.js applies config redirects before the proxy, so content negotiation never runs on the www host.
- `not-found.tsx` sets `alternates.canonical` and `openGraph` to `null` and sets robots to `noindex, follow`, so the root layout's homepage canonical, `og:url`, and `index` directive do not appear on 404 responses.

## Consequences

- Adding another trade means adding a content object and route, not new rendering code.
- Copy on these pages must not include invented statistics, prices, client names, or results, and it uses no en or em dashes. `tests/agent-readiness.test.mjs` checks the dash rule and the structured-data shape for every roofing page.
- If the Vercel project also sets a domain-level redirect, it takes precedence. The config redirect remains a correct fallback.
