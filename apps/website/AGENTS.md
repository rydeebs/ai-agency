<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes—APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NewRevGen website

## Stack

- Next.js 16 App Router and React 19
- Strict TypeScript
- Tailwind CSS 4 and shadcn/ui conventions
- Vercel-compatible deployment

## Conventions

- Use named exports for components, PascalCase component names, and camelCase utilities.
- Keep responsive behavior mobile-first.
- Preserve the established typography, spacing, and color system unless the task requests a redesign.
- Keep vertical-specific copy in `src/content/landing` and reusable rendering in `src/components/landing`.
- Do not put CRM, database, or automation-worker logic in this app; use the appropriate monorepo boundary.
- Lead submission code must validate inputs and avoid logging sensitive payloads before it is connected to production storage.

## Commands

Run from the monorepo root:

```bash
npm run dev:website
npm run lint --workspace=@newrevgen/website
npm run typecheck --workspace=@newrevgen/website
npm run build --workspace=@newrevgen/website
```
