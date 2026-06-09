"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Clock, Cog, HardHat, Leaf, ShieldCheck } from "lucide-react";

const trustPoints = [
  { icon: ShieldCheck, text: "GMC compliant" },
  { icon: Cog, text: "Fully mechanized" },
  { icon: Leaf, text: "NGT aligned" },
  { icon: HardHat, text: "Safety standards" },
  { icon: Clock, text: "24/7 operations" },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-white/10 bg-navy-900">
      <div className="section-container py-5 lg:py-6">
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:gap-x-10">
          {trustPoints.map((point) => (
            <StaggerItem key={point.text}>
              <div className="flex items-center gap-2.5 text-sm">
                <point.icon
                  size={16}
                  className="shrink-0 text-brand-green-400"
                />
                <span className="whitespace-nowrap font-semibold text-navy-100">
                  {point.text}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
