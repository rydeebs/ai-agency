# Architecture overview

## Boundaries

- The website acquires leads and presents public content.
- The CRM is the internal system of record for sales and delivery work.
- The automation worker executes long-running, scheduled, queued, or webhook-driven work.
- Shared packages provide stable contracts and infrastructure without owning deployments.

## Expected lead flow

```text
Website form
    -> validated lead command
    -> shared database
    -> CRM pipeline
    -> notification/follow-up job
    -> audit event and outcome metrics
```

## Design principles

1. Build multi-tenant boundaries early; never rely on a client-name folder for isolation.
2. Keep client credentials in a secrets manager and store only references in application data.
3. Separate a workflow's business intent from vendor-specific integration code.
4. Make every external action observable and safe to retry.
5. Put humans in the loop for irreversible or reputationally sensitive actions.
6. Start as a modular monolith plus worker; split services only when operational evidence justifies it.

## Adding a feature

Place a feature in the app that owns the user experience. Extract schemas or logic into a package only when another app consumes it. Record decisions with lasting architectural impact in `docs/decisions`.
