import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { ai101Content } from "@/content/landing/ai-101";

export const metadata: Metadata = {
  title: ai101Content.meta.title,
  description: ai101Content.meta.description,
  alternates: {
    canonical: ai101Content.meta.canonical,
  },
  openGraph: {
    title: ai101Content.meta.ogTitle ?? ai101Content.meta.title,
    description:
      ai101Content.meta.ogDescription ?? ai101Content.meta.description,
    url: ai101Content.meta.canonical,
    siteName: "NewRevGen",
    type: "website",
    ...(ai101Content.meta.ogImage && {
      images: [{ url: ai101Content.meta.ogImage }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: ai101Content.meta.ogTitle ?? ai101Content.meta.title,
    description:
      ai101Content.meta.ogDescription ?? ai101Content.meta.description,
    ...(ai101Content.meta.ogImage && { images: [ai101Content.meta.ogImage] }),
  },
};

export default function Ai101Page() {
  return <LandingPageTemplate content={ai101Content} />;
}
