import { client } from "@/sanity/lib/client";
import {
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  AREAS_QUERY,
  FLEET_QUERY,
  CUSTOMERS_QUERY,
  COMPANY_OVERVIEW_QUERY,
} from "../sanity/lib/queries";
import { WHY_CHOOSE_US_QUERY } from "./queries";

export async function getServices() {
  return client.fetch(SERVICES_QUERY);
}

export async function getTestimonials() {
  return client.fetch(TESTIMONIALS_QUERY);
}

export async function getFaqs() {
  return client.fetch(FAQS_QUERY);
}

export async function getAreas() {
  return client.fetch(AREAS_QUERY);
}

export async function getWhyChooseUs() {
  return client.fetch(WHY_CHOOSE_US_QUERY);
}

export async function getFleet() {
  return client.fetch(FLEET_QUERY);
}

export async function getCustomers() {
  return client.fetch(CUSTOMERS_QUERY);
}

export async function getCompanyOverview() {
  return client.fetch(COMPANY_OVERVIEW_QUERY);
}