import type { LandingContent } from "@/components/landing/types";
import { ai101Content } from "@/content/landing/101";
import { firmsContent } from "@/content/landing/firms";
import { operationsContent } from "@/content/landing/operations";
import {
  assessmentTools,
  getAssessmentTool,
} from "@/lib/lead-tools/catalog";

const siteUrl = "https://newrevgen.com";

const homeMarkdown = `# NewRevGen

> Practical AI systems and workflow automation for growing businesses.

NewRevGen designs, deploys, and manages AI systems that connect existing tools, automate repetitive work, and improve how a business sells, serves customers, and operates.

## When NewRevGen is a good fit

- Leads or customer requests are missed, delayed, or routed inconsistently.
- Quotes, estimates, proposals, or follow-ups are assembled manually.
- Staff repeatedly copy information between email, spreadsheets, CRM, accounting, and field-service systems.
- Managers lack a reliable view of pipeline, work status, or customer history.
- Important operational knowledge lives in one person's memory instead of a documented workflow.
- A team wants a narrow, measurable automation with human approval for consequential actions.

## Capabilities

- Workflow discovery and operational audits
- AI-assisted CRM and data systems
- Lead, contact, and account research and enrichment
- Inbox, intake, routing, quote, proposal, and follow-up automation
- Internal knowledge search and grounded AI assistants
- Reporting, dashboards, alerts, and operational metrics
- Integrations across email, CRM, spreadsheets, calendars, accounting, and other systems

## How engagements work

NewRevGen starts with a measurable workflow, builds around the client's current operating context, keeps high-impact actions reviewable, and monitors the system after launch. The goal is reliable day-to-day capacity: faster response, fewer handoffs, better data quality, and more consistent execution.

## Contact

Email [team@newrevgen.com](mailto:team@newrevgen.com), [book a call](https://calendar.app.google/fvAx1yvcih4jMp346), or review the [contact page](${siteUrl}/contact).

## Site index

- [About NewRevGen](${siteUrl}/about)
- [Free assessments and calculators](${siteUrl}/tools)
- [Privacy policy](${siteUrl}/privacy)
- [Terms of use](${siteUrl}/terms)
- [Sitemap](${siteUrl}/sitemap.xml)
- [Agent guidance](${siteUrl}/llms.txt)
`;

const aboutMarkdown = `# About NewRevGen

> NewRevGen is an AI automation agency that turns useful AI capabilities into reliable day-to-day business systems.

NewRevGen works with operationally intensive service businesses and growing teams whose work is coordinated through calls, email, forms, spreadsheets, CRMs, dispatch systems, accounting tools, and institutional knowledge. The team looks for repetitive, manual, slow, or error-prone workflows and improves them with practical automation and system integration.

## Approach

The work starts with the business outcome and the workflow, not a model name. NewRevGen prefers a narrow, measurable starting point, builds around the client's existing systems, and expands only after the first workflow proves useful. Consequential actions such as sending campaigns, changing customer records, or deleting data retain a human approval step.

## Best-fit organizations

Primary clients include contractors, field-service businesses, energy and fuel suppliers, construction companies, logistics operators, repair businesses, and other owner-led or operationally intensive service companies. NewRevGen also supports growing consumer brands, distributors, manufacturers, professional teams, and companies improving process documentation and data quality before a sale or acquisition.

## Leadership and contact

NewRevGen was founded by Ryan DeBerardinis and is built around an operator-led approach. For a practical conversation about a workflow, email [team@newrevgen.com](mailto:team@newrevgen.com) or visit the [contact page](${siteUrl}/contact).
`;

const contactMarkdown = `# Contact NewRevGen

> Contact NewRevGen about workflow discovery, AI automation, systems integration, or a focused operational assessment.

The best first step is a short description of the business, the workflow that is slow or unreliable, the systems involved, and the outcome you want to improve. Do not send credentials, customer exports, production payloads, transcripts, or other sensitive information in an initial message.

## Email

Email [team@newrevgen.com](mailto:team@newrevgen.com) for general, sales, support, privacy, or partnership questions. NewRevGen aims to respond within one business day.

## Schedule a conversation

[Book a call](https://calendar.app.google/fvAx1yvcih4jMp346) to discuss a workflow directly. A useful discovery conversation covers the current process, failure points, systems of record, approval requirements, and a measurable definition of success.

## What happens next

NewRevGen will determine whether the problem is a good fit, identify a small and testable first workflow, and explain the information or access needed for discovery. High-impact changes require human approval, and any later exchange of sensitive data should use an agreed secure channel rather than ordinary website forms.
`;

const privacyMarkdown = `# NewRevGen Privacy Policy

> This policy explains what NewRevGen collects through its website, why it is collected, and the choices available to visitors.

NewRevGen collects information a visitor chooses to provide, such as work email, company name, website URL, assessment answers, form messages, and benchmark consent. Basic technical and security signals may also be processed. Information is used to deliver requested results, respond to inquiries, operate and secure the service, and improve NewRevGen's tools.

Benchmark information is included only with affirmative consent and is de-identified and reported in aggregate. NewRevGen does not sell personal information. Service providers receive information only as needed to operate hosting, CRM, email, security, or analytics services.

Visitors may ask to access, correct, or delete information associated with a submission, or opt out of non-transactional communications, subject to legitimate security and legal retention needs. For privacy questions or requests, email [team@newrevgen.com](mailto:team@newrevgen.com).

Read the [complete HTML privacy policy](${siteUrl}/privacy).
`;

const termsMarkdown = `# NewRevGen Terms of Use

> These terms govern use of the NewRevGen website, assessments, calculators, and automated public-page assessment.

Website scores, maturity bands, findings, and modeled opportunity ranges are directional educational estimates, not guarantees or financial, legal, tax, accounting, or investment advice. A visitor may submit only a public business webpage they are authorized to evaluate and may not use the assessment to probe private networks, bypass controls, overload systems, or inspect content unlawfully.

Users may not submit unlawful or deceptive information, introduce malicious code, automate excessive requests, interfere with the service, impersonate another party, or defeat security and rate limits. The website and free tools are provided as-is to the extent permitted by law.

Questions about the terms may be sent to [team@newrevgen.com](mailto:team@newrevgen.com). Read the [complete HTML terms](${siteUrl}/terms).
`;

function list(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function landingPageMarkdown(content: LandingContent): string {
  const heading = [...content.hero.headlineLines, content.hero.highlightLine].join(
    " ",
  );
  const faq = content.faq.items
    .map(({ q, a }) => `### ${q}\n\n${a}`)
    .join("\n\n");

  return `# ${heading}

> ${content.meta.description}

${content.hero.subheadline}

## What NewRevGen can improve

${list(content.whatWeDo.services)}

## Why this approach

${content.stickyCards.description}

${content.stickyCards.cards
  .map((card) => `### ${card.heading}\n\n${card.text}`)
  .join("\n\n")}

## Engagement

### ${content.pricing.mainCard.title}

${content.pricing.mainCard.description}

Included:

${list(content.pricing.includedCard.items)}

### ${content.pricing.quickStartCard.title}

${content.pricing.quickStartCard.description}

## Frequently asked questions

${faq}

## Next step

${content.cta.description} [Contact NewRevGen](${siteUrl}/contact).
`;
}

function toolsMarkdown(): string {
  const tools = assessmentTools
    .map(
      (tool) =>
        `- [${tool.title}](${siteUrl}/tools/${tool.slug}): ${tool.description}`,
    )
    .join("\n");

  return `# Free NewRevGen assessments and calculators

> Directional tools for finding revenue leaks, operational opportunities, owner dependence, and digital conversion gaps.

Use these tools to identify a measurable place to start. Results depend on the information supplied and are not promises of revenue or business performance.

## Assessments

${tools}

- [Three-Point Website Revenue-Funnel Assessment](${siteUrl}/tools/website-revenue-audit): Check a public page for lead-capture and conversion signals.
`;
}

function assessmentMarkdown(slug: string): string | undefined {
  if (slug === "website-revenue-audit") {
    return `# Three-Point Website Revenue-Funnel Assessment

> Check one public business page for practical lead-capture signals and receive three priority findings.

The assessment reviews mobile contact paths, after-hours inquiry capture, form expectations, trackability, and whether the page gives a visitor a clear next action. It accepts public HTTP or HTTPS pages only, blocks private-network addresses, limits repeated requests, and does not replace a complete accessibility, analytics, security, SEO, privacy, or conversion review.

[Open the assessment](${siteUrl}/tools/website-revenue-audit) or [contact NewRevGen](${siteUrl}/contact).
`;
  }

  const tool = getAssessmentTool(slug);
  if (!tool) return undefined;

  return `# ${tool.title}

> ${tool.description}

Estimated completion time: ${tool.timeEstimate}.

## What the assessment asks

${list(tool.questions.map((question) => question.label))}

Results are directional and based on the answers supplied. They are intended to identify a practical next workflow, not guarantee revenue, savings, valuation, or performance.

[Open the interactive assessment](${siteUrl}/tools/${tool.slug}) or [contact NewRevGen](${siteUrl}/contact).
`;
}

const staticPages = new Map<string, string>([
  ["/", homeMarkdown],
  ["/about", aboutMarkdown],
  ["/contact", contactMarkdown],
  ["/privacy", privacyMarkdown],
  ["/terms", termsMarkdown],
  ["/operations", landingPageMarkdown(operationsContent)],
  ["/firms", landingPageMarkdown(firmsContent)],
  ["/101", landingPageMarkdown(ai101Content)],
  ["/tools", toolsMarkdown()],
]);

export const markdownNotFound = `# 404 — Page not found

The requested path does not exist on NewRevGen.

- [Homepage](${siteUrl}/)
- [Site map](${siteUrl}/sitemap.xml)
- [Agent guidance](${siteUrl}/llms.txt)
- [About NewRevGen](${siteUrl}/about)
- [Contact NewRevGen](${siteUrl}/contact)
`;

export function getMarkdownPage(pathname: string): string | undefined {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const staticPage = staticPages.get(normalized);
  if (staticPage) return staticPage;

  const toolMatch = normalized.match(/^\/tools\/([^/]+)$/);
  return toolMatch ? assessmentMarkdown(toolMatch[1]) : undefined;
}
