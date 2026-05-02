import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { gtmOperationsContent } from "@/content/landing/gtm-operations";

export const metadata: Metadata = {
  title: gtmOperationsContent.meta.title,
  description: gtmOperationsContent.meta.description,
  alternates: {
    canonical: gtmOperationsContent.meta.canonical,
  },
  openGraph: {
    title:
      gtmOperationsContent.meta.ogTitle ?? gtmOperationsContent.meta.title,
    description:
      gtmOperationsContent.meta.ogDescription ??
      gtmOperationsContent.meta.description,
    url: gtmOperationsContent.meta.canonical,
    siteName: "NewRevGen",
    type: "website",
    ...(gtmOperationsContent.meta.ogImage && {
      images: [{ url: gtmOperationsContent.meta.ogImage }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title:
      gtmOperationsContent.meta.ogTitle ?? gtmOperationsContent.meta.title,
    description:
      gtmOperationsContent.meta.ogDescription ??
      gtmOperationsContent.meta.description,
    ...(gtmOperationsContent.meta.ogImage && {
      images: [gtmOperationsContent.meta.ogImage],
    }),
  },
};

export default function GtmOperationsPage() {
  return <LandingPageTemplate content={gtmOperationsContent} />;
}
