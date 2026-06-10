import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { getSiteSettings } from "@/lib/sanity";
import {
  getCompanyOverview,
  getWhyChooseUs,
  getCustomers,
  getAreas,
} from "@/lib/cms";
import PageHeader from "@/components/layout/PageHeader";
import CompanyOverview from "@/components/sections/CompanyOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustedCustomers from "@/components/sections/TrustedCustomers";
import Areas from "@/components/sections/Areas";
import ContactCTA from "@/components/sections/ContactCTA";

/**
 * Page-specific metadata for /about.
 *
 * SEO rationale:
 * - Targets "about S.K Enterprise Guwahati" queries
 * - Builds E-E-A-T (Experience, Expertise, Authority, Trust) signals
 * - Unique description different from homepage to avoid cannibalization
 */
export const metadata: Metadata = {
  title: "About Us - S.K Enterprise Septic Tank Services",
  description:
    "Learn about S.K Enterprise, Guwahati's trusted septic tank cleaning company in Assam. Established in 2019 with a mission to provide fast, hygienic, and affordable sanitation services across Guwahati and surrounding areas.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About S.K Enterprise - Septic Tank Services in Guwahati",
    description:
      "Guwahati's trusted septic tank cleaning company. Modern equipment, trained technicians, and 500+ satisfied customers.",
    url: `${SITE_URL}/about`,
  },
};

export default async function AboutPage() {
  const [siteSettings, companyOverview, whyChooseUs, customers, areas] =
    await Promise.all([
      getSiteSettings(),
      getCompanyOverview(),
      getWhyChooseUs(),
      getCustomers(),
      getAreas(),
    ]);

  return (
    <>
      <PageHeader
        title="About S.K Enterprise"
        subtitle="Guwahati's trusted septic tank cleaning service provider, committed to fast, hygienic, and affordable sanitation solutions across Assam."
        breadcrumbs={[{ label: "About" }]}
      />

      <main id="main-content">
        <CompanyOverview overview={companyOverview} />
        <WhyChooseUs items={whyChooseUs} />
        <TrustedCustomers customers={customers} />
        <Areas areas={areas} />
        <ContactCTA siteSettings={siteSettings} />
      </main>
    </>
  );
}
