"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

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
      className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-brand-green-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-navy-500/5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label">
            Our Fleet
          </p>

          <h2 className="section-title">
            Advanced Mechanized Cleaning Fleet
          </h2>

          <p className="section-subtitle mx-auto">
            Equipped with specialized cesspool vehicles ranging from
            1,000 litres to 6,000 litres for residential, commercial
            and industrial cleaning operations.
          </p>
        </div>
    
        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((vehicle) => (
            <div
              key={vehicle._id}
              className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                {vehicle.image ? (
                  <Image
                    src={urlFor(vehicle.image).width(800).url()}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-slate-100">
                    <Truck className="w-16 h-16 text-slate-400" />
                  </div>
                )}

                {/* Capacity Badge */}
                <div className="absolute top-4 left-4 bg-brand-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {vehicle.capacity}
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7">
                <h3
                  className="text-xl font-bold text-slate-900 mb-4 leading-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {vehicle.name}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 bg-navy-950 rounded-3xl p-8 lg:p-10 text-center">
          <h3
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            Ready For Every Cleaning Challenge
          </h3>

          <p className="text-navy-300 max-w-3xl mx-auto">
            From narrow residential lanes to large industrial facilities,
            our specialized fleet ensures efficient, hygienic and fully
            mechanized cleaning operations across Guwahati and nearby areas.
          </p>
        </div>
      </div>
    </section>
  );
}