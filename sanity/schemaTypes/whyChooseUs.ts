import { defineField, defineType } from "sanity";

export const whyChooseUs = defineType({
  name: "whyChooseUs",
  title: "Why Choose Us",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
    }),
  ],
});