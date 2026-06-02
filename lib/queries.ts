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