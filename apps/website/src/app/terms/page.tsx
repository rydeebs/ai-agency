import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | NewRevGen",
  description: "Terms governing use of the NewRevGen website and revenue operations tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      introduction="These terms govern your use of the NewRevGen website, assessments, calculators, and automated public-page assessment."
    >
      <h2>Acceptance and eligibility</h2>
      <p>By using this website or submitting information, you agree to these terms. You must have authority to submit information on behalf of the business identified in a submission.</p>

      <h2>Directional tools, not guarantees</h2>
      <p>Scores, maturity bands, findings, and revenue-opportunity ranges are educational, directional estimates based on the inputs provided and stated modeling assumptions. They are not guarantees of revenue, recovery, valuation, business performance, or return on investment, and they are not financial, legal, tax, accounting, or investment advice.</p>

      <h2>Public website assessment</h2>
      <p>You may submit only a publicly accessible business webpage that you are authorized to evaluate. The automated assessment reviews limited public page signals and is not a complete accessibility, analytics, security, SEO, privacy, or conversion review. You may not use the assessment to probe private networks, bypass access controls, overload systems, or inspect content unlawfully.</p>

      <h2>Acceptable use</h2>
      <p>You may not misuse the service, submit unlawful or deceptive information, introduce malicious code, automate excessive requests, interfere with service operation, impersonate another person or company, or attempt to defeat security and rate limits.</p>

      <h2>Intellectual property</h2>
      <p>NewRevGen owns the website, tool design, scoring frameworks, copy, and related materials except for third-party content and your submitted information. We grant you a limited, revocable right to use the tools and your delivered results for internal business purposes.</p>

      <h2>Availability and changes</h2>
      <p>We may modify, suspend, or discontinue a tool and may update these terms. We do not promise uninterrupted or error-free availability. Material changes will be reflected by an updated date on this page.</p>

      <h2>Disclaimer and limitation</h2>
      <p>The website and tools are provided “as is” to the extent permitted by law. NewRevGen disclaims implied warranties and is not liable for indirect, incidental, special, consequential, or lost-profit damages arising from use of the free tools. Any liability that cannot be excluded is limited to the amount you paid to use the applicable free tool, which is zero.</p>

      <h2>Contact</h2>
      <p>Questions about these terms may be sent to <a href="mailto:team@newrevgen.com">team@newrevgen.com</a>.</p>
    </LegalPage>
  );
}
