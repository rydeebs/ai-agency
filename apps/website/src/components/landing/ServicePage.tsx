import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Footer } from "../Footer";
import { JsonLd } from "../JsonLd";
import { CTAVariant } from "./CTAVariant";
import { FAQVariant } from "./FAQVariant";
import { ServicePageHeader } from "./ServicePageHeader";
import type { ContentSection, RelatedLink, ServicePageContent } from "./types";
import {
  breadcrumbNode,
  faqPageNode,
  jsonLdGraph,
  serviceNode,
} from "@/lib/seo/structured-data";

interface ServicePageProps {
  content: ServicePageContent;
}

export function ServicePage({ content }: ServicePageProps) {
  const trail = [
    { path: "/", label: "Home" },
    content.parent,
    { path: content.path, label: content.breadcrumbLabel },
  ];
  const structuredData = jsonLdGraph([
    serviceNode({ path: content.path, ...content.service }),
    faqPageNode(content.path, [...content.quickAnswers, ...content.faq.items]),
    breadcrumbNode(content.path, trail),
  ]);

  return (
    <main className="min-h-screen bg-cp-body-bg">
      <JsonLd json={structuredData} />
      <ServicePageHeader
        breadcrumbs={trail.map((crumb) => ({ href: crumb.path, label: crumb.label }))}
        eyebrow={content.eyebrow}
        title={content.h1}
        introduction={content.intro}
      />

      <section
        aria-labelledby="short-answers"
        className="mx-auto max-w-[1120px] px-5 pt-16 sm:px-8 sm:pt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cp-text">
          Short answers
        </p>
        <h2 id="short-answers" className="mt-3 text-4xl font-medium leading-none text-cp-dark sm:text-5xl">
          The quick version.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {content.quickAnswers.map((item) => (
            <div key={item.q} className="rounded-2xl bg-white p-6 sm:p-8">
              <h3 className="font-sans text-lg font-semibold leading-snug text-cp-dark">{item.q}</h3>
              <p className="mt-3 leading-7 text-cp-text">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <article className="legal-content mx-auto max-w-[840px] px-5 py-16 sm:px-8 sm:py-24">
        {content.sections.map((section) => (
          <SectionBlock key={section.heading} section={section} />
        ))}
      </article>

      <SetupGrid setup={content.setup} />
      <RelatedLinks links={content.related} />
      <FAQVariant content={content.faq} helperHref="/contact" />
      <CTAVariant content={content.cta} ctaHref="/contact" />
      <Footer />
    </main>
  );
}

function SectionBlock({ section }: { section: ContentSection }) {
  return (
    <>
      <h2>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-cp-text">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.steps ? (
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-cp-text">
          {section.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
      {section.closing ? <p>{section.closing}</p> : null}
    </>
  );
}

export function SetupGrid({ setup }: { setup: ServicePageContent["setup"] }) {
  return (
    <section aria-labelledby="what-we-set-up" className="px-2 sm:px-3">
      <div className="relative overflow-hidden rounded-xl bg-cp-dark">
        <div className="grid-bg-dark" />
        <div className="relative z-10 mx-auto max-w-[1120px] px-5 py-16 text-white sm:px-8 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cp-lime">
            What NewRevGen sets up
          </p>
          <h2 id="what-we-set-up" className="mt-3 max-w-3xl text-4xl font-medium leading-none text-white sm:text-5xl">
            {setup.heading}
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/65">{setup.intro}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {setup.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-cp-lime text-cp-dark">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl border-l-2 border-cp-lime pl-5 text-sm leading-6 text-white/70">
            {setup.approvalNote}
          </p>
        </div>
      </div>
    </section>
  );
}

export function RelatedLinks({
  links,
  heading = "Keep reading",
}: {
  links: RelatedLink[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="related-pages" className="mx-auto max-w-[1120px] px-5 pt-16 sm:px-8 sm:pt-24">
      <h2 id="related-pages" className="text-4xl font-medium leading-none text-cp-dark sm:text-5xl">
        {heading}
      </h2>
      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full items-start justify-between gap-4 rounded-2xl bg-white p-6 transition hover:bg-cp-dark"
            >
              <span>
                <span className="block font-semibold text-cp-dark group-hover:text-white">{link.label}</span>
                <span className="mt-1 block text-sm leading-6 text-cp-text group-hover:text-white/65">
                  {link.description}
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-cp-dark group-hover:text-cp-lime" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
