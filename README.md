# NewRevGen

NewRevGen's monorepo for the public website, internal operating tools, and reusable AI automation capabilities.

Read [AGENCY_CONTEXT.md](AGENCY_CONTEXT.md) for NewRevGen's mission, ICP, positioning, outreach context, and product principles. AI agents should use it as business context; `AGENTS.md` remains the repository's technical/behavioral instruction file.

## Repository map

```text
.agents/skills/         Codex skills shared across the repository
.codex/agents/          Project-scoped Codex custom agents
.claude/skills/         Claude skills shared across the repository
.claude/agents/         Project-scoped Claude custom agents
apps/                  Deployable applications and services
  website/             Public marketing and lead-generation website
  crm/                 Internal CRM (planned)
  automation-worker/   Background jobs, webhooks, and scheduled workflows (planned)
packages/              Reusable code shared by two or more apps
  ai/                   Model access, prompts, structured output, guardrails, and evals
  automation-core/      Workflow primitives, retries, idempotency, and approvals
  contracts/            Shared API/event schemas and TypeScript types
  database/             Schema, migrations, and data-access layer
  integrations/         Connectors for third-party business systems
  observability/        Logging, metrics, tracing, and audit events
  ui/                   Shared interface components and design tokens
docs/                  Architecture, business, security, and delivery guidance
templates/             Sanitized client-engagement templates
infrastructure/        Hosting and infrastructure-as-code when introduced
scripts/               Repository-wide development and operations scripts
```

`AGENTS.md` contains behavioral instructions for Codex. Do not confuse it with `.agents/skills`, which contains reusable skill packages. See the README files inside `.agents`, `.codex`, and `.claude` before adding agent tooling.

Only create a package after code is genuinely needed by multiple apps. Until then, keep feature code inside the app that owns it.

## Current commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

`npm run dev` currently starts the website. Additional app-specific commands should be added as those apps are implemented.

## Client-data rule

Do not store credentials, exported customer data, call transcripts, personally identifiable information, or production payloads in this repository. `templates/client-engagement` contains sanitized templates; completed client material belongs in a client-approved private system.

See [the architecture overview](docs/architecture/README.md) before adding a new app or shared package.
