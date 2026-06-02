/**
 * SEO Constants for S.K Enterprise
 * Centralized configuration for all SEO-related metadata across the site.
 */

/** Production URL — update this when deploying to your custom domain. */
export const SITE_URL = "https://skenterprise-guwahati.com";

export const BUSINESS = {
  name: "S.K Enterprise",
  legalName: "S.K Enterprise",
  phone: "09864074129",
  whatsapp: "919864074129",
  email: "skenterprise.guwahati@gmail.com",
  address: {
    street: "Solapara Road",
    locality: "Guwahati",
    region: "Assam",
    postalCode: "781001",
    country: "IN",
  },
  geo: {
    latitude: 26.1445,
    longitude: 91.7362,
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "₹₹",
  foundingYear: 2018,
  description:
    "Professional septic tank cleaning, drain cleaning, and sewer services in Guwahati, Assam. 500+ jobs completed, 4.8★ rated, available 24/7.",
} as const;

/** Target keywords for local SEO — used across meta descriptions and structured data */
export const TARGET_KEYWORDS = [
  "septic tank cleaning Guwahati",
  "septic tank cleaning service Guwahati",
  "drain cleaning Guwahati",
  "sewer cleaning Guwahati",
  "emergency septic tank cleaning Guwahati",
  "septic tank service near me",
  "septic tank emptying Guwahati",
  "S.K Enterprise Guwahati",
  "septic tank cleaning Assam",
] as const;

/** Service areas for LocalBusiness structured data */
export const SERVICE_AREAS = [
  "Guwahati",
  "Dispur",
  "Jalukbari",
  "Maligaon",
  "Paltanbazar",
  "Chandmari",
  "Beltola",
  "Zoo Road",
  "GS Road",
  "Basistha",
  "Kahilipara",
  "Hatigaon",
  "Ganeshguri",
  "Ulubari",
  "Fancy Bazar",
] as const;
