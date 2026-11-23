import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { operationsContent } from "@/content/landing/operations";
import { faqPageNode, jsonLdGraph, serviceNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: operationsContent.meta.title,
  description: operationsContent.meta.description,
  alternates: {
    canonical: operationsContent.meta.canonical,
  },
  openGraph: {
    title: operationsContent.meta.ogTitle ?? operationsContent.meta.title,
    description:
      operationsContent.meta.ogDescription ?? operationsContent.meta.description,
    url: operationsContent.meta.canonical,
    siteName: "NewRevGen",
    type: "website",
    ...(operationsContent.meta.ogImage && {
      images: [{ url: operationsContent.meta.ogImage }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: operationsContent.meta.ogTitle ?? operationsContent.meta.title,
    description:
      operationsContent.meta.ogDescription ?? operationsContent.meta.description,
    ...(operationsContent.meta.ogImage && {
      images: [operationsContent.meta.ogImage],
    }),
  },
};

const structuredData = jsonLdGraph([
  serviceNode({
    path: "/operations",
    name: operationsContent.pricing.mainCard.title,
    serviceType: "AI revenue systems for contractors and service businesses",
    description: operationsContent.meta.description,
    audience: "Owner-led contractors and field-service businesses",
  }),
  faqPageNode("/operations", operationsContent.faq.items),
]);

export default function OperationsPage() {
  return (
    <>
      <JsonLd json={structuredData} />
      <LandingPageTemplate content={operationsContent} />
    </>
  );
}
