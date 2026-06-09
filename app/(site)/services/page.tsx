import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { getServices } from "@/lib/cms";
import { getSiteSettings } from "@/lib/sanity";
import PageHeader from "@/components/layout/PageHeader";
import Services from "@/components/sections/Services";
import ContactCTA from "@/components/sections/ContactCTA";
import HowItWorks from "./HowItWorks";

export const metadata: Metadata = {
  title: "Our Services - Septic Tank & Drain Cleaning in Guwahati",
  description:
    "S.K Enterprise offers septic tank cleaning, drain cleaning, sewer cleaning, and emergency sanitation services in Guwahati, Assam. Modern equipment, trained technicians, 24/7 available. Call 09864074129.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Septic Tank & Drain Cleaning Services - S.K Enterprise Guwahati",
    description:
      "Full range of septic tank cleaning, drain unblocking, and sewer maintenance services across Guwahati. Fast response, affordable pricing.",
    url: `${SITE_URL}/services`,
  },
};

export default async function ServicesPage() {
  const [services, siteSettings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Professional septic tank cleaning, drain unblocking, and industrial waste management solutions using advanced mechanized equipment across Guwahati."
        breadcrumbs={[{ label: "Services" }]}
      />

      <main id="main-content">
        <Services services={services} />
        <HowItWorks />
        <ContactCTA siteSettings={siteSettings} />
      </main>
    </>
  );
}
