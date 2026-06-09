import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import ServicesPreview from "@/components/sections/ServicesPreview";
import CompanyOverview from "@/components/sections/CompanyOverview";
import FleetPreview from "@/components/sections/FleetPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustedCustomers from "@/components/sections/TrustedCustomers";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import { getSiteSettings } from "@/lib/sanity";
import {
  getServices,
  getWhyChooseUs,
  getFleet,
  getCustomers,
  getCompanyOverview,
  getTestimonials,
} from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

/**
 * Homepage metadata - overrides root layout defaults.
 *
 * SEO rationale:
 * - Uses `title.absolute` to bypass the template and set the exact title
 *   (homepage title should be the most keyword-rich and standalone)
 * - Description front-loads the primary keyword "septic tank cleaning Guwahati"
 * - Canonical set to root URL
 */
export const metadata: Metadata = {
  title: {
    absolute:
      "S.K Enterprise - Professional Septic Tank Cleaning in Guwahati | 24/7 Service",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function Home() {
  const [
    siteSettings,
    services,
    fleet,
    customers,
    whyChooseUs,
    companyOverview,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getFleet(),
    getCustomers(),
    getWhyChooseUs(),
    getCompanyOverview(),
    getTestimonials(),
  ]);

  return (
    <main id="main-content">
      <Hero siteSettings={siteSettings} />
      <TrustStrip />
      <ServicesPreview services={services} />
      <CompanyOverview overview={companyOverview} />
      <FleetPreview items={fleet} />
      <WhyChooseUs items={whyChooseUs} />
      <TrustedCustomers customers={customers} />
      <Testimonials testimonials={testimonials} />
      <ContactCTA siteSettings={siteSettings} />
    </main>
  );
}
