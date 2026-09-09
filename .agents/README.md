# Codex repository skills

Codex discovers repository-scoped skills under `.agents/skills`. Each skill is a directory containing a required `SKILL.md` and optional `scripts`, `references`, and `assets`.

Use this root location for workflows that apply across the NewRevGen monorepo. Put app-specific Codex skills in that app's own `.agents/skills` directory and launch Codex from that app when you want the narrower skill scope.

The `.agents` name refers to the open agent-skills discovery location; Codex custom subagent definitions belong in `.codex/agents`.
