# Add Codex custom agents here

Each custom agent is a standalone TOML file. It must define `name`, `description`, and `developer_instructions`. It may also narrow model, reasoning, sandbox, MCP, or skill settings.

Prefer small, opinionated roles such as `workflow-reviewer.toml`, `integration-researcher.toml`, or `security-reviewer.toml`. Do not put secrets in agent configuration.
