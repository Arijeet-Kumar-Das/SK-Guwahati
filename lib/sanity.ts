import { client } from "@/sanity/lib/client";

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0]{
      companyName,
      phone,
      whatsapp,
      address,
      heroTitle,
      heroDescription
    }
  `);
}