import { client } from "@/sanity/lib/client";
import {
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  AREAS_QUERY,
} from "../sanity/lib/queries";

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