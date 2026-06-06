"use client";

import Image from "next/image";
import { Truck, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/ui/motion";

interface FleetItem {
  _id: string;
  name: string;
  capacity: string;
  description: string;
  image?: any;
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
        <StaggerContainer className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {items.map((vehicle, index) => (
            <StaggerItem key={vehicle._id} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {vehicle.image ? (
                    <Image
                      src={urlFor(vehicle.image).width(900).url()}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Truck className="h-14 w-14 text-slate-400" />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/30 to-transparent" />

                  {/* New capacity meta */}
                  <div className="absolute left-5 top-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-900 shadow-sm backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {vehicle.capacity}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3
                      className="max-w-[14ch] text-[1.7rem] font-semibold leading-[1.1] tracking-tight text-slate-950"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {vehicle.name}
                    </h3>

                    <div className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline-flex">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mb-5 h-px w-full bg-gradient-to-r from-emerald-500/70 via-emerald-200/70 to-transparent" />

                  <p className="line-clamp-4 text-[15px] leading-7 text-slate-600">
                    {vehicle.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm font-medium text-slate-500">
                        Specialized fleet unit
                      </span>
                      <span className="text-sm font-semibold text-emerald-700">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="relative mt-16 overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-10 text-center shadow-[0_18px_50px_rgba(15,23,42,0.16)] lg:px-12 lg:py-12">
            <div className="absolute inset-0 opacity-[0.08]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="absolute -top-12 right-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-emerald-300/90">
                Operational Readiness
              </p>

              <h3
                className="mx-auto max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-white lg:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Equipped for residential lanes, commercial sites, and
                high-capacity cleaning work
              </h3>

              <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-slate-300">
                Our fleet is structured to handle different tank sizes and
                operating conditions with hygienic, mechanized, and efficient
                service across Guwahati and nearby areas.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
