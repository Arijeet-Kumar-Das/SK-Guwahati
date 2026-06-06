import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { getFleet } from "@/lib/cms";
import { getSiteSettings } from "@/lib/sanity";
import PageHeader from "@/components/layout/PageHeader";
import Fleet from "@/components/sections/Fleet";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Our Fleet — Mechanized Cleaning Vehicles",
  description:
    "Explore S.K Enterprise's fleet of mechanized cleaning vehicles — cesspool trucks, super sucker machines, and jetting units ranging from 1,000 to 6,000 litres. Serving Guwahati and all of Assam.",
  alternates: {
    canonical: `${SITE_URL}/fleet`,
  },
  openGraph: {
    title: "Mechanized Cleaning Fleet — S.K Enterprise Guwahati",
    description:
      "View our range of specialized cesspool vehicles and super sucker machines for residential, commercial, and industrial cleaning operations.",
    url: `${SITE_URL}/fleet`,
  },
};

export default async function FleetPage() {
  const [fleet, siteSettings] = await Promise.all([
    getFleet(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHeader
        title="Our Fleet"
        subtitle="Specialized cesspool vehicles and mechanized equipment for every cleaning challenge — from compact residential units to heavy-duty industrial machines."
        breadcrumbs={[{ label: "Fleet" }]}
      />

      <main id="main-content">
        <Fleet items={fleet} />
        <ContactCTA siteSettings={siteSettings} />
      </main>
    </>
  );
}
