import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | NewRevGen",
  description: "How NewRevGen collects, uses, and protects information submitted through its website and revenue operations tools.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      introduction="This policy explains what NewRevGen collects through this website, why we collect it, and the choices available to you."
    >
      <h2>Information we collect</h2>
      <p>We collect information you choose to provide, including a work email address, company name, website URL, assessment answers, form messages, and benchmark consent choices. We may also receive basic technical information such as browser type, referring page, approximate network information, timestamps, and security or rate-limit signals.</p>

      <h2>How we use information</h2>
      <p>We use submitted information to calculate and deliver requested results, respond to inquiries, maintain our customer relationship system, protect the service from abuse, improve our tools, and communicate about the assessment or NewRevGen services. We do not present modeled opportunity ranges as guaranteed outcomes.</p>

      <h2>Benchmark participation</h2>
      <p>Assessment metrics are included in a future contractor benchmark only when you affirmatively opt in. Benchmark data is de-identified and reported in aggregate. We do not publish a respondent’s email, company name, website, or individual answers as part of a benchmark.</p>

      <h2>Service providers and disclosures</h2>
      <p>We may use service providers that help operate our website, CRM, email delivery, hosting, security, and analytics. They receive information only as needed to provide those services. We may also disclose information when required by law, to protect rights or safety, or as part of a business transaction subject to appropriate safeguards. We do not sell personal information.</p>

      <h2>Retention and security</h2>
      <p>We retain information for as long as reasonably necessary to deliver the requested service, maintain business records, improve our operations, resolve disputes, and meet legal obligations. We use reasonable administrative and technical safeguards, but no internet service can guarantee absolute security.</p>

      <h2>Your choices</h2>
      <p>You may ask to access, correct, or delete information associated with your submission, or opt out of non-transactional communications. Some records may be retained where required for security, legal, or legitimate business purposes.</p>

      <h2>Third-party websites</h2>
      <p>Our tools may review a public webpage you submit or link to third-party services such as scheduling. Their privacy practices are governed by their own policies.</p>

      <h2>Contact</h2>
      <p>For privacy questions or requests, email <a href="mailto:team@newrevgen.com">team@newrevgen.com</a>.</p>
    </LegalPage>
  );
}
