import { BUSINESS, SITE_URL, SERVICE_AREAS } from "@/lib/seo";

/**
 * Comprehensive JSON-LD structured data for Google rich results.
 * Renders multiple schema blocks:
 * - LocalBusiness + ProfessionalService (dual-typed for local pack)
 * - Organization (for Knowledge Panel)
 * - WebSite (for sitelinks search box)
 *
 * Why: Google uses these to populate the Knowledge Panel, Maps listing,
 * and local pack results for "septic tank cleaning Guwahati" queries.
 */
export default function LocalBusinessJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    foundingDate: BUSINESS.foundingDate,
    image: `${SITE_URL}/images/logo.png`,
    logo: `${SITE_URL}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "19:00",
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Septic Tank & Drainage Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Septic Tank Cleaning",
            description:
              "Professional septic tank cleaning and emptying services in Guwahati using modern vacuum suction equipment.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Drain Cleaning",
            description:
              "Blocked drain cleaning and unclogging services for residential and commercial properties in Guwahati.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sewer Cleaning",
            description:
              "Sewer line cleaning and maintenance services across Guwahati and surrounding areas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emergency Septic Tank Cleaning",
            description:
              "24/7 emergency septic tank overflow and cleaning services with fast response time in Guwahati.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "500",
      bestRating: "5",
    },
    potentialAction: {
      "@type": "CommunicateAction",
      target: `tel:${BUSINESS.phone}`,
      name: "Call for Booking",
    },
    sameAs: [
      `https://wa.me/${BUSINESS.whatsapp}`,
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    foundingDate: BUSINESS.foundingDate,
    sameAs: [
      `https://wa.me/${BUSINESS.whatsapp}`,
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS.name,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
