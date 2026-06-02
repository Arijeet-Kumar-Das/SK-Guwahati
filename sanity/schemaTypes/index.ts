import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { area } from "./area";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    service,
    testimonial,
    faq,
    area,
  ],
};