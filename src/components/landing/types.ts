export type Vertical = "101" | "firms" | "operations";

export interface LandingMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface HeroContent {
  eyebrow?: string;
  headlineLines: string[];
  highlightLine: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  features: string[];
  stats: Array<{ number: string; label: string }>;
  /** Optional override for the hero text column max width (default 640px) */
  headlineMaxWidth?: string;
  /** Optional override for the headline font-size CSS value (default clamp(40px, 10vw, 96px)) */
  headlineFontSize?: string;
}

export interface StatementContent {
  line1: string;
  line2: string;
  line2Color?: string;
}

export interface WhatWeDoContent {
  eyebrow: string;
  headline: string;
  highlight: string;
  services: string[];
  videoSrc: string;
}

export interface BenefitCard {
  bg: string;
  heading: string;
  text: string;
  textColor: string;
  video: string;
}

export interface StickyCardsContent {
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  cards: BenefitCard[];
}

export interface PricingContent {
  eyebrow: string;
  headline: string;
  highlight: string;
  featureTags: string[];
  mainCard: {
    title: string;
    description: string;
    price: string;
    priceCaption: string;
    ctaLabel: string;
  };
  includedCard: {
    label: string;
    items: string[];
  };
  quickStartCard: {
    title: string;
    description: string;
    ctaLabel: string;
  };
}

export interface FAQContent {
  eyebrow: string;
  headline: string;
  helperText: string;
  helperLinkLabel: string;
  items: Array<{ q: string; a: string }>;
}

export interface CTAContent {
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaLabel: string;
  /** Optional override for the background video (default /videos/cta-background.mp4) */
  videoSrc?: string;
  /** Optional override for the dark overlay opacity (0-1, default 0.4) */
  overlayOpacity?: number;
}

export interface LeadFormContent {
  eyebrow: string;
  headline: string;
  description: string;
  submitLabel: string;
  successMessage: string;
}

export interface TickerContent {
  strip1: string[];
  strip2: string[];
}

export interface LandingContent {
  vertical: Vertical;
  meta: LandingMeta;
  hero: HeroContent;
  statement: StatementContent;
  whatWeDo: WhatWeDoContent;
  stickyCards: StickyCardsContent;
  ticker: TickerContent;
  pricing: PricingContent;
  faq: FAQContent;
  cta: CTAContent;
  leadForm: LeadFormContent;
}
