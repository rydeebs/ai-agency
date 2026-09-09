# NewRevGen website

The public NewRevGen marketing and lead-generation website. It is a Next.js 16 App Router application using React 19, strict TypeScript, Tailwind CSS 4, and shadcn/ui conventions.

## Routes

- `/` — primary contractor and service-business landing page
- `/operations` — operations-focused contractor landing page
- `/firms` — accounting and finance firm landing page
- `/101` — AI literacy and training landing page
- `/api/lead` — legacy lead-form endpoint; validates submissions without logging personally identifiable fields
- `/tools` — directory for the five public revenue operations tools
- `/tools/[slug]` — assessment, calculator, and website-audit experiences
- `/privacy` and `/terms` — legal routes linked from every result gate
- `/api/tools/audit` — bounded public-page HTML audit with private-network blocking
- `/api/tools/submit` — validates and recalculates results before handing leads to Convex

## Structure

- `src/app` contains routes and metadata.
- `src/components` contains the main site's presentation components.
- `src/components/landing` contains reusable content-driven landing sections.
- `src/content/landing` contains copy and configuration for each vertical.
- `public` contains local image and video assets.
- `docs/research` preserves the original visual reverse-engineering notes.

## Commands

From the repository root:

```bash
npm run dev:website
npm run build --workspace=@newrevgen/website
npm run lint --workspace=@newrevgen/website
npm run typecheck --workspace=@newrevgen/website
```

The application began from an AI website-cloning template, so its hidden agent configuration and research files are retained for reference. Website-only Codex skills live in `.agents/skills`; website-only Claude skills live in `.claude/skills`. Product code lives in `src`; generated `.next` output and installed `node_modules` should not be edited.

## Lead-tool configuration

Set these values in the website deployment (for example, Vercel project environment variables):

| Variable | Purpose |
| --- | --- |
| `CRM_CONVEX_SITE_URL` | The CRM HTTP-actions origin, such as `https://example.convex.site` |
| `CONVEX_LEAD_INGEST_SECRET` | Shared bearer secret; must equal the CRM deployment's `WEBSITE_LEAD_INGEST_SECRET` |
| `RATE_LIMIT_SALT` | Optional secret used to hash request addresses for process-local abuse throttling |
| `TOOL_RESULTS_GATE_MODE` | `preview` (default) shows one useful result before the email gate and the complete report after submission; `email-only` shows no preview and delivers the complete result only by email |

Submissions fail closed if the Convex URL or shared secret is missing; the browser never receives either value. The public-page audit accepts only HTTP(S), revalidates redirects and DNS, blocks private/local address ranges, limits response size and duration, and applies a process-local throttle. Add a platform-level rate limit in front of `/api/tools/*` for distributed production enforcement.

Result calculations are repeated on the server instead of trusting browser values. Only respondents who select the benchmark checkbox have the six comparable metrics saved for future aggregate reporting.
