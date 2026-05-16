import type { LandingContent } from "@/components/landing/types";

export const operationsContent: LandingContent = {
  vertical: "operations",
  meta: {
    title: "AI Revenue Systems for Contractors & Service Businesses | NewRevGen",
    description:
      "Recover missed calls, follow up on estimates, book more jobs, and cut wasted software spend with AI systems built for contractors and service businesses.",
    canonical: "https://newrevegen.com/operations",
    ogTitle: "Stop Losing Jobs After the Lead Comes In.",
    ogDescription:
      "AI revenue systems built around how contractors actually operate: calls, estimates, dispatch, crews, reviews, and follow-up.",
  },
  hero: {
    headlineLines: ["More booked", "jobs for"],
    highlightLine: "contractors.",
    headlineMaxWidth: "820px",
    headlineFontSize: "clamp(36px, 7vw, 76px)",
    subheadline:
      "We build and implement practical AI systems for construction and service industry companies that miss calls, lose estimates, and waste money on tools that do not talk to each other.",
    primaryCta: { label: "Get a free revenue leak audit ↗", href: "#contact" },
    secondaryCta: { label: "Book a 20-min call", href: "#contact" },
    features: [
      "Missed-call text-back",
      "Estimate follow-up automation",
      "AI receptionist and lead routing",
      "Tool cleanup and owner dashboards",
    ],
    stats: [
      { number: "24/7", label: "lead capture and follow-up" },
      { number: "30 Days", label: "to first booked-job wins" },
      { number: "1 Stack", label: "cleaner tools and reporting" },
    ],
  },
  statement: {
    line1: "You already paid for the lead.",
    line2: "AI helps turn it into booked work.",
    line2Color: "#8D96FD",
  },
  whatWeDo: {
    eyebrow: "WHERE WE FIX THE LEAKS",
    headline: "Built around how contractors",
    highlight: "actually sell jobs.",
    services: [
      "Missed-call text-back",
      "AI receptionist setup",
      "Instant lead response",
      "Dormant quote reactivation",
      "Estimate follow-up automation",
      "Review request workflows",
      "CRM cleanup & enrichment",
      "Tool consolidation",
      "Owner dashboards that matter",
    ],
    videoSrc: "/videos/how-we-work.mp4",
  },
  stickyCards: {
    eyebrow: "WHY CONTRACTORS CHOOSE US",
    headline: "More booked work,",
    highlight: "less office drag.",
    description:
      "Most agencies tell you to buy more leads. We fix what happens after the lead comes in: response time, follow-up, CRM hygiene, reviews, and the software mess slowing your office down.",
    cards: [
      {
        bg: "#D8F66F",
        heading: "Answer every lead",
        text: "Calls, forms, and texts get an instant response before the customer calls the next contractor.",
        textColor: "#17181B",
        video: "/videos/cards/kill-busywork.mp4",
      },
      {
        bg: "#FF7D84",
        heading: "Keep estimates warm",
        text: "Every open quote gets a smart follow-up cadence, so good opportunities do not disappear after one bid.",
        textColor: "#17181B",
        video: "/videos/cards/better-margins.mp4",
      },
      {
        bg: "#FFE176",
        heading: "Clean up the stack",
        text: "We connect the tools you already use and cut the software that is costing you without helping the office.",
        textColor: "#17181B",
        video: "/videos/cards/embedded.mp4",
      },
      {
        bg: "#8D96FD",
        heading: "CRMs that don't fight you",
        text: "We configure your CRM around your real process: lead source, estimate status, follow-up, schedule, and close reason.",
        textColor: "#17181B",
        video: "/videos/cards/train-own.mp4",
      },
      {
        bg: "#D8F66F",
        heading: "Dashboards owners actually open",
        text: "Daily numbers that matter: booked jobs, response time, quote status, close rate, and lead source. No vanity metrics.",
        textColor: "#17181B",
        video: "/videos/cards/built-evolve.mp4",
      },
    ],
  },
  ticker: {
    strip1: [
      "Missed-call text-back",
      "AI receptionist",
      "Lead routing",
      "Estimate follow-up",
      "Quote reactivation",
      "Review automation",
      "Missed-call text-back",
      "CRM cleanup",
      "Routing rules",
      "Owner dashboards",
      "Tool consolidation",
    ],
    strip2: [
      "Concrete",
      "Paving",
      "Garage door",
      "Roofing",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Landscaping",
      "Commercial cleaning",
      "Tree services",
      "Exterior remodelers",
    ],
  },
  pricing: {
    eyebrow: "HOW WE WORK WITH OWNERS",
    headline: "Start with the leak",
    highlight: "closest to revenue.",
    featureTags: [
      "Free revenue leak audit",
      "30-day pilot",
      "Built on your current tools",
      "No long-term lock-in",
      "Owner-facing reporting",
    ],
    mainCard: {
      title: "Contractor Revenue System",
      description:
        "Missed calls, lead routing, estimate follow-up, CRM cleanup, reviews, and dashboards — wired together and tuned for your trade. We do not leave until the system is helping your office book work without babysitting it.",
      price: "Custom Scope",
      priceCaption: "Priced on lead volume, trade, and current stack",
      ctaLabel: "Get a free revenue leak audit ↗",
    },
    includedCard: {
      label: "WHAT'S INCLUDED",
      items: [
        "Missed-call and lead-response audit",
        "Estimate follow-up automation",
        "CRM cleanup and tool consolidation",
        "Owner dashboard with booked-job metrics",
      ],
    },
    quickStartCard: {
      title: "30-Day Pilot",
      description:
        "Want proof first? We'll launch one piece — usually missed-call text-back or estimate follow-up — and measure the booked-job lift before expanding.",
      ctaLabel: "Start a pilot",
    },
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Questions owners ask us.",
    helperText: "Want a no-pressure walkthrough?",
    helperLinkLabel: "Book a 20-min call ↗",
    items: [
      {
        q: "Do you actually understand contractors and service businesses?",
        a: "Yes. We focus on owner-led contractors and field-service companies. We get how calls, estimates, dispatch, drive time, seasonality, crews, and reviews actually work — and we build around it, not against it.",
      },
      {
        q: "What CRMs do you work with?",
        a: "ServiceTitan, Jobber, Housecall Pro, FieldEdge, ServiceFusion, HubSpot, Pipedrive, GoHighLevel, Google Workspace, phone systems, web forms, spreadsheets, and most field-service stacks.",
      },
      {
        q: "How fast can we see results?",
        a: "Missed-call, instant-response, and estimate follow-up workflows can usually go live inside 2-3 weeks. CRM cleanup, outbound, reporting, and tool consolidation take longer, but we like starting with one workflow that proves the revenue case quickly.",
      },
      {
        q: "Will this replace my office staff?",
        a: "No — it gives them back hours. We replace the chase work: manual follow-ups, missed-call text-backs, quote reminders, list-building, and status updates, so your team can focus on closing, scheduling, and customer experience.",
      },
      {
        q: "What does the free revenue leak audit include?",
        a: "A 30-45 minute call where we walk through where leads come from, how fast you respond, what happens after estimates go out, which tools you pay for, and where jobs stall. You leave with your top 3 leaks and the first workflow we would build.",
      },
    ],
  },
  cta: {
    headlineLine1: "Stop losing jobs",
    headlineLine2: "after the lead comes in.",
    description:
      "Book a free revenue leak audit. We'll show you where calls, estimates, tools, and follow-up are costing you booked work — no slides, no fluff.",
    ctaLabel: "Get my free audit",
    videoSrc: "/videos/cta-background-operations.mp4",
  },
  leadForm: {
    eyebrow: "GET YOUR FREE REVENUE LEAK AUDIT",
    headline: "Tell us about your business.",
    description:
      "Drop your details and we'll come prepared with a diagnosis of your biggest lead, estimate, CRM, and software leaks. No slide deck, no obligation.",
    submitLabel: "Request my audit ↗",
    successMessage:
      "Got it — we'll reach out within one business day to lock in your free revenue leak audit.",
  },
};
