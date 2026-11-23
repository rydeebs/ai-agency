import type { MetadataRoute } from "next";
import { roofingHubPath, roofingServicePages } from "@/content/landing/roofing";
import { assessmentTools } from "@/lib/lead-tools/catalog";

const baseUrl = "https://newrevgen.com";
const defaultLastModified = "2026-09-10";

/** Pages whose content changed after the default date. */
const lastModifiedByPath: Record<string, string> = {
  "": "2026-11-23",
  "/operations": "2026-11-23",
  [roofingHubPath]: "2026-11-23",
  ...Object.fromEntries(roofingServicePages.map((page) => [page.path, "2026-11-23"])),
  "/tools/missed-call-calculator": "2026-11-23",
  "/tools/estimate-follow-up-gap": "2026-11-23",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/contact",
    "/operations",
    roofingHubPath,
    ...roofingServicePages.map((page) => page.path),
    "/firms",
    "/101",
    "/tools",
    "/tools/website-revenue-audit",
    ...assessmentTools.map((tool) => `/tools/${tool.slug}`),
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(lastModifiedByPath[path] ?? defaultLastModified),
    changeFrequency:
      path.startsWith("/tools") || path.startsWith(roofingHubPath) ? "monthly" : "yearly",
    priority:
      path === ""
        ? 1
        : path === "/tools" || path.startsWith(roofingHubPath)
          ? 0.9
          : 0.7,
  }));
}
