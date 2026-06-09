"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import { ArrowUpRight, CheckCircle2, Truck } from "lucide-react";
import Image from "next/image";

interface FleetItem {
  _id: string;
  name: string;
  capacity: string;
  description: string;
  image?: SanityImageSource;
}

interface FleetProps {
  items: FleetItem[];
}

export default function Fleet({ items }: FleetProps) {
  return (
    <section
      id="fleet"
      aria-label="Our Fleet"
      className="bg-white py-16 lg:py-24"
    >
      <div className="section-container">
        <StaggerContainer className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((vehicle, index) => (
            <StaggerItem key={vehicle._id} className="h-full">
              <article className="enterprise-card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  {vehicle.image ? (
                    <Image
                      src={urlFor(vehicle.image).width(1100).url()}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-navy-50">
                      <Truck className="h-14 w-14 text-navy-300" />
                    </div>
                  )}

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-white/80 bg-white/95 px-3 py-1.5 text-sm font-bold text-navy-950 shadow-sm">
                    <span className="h-2 w-2 rounded-sm bg-brand-green-600" />
                    {vehicle.capacity}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3
                      className="text-2xl font-extrabold leading-tight text-navy-950"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {vehicle.name}
                    </h3>

                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-brand-green-700 transition-colors duration-300 group-hover:bg-brand-green-600 group-hover:text-white sm:inline-flex">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="line-clamp-4 flex-1 text-sm leading-7 text-slate-600">
                    {vehicle.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-sm font-medium text-slate-500">
                      Specialized fleet unit
                    </span>
                    <span className="text-sm font-bold text-navy-950">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="mt-14 overflow-hidden rounded-lg bg-navy-950 p-7 text-white lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="section-label text-brand-green-400">
                  Operational Readiness
                </p>
                <h3
                  className="mt-4 text-2xl font-extrabold leading-tight lg:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Equipped for narrow lanes, commercial sites, and heavy-duty
                  cleaning work
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Right vehicle selection",
                  "Mechanized cleaning process",
                  "Responsible field coordination",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-400" />
                    <span className="text-sm leading-6 text-navy-100">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
