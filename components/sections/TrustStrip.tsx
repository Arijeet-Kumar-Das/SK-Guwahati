"use client";

import {
  ShieldCheck,
  Cog,
  Leaf,
  HardHat,
  Clock,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

const trustPoints = [
  { icon: ShieldCheck, text: "GMC Compliant" },
  { icon: Cog, text: "Fully Mechanized" },
  { icon: Leaf, text: "NGT Guidelines" },
  { icon: HardHat, text: "Safety Standards" },
  { icon: Clock, text: "24/7 Operations" },
];

export default function TrustStrip() {
  return (
    <section className="relative bg-navy-900 border-t border-white/[0.04] border-b border-b-white/[0.04]">
      <div className="section-container py-5 lg:py-6">
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-12">
          {trustPoints.map((point) => (
            <StaggerItem key={point.text}>
              <div className="flex items-center gap-2.5 text-sm">
                <point.icon
                  size={16}
                  className="text-brand-green-400 flex-shrink-0"
                />
                <span className="text-navy-200 font-medium whitespace-nowrap">
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
