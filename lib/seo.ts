/**
 * SEO Constants for S.K Enterprise
 * Centralized configuration for all SEO-related metadata across the site.
 */

/** Production URL */
export const SITE_URL = "https://skenterpriseguwahati.com";

export const BUSINESS = {
  name: "S.K Enterprise",
  legalName: "S.K Enterprise",

  description:
    "Professional septic tank cleaning, drain cleaning, and sewage management services in Guwahati, Assam. Fast response, modern mechanized equipment, and affordable pricing since 2019.",

  phone: "09864074129",
  whatsapp: "918005429901",

  email: "cesspoolserviceghy@gmail.com",

  address: {
    street: "Solapara Road, Opp Nehru Stadium",
    locality: "Guwahati",
    region: "Assam",
    postalCode: "781007",
    country: "IN",
  },

  /** GeoCoordinates for Solapara Road, Opp Nehru Stadium, Guwahati */
  geo: {
    latitude: 26.1826,
    longitude: 91.7494,
  },

  priceRange: "₹₹",

  openingHours: [
    "Mo 08:00-19:00",
    "Tu 08:00-19:00",
    "We 08:00-19:00",
    "Th 08:00-19:00",
    "Fr 08:00-19:00",
    "Sa 08:00-19:00",
    "Su 08:00-19:00",
  ],

  foundingDate: "2019-04",
  foundingYear: 2019,
};

/** Target keywords for local SEO - used across meta descriptions and structured data */
export const TARGET_KEYWORDS = [
  "septic tank cleaning Guwahati",
  "septic tank cleaning service Guwahati",
  "septic tank cleaning Assam",
  "septic tank cleaning near me",
  "septic tank cleaning company Guwahati",
  "septic tank cleaning services Assam",
  "sewage cleaning Guwahati",
  "septic tank vacuum cleaning Guwahati",
  "drainage cleaning Guwahati",
  "emergency septic tank cleaning Guwahati",
  "drain cleaning Guwahati",
  "sewer cleaning Guwahati",
  "septic tank emptying Guwahati",
  "septic tank service near me",
  "S.K Enterprise Guwahati",
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
  "Kamrup Metro",
  "Kamrup Rural",
  "Morigaon",
  "Mangaldoi",
  "Nagaon",
] as const;
