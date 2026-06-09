import { getSiteSettings } from "@/lib/sanity";
import { getServices, getAreas, getFleet } from "@/lib/cms";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/layout/ChatBot";

export const dynamic = "force-dynamic";

/**
 * Site layout wraps all public-facing pages with Navbar, Footer,
 * and ChatBot. Does NOT apply to /studio (Sanity CMS).
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteSettings, services, areas, fleet] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAreas(),
    getFleet(),
  ]);

  return (
    <>
      {/* Skip-to-content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <LocalBusinessJsonLd />
      <Navbar phone={siteSettings?.phone} />
      <div className="flex-1">{children}</div>
      <Footer siteSettings={siteSettings} />
      <ChatBot
        services={services || []}
        areas={areas || []}
        fleet={fleet || []}
        phone={siteSettings?.phone || "09864074129"}
        whatsapp={siteSettings?.whatsapp || "919864074129"}
      />
    </>
  );
}
