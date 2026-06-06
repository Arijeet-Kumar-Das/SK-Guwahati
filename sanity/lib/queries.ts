export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    companyName,
    phone,
    whatsapp,
    address,
    workingHours,
    googleMapsUrl,
    heroTitle,
    heroDescription
  }
`;
export const SERVICES_QUERY = `
  *[_type == "service"] | order(_createdAt asc)
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt asc)
`;

export const FAQS_QUERY = `
  *[_type == "faq"] | order(_createdAt asc)
`;

export const AREAS_QUERY = `
  *[_type == "area"] | order(_createdAt asc)
`;
export const FLEET_QUERY = `
  *[_type == "fleet"] | order(_createdAt asc){
    _id,
    name,
    capacity,
    description,
    image
  }
`;

export const CUSTOMERS_QUERY = `
  *[_type == "customer"] | order(_createdAt asc){
    _id,
    name,
    location,
    logo
  }
`;

export const COMPANY_OVERVIEW_QUERY = `
  *[_type == "companyOverview"][0]
`;

export const GALLERY_QUERY = `
  *[_type == "gallery"] | order(_createdAt desc){
    _id,
    title,
    orientation,
    image
  }
`;
