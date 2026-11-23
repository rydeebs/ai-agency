import { RelatedLinks } from "@/components/landing/ServicePage";
import type { ToolGuide } from "@/content/tools/guides";

interface ToolGuideSectionProps {
  guide: ToolGuide;
}

export function ToolGuideSection({ guide }: ToolGuideSectionProps) {
  return (
    <div className="pb-16 sm:pb-24">
      <section className="legal-content mx-auto max-w-[840px] px-5 pt-16 sm:px-8 sm:pt-24">
        <h2>{guide.heading}</h2>
        {guide.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>What you will enter</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-cp-text">
          {guide.inputs.map((input) => (
            <li key={input}>{input}</li>
          ))}
        </ul>
        <h2>Frequently asked questions</h2>
        {guide.faq.map((item) => (
          <div key={item.q} className="mt-6">
            <h3 className="font-sans text-lg font-semibold text-cp-dark">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </section>
      <RelatedLinks links={guide.related} heading="Related pages" />
    </div>
  );
}
