import { defineField, defineType } from "sanity";

export const area = defineType({
  name: "area",
  title: "Areas Served",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Area Name",
      type: "string",
    }),
  ],
});