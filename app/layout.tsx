import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL, BUSINESS, TARGET_KEYWORDS } from "@/lib/seo";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Root metadata — applies to all pages unless overridden.
 *
 * SEO rationale:
 * - Title template: appends brand name to every page title for consistency
 * - Description: front-loads primary keyword "septic tank cleaning Guwahati"
 * - Keywords: targets high-intent local search queries
 * - Open Graph: complete social sharing metadata with locale
 * - Twitter: large image card for maximum engagement
 * - Canonical: prevents duplicate content issues
 * - Robots: allows indexing with follow for link equity
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "S.K Enterprise — Professional Septic Tank Cleaning in Guwahati | 24/7 Service",
    template: "%s | S.K Enterprise — Guwahati",
  },

  description:
    "Trusted septic tank cleaning, drain cleaning, and sewer services in Guwahati, Assam. 500+ jobs completed, 4.8★ rated, 24/7 available. Fast response, modern equipment, affordable pricing. Call 09864074129.",

  keywords: TARGET_KEYWORDS as unknown as string[],

  authors: [{ name: BUSINESS.name }],

  creator: BUSINESS.name,

  publisher: BUSINESS.name,

  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title:
      "S.K Enterprise — Professional Septic Tank Cleaning in Guwahati",
    description:
      "Guwahati's most trusted septic tank cleaning service. Fast response, modern equipment, transparent pricing. 500+ satisfied customers. Available 24/7.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "S.K Enterprise — Septic Tank Cleaning Services in Guwahati",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "S.K Enterprise — Septic Tank Cleaning in Guwahati | 24/7",
    description:
      "Professional septic tank cleaning across Guwahati. 500+ jobs completed, 4.8★ rated. Call 09864074129 for fast service.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    // Add your Google Search Console verification code here:
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* Skip-to-content link for keyboard/screen-reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {/* JSON-LD structured data — rendered in <body> for Next.js compatibility,
            Google reads it from anywhere in the DOM */}
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
