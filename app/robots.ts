import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt generation.
 *
 * Why: Controls which pages search engine crawlers can access.
 * - Allows all pages publicly
 * - Blocks /studio (Sanity CMS admin - not for public indexing)
 * - References the sitemap for efficient crawling
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
