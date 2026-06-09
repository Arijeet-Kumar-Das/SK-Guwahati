"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import { ArrowRight, ArrowUpRight, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FleetItem {
  _id: string;
  name: string;
  capacity: string;
  description: string;
  image?: SanityImageSource;
}

interface FleetPreviewProps {
  items: FleetItem[];
}

export default function FleetPreview({ items }: FleetPreviewProps) {
  const previewItems = items.slice(0, 3);

  return (
    <section id="fleet" className="bg-navy-50 py-20 lg:py-28">
      <div className="section-container">
        <FadeUp>
          <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-label">Our Fleet</p>
              <h2 className="section-title">
                Specialized Vehicles for Every Cleaning Requirement
              </h2>
              <p className="section-subtitle">
                From compact residential access to high-capacity industrial
                cleaning, our fleet is built for field reliability.
              </p>
            </div>

            <Link
              href="/fleet"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-navy-950 transition-colors hover:border-brand-green-600 hover:text-brand-green-700"
            >
              View Full Fleet
              <ArrowRight size={17} />
            </Link>
          </div>
        </FadeUp>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((vehicle, index) => (
            <StaggerItem key={vehicle._id} className="h-full">
              <article className="enterprise-card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {vehicle.image ? (
                    <Image
                      src={urlFor(vehicle.image).width(900).url()}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-50">
                      <Truck className="h-14 w-14 text-navy-300" />
                    </div>
                  )}

                  {vehicle.capacity && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-white/80 bg-white/95 px-3 py-1.5 text-sm font-bold text-navy-950 shadow-sm">
                      <span className="h-2 w-2 rounded-sm bg-brand-green-600" />
                      {vehicle.capacity}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3
                      className="text-xl font-extrabold leading-snug text-navy-950"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {vehicle.name}
                    </h3>

                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-brand-green-700 transition-colors duration-300 group-hover:bg-brand-green-600 group-hover:text-white sm:inline-flex">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="line-clamp-4 flex-1 text-sm leading-7 text-slate-600">
                    {vehicle.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-sm font-medium text-slate-500">
                      Fleet unit
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
      </div>
    </section>
  );
}
