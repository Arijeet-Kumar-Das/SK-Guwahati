import type { Metadata } from "next";
import { SITE_URL, BUSINESS } from "@/lib/seo";

/**
 * Page-specific metadata for /contact.
 *
 * SEO rationale:
 * - Targets "contact septic tank cleaning Guwahati" and "septic tank service phone number Guwahati"
 * - Includes phone number directly in meta description (Google can display this)
 * - High commercial intent — people searching this are ready to book
 */
export const metadata: Metadata = {
  title: "Contact Us — Book Septic Tank Cleaning in Guwahati",
  description: `Contact S.K Enterprise for septic tank cleaning in Guwahati. Call ${BUSINESS.phone} or WhatsApp for instant booking. Available 24/7 across all areas of Guwahati, Assam.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact S.K Enterprise — Septic Tank Cleaning Guwahati",
    description: `Book septic tank cleaning services in Guwahati. Call ${BUSINESS.phone} for fast, professional service. 24/7 availability.`,
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="py-32 lg:py-40">
        <div className="section-container text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Ready to schedule a septic tank cleaning? Reach out to us by phone,
            WhatsApp, or visit our office in Guwahati.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 bg-brand-green-600 hover:bg-brand-green-500 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-green-600/25"
            >
              Call — {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}