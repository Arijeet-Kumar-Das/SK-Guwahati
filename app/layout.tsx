import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL, BUSINESS, TARGET_KEYWORDS } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Explicit favicon and icon configuration
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/images/logo.png", type: "image/png", sizes: "16x16" },
      { url: "/images/logo.png", type: "image/png", sizes: "192x192" },
      { url: "/images/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/images/logo.png",
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },

  title: {
    default:
      "S.K Enterprise - Professional Septic Tank Cleaning in Guwahati | 24/7 Service",
    template: "%s | S.K Enterprise - Guwahati",
  },

  description:
    "Trusted septic tank cleaning, drain cleaning, and sewer services in Guwahati, Assam. 300000+ jobs completed, 4.8 star rated, 24/7 available. Fast response, modern equipment, affordable pricing. Call 09864074129.",

  keywords: TARGET_KEYWORDS as unknown as string[],

  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,

  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "S.K Enterprise - Professional Septic Tank Cleaning in Guwahati",
    description:
      "Guwahati's most trusted septic tank cleaning service. Fast response, modern equipment, transparent pricing. 500+ satisfied customers. Available 24/7.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "S.K Enterprise - Septic Tank Cleaning Services in Guwahati",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "S.K Enterprise - Septic Tank Cleaning in Guwahati | 24/7",
    description:
      "Professional septic tank cleaning across Guwahati. 300000+ jobs completed, 4.8 star rated. Call 09864074129 for fast service.",
    images: ["/images/logo.png"],
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
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Additional favicon links for better browser support */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />

        {/* Google-specific logo meta tags for search results */}
        <meta property="og:logo" content="https://skenterpriseguwahati.com/images/logo.png" />
        <link rel="image_src" href="https://skenterpriseguwahati.com/images/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
