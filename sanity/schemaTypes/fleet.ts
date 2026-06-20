import { defineField, defineType } from "sanity";

export const fleet = defineType({
  name: "fleet",
  title: "Fleet Vehicles",
  type: "document",

  fields: [
    defineField({
      name: "fleetNumber",
      title: "Fleet Number",
      type: "string",
      description: "Custom fleet number (e.g., AS-01, GHY-203, etc.)",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "name",
      title: "Vehicle Name",
      type: "string",
    }),

    defineField({
      name: "capacity",
      title: "Capacity",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Vehicle Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
