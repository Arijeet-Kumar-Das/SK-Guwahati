import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Areas from "@/components/sections/Areas";
import ContactCTA from "@/components/sections/ContactCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

import { getSiteSettings } from "@/lib/sanity";
import { getServices, getTestimonials, getFaqs, getAreas } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

/**
 * Homepage metadata — overrides root layout defaults.
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
      "S.K Enterprise — Professional Septic Tank Cleaning in Guwahati | 24/7 Service",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function Home() {
  const siteSettings = await getSiteSettings();
  const services = await getServices();
  const testimonials = await getTestimonials();
  const faqs = await getFaqs();
  const areas = await getAreas();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero siteSettings={siteSettings} />
        <Services services={services} />
        <WhyChooseUs />
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} />
        <Areas areas={areas} />
        <ContactCTA siteSettings={siteSettings} />
        <Contact siteSettings={siteSettings} />
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}