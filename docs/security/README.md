# Security baseline

Before connecting a client system:

1. Classify the data the workflow will touch.
2. Request the minimum permissions required.
3. Store credentials in an approved secrets manager.
4. Document data sent to model and integration providers.
5. Define retention, deletion, and incident-response expectations.
6. Add audit logging and redaction tests.
7. Confirm the workflow's approval and rollback paths.

Never use real client data in fixtures, screenshots, prompts, demos, or source control. Prefer synthetic fixtures and redact logs at ingestion.
