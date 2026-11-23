import type { QuestionAnswer } from "@/components/landing/types";

export const siteUrl = "https://newrevgen.com";
export const organizationId = `${siteUrl}/#organization`;

type JsonLdNode = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

const provider = {
  "@type": "Organization",
  "@id": organizationId,
  name: "NewRevGen",
  url: `${siteUrl}/`,
};

export function serviceNode({
  path,
  name,
  serviceType,
  description,
  audience,
}: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  audience: string;
}): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider,
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", audienceType: audience },
  };
}

export function faqPageNode(path: string, items: QuestionAnswer[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    url: absoluteUrl(path),
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbNode(
  path: string,
  trail: Array<{ path: string; label: string }>,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function jsonLdGraph(nodes: JsonLdNode[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );
}
