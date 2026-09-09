# Automation worker

This directory is reserved for background and event-driven execution that should not run inside the website or CRM web process.

Expected responsibilities include scheduled jobs, webhook handling, queued workflows, retries, approval checkpoints, and integration synchronization. Every workflow should have:

- A stable workflow and run identifier
- Validated input and output
- Idempotency protection
- Timeouts and bounded retries
- Structured logs and audit events
- A dead-letter or manual-recovery path
- Tenant/client isolation

Keep reusable orchestration primitives in `packages/automation-core`; keep vendor adapters in `packages/integrations`.
