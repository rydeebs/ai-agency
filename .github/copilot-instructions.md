# NewRevGen repository guidance

- Treat `apps` as deployable boundaries and `packages` as shared libraries.
- Follow the closest `AGENTS.md` for app-specific rules.
- Use strict TypeScript and validate external data at runtime.
- Keep workflows idempotent, observable, retryable, and safe to replay.
- Require human approval before high-impact external actions.
- Never commit secrets, production payloads, or client-identifying data.
- Record lasting architectural choices in `docs/decisions`.
