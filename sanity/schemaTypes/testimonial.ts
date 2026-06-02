import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Customer Name",
      type: "string",
    }),

    defineField({
      name: "review",
      title: "Review",
      type: "text",
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
    }),
  ],
});