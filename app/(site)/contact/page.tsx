import type { Metadata } from "next";
import { SITE_URL, BUSINESS } from "@/lib/seo";
import { getSiteSettings } from "@/lib/sanity";
import { getFaqs, getServices } from "@/lib/cms";
import PageHeader from "@/components/layout/PageHeader";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

/**
 * Page-specific metadata for /contact.
 *
 * SEO rationale:
 * - Targets "contact septic tank cleaning Guwahati" and "septic tank service phone number Guwahati"
 * - Includes phone number directly in meta description (Google can display this)
 * - High commercial intent - people searching this are ready to book
 */
export const metadata: Metadata = {
  title: "Contact Us - Book Septic Tank Cleaning in Guwahati",
  description: `Contact S.K Enterprise for septic tank cleaning in Guwahati. Call ${BUSINESS.phone} or WhatsApp for instant booking. Available 24/7 across all areas of Guwahati, Assam.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact S.K Enterprise - Septic Tank Cleaning Guwahati",
    description: `Book septic tank cleaning services in Guwahati. Call ${BUSINESS.phone} for fast, professional service. 24/7 availability.`,
    url: `${SITE_URL}/contact`,
  },
};

export default async function ContactPage() {
  const [siteSettings, faqs, services] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getServices(),
  ]);

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Ready to schedule a septic tank cleaning? Get in touch by phone, WhatsApp, or fill out our service request form below."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <main id="main-content">
        <Contact siteSettings={siteSettings} services={services} />
        <FAQ faqs={faqs} />
      </main>
    </>
  );
}
