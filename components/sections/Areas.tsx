"use client";

import { MapPin } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  FadeUp,
} from "@/components/ui/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Area {
  _id: string;
  name: string;
}

interface AreasProps {
  areas: Area[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Areas({ areas }: AreasProps) {
  return (
    <section
      id="areas"
      aria-label="Areas We Serve"
      className="py-16 lg:py-24 bg-navy-950 relative overflow-hidden"
    >
      {/* Industrial grid overlay */}
      <div className="absolute inset-0 industrial-grid" />

      {/* Decorative circle */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-navy-800/20" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <FadeUp className="text-center mb-14">
          <p className="section-label text-brand-green-400">
            Service Coverage
          </p>
          <h2 className="section-title !text-white">Areas We Serve</h2>
          <p className="section-subtitle !text-navy-300 mx-auto">
            We provide fast and reliable septic tank cleaning services across
            Guwahati and surrounding areas.
          </p>
        </FadeUp>

        {/* Area badges */}
        <StaggerContainer className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-4xl mx-auto">
          {areas.map((area) => (
            <StaggerItem key={area._id}>
              <div className="group inline-flex items-center gap-2 glass-card hover:bg-white/[0.12] border border-white/[0.08] hover:border-brand-green-400/30 rounded-full px-5 py-2.5 transition-all duration-300 cursor-default">
                <MapPin
                  size={14}
                  className="text-brand-green-400 flex-shrink-0"
                />
                <span className="text-sm font-medium text-navy-100 group-hover:text-white transition-colors whitespace-nowrap">
                  {area.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}