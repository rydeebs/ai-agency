# Applications

Each directory here represents a separately deployable application or long-running service.

- `website` is the public marketing and lead-generation site.
- `crm` will manage prospects, companies, contacts, engagements, tasks, and automation opportunities.
- `automation-worker` will execute scheduled and asynchronous client workflows outside request/response web processes.

Do not create a new app for every feature. Add an app only when it needs an independent deployment lifecycle, security boundary, runtime, or scaling model.
