import { FoundersSection } from "../FoundersSection";
import { Footer } from "../Footer";
import { HeroVariant } from "./HeroVariant";
import { StatementVariant } from "./StatementVariant";
import { WhatWeDoVariant } from "./WhatWeDoVariant";
import { StickyCardsVariant } from "./StickyCardsVariant";
import { TickerStripsVariant } from "./TickerStripsVariant";
import { PricingVariant } from "./PricingVariant";
import { FAQVariant } from "./FAQVariant";
import { CTAVariant } from "./CTAVariant";
import { LeadFormSection } from "./LeadFormSection";
import type { LandingContent } from "./types";

interface Props {
  content: LandingContent;
}

export function LandingPageTemplate({ content }: Props) {
  return (
    <main style={{ backgroundColor: "#EFEFEF" }}>
      <HeroVariant content={content.hero} />
      <StatementVariant content={content.statement} />
      <WhatWeDoVariant content={content.whatWeDo} />
      <StickyCardsVariant content={content.stickyCards} />
      <TickerStripsVariant content={content.ticker} />
      <PricingVariant content={content.pricing} />
      <FoundersSection />
      <FAQVariant content={content.faq} />
      <LeadFormSection content={content.leadForm} vertical={content.vertical} />
      <CTAVariant content={content.cta} />
      <Footer />
    </main>
  );
}
