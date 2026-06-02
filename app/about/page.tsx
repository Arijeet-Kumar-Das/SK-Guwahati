import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Page-specific metadata for /about.
 *
 * SEO rationale:
 * - Targets "about S.K Enterprise Guwahati" queries
 * - Builds E-E-A-T (Experience, Expertise, Authority, Trust) signals
 * - Unique description different from homepage to avoid cannibalization
 */
export const metadata: Metadata = {
  title: "About Us — S.K Enterprise Septic Tank Services",
  description:
    "Learn about S.K Enterprise, Guwahati's trusted septic tank cleaning company. Established with a mission to provide fast, hygienic, and affordable sanitation services across Assam.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About S.K Enterprise — Septic Tank Services in Guwahati",
    description:
      "Guwahati's trusted septic tank cleaning company. Modern equipment, trained technicians, and 500+ satisfied customers.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="py-32 lg:py-40">
        <div className="section-container text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About S.K Enterprise
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Guwahati&apos;s trusted septic tank cleaning service provider,
            committed to fast, hygienic, and affordable sanitation solutions.
          </p>
        </div>
      </section>
    </main>
  );
}