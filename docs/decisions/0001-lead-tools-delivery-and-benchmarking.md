# Lead tools: calculation, delivery, and benchmarking boundaries

Date: 2026-09-08

## Decision

NewRevGen's five public lead-generation tools live in the existing Next.js website and share a typed question/result model. Scores and opportunity ranges are deterministic functions of respondent inputs. The browser may calculate a limited preview, but the server validates all inputs and recalculates the complete result before accepting a lead.

The website sends each accepted submission server-to-server to a shared-secret-protected Convex HTTP action. Convex stores the assessment, associates it with a CRM company and contact, writes a timeline note, and schedules the result email through the CRM's selected provider. Gmail is supported through the CRM's existing encrypted OAuth connection.

The website audit examines only bounded public HTML. It rejects non-HTTP protocols, credentials, nonstandard ports, local hostnames, and private or reserved IP ranges; revalidates redirects; and limits redirect count, bytes, and request duration. Application throttling is supplemented by deployment-platform rate limiting in production.

Benchmark use is separate from report delivery. A respondent must explicitly opt in before the six normalized metrics are retained as benchmark-eligible. No comparative benchmark is published until the permissioned sample is large enough, and company identity, email, URL, raw answers, and individual results are excluded from aggregate reporting.

## Consequences

- Scoring changes are auditable and provider-independent.
- A CRM or email outage fails closed instead of revealing a gated report without capturing and delivering it.
- The `TOOL_RESULTS_GATE_MODE` website setting can switch between a pre-gate preview and email-only delivery without changing assessment code.
- The seller tool carries a brand code so a later broker-branded presentation can reuse the same scoring and storage contract.
- Opportunity figures must always be labeled as directional scenarios, never guaranteed recovered revenue.
