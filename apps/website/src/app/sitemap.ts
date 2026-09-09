import type { MetadataRoute } from "next";
import { assessmentTools } from "@/lib/lead-tools/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://newrevgen.com";
  return [
    "",
    "/operations",
    "/firms",
    "/101",
    "/tools",
    "/tools/website-revenue-audit",
    ...assessmentTools.map((tool) => `/tools/${tool.slug}`),
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-09-08"),
    changeFrequency: path.startsWith("/tools") ? "monthly" : "yearly",
    priority: path === "" ? 1 : path === "/tools" ? 0.9 : 0.7,
  }));
}

