import type { QuestionAnswer, RelatedLink } from "@/components/landing/types";

export interface ToolGuide {
  heading: string;
  paragraphs: string[];
  inputs: string[];
  faq: QuestionAnswer[];
  related: RelatedLink[];
}

const contractorsLink: RelatedLink = {
  href: "/operations",
  label: "Contractors and service businesses",
  description: "Missed-call, lead response, and estimate systems for HVAC, plumbing, electrical, and other trades.",
};

const roofingHubLink: RelatedLink = {
  href: "/roofing",
  label: "Roofing companies",
  description: "Every NewRevGen page for owner-led roofing contractors.",
};

const toolGuides: Record<string, ToolGuide> = {
  "missed-call-calculator": {
    heading: "How the missed-call calculator works",
    paragraphs: [
      "This calculator models a range of revenue that may be exposed when qualified calls go unanswered. It is built for contractors and service businesses that book work by phone, including roofing, HVAC, plumbing, electrical, and remodeling companies.",
      "It multiplies your monthly call volume by the share of calls you miss, keeps only the calls that are real sales opportunities, applies your normal booking rate, and values the result with your average job value and gross margin range. The output is a directional range based only on the numbers you enter. It is not a promise of recovered revenue.",
      "If the range is meaningful, the usual first fix is missed-call text-back: an automatic text to every caller you could not answer, with a callback assigned to a specific person on your team.",
    ],
    inputs: [
      "Inbound calls per month",
      "Share of calls that are missed",
      "Share of calls that are genuine sales opportunities",
      "Share of qualified calls that normally become booked jobs",
      "Average booked-job value",
      "Typical gross margin range",
    ],
    faq: [
      {
        q: "Where do I find my missed-call numbers?",
        a: "Your phone system or call-tracking tool usually has a call log that shows answered and unanswered calls. If you do not have one, count missed calls and voicemails for a typical week and scale it to a month.",
      },
      {
        q: "Why does the calculator ask how many calls are sales opportunities?",
        a: "Not every call is a new customer. Vendors, existing customers, and spam are part of the total. Counting only real opportunities keeps the estimate conservative.",
      },
      {
        q: "What can I do about missed calls?",
        a: "Start with missed-call text-back: an automatic text to anyone you could not answer, a few questions to capture the job details, and a callback assigned to someone on your team. An AI receptionist can be added later to answer after-hours calls live.",
      },
      {
        q: "Is this calculator only for roofing companies?",
        a: "No. It works for any business that books work from phone calls. Roofing companies can read our page on missed-call recovery for roofers for a roofing-specific walkthrough.",
      },
    ],
    related: [
      {
        href: "/roofing/missed-call-recovery",
        label: "Missed-call recovery for roofers",
        description: "What to do when you miss a homeowner's call and how to set up text-back.",
      },
      {
        href: "/roofing/storm-lead-response",
        label: "Storm lead response for roofers",
        description: "Handling the surge of calls after hail or wind damage.",
      },
      roofingHubLink,
      contractorsLink,
    ],
  },
  "estimate-follow-up-gap": {
    heading: "How the estimate follow-up gap check works",
    paragraphs: [
      "This check looks at the estimates you have already sent and how consistently they are followed up. It is built for contractors and service businesses that sell from estimates, including roofing, HVAC, plumbing, electrical, and remodeling companies.",
      "It combines how many estimates you issue, their average value, your current close rate, and how many open estimates are aging without a decision. It then scores your follow-up habits: how many proactive follow-ups each estimate gets and whether every open estimate has an owner and a dated next step. The result is a directional view of the value sitting in open estimates. It is not a promise of closed work.",
      "The usual fix is a simple, consistent process: clear estimate stages in your CRM, follow-up on a schedule you approve, alerts when a customer replies, and a record of why jobs were lost.",
    ],
    inputs: [
      "Estimates issued in a typical month",
      "Average estimate value",
      "Current estimate close rate",
      "Open estimates by age",
      "Proactive follow-ups per estimate",
      "Whether every open estimate has an owner and a dated next action",
    ],
    faq: [
      {
        q: "What counts as an open estimate?",
        a: "Any estimate you have sent that has not been signed or clearly declined.",
      },
      {
        q: "What does a good estimate follow-up process look like?",
        a: "Every open estimate has an owner, a next step, and a scheduled follow-up, and the outcome is recorded whether the customer says yes or no.",
      },
      {
        q: "Can estimate follow-up be automated?",
        a: "Yes. Routine follow-up texts and emails can go out on a schedule you approve, with alerts to your team when a customer replies and stop rules for anyone who asks to stop.",
      },
      {
        q: "Is this check only for roofing companies?",
        a: "No. It works for any business that sells from estimates. Roofing companies can read our page on estimate follow-up for roofers for a roofing-specific walkthrough.",
      },
    ],
    related: [
      {
        href: "/roofing/estimate-follow-up",
        label: "Estimate follow-up for roofers",
        description: "How to follow up on roofing estimates that did not close.",
      },
      {
        href: "/roofing/ai-for-roofing-contractors",
        label: "AI for roofing contractors",
        description: "How AI answers calls, replies to leads, and keeps estimates moving.",
      },
      roofingHubLink,
      contractorsLink,
    ],
  },
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return toolGuides[slug];
}
