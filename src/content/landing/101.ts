import type { LandingContent } from "@/components/landing/types";

export const ai101Content: LandingContent = {
  vertical: "101",
  meta: {
    title: "AI 101 — Get Fluent in AI From Zero | NewRevGen",
    description:
      "Go from AI-curious to AI-confident. Structured Level 1 → Level 3 program covering ChatGPT, Claude, Gemini, and image generation tools. No technical background required.",
    canonical: "https://newrevegen.com/101",
    ogTitle: "AI 101 — From Zero to Fluent in Three Levels",
    ogDescription:
      "ChatGPT, Claude, Gemini, and AI image tools — explained plainly, taught practically. Built for professionals who don't want to be left behind.",
  },
  hero: {
    headlineLines: ["AI is here.", "We'll get you"],
    highlightLine: "fluent.",
    subheadline:
      "You've heard the hype. Now learn the tools. A structured Level 1 → Level 3 path through ChatGPT, Claude, Gemini, and AI image generation — built for people who don't write code.",
    primaryCta: { label: "Start with Level 1 ↗", href: "#contact" },
    secondaryCta: { label: "See the curriculum", href: "#why-us" },
    features: [
      "ChatGPT, Claude, and Gemini fundamentals",
      "AI image generation made simple",
      "Self-paced or guided cohorts",
      "Real-life and work use cases",
    ],
    stats: [
      { number: "3", label: "skill levels (L1 → L3)" },
      { number: "12+", label: "tools covered" },
      { number: "6 Weeks", label: "to confident daily use" },
    ],
  },
  statement: {
    line1: "AI fluency is the new computer literacy.",
    line2: "The gap is widening every week.",
    line2Color: "#8D96FD",
  },
  whatWeDo: {
    eyebrow: "HOW IT WORKS",
    headline: "We meet you where you are —",
    highlight: "and walk you up the curve.",
    services: [
      "ChatGPT for everyday tasks",
      "Claude for deep work",
      "Gemini in Google Workspace",
      "Midjourney & image generation",
      "Prompting fundamentals",
      "Workflows for your job",
      "Building your first AI agent",
      "Privacy & safe usage",
    ],
    videoSrc: "/videos/how-we-work.mp4",
  },
  stickyCards: {
    eyebrow: "WHY THIS WORKS",
    headline: "AI literacy without",
    highlight: "the overwhelm.",
    description:
      "Most AI courses either talk down to you or assume you're a developer. We start with what you already do every day, then show you how AI fits — one level at a time.",
    cards: [
      {
        bg: "#D8F66F",
        heading: "Level 1: Get unstuck",
        text: "Stop staring at blank pages. Use AI for emails, summaries, and the daily 20-minute tasks that drain you.",
        textColor: "#17181B",
        video: "/videos/cards/kill-busywork.mp4",
      },
      {
        bg: "#FF7D84",
        heading: "Level 2: Build leverage",
        text: "Move beyond simple prompts. Build reusable workflows and templates that compound your output.",
        textColor: "#17181B",
        video: "/videos/cards/better-margins.mp4",
      },
      {
        bg: "#FFE176",
        heading: "Level 3: Operate at scale",
        text: "Chain tools, automate handoffs, and ship work that used to take a small team.",
        textColor: "#17181B",
        video: "/videos/cards/embedded.mp4",
      },
      {
        bg: "#8D96FD",
        heading: "Plain English, always",
        text: "No jargon, no token counts, no API keys. Just clear language and real examples.",
        textColor: "#17181B",
        video: "/videos/cards/train-own.mp4",
      },
      {
        bg: "#D8F66F",
        heading: "Updated as the tools change",
        text: "Models change every month. Our material gets refreshed so you're never learning yesterday's interface.",
        textColor: "#17181B",
        video: "/videos/cards/built-evolve.mp4",
      },
    ],
  },
  ticker: {
    strip1: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Midjourney",
      "DALL·E",
      "Perplexity",
      "NotebookLM",
      "Copilot",
      "Custom GPTs",
      "Agents",
      "Voice AI",
    ],
    strip2: [
      "Writing",
      "Research",
      "Email",
      "Slides",
      "Spreadsheets",
      "Coding basics",
      "Image creation",
      "Note-taking",
      "Meeting prep",
      "Job search",
      "Side projects",
    ],
  },
  pricing: {
    eyebrow: "WAYS TO LEARN",
    headline: "Pick a path that",
    highlight: "fits your pace.",
    featureTags: [
      "Self-paced lessons",
      "Live cohorts",
      "1:1 coaching",
      "Hands-on projects",
      "Lifetime access",
    ],
    mainCard: {
      title: "Full L1 → L3 Program",
      description:
        "The complete curriculum. Self-paced lessons, weekly live workshops, hands-on projects, and a private community of fellow learners.",
      price: "Cohort-based",
      priceCaption: "Next cohort starting soon",
      ctaLabel: "Save your seat ↗",
    },
    includedCard: {
      label: "WHAT YOU'LL LEARN",
      items: [
        "Daily-driver prompting that actually works",
        "Image generation for non-designers",
        "Building custom GPTs and assistants",
        "Privacy, ethics, and safe usage",
      ],
    },
    quickStartCard: {
      title: "Just curious? Start free",
      description:
        "Our Level 1 starter pack covers the basics in under an hour — no credit card, no commitment.",
      ctaLabel: "Get the free starter",
    },
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Common questions, answered.",
    helperText: "Still unsure?",
    helperLinkLabel: "Send us a note ↗",
    items: [
      {
        q: "I'm not technical at all. Will I keep up?",
        a: "Yes — that's exactly who this is built for. We use plain English, real-world examples, and screen-recorded walkthroughs. If you can use email and Google Docs, you can do this.",
      },
      {
        q: "Which AI tools do you cover?",
        a: "ChatGPT (paid + free), Claude, Gemini, Microsoft Copilot, Perplexity, Midjourney, and DALL·E for images. We also touch on NotebookLM and emerging agent tools as they mature.",
      },
      {
        q: "How long does it take to feel confident?",
        a: "Most learners hit Level 1 confidence (using AI daily for real work) in 1–2 weeks. Level 2 (building reusable workflows) takes about a month. Level 3 (advanced automation) is typically 6–8 weeks of consistent practice.",
      },
      {
        q: "Will my work data be safe?",
        a: "We spend real time on this. You'll learn which tools are safe for sensitive data, how settings affect training, and which workflows to keep off public models entirely.",
      },
      {
        q: "Do I get help if I get stuck?",
        a: "Yes. Cohorts include weekly live Q&A, an active community, and email support. If you're in the 1:1 track, you'll have a coach for direct feedback on your work.",
      },
    ],
  },
  cta: {
    headlineLine1: "Don't get left behind.",
    headlineLine2: "Get fluent instead.",
    description:
      "AI literacy is becoming a baseline skill. Start with Level 1 today — no credit card, no commitment.",
    ctaLabel: "Start with Level 1",
    videoSrc: "/videos/cta-background-ai101.mp4",
    overlayOpacity: 0.35,
  },
  leadForm: {
    eyebrow: "GET STARTED",
    headline: "Tell us where you're starting from.",
    description:
      "We'll send you the free Level 1 starter pack and let you know when the next guided cohort opens. No spam, no pressure.",
    submitLabel: "Send me Level 1 ↗",
    successMessage:
      "Check your inbox — your Level 1 starter pack is on its way. We'll be in touch about upcoming cohorts.",
  },
};
