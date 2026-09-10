import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

const bookingUrl = "https://calendar.app.google/fvAx1yvcih4jMp346";

export const metadata: Metadata = {
  title: "Contact NewRevGen | Discuss an AI Workflow",
  description:
    "Contact NewRevGen about workflow discovery, AI automation, systems integration, or a focused operational assessment.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact NewRevGen",
    description:
      "Describe the workflow, systems, and business outcome you want to improve.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Contact"
      title="Tell us where the work gets stuck."
      introduction="Start with the workflow, the systems involved, and the outcome you want to improve. We will help determine whether there is a practical place to begin."
      lastUpdated={null}
    >
      <h2>Email NewRevGen</h2>
      <p>
        Send general, sales, support, privacy, or partnership questions to{" "}
        <a href="mailto:team@newrevgen.com">team@newrevgen.com</a>. A useful
        first message includes your company type, the process that is slow or
        unreliable, the software involved, and what a better result would look
        like. We aim to respond within one business day.
      </p>

      <h2>Book a conversation</h2>
      <p>
        If it is easier to talk through the process, you can{" "}
        <a href={bookingUrl}>book a call</a>. A discovery conversation usually
        covers the current workflow, handoffs and failure points, systems of
        record, approval requirements, and a measurable definition of success.
        We will be direct if the problem is not a good fit for automation.
      </p>

      <h2>What to expect</h2>
      <p>
        We begin by identifying a small, testable workflow rather than proposing
        a broad transformation. If there is a fit, we explain the information
        and access needed for discovery, the safeguards around consequential
        actions, and how the result can be measured. Implementation work is
        scoped around the client&apos;s current operating context and systems.
      </p>

      <h2>Protect sensitive information</h2>
      <p>
        Do not send passwords, API keys, customer exports, production payloads,
        transcripts, regulated records, or other sensitive information in an
        initial email or website form. If discovery requires confidential data,
        we will agree on an appropriate secure channel and access boundary
        before it is shared. Read our <Link href="/privacy">privacy policy</Link> for
        more information about website submissions.
      </p>

      <h2>Self-service starting points</h2>
      <p>
        If you are still defining the problem, the{" "}
        <Link href="/tools">free assessment directory</Link> can help identify gaps
        in lead response, estimate follow-up, owner dependence, and website
        conversion before a conversation.
      </p>
    </LegalPage>
  );
}
