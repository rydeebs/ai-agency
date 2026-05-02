import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { accountingFinanceContent } from "@/content/landing/accounting-finance";

export const metadata: Metadata = {
  title: accountingFinanceContent.meta.title,
  description: accountingFinanceContent.meta.description,
  alternates: {
    canonical: accountingFinanceContent.meta.canonical,
  },
  openGraph: {
    title:
      accountingFinanceContent.meta.ogTitle ?? accountingFinanceContent.meta.title,
    description:
      accountingFinanceContent.meta.ogDescription ??
      accountingFinanceContent.meta.description,
    url: accountingFinanceContent.meta.canonical,
    siteName: "NewRevGen",
    type: "website",
    ...(accountingFinanceContent.meta.ogImage && {
      images: [{ url: accountingFinanceContent.meta.ogImage }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title:
      accountingFinanceContent.meta.ogTitle ?? accountingFinanceContent.meta.title,
    description:
      accountingFinanceContent.meta.ogDescription ??
      accountingFinanceContent.meta.description,
    ...(accountingFinanceContent.meta.ogImage && {
      images: [accountingFinanceContent.meta.ogImage],
    }),
  },
};

export default function AccountingFinancePage() {
  return <LandingPageTemplate content={accountingFinanceContent} />;
}
