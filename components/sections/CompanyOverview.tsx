"use client";

import {
  ShieldCheck,
  Truck,
  Building2,
  BadgeCheck,
} from "lucide-react";

interface CompanyOverviewProps {
  overview: {
    title: string;
    description: string;
  };
}

export default function CompanyOverview({
  overview,
}: CompanyOverviewProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="section-container">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="section-label">
              About S.K Enterprise
            </p>

            <h2 className="section-title text-left">
              {overview?.title}
            </h2>

            <div className="mt-10 space-y-6 text-slate-600 leading-relaxed text-lg">
              {overview?.description
                ?.split("\n\n")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">

            <div className="bg-slate-50 rounded-2xl p-6">
              <Truck className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">
                5 Specialized Vehicles
              </h3>
              <p className="text-slate-600 text-sm">
                Modern mechanized fleet including a 6000L Super Sucker.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">
                Fully Mechanized
              </h3>
              <p className="text-slate-600 text-sm">
                No direct human contact with septic sludge.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <BadgeCheck className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">
                GMC & NGT Compliant
              </h3>
              <p className="text-slate-600 text-sm">
                Operations follow all regulatory requirements.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <Building2 className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">
                Domestic & Commercial
              </h3>
              <p className="text-slate-600 text-sm">
                Serving homes, industries, hospitals and airports.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}