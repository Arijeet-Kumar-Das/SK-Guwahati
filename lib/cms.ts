import { client } from "@/sanity/lib/client";
import {
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  AREAS_QUERY,
  FLEET_QUERY,
  CUSTOMERS_QUERY,
  COMPANY_OVERVIEW_QUERY,
  GALLERY_QUERY,
} from "../sanity/lib/queries";
import { WHY_CHOOSE_US_QUERY } from "./queries";

/**
 * Shared fetch options — tells Next.js to cache responses and
 * revalidate every hour via ISR. This means the first visitor
 * after 1 hour triggers a background re-render; everyone else
 * gets the cached page instantly.
 */
const CACHE_OPTIONS = { next: { revalidate: 3600 } } as const;

export async function getServices() {
  return client.fetch(SERVICES_QUERY, {}, CACHE_OPTIONS);
}

export async function getTestimonials() {
  return client.fetch(TESTIMONIALS_QUERY, {}, CACHE_OPTIONS);
}

export async function getFaqs() {
  return client.fetch(FAQS_QUERY, {}, CACHE_OPTIONS);
}

export async function getAreas() {
  return client.fetch(AREAS_QUERY, {}, CACHE_OPTIONS);
}

export async function getWhyChooseUs() {
  return client.fetch(WHY_CHOOSE_US_QUERY, {}, CACHE_OPTIONS);
}

export async function getFleet() {
  return client.fetch(FLEET_QUERY, {}, CACHE_OPTIONS);
}

export async function getCustomers() {
  return client.fetch(CUSTOMERS_QUERY, {}, CACHE_OPTIONS);
}

export async function getCompanyOverview() {
  return client.fetch(COMPANY_OVERVIEW_QUERY, {}, CACHE_OPTIONS);
}

export async function getGallery() {
  return client.fetch(GALLERY_QUERY, {}, CACHE_OPTIONS);
}
