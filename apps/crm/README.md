<h1 align="center">The Open Source Agent CRM on Convex</h1>

<p align="center">
  <strong>The open source agentic CRM, ported to run entirely on Convex.</strong><br>
  One deployment is the database, the agent runtime, the work queue, the cron scheduler, the file store, and the web host.
</p>

<p align="center">
  <a href="https://convex.link/crmonconvex"><strong>Live demo</strong></a> ·
  <a href="#quick-start"><strong>Quick start</strong></a> ·
  <a href="#configuration"><strong>Configuration</strong></a> ·
  <a href="#email-two-providers"><strong>Email</strong></a> ·
  <a href="#deploying-to-convex-cloud"><strong>Deploying</strong></a> ·
  <a href="#turning-off-the-demo-reset"><strong>Forking</strong></a> ·
  <a href="#how-it-compares-to-upstream"><strong>Compare</strong></a>
</p>

## What this is

This is a port of [trycompai/crm](https://github.com/trycompai/crm) that replaces the entire infrastructure with a single [Convex](https://convex.dev) deployment. The product carried over intact: durable research agents that enrich companies and contacts, an evidence ledger where nothing about a person is guessed, rechecks that require a stated reason, agents that build agents, and record chat that reads your own history and shows its working.

What changed is everything underneath. No Vercel, no Postgres, no Prisma, no Redis, no separate API server, no Better Auth. The frontend is a Vite React app served by the Convex static hosting component from the same deployment that runs the backend. Convex Auth protects the single-owner workspace.

This NewRevGen fork starts with a blank workspace, single-owner authentication,
and no reset cron. The site has a full setup and usage guide at `/docs`.

## The stack

| Layer            | Technology                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend          | Convex functions, TypeScript end to end                                                                                                                                             |
| Database         | Convex database with typed schema and indexes                                                                                                                                       |
| Frontend         | React 19, Vite, React Router, Tailwind CSS 4 (dark and light themes)                                                                                                                |
| Hosting          | [`@convex-dev/static-hosting`](https://www.convex.dev/components/static-hosting) serving the built app                                                                              |
| Agent runtime    | [`@convex-dev/agent`](https://www.convex.dev/components/agent) with tools, threads, and message history                                                                             |
| Work queues      | [`@convex-dev/workpool`](https://www.convex.dev/components/workpool), three pools so slow work cannot starve the dispatcher                                                         |
| Brand enrichment | [`@context-dot-dev/convex`](https://www.convex.dev/components/context-dot-dev/convex), the same Context.dev data the upstream uses; the same key also backs web search and scraping |
| Web scraping     | [`@firecrawl/firecrawl-convex`](https://www.convex.dev/components/firecrawl/firecrawl-convex) or Context.dev, the chat agent reads pages as markdown with either key                |
| Web search       | [`@exalabs/convex-exa`](https://www.convex.dev/components/exalabs/convex-exa) or Context.dev, search as an agent tool with either key                                               |
| AI providers     | OpenAI, Claude (Anthropic), OpenRouter, DeepSeek, or Grok (xAI) via the AI SDK, switchable in Settings, no key ships by default                                                     |
| Email            | Gmail API, [`@convex-dev/resend`](https://www.convex.dev/components/resend), or [`@agentmail/convex`](https://www.convex.dev/components/agentmail/convex), switchable in Settings               |
| Caching          | [`@convex-dev/action-cache`](https://www.convex.dev/components/action-cache), 7 day TTL on brand lookups, replaces Redis                                                            |
| Rate limiting    | [`@convex-dev/rate-limiter`](https://www.convex.dev/components/rate-limiter) on the enrichment budget                                                                               |
| Rollups          | [`@convex-dev/aggregate`](https://www.convex.dev/components/aggregate) for pipeline value by stage and owner                                                                        |
| Scheduling       | Convex cron jobs plus [`@convex-dev/crons`](https://www.convex.dev/components/crons)                                                                                                |
| Durability       | [`@convex-dev/workflow`](https://www.convex.dev/components/workflow) and [`@convex-dev/action-retrier`](https://www.convex.dev/components/retrier)                                  |
| Migrations       | [`@convex-dev/migrations`](https://www.convex.dev/components/migrations)                                                                                                            |

Package manager is npm. There is no monorepo; `convex/` is the backend, `src/` is the frontend.

## Quick start

```bash
git clone https://github.com/waynesutton/trycrm-convex.git
cd trycrm-convex
npm install
npx convex dev
```

The first `npx convex dev` walks you through creating a free Convex project. It will ask for three required environment variables before the first push:

```bash
npx convex env set CONTEXT_DEV_API_KEY unset
npx convex env set FIRECRAWL_API_KEY unset
npx convex env set EXA_API_KEY unset
```

The literal string `unset` is the documented sentinel for running without vendor keys. Each feature reports that it is not configured instead of failing. Put real keys there whenever you have them; the features switch on immediately, no redeploy needed.

Then, in a second terminal:

```bash
npm run dev:frontend
```

Initialize the private owner before signing up. Replace the example address
with the one email that may access this CRM:

```bash
npm run auth:keys
npx convex env set OWNER_EMAIL you@example.com
npx convex run setup:initializeOwner
```

Open the printed localhost URL, choose **Create owner login** once, and use the
same email. Every later visit uses **Sign in**. The backend enforces the owner
allowlist; the login is not merely a frontend route guard.

Or run the frontend and backend together:

```bash
npm run dev
```

Prefer letting a coding agent do this? The landing page has a "Copy the setup prompt" button that hands the exact instructions to Cursor, Codex, Claude Code, or whatever you use.

## Configuration

Every outside key is optional in practice. The app degrades honestly: features that need a key say so instead of pretending.

| Variable                                   | What it enables                                                                                                                              | Without it                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `OWNER_EMAIL`                              | The only address allowed to create a CRM session; apply it with `setup:initializeOwner`                                                     | Owner initialization fails closed                                                      |
| `JWT_PRIVATE_KEY` + `JWKS`                 | Convex Auth token signing and verification; generated by `npm run auth:keys`                                                                | Sign-in cannot create a session                                                        |
| `SITE_URL`                                 | Allowed browser origin for Convex Auth redirects                                                                                            | Redirect-based auth flows fail                                                         |
| `GMAIL_CLIENT_ID` + `GMAIL_CLIENT_SECRET`  | Connect Gmail through Google OAuth and send through the Gmail API                                                                           | Gmail stays disconnected                                                               |
| `GMAIL_TOKEN_ENCRYPTION_KEY`               | Encrypts the Google refresh token before it is written to Convex; generated by `npm run auth:keys`                                          | Gmail connection fails closed                                                          |
| `GMAIL_REDIRECT_URI`                       | Optional exact Google OAuth callback override; normally derived as `<CONVEX_SITE_URL>/oauth/gmail/callback`                                 | The deployment HTTP-actions URL is used                                                |
| `CONTEXT_DEV_API_KEY`                      | Company enrichment from Context.dev brand data, plus web search and page reading for the chat agent when the Exa or Firecrawl key is missing | Enrichment tasks complete with a "not configured" note. Set to `unset` to run keyless. |
| `FIRECRAWL_API_KEY`                        | Chat agent reads web pages via Firecrawl. Context.dev covers this when only its key is set                                                   | The tool tells the agent which keys enable it. Set to `unset` to run keyless.          |
| `EXA_API_KEY`                              | Chat agent searches the web via Exa. Context.dev covers this when only its key is set                                                        | Same honest degradation. Set to `unset` to run keyless.                                |
| `OPENAI_API_KEY`                           | Chat and agent reasoning when OpenAI is the selected provider                                                                                | Chat replies name the missing key                                                      |
| `ANTHROPIC_API_KEY`                        | Chat and agent reasoning when Claude is the selected provider                                                                                | Same                                                                                   |
| `OPENROUTER_API_KEY`                       | Chat and agent reasoning when OpenRouter is the selected provider                                                                            | Same                                                                                   |
| `DEEPSEEK_API_KEY`                         | Chat and agent reasoning when DeepSeek is the selected provider                                                                              | Same                                                                                   |
| `XAI_API_KEY`                              | Chat and agent reasoning when Grok (xAI) is the selected provider                                                                            | Same                                                                                   |
| `RESEND_API_KEY`                           | Outbound email through the Resend component                                                                                                  | Email sends are logged as no-ops                                                       |
| `AGENTMAIL_API_KEY` + `AGENTMAIL_INBOX_ID` | Outbound email plus a persistent agent inbox through AgentMail                                                                               | Same, logged as no-ops                                                                 |
| `SLACK_WEBHOOK_URL`                        | Slack notifications in simple mode: posts to one fixed channel through an incoming webhook                                                   | Slack sends are logged as no-ops                                                       |
| `SLACK_BOT_TOKEN`                          | Slack notifications in full mode: the channel picker in Settings and the `/crm` bot                                                          | Same, logged as no-ops                                                                 |
| `SLACK_SIGNING_SECRET`                     | Verifies inbound Slack slash commands for the `/crm` bot                                                                                     | Bot routes answer 503; notifications unaffected                                        |
| `APP_URL`                                  | Overrides the base URL in Slack deep links, for custom domains                                                                               | Links use the `.convex.site` URL                                                       |
| `FIRECRAWL_WEBHOOK_SECRET`                 | Verifies Firecrawl crawl webhooks                                                                                                            | Optional; only needed for webhook-mode crawls                                          |
| `AGENTMAIL_WEBHOOK_SECRET`                 | Verifies inbound AgentMail webhooks                                                                                                          | Optional; unverified deliveries are rejected                                           |
| `WEBSITE_LEAD_INGEST_SECRET`               | Authenticates assessment submissions sent server-to-server from newrevgen.com                                                                | The `/webhooks/website-lead` endpoint fails closed with 401                             |

Set any of them with:

```bash
npx convex env set OPENAI_API_KEY sk-...
```

None of the five AI keys ship by default. A fresh fork has no model keys at all; the Ask page and record chat answer with the exact key they need instead of erroring. Pick which provider the chat uses in Settings. OpenAI is the default.

`setup:initializeOwner` sets `demoMode` to false and installs the one permitted
email in the workspace row. Empty allowlists reject every sign-in.

## Email: Gmail, Resend, or AgentMail

Notifications and composed messages route through one selected provider:

- **Gmail** sends from your own connected Google account. Enable the Gmail API in Google Cloud, create a Web OAuth client, and add `https://YOUR-DEPLOYMENT.convex.site/oauth/gmail/callback` as an authorized redirect URI. Set `GMAIL_CLIENT_ID` and `GMAIL_CLIENT_SECRET`, then use **Settings → Email → Connect Gmail**. The app requests only `gmail.send`; it does not read the mailbox.
- **Resend** is plain outbound email. One key: `RESEND_API_KEY`.
- **AgentMail** sends too, and also gives agents a persistent inbox: threads, labels, and delivery status sync into Convex tables reactively. Two values: `AGENTMAIL_API_KEY` and `AGENTMAIL_INBOX_ID`. For inbound mail, register `https://YOUR-DEPLOYMENT.convex.site/agentmail/webhook` in the AgentMail dashboard and set `AGENTMAIL_WEBHOOK_SECRET`.

All three can remain configured; the toggle decides which one sends. Gmail refresh tokens are encrypted with AES-GCM before storage. With no configured provider, sends are logged instead of failing.

### Website assessment leads

The website posts validated assessments to `https://YOUR-DEPLOYMENT.convex.site/webhooks/website-lead`. Set the same high-entropy secret in both deployments:

```bash
# CRM / Convex deployment
npx convex env set WEBSITE_LEAD_INGEST_SECRET "replace-with-a-long-random-value"

# Website deployment
CRM_CONVEX_SITE_URL=https://YOUR-DEPLOYMENT.convex.site
CONVEX_LEAD_INGEST_SECRET=replace-with-the-same-value
```

The endpoint upserts a company and contact, records the full assessment, adds a CRM timeline note, and queues the requested report through the workspace's selected email provider. To send from Google Workspace, configure Gmail as described above, connect the mailbox under **Settings → Email**, and select Gmail as the provider. Benchmark metrics are stored only after explicit respondent opt-in.

### AI Tools Assessment generator

The private CRM includes a manual generator at `/app/assessment-generator`.
Upload or paste a text transcript (`.txt`, `.md`, `.vtt`, or `.srt`), add
optional client context, and the workspace's selected AI provider returns a
strict nine-page assessment. Review the unknowns and slide preview, then use
**Download PDF** to render the NewRevGen-branded report locally in the browser.

The generator does not persist the raw transcript or generated report. The
transcript is sent only to the selected AI provider for that request, the model
key remains in Convex, and no report is emailed automatically.

## Viewing backend data

Open [dashboard.convex.dev](https://dashboard.convex.dev), choose the
`newrevgen-crm` project, and select the development or production deployment.
The **Data** page shows every table and document; **Functions** shows backend
queries/actions, **Logs** shows execution output, **Files** shows uploaded
attachments, and **Settings → Environment Variables** shows configured variable
names without putting secrets in the repository.

## Slack: notifications and the /crm bot

> **Untested.** Built against Slack's current API docs but not yet run against a live Slack workspace. The Activity page logs every send, skip, and failure; start there if something misbehaves, and open an issue if you hit a bug.

Off by default. Turn it on in Settings, Slack, then connect one of two modes. Dev and production keep separate env vars, so run each `npx convex env set` command twice if you deployed: once for dev, once with `--prod`.

- **Webhook mode** posts CRM events to one fixed channel. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps), enable [Incoming Webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/), pick a channel, and set `SLACK_WEBHOOK_URL`. Two minutes, no scopes.
- **Bot mode** lets you search and pick the channel from Settings and enables the `/crm` slash command. Add the `chat:write`, `channels:read`, `users:read`, and `users:read.email` [bot scopes](https://docs.slack.dev/reference/scopes) (plus `groups:read` for private channels), install the app, and set `SLACK_BOT_TOKEN`. Invite the bot to the channel with `/invite @your-bot-name`.

What posts, each behind its own toggle: new companies and contacts, new deals and stage changes, task completions, and agent run summaries. Every message includes an Open in CRM link. Deliveries retry with backoff through the [action retrier component](https://www.convex.dev/components/retrier); demo mode never posts, and every send or skip shows on the Activity page.

The `/crm` bot needs two more things: `SLACK_SIGNING_SECRET` (from your Slack app's Basic Information page) and a [slash command](https://docs.slack.dev/interactivity/implementing-slash-commands/) pointed at `https://YOUR-DEPLOYMENT.convex.site/webhooks/slack/commands`. Then flip the bot switch in Settings, Slack. Commands: `/crm find`, `/crm deal <name> <stage>`, `/crm note`, `/crm task`, `/crm activity`, `/crm help`. Every request is verified with Slack's [signed secrets scheme](https://docs.slack.dev/authentication/verifying-requests-from-slack/), and only workspace members (matched by Slack profile email against the Team list, or an allowed domain) can act. The full walkthrough lives on the `/docs` page of your deployment.

## Linting and helpers

The repo uses the [Convex ESLint plugin](https://docs.convex.dev/eslint) with type aware linting. It enforces argument validators, explicit table names in `db.get`, `db.patch`, `db.replace`, and `db.delete`, warns on `.filter()` in queries, and keeps cron jobs off the top of the hour.

```bash
npm run lint
```

Write access runs through one wrapper built on [`convex-helpers`](https://github.com/get-convex/convex-helpers): `writeMutation` in `convex/model/functions.ts` calls the access check before every mutation handler. That is the Convex pattern for row level security. When you wire real auth, `convex/model/access.ts` is the only file that changes.

## Deploying to Convex cloud

One deployment serves the backend and the site. Before the first production deploy, set the required env vars on production. They are separate from dev, so the values you set during setup do not carry over, and the push fails with `MissingEnvironmentVariables` without them:

```bash
npx convex env set CONTEXT_DEV_API_KEY unset --prod
npx convex env set FIRECRAWL_API_KEY unset --prod
npx convex env set EXA_API_KEY unset --prod
```

Then, from a configured project:

```bash
npm run deploy
```

That runs `npx @convex-dev/static-hosting deploy`, which does the whole thing in one shot: builds the frontend with the production Convex URL, deploys the Convex backend, and uploads the built files to Convex storage.

Your site is then live at your deployment's `.convex.site` URL, which the Convex dashboard shows under Settings. The static hosting component handles SPA routing, hashed asset caching, and garbage collection of old builds. Deploys are atomic; clients subscribed through the deployment query can offer a refresh when a new build ships.

For production auth, generate a separate signing and encryption key set after
the first deploy prints the production URL:

```bash
npm run auth:keys:prod -- --site-url=https://YOUR-PRODUCTION.convex.site
npx convex env set OWNER_EMAIL you@example.com --prod
npx convex run setup:initializeOwner --prod
```

The random `.convex.site` deployment name is the default permanent URL. A
branded URL is configured under **Production deployment → Settings → Custom
Domains** and requires a Convex Pro plan. Because static hosting is registered
as the HTTP-action catch-all, choose the HTTP-actions destination. After a
domain change, update `SITE_URL`, Google's Gmail redirect URI, and the optional
`GMAIL_REDIRECT_URI` value.

## Single-owner access

This fork has no demo-reset cron. `setup:initializeOwner` creates or updates the
single workspace, sets `demoMode` to `false`, and copies `OWNER_EMAIL` into the
workspace allowlist. Empty allowlists reject every sign-in. Backend reads and
writes check both a valid Convex Auth session and that allowlist.

## What works

- Companies, contacts, deals board, dashboard rollups, custom fields, timelines, all real time
- Notes and tasks on every company and contact: due dates, email reminders through the selected provider, complete buttons, all mirrored to the Activity page
- Compose email from any company or contact: a draggable, resizable window with To, Cc, Bcc, markdown preview, and attachments; the timeline records every send, and delivery uses Gmail, Resend, or AgentMail
- Settings split into pages with a sub-sidebar: Team, Integrations, Slack, Email (provider, from identity, signature), AI provider, Sidebar, Custom fields
- Slack integration, off by default: event notifications with per-event toggles, a channel picker with search, a test button, and a `/crm` slash command bot
- Table sorting, filtering, and inline add rows on Companies and Contacts
- Deals as a drag and drop board plus a sortable list view
- Ask: a Claude-style workspace chat with streamed replies, slash commands (including `/task` and `/note`, which need no AI key), a thread sub-sidebar, archive, and delete
- Command-K search backed by Convex full text search indexes on companies, contacts, and deals
- Activity: a live dashboard-style log of function outcomes with pause, select one or all, and clear
- Sidebar items reorder by drag and drop; Settings can hide items; the rail icon collapses the sidebar
- Agent task queue with leasing, workpools, and scheduled rechecks that require a reason
- Manual transcript-to-assessment generator with structured output, a nine-slide preview, and local PDF download
- Agents that build agents: describe a process, get a versioned draft definition
- Record chat with web research tools (Firecrawl, Exa, or Context.dev, any one key is enough) that answer honestly about missing keys
- AI provider picker: OpenAI, Claude, OpenRouter, DeepSeek, or Grok, none configured by default
- Dark and light themes with a toggle in the header and the sidebar footer
- Single-owner Convex Auth with a backend email allowlist

## How it compares to upstream

The app has a live comparison page at `/compare` and full setup docs at `/docs`. Short version:

| Area            | trycompai/crm                           | This version                                                                                      |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Hosting         | Vercel plus a separate API              | Convex static hosting                                                                             |
| Database        | Postgres with Prisma                    | Convex database                                                                                   |
| Realtime        | Polling and invalidation                | Reactive queries                                                                                  |
| Queue           | Redis backed workers                    | Workpool components, queue as a table                                                             |
| Auth            | Better Auth                             | Convex Auth ready, off in demo                                                                    |
| Email           | Resend SDK calls                        | Resend or AgentMail components, switchable                                                        |
| Web research    | Not included                            | Firecrawl or Context.dev scraping and Exa or Context.dev search as agent tools; any one key works |
| AI providers    | OpenAI                                  | OpenAI, Claude, OpenRouter, DeepSeek, or Grok, switchable in Settings                             |
| Workspace chat  | Per-record chat only                    | Ask page with streamed replies, slash commands, and thread history                                |
| Notes and tasks | Notes on records                        | Notes and tasks with due dates, reminders, and completion                                         |
| Search          | Per-table inputs                        | Command-K palette on full text search indexes                                                     |
| Observability   | Server logs                             | Activity page streams function outcomes live                                                      |
| Services to run | Frontend, API, Postgres, Redis, workers | One Convex deployment                                                                             |
| Package manager | bun, Turborepo                          | npm, single package                                                                               |

## Project layout

```
convex/            Backend: schema, functions, components config, crons
convex/model/      Shared logic: access control, cascade deletes, seed data
src/app/           CRM screens: dashboard, companies, contacts, deals, ask, activity, agents, settings
src/pages/         Landing, compare, and docs pages
src/components/    Shared UI primitives, demo banner, theme toggle
public/            Static assets served with the app
docs/              Upstream docs and port instructions
```

`files.md` has a description of every file. `changelog.md` tracks changes.

## License and credits

MIT licensed, the same license as the upstream project. The product design, agent philosophy, and seed content come from [Comp AI's CRM](https://github.com/trycompai/crm). This port swaps the infrastructure for Convex and its [components](https://www.convex.dev/components).
