import { defineField, defineType } from "sanity";

export const companyOverview = defineType({
  name: "companyOverview",
  title: "Company Overview",
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
  ],
});