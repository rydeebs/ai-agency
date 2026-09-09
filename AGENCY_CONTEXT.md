# NewRevGen — Agency Context

This file is the durable business context for NewRevGen. AI coding agents should read it before making product, automation, copy, or outreach decisions. It is intentionally separate from technical instructions in `AGENTS.md`.

## Who we are

NewRevGen is an AI automation agency founded by Ryan DeBerardinis. We help companies improve business operations by finding repetitive, manual, slow, or error-prone workflows and applying practical AI, automation, and system integrations.

We are operators and problem-solvers first. We do not sell AI as a novelty or replace people indiscriminately. We identify measurable operational improvements—faster response times, fewer handoffs, better data quality, lower administrative load, and more consistent execution—and build the workflow around the client’s existing business.

## Mission

Help businesses create more revenue and operational capacity by turning useful AI capabilities into reliable day-to-day systems.

## Ideal customer profile (ICP)

### Primary ICP: operationally intensive service businesses

Small and mid-sized companies where work is coordinated through email, phone calls, spreadsheets, dispatch systems, shared inboxes, and tribal knowledge.

Examples include:

- Propane, fuel, gas, and energy suppliers
- HVAC, heating, plumbing, electrical, and mechanical contractors
- Septic, drainage, excavation, well drilling, and water-treatment companies
- Construction, remodeling, roofing, insulation, and property-maintenance companies
- Waste management, restoration, pressure washing, moving, delivery, and logistics companies
- Equipment repair, automotive, appliance, welding, and other field-service businesses

Common characteristics:

- A meaningful volume of inbound calls, emails, quotes, work orders, or follow-ups
- Repetitive administrative work that competes with revenue-producing work
- Multiple people or systems involved in scheduling, estimating, service delivery, and billing
- Valuable operational knowledge that is not consistently documented or searchable
- An owner or operations leader who can approve and implement improvements

### Secondary ICP: growing brands and operational teams

Consumer packaged goods (CPG) brands, distributors, manufacturers, and other growing companies that need help with customer operations, sales operations, support, research, reporting, or internal workflows.

### Secondary ICP: companies preparing for a sale or acquisition

Businesses that need cleaner data, documented processes, reporting, and more repeatable operations before a transaction or due-diligence process. The focus is operational readiness and value creation, not financial or legal advice.

## Best-fit problems

NewRevGen is a strong fit when a company has one or more of these problems:

- Leads or customer requests are missed, delayed, or inconsistently routed
- Quotes, estimates, proposals, or follow-ups are created manually
- Staff repeatedly copy information between email, spreadsheets, CRM, and accounting tools
- Managers lack a reliable view of pipeline, work status, or customer history
- Customer or vendor emails require repetitive classification and responses
- Research, data enrichment, reporting, or list maintenance consumes significant time
- Processes depend on one employee’s memory instead of a documented workflow
- The company wants automation but needs a practical, controlled implementation

## What we offer

- Workflow discovery and operational audits
- AI-assisted CRM and data systems
- Lead, contact, and account research/enrichment
- Email and inbox automation with human approval and safety limits
- Quote, proposal, intake, routing, and follow-up workflows
- Internal knowledge search and AI assistants grounded in company information
- Reporting, dashboards, alerts, and operational metrics
- Integrations between email, CRM, spreadsheets, calendars, accounting, and other systems
- Ongoing optimization based on measurable outcomes

## Positioning principles

- Lead with the business outcome and workflow, not the model name.
- Be specific about the manual work being removed or improved.
- Use the client’s industry and actual operating context in recommendations.
- Start with a narrow, measurable workflow and expand after it proves useful.
- Keep a human approval step for consequential actions such as sending campaigns, changing customer records, or deleting data.
- Prefer reliable, observable, reversible automations over impressive but fragile demos.
- Never invent company facts, customer results, testimonials, or performance claims.

## Outreach context

Outbound messages should be personalized using the contact’s role, company industry, segment, public website information, and a plausible operational challenge. The tone should be concise, conversational, specific, and low-pressure. Avoid generic AI hype, exaggerated savings, and claims that cannot be verified.

The sender identity is Ryan, Founder, NewRevGen, using `team@newrevgen.com`. The connected Gmail account is the source of truth for the email signature; agents should not hard-code a signature into generated copy.

## Agent instructions

When building a NewRevGen feature or client-facing workflow:

1. Identify which ICP and operational problem it serves.
2. State the expected business outcome and how it will be measured.
3. Preserve data quality, privacy, auditability, and an approval path for high-impact actions.
4. Keep provider-specific integrations replaceable where practical.
5. Treat imported customer/contact data as sensitive; never commit it, credentials, or production payloads to the repository.
6. If a request conflicts with this context, technical instructions, or client safety, surface the conflict before implementing it.

This document is a starting point, not a substitute for discovery with a specific client. Update it as NewRevGen’s market, offers, or positioning become more precise.
