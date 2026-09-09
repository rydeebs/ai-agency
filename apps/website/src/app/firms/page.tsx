import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { firmsContent } from "@/content/landing/firms";

export const metadata: Metadata = {
  title: firmsContent.meta.title,
  description: firmsContent.meta.description,
  alternates: {
    canonical: firmsContent.meta.canonical,
  },
  openGraph: {
    title: firmsContent.meta.ogTitle ?? firmsContent.meta.title,
    description:
      firmsContent.meta.ogDescription ?? firmsContent.meta.description,
    url: firmsContent.meta.canonical,
    siteName: "NewRevGen",
    type: "website",
    ...(firmsContent.meta.ogImage && {
      images: [{ url: firmsContent.meta.ogImage }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: firmsContent.meta.ogTitle ?? firmsContent.meta.title,
    description:
      firmsContent.meta.ogDescription ?? firmsContent.meta.description,
    ...(firmsContent.meta.ogImage && { images: [firmsContent.meta.ogImage] }),
  },
};

export default function FirmsPage() {
  return <LandingPageTemplate content={firmsContent} />;
}
