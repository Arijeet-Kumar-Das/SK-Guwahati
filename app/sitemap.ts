import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Dynamic sitemap generation.
 *
 * Why: Tells search engines about all indexable pages, their update frequency,
 * and relative importance. Critical for crawl budget efficiency.
 *
 * Priority rationale:
 * - Homepage (1.0) — primary landing page for all local search queries
 * - Services (0.9) — strongest commercial intent, lists all service offerings
 * - Contact (0.8) — high conversion page with booking form
 * - About (0.7) — builds E-E-A-T trust signals
 * - Fleet (0.7) — showcases equipment, builds credibility
 * - Gallery (0.6) — supporting content, lower search intent
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/fleet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
