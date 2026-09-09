# NewRevGen Monorepo

## Scope

- Read `AGENCY_CONTEXT.md` for NewRevGen's business context, ICP, positioning, and outreach assumptions before making product or automation decisions.
- `apps/` contains independently deployable applications and services.
- `packages/` contains code reused by at least two apps.
- `.agents/skills/` contains repository-wide Codex skills.
- `.codex/agents/` contains project-scoped Codex custom agents.
- `.claude/skills/` and `.claude/agents/` contain the Claude Code equivalents.
- Follow the closest nested `AGENTS.md` when working inside an app.
- Keep one-off feature code in its owning app until reuse is proven.

## Engineering rules

- Use strict TypeScript for new application code.
- Validate data at every external boundary with explicit schemas.
- Make automation jobs idempotent, observable, retryable, and safe to replay.
- Require a human approval step before high-impact actions such as sending campaigns, changing customer systems, moving money, or deleting data.
- Keep business logic independent from specific AI providers and third-party vendors where practical.
- Never commit secrets, customer exports, production payloads, transcripts, or personally identifiable information.
- Record meaningful architecture choices in `docs/decisions/`.

## Verification

Run the narrowest relevant checks while developing. Before handing off repository-wide changes, run:

```bash
npm run lint
npm run typecheck
npm run build
```
