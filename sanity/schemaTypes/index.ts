import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { area } from "./area";
import { whyChooseUs } from "./whyChooseUs";
import { fleet } from "./fleet";
import { customer } from "./customer";
import { companyOverview } from "./companyOverview";
import { gallery } from "./gallery";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    service,
    testimonial,
    faq,
    area,
    whyChooseUs,
    fleet,
    customer,
    companyOverview,
    gallery,
  ],
};
