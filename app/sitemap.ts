import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Dynamic sitemap generation.
 *
 * Why: Tells search engines about all indexable pages, their update frequency,
 * and relative importance. Critical for crawl budget efficiency.
 *
 * The homepage gets priority 1.0 (highest) because it's the primary landing page
 * for all local search queries. Sub-pages get lower priority since they're
 * currently placeholder pages.
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
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
