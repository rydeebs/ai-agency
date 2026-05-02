import type { LandingContent } from "@/components/landing/types";

export const accountingFinanceContent: LandingContent = {
  vertical: "accounting-finance",
  meta: {
    title: "AI for Accounting & Finance Firms | NewRevGen",
    description:
      "Adopt AI inside your existing practice — without replatforming. We embed with accounting and finance firms to free billable hours, lift margin, and modernize legacy workflows.",
    canonical: "https://newrevegen.com/accounting-finance",
    ogTitle: "AI for Firms Still Running on Legacy Workflows",
    ogDescription:
      "Reconciliation, close, audit prep, advisory deliverables — automated inside the systems you already use. Built for firms, by people who've worked inside them.",
  },
  hero: {
    headlineLines: ["AI for firms", "still running on"],
    highlightLine: "legacy workflows.",
    subheadline:
      "We embed inside accounting and finance practices — not as outside consultants — to automate the manual work eating your margin. No replatforming. No risky data exposure. Just hours back and engagements that scale.",
    primaryCta: { label: "Book a discovery call ↗", href: "#contact" },
    secondaryCta: { label: "See how it fits your firm", href: "#why-us" },
    features: [
      "Close process automation",
      "Reconciliation acceleration",
      "Audit prep workflows",
      "Advisory deliverable templates",
    ],
    stats: [
      { number: "30%+", label: "billable hours recovered" },
      { number: "2x", label: "engagements per partner" },
      { number: "8 Weeks", label: "to first ROI" },
    ],
  },
  statement: {
    line1: "Manual work is eating your margin.",
    line2: "AI fixes that — without rebuilding your stack.",
    line2Color: "#8D96FD",
  },
  whatWeDo: {
    eyebrow: "WHERE WE PLUG IN",
    headline: "We work inside your practice —",
    highlight: "not on top of it.",
    services: [
      "Bank rec & GL automation",
      "Month-end close acceleration",
      "Audit PBC list intelligence",
      "Workpaper review automation",
      "Advisory report generation",
      "Tax prep document intake",
      "Engagement letter automation",
      "KYC & client onboarding",
    ],
    videoSrc: "/videos/how-we-work.mp4",
  },
  stickyCards: {
    eyebrow: "WHY FIRMS PARTNER WITH US",
    headline: "Built for firms,",
    highlight: "by people who've been in them.",
    description:
      "We've sat on the other side of the desk — running close, fielding audit requests, and watching juniors burn out on repetitive work. The systems we build are the ones we wish we'd had.",
    cards: [
      {
        bg: "#D8F66F",
        heading: "Free up your seniors",
        text: "Pull your top talent off the work that doesn't need them. They'll thank you, and so will your retention numbers.",
        textColor: "#17181B",
        video: "/videos/cards/kill-busywork.mp4",
      },
      {
        bg: "#FF7D84",
        heading: "Better margin per engagement",
        text: "Same fee, less labor. The math on AI inside a firm is straightforward — and it compounds with every client added.",
        textColor: "#17181B",
        video: "/videos/cards/better-margins.mp4",
      },
      {
        bg: "#FFE176",
        heading: "Domain credibility",
        text: "We speak GAAP, SOX, and partner-track. No translation layer between us and your team.",
        textColor: "#17181B",
        video: "/videos/cards/embedded.mp4",
      },
      {
        bg: "#8D96FD",
        heading: "Data-handling done right",
        text: "Private models, controlled environments, audit trails. We treat your client data the way the AICPA expects.",
        textColor: "#17181B",
        video: "/videos/cards/train-own.mp4",
      },
      {
        bg: "#D8F66F",
        heading: "Built for the platforms you use",
        text: "QuickBooks, Xero, NetSuite, CCH, Caseware — we integrate where you already work, not where we wish you worked.",
        textColor: "#17181B",
        video: "/videos/cards/built-evolve.mp4",
      },
    ],
  },
  ticker: {
    strip1: [
      "Close acceleration",
      "Bank rec",
      "Audit PBC",
      "Workpaper review",
      "Advisory deliverables",
      "Tax prep intake",
      "KYC automation",
      "Variance analysis",
      "Cash flow forecasting",
      "Client comms",
      "Engagement letters",
    ],
    strip2: [
      "Tax practices",
      "Audit firms",
      "Outsourced CFO",
      "Wealth management",
      "Boutique advisory",
      "Mid-market firms",
      "Multi-office practices",
      "Fund accounting",
      "Family offices",
      "Bookkeeping firms",
      "PE-backed rollups",
    ],
  },
  pricing: {
    eyebrow: "ENGAGEMENT MODELS",
    headline: "Designed to fit",
    highlight: "how firms actually buy.",
    featureTags: [
      "Embedded delivery",
      "Fixed-fee scopes",
      "Partner-led",
      "Confidentiality-first",
      "ROI-tied milestones",
    ],
    mainCard: {
      title: "Full Practice Engagement",
      description:
        "We embed for 12 weeks. Audit your highest-leakage workflows, build the automations, train your team, and document everything — so the gains stay after we leave.",
      price: "Custom Scope",
      priceCaption: "Priced per workflow + headcount",
      ctaLabel: "Book a discovery call ↗",
    },
    includedCard: {
      label: "WHAT'S INCLUDED",
      items: [
        "Workflow audit across the practice",
        "Custom automations on your stack",
        "Hands-on training for your seniors",
        "Documented playbooks for every build",
      ],
    },
    quickStartCard: {
      title: "Pilot Sprint",
      description:
        "Not ready for a full engagement? We'll automate a single high-leverage workflow in 2 weeks so you can prove ROI to your partners.",
      ctaLabel: "Scope a pilot",
    },
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Questions firms ask us first.",
    helperText: "Have a question we didn't cover?",
    helperLinkLabel: "Talk to a partner ↗",
    items: [
      {
        q: "How do you handle client data and confidentiality?",
        a: "We work inside your environment — your tooling, your controls, your data. We don't pull client data out to public models. For sensitive workflows we use private deployments with full audit trails. We sign your standard NDAs and BAAs.",
      },
      {
        q: "Will this disrupt our busy season?",
        a: "We're built around your calendar. Most firms onboard in Q3/Q4 to capture wins before tax season, or in May–June after busy season ends. We never start a deployment in the middle of close.",
      },
      {
        q: "Do we need to switch software?",
        a: "No. We integrate with what you already run — QuickBooks, Xero, NetSuite, CCH, Caseware, GoSystem, UltraTax, and the Microsoft and Google stacks. If you're stuck on a legacy on-prem system, we work with that too.",
      },
      {
        q: "What kind of ROI should we expect?",
        a: "Firms typically recover 25–40% of staff hours on the workflows we touch within the first 90 days. That translates to either margin lift or capacity to take on new clients without hiring. We tie milestones to measurable outcomes.",
      },
      {
        q: "What does the engagement look like week-to-week?",
        a: "Weekly working sessions with the partner sponsor and the team running the workflow. We're in your Slack/Teams, not on a quarterly check-in cadence. Expect to see live builds within the first 3 weeks.",
      },
    ],
  },
  cta: {
    headlineLine1: "Stop billing hours that",
    headlineLine2: "shouldn't exist.",
    description:
      "Book a 30-minute discovery call. We'll walk through one of your highest-leakage workflows and show you exactly what's automatable.",
    ctaLabel: "Book a discovery call",
  },
  leadForm: {
    eyebrow: "GET A DISCOVERY CALL",
    headline: "See how it fits your firm.",
    description:
      "Tell us about your practice and where the manual work is heaviest. We'll come prepared with a concrete plan for your first automation.",
    submitLabel: "Request a call ↗",
    successMessage:
      "Thanks — a partner will reach out within one business day to schedule your discovery call.",
  },
};
