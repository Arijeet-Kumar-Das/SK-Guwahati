import { BUSINESS, SITE_URL, SERVICE_AREAS } from "@/lib/seo";

/**
 * JSON-LD LocalBusiness structured data for Google rich results.
 * Renders as a <script type="application/ld+json"> tag.
 *
 * Why: Google uses this to populate the Knowledge Panel, Maps listing,
 * and local pack results for "septic tank cleaning Guwahati" queries.
 */
export default function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    foundingDate: String(BUSINESS.foundingYear),
    image: `${SITE_URL}/og-image.png`,
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
      opens: "00:00",
      closes: "23:59",
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
              "Professional septic tank cleaning and emptying services in Guwahati using modern suction equipment.",
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
    sameAs: [
      `https://wa.me/${BUSINESS.whatsapp}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
