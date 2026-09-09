import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { operationsContent } from "@/content/landing/operations";

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

export default function OperationsPage() {
  return <LandingPageTemplate content={operationsContent} />;
}
