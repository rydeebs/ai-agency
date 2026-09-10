import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About NewRevGen | Practical AI Automation",
  description:
    "Learn how NewRevGen turns repetitive, manual business workflows into reliable AI-assisted systems with measurable outcomes and human oversight.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NewRevGen",
    description:
      "Operators and builders creating practical AI systems around the way a business already works.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About NewRevGen"
      title="Operators building useful systems."
      introduction="NewRevGen is an AI automation agency focused on the operational work that sits between a business goal and consistent execution."
      lastUpdated={null}
    >
      <h2>What we do</h2>
      <p>
        NewRevGen helps companies improve business operations by finding work
        that is repetitive, manual, slow, or error-prone and applying practical
        AI, automation, and system integrations. We design around the tools and
        processes a team already uses. The goal is not novelty or indiscriminate
        replacement. It is faster response, fewer handoffs, better data quality,
        lower administrative load, and more consistent execution.
      </p>

      <h2>Who we serve</h2>
      <p>
        Our primary focus is operationally intensive service businesses:
        contractors, field-service teams, energy and fuel suppliers,
        construction companies, repair businesses, logistics operators, and
        similar companies where calls, email, estimates, dispatch systems,
        spreadsheets, and institutional knowledge must work together. We also
        support growing brands, distributors, manufacturers, professional
        teams, and businesses improving process documentation and data quality
        before a sale or acquisition.
      </p>

      <h2>How we work</h2>
      <p>
        We start with a narrow workflow and a measurable business outcome. We
        map the current process, identify failure points, build the smallest
        reliable improvement, and monitor what happens after launch. Important
        actions—such as sending campaigns, changing customer systems, moving
        money, or deleting data—keep a human approval step. We prefer observable,
        retryable, reversible systems over fragile demonstrations.
      </p>

      <h2>Leadership</h2>
      <p>
        NewRevGen was founded by Ryan DeBerardinis and is built around an
        operator-led approach. The team brings experience in growth, go-to-market,
        operations, construction, and hands-on implementation. That background
        shapes a practical approach: understand how the work moves today, make
        one part materially better, prove the result, and expand from evidence.
      </p>

      <h2>Start a conversation</h2>
      <p>
        If a workflow is costing time, delaying customers, or obscuring the
        state of the business, visit the <Link href="/contact">contact page</Link> or
        email <a href="mailto:team@newrevgen.com">team@newrevgen.com</a>.
      </p>
    </LegalPage>
  );
}
