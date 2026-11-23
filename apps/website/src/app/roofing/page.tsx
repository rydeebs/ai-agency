import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CTAVariant } from "@/components/landing/CTAVariant";
import { RelatedLinks } from "@/components/landing/ServicePage";
import { ServicePageHeader } from "@/components/landing/ServicePageHeader";
import { roofingHubContent as hub } from "@/content/landing/roofing";
import { pageMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, breadcrumbNode, jsonLdGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({ path: hub.path, ...hub.meta });

const trail = [
  { path: "/", label: "Home" },
  { path: hub.path, label: "Roofing" },
];

const structuredData = jsonLdGraph([
  {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(hub.path)}#webpage`,
    url: absoluteUrl(hub.path),
    name: hub.meta.title,
    description: hub.meta.description,
    isPartOf: { "@id": "https://newrevgen.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: hub.pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.label,
        url: absoluteUrl(page.href),
      })),
    },
  },
  breadcrumbNode(hub.path, trail),
]);

export default function RoofingHubPage() {
  return (
    <main className="min-h-screen bg-cp-body-bg">
      <JsonLd json={structuredData} />
      <ServicePageHeader
        breadcrumbs={trail.map((crumb) => ({ href: crumb.path, label: crumb.label }))}
        eyebrow={hub.eyebrow}
        title={hub.h1}
        introduction={hub.intro}
      />

      <section className="mx-auto max-w-[1120px] px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="rounded-2xl bg-white p-6 sm:p-10">
          <h2 className="font-sans text-xl font-semibold leading-snug text-cp-dark">
            {hub.quickAnswer.q}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-cp-text">{hub.quickAnswer.a}</p>
        </div>
      </section>

      <section aria-labelledby="roofing-pages" className="mx-auto max-w-[1120px] px-5 pt-16 sm:px-8 sm:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cp-text">Start here</p>
        <h2 id="roofing-pages" className="mt-3 text-4xl font-medium leading-none text-cp-dark sm:text-5xl">
          Pick the leak closest to booked work.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {hub.pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-cp-dark p-6 text-white transition hover:bg-black sm:p-8"
              >
                <span>
                  <span className="block font-heading text-3xl font-semibold leading-none text-white">
                    {page.label}
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-white/60">{page.description}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cp-lime">
                  Read the page <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-we-work" className="legal-content mx-auto max-w-[840px] px-5 pt-16 sm:px-8 sm:pt-24">
        <h2 id="how-we-work">How we work with roofing owners</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-cp-text">
          {hub.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Not a roofer? We also build these systems for HVAC, plumbing, electrical, remodeling,
          and other trades. See <Link href={hub.otherTrades.href}>AI revenue systems for contractors and service businesses</Link>.
        </p>
      </section>

      <RelatedLinks links={hub.tools} heading="Free calculators for roofers" />
      <div className="pt-16 sm:pt-24">
        <CTAVariant content={hub.cta} ctaHref="/contact" />
      </div>
      <Footer />
    </main>
  );
}
