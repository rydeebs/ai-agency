import { HeroSection } from "@/components/HeroSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { StatementSection } from "@/components/StatementSection";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { StickyCardsSection } from "@/components/StickyCardsSection";
import { TickerStrips } from "@/components/TickerStrips";
import { PricingSection } from "@/components/PricingSection";
import { FoundersSection } from "@/components/FoundersSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#EFEFEF" }}>
      <HeroSection />
      {/* <ReviewsSection /> */}
      <StatementSection />
      <WhatWeDoSection />
      <StickyCardsSection />
      <TickerStrips />
      <PricingSection />
      <FoundersSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
