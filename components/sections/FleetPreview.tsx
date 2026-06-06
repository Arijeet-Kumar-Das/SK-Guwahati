"use client";

import Link from "next/link";
import Image from "next/image";
import { Truck, ArrowRight, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface FleetItem {
  _id: string;
  name: string;
  capacity: string;
  description: string;
  image?: any;
}

interface FleetPreviewProps {
  items: FleetItem[];
}

export default function FleetPreview({ items }: FleetPreviewProps) {
  const previewItems = items.slice(0, 3);

  return (
    <section id="fleet" className="bg-slate-50 py-20 lg:py-28">
      <div className="section-container">
        {/* Centered header */}
        <FadeUp>
          <div className="mb-14 text-center lg:mb-16">
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-emerald-500/60" />
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
                Our Fleet
              </p>
              <span className="h-px w-10 bg-emerald-500/60" />
            </div>

            <h2
              className="mx-auto max-w-[18ch] text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Advanced Fleet for Every Cleaning Need
            </h2>

            <p className="mx-auto mt-5 max-w-[46rem] text-base leading-8 text-slate-600 sm:text-lg">
              Specialized vehicles for residential, commercial, and
              high-capacity septic cleaning across Guwahati.
            </p>

            <div className="mt-8">
              <Link
                href="/fleet"
                className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-700"
              >
                View Full Fleet
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* Cards */}
        <StaggerContainer className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((vehicle, index) => (
            <StaggerItem key={vehicle._id} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]">
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  {vehicle.image ? (
                    <Image
                      src={urlFor(vehicle.image).width(900).url()}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                      <Truck className="h-14 w-14 text-slate-400" />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/25 to-transparent" />

                  {vehicle.capacity && (
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-900 shadow-sm backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {vehicle.capacity}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3
                      className="max-w-[15ch] text-xl font-semibold leading-tight tracking-tight text-slate-950"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {vehicle.name}
                    </h3>

                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:inline-flex">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mb-4 h-px w-full bg-gradient-to-r from-emerald-500/70 via-emerald-200/80 to-transparent" />

                  <p className="line-clamp-4 text-sm leading-7 text-slate-600">
                    {vehicle.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm text-slate-500">Fleet unit</span>
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
      </div>
    </section>
  );
}
