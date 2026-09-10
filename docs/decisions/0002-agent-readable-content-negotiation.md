# Agent-readable content negotiation

Date: 2026-09-10

Status: Accepted

## Context

The public website served only React-rendered HTML. Requests that explicitly preferred `text/markdown` received the same large HTML representation, and caches were not told that the response could vary by `Accept`. The site also lacked an agent index, authored recovery content, and stable Markdown representations of its public pages.

## Decision

Public content pages use HTTP content negotiation at the Next.js 16 Proxy layer. The proxy parses media ranges, quality values, client order, and wildcard specificity before selecting either `text/html` or `text/markdown`. It rewrites Markdown requests to a single internal route backed by authored, version-controlled Markdown content. Unsupported media types receive `406 Not Acceptable` when neither available representation is acceptable.

Negotiated Markdown and `406` responses advertise `Vary: Accept`. The proxy also declares `Vary: Accept` on the HTML branch, although Next.js 16 currently replaces custom `Vary` fields with its internal RSC fields during final App Router rendering. HTML responses still publish links to a `.md` alternate and `/llms.txt`; direct `.md` URLs use the same internal route. API routes, Next.js internals, machine-readable files, static assets, and the standalone Abacus Builders demo stay outside negotiation.

The root `/llms.txt` follows the llms.txt Markdown ordering convention and gives agents specific when-to-use and engagement guidance. Unknown content paths return `404` in both representations, with links to the sitemap, agent guidance, homepage, about page, and contact page.

## Alternatives considered

- Convert rendered HTML to Markdown at request time. Rejected because client-rendered and decorative markup would produce noisy output and add runtime dependencies.
- Match `Accept` with a substring rewrite in `next.config.ts`. Rejected because it cannot correctly honor quality values, explicit rejection, or wildcard specificity.
- Publish only separate `.md` files. Rejected because agents requesting the canonical URL with `Accept: text/markdown` would still receive HTML.

## Consequences

- Agents receive concise, stable content without executing client code or parsing presentation markup.
- Public copy now has an additional authored representation that must be updated when material page claims change.
- Proxy and endpoint regression tests are required whenever the public route inventory or negotiation behavior changes.
- Markdown responses are cache-safe by `Accept`; complete `Vary: Accept` coverage on framework-rendered HTML should be retested when the open Next.js custom-`Vary` regression is fixed.
- A real public business phone and street-level mailing address remain intentionally absent until the business chooses to publish them; structured data must not invent those facts.

## Revisit when

Revisit this decision if the site adopts a content management system that can render both HTML and Markdown from one source, or if the deployment platform offers standards-compliant origin negotiation with equivalent tests and cache behavior.
