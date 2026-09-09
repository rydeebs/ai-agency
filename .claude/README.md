# Claude Code project configuration

- Put reusable Claude skills in `skills/<skill-name>/SKILL.md`.
- Put custom Claude subagent definitions in `agents/<agent-name>.md`.
- Add shared project settings in `settings.json` only when needed; keep machine-specific permissions in the ignored `settings.local.json`.

These root locations are for agency-wide workflows. Website-only Claude configuration remains under `apps/website/.claude`.
