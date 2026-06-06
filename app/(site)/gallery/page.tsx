import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { getGallery } from "@/lib/cms";
import { getSiteSettings } from "@/lib/sanity";
import PageHeader from "@/components/layout/PageHeader";
import Gallery from "@/components/sections/Gallery";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Project Gallery — See Our Work",
  description:
    "Browse real photos and footage from S.K Enterprise's septic tank cleaning, drain maintenance, and industrial waste management projects across Guwahati and Assam.",
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    title: "Project Gallery — S.K Enterprise Guwahati",
    description:
      "See real project photos from our septic tank cleaning and drain maintenance operations. Professional work, documented results.",
    url: `${SITE_URL}/gallery`,
  },
};

export default async function GalleryPage() {
  const [gallery, siteSettings] = await Promise.all([
    getGallery(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHeader
        title="Project Gallery"
        subtitle="Real photos and footage from our septic tank cleaning, drain maintenance, and industrial waste management operations across Guwahati."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <main id="main-content">
        <Gallery items={gallery} />
        <ContactCTA siteSettings={siteSettings} />
      </main>
    </>
  );
}
