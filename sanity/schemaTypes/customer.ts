import { defineField, defineType } from "sanity";

export const customer = defineType({
  name: "customer",
  title: "Trusted Customers",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Customer Name",
      type: "string",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
