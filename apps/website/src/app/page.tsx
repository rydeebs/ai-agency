import { HeroSection } from "@/components/HeroSection";
import { StatementSection } from "@/components/StatementSection";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { StickyCardsSection } from "@/components/StickyCardsSection";
import { TickerStrips } from "@/components/TickerStrips";
import { PricingSection } from "@/components/PricingSection";
import { FoundersSection } from "@/components/FoundersSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://newrevgen.com/#organization",
      name: "NewRevGen",
      alternateName: "New Rev Gen",
      description:
        "NewRevGen is an AI automation agency that designs, deploys, and manages practical AI systems for growing businesses.",
      url: "https://newrevgen.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://newrevgen.com/images/logo.png",
        width: 1024,
        height: 182,
      },
      image: "https://newrevgen.com/images/cta-background.png",
      email: "mailto:team@newrevgen.com",
      founder: { "@type": "Person", name: "Ryan DeBerardinis" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales and customer support",
        email: "team@newrevgen.com",
        url: "https://newrevgen.com/contact",
        availableLanguage: "English",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      knowsAbout: [
        "AI automation",
        "Workflow automation",
        "Systems integration",
        "Revenue operations",
        "Operational process improvement",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://newrevgen.com/#website",
      url: "https://newrevgen.com/",
      name: "NewRevGen",
      alternateName: "New Rev Gen",
      description:
        "Practical AI systems and workflow automation for growing businesses.",
      inLanguage: "en-US",
      publisher: { "@id": "https://newrevgen.com/#organization" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
    </>
  );
}
