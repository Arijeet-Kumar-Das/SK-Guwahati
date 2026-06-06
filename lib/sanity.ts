import { cache } from "react";
import { client } from "@/sanity/lib/client";

/** Typed site settings from Sanity CMS */
export interface SiteSettings {
  companyName: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  heroTitle?: string;
  heroDescription?: string;
}

/**
 * Fetch site-wide settings from Sanity.
 * Wrapped with React.cache so multiple calls within a single
 * server render are deduplicated automatically.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      companyName,
      phone,
      whatsapp,
      address,
      workingHours,
      googleMapsUrl,
      heroTitle,
      heroDescription
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
});