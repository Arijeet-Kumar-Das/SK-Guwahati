"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { MapPin } from "lucide-react";

interface Area {
  _id: string;
  name: string;
}

interface AreasProps {
  areas: Area[];
}

export default function Areas({ areas }: AreasProps) {
  return (
    <section
      id="areas"
      aria-label="Areas We Serve"
      className="bg-white py-16 lg:py-24"
    >
      <div className="section-container">
        <FadeUp className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-label justify-center">Service Coverage</p>
          <h2 className="section-title">Areas We Serve</h2>
          <p className="section-subtitle mx-auto">
            Fast and reliable septic tank cleaning services across Guwahati and
            surrounding areas.
          </p>
        </FadeUp>

        <StaggerContainer className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <StaggerItem key={area._id}>
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-brand-green-600/40 hover:bg-white">
                <MapPin size={14} className="shrink-0 text-brand-green-600" />
                <span className="whitespace-nowrap">{area.name}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      {/* Regional Projects Note */}

      <FadeUp className="mt-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-brand-green-200 bg-brand-green-50 p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-green-700">
            Large Project Coverage
          </p>

          <h3 className="mt-2 text-xl font-bold text-navy-950">
            Serving Projects Across the North East Region
          </h3>

          <p className="mt-3 text-slate-600">
            While our regular operations are concentrated across Guwahati,
            Kamrup Rural, Morigaon, Mangaldai and Nagaon, our specialized fleet
            and project teams can be deployed across the entire North East
            region for large-scale industrial, institutional and infrastructure
            projects.
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
