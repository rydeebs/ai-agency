import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/landing/ServicePage";
import {
  getRoofingServicePage,
  roofingHubPath,
  roofingServicePages,
} from "@/content/landing/roofing";
import { pageMetadata } from "@/lib/seo/metadata";

interface RoofingRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return roofingServicePages.map((page) => ({
    slug: page.path.slice(roofingHubPath.length + 1),
  }));
}

export async function generateMetadata({ params }: RoofingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getRoofingServicePage(slug);
  if (!content) return {};
  return pageMetadata({ path: content.path, ...content.meta });
}

export default async function RoofingServiceRoute({ params }: RoofingRouteProps) {
  const { slug } = await params;
  const content = getRoofingServicePage(slug);
  if (!content) notFound();
  return <ServicePage content={content} />;
}
