import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "secondaryPhone",
      title: "Secondary Phone Number",
      type: "string",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "string",
    }),

    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Embed URL",
      type: "url",
    }),
  ],
});