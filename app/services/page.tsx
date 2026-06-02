import type { Metadata } from "next";
import { SITE_URL, BUSINESS } from "@/lib/seo";

/**
 * Page-specific metadata for /services.
 *
 * SEO rationale:
 * - Primary target: "septic tank cleaning services Guwahati"
 * - Lists all service types in the description for keyword coverage
 * - Higher priority than /about because services pages have stronger commercial intent
 */
export const metadata: Metadata = {
  title: "Our Services — Septic Tank & Drain Cleaning in Guwahati",
  description:
    "S.K Enterprise offers septic tank cleaning, drain cleaning, sewer cleaning, and emergency sanitation services in Guwahati, Assam. Modern equipment, trained technicians, 24/7 available. Call 09864074129.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Septic Tank & Drain Cleaning Services — S.K Enterprise Guwahati",
    description:
      "Full range of septic tank cleaning, drain unblocking, and sewer maintenance services across Guwahati. Fast response, affordable pricing.",
    url: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <section className="py-32 lg:py-40">
        <div className="section-container text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Services
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Professional septic tank cleaning, drain cleaning, and sewer
            services across Guwahati with modern equipment and 24/7 availability.
          </p>
          <div className="mt-10">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 bg-brand-green-600 hover:bg-brand-green-500 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-green-600/25"
            >
              Call Now — {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}