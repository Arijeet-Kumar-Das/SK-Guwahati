"use client";

import {
  Clock,
  ShieldCheck,
  Truck,
  IndianRupee,
  Sparkles,
  MapPin,
} from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  FadeUp,
} from "@/components/ui/motion";

const features = [
  {
    icon: Clock,
    title: "Fast Response",
    description: "Quick arrival and efficient septic tank cleaning services.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic",
    description: "Modern cleaning methods with proper waste handling.",
  },
  {
    icon: Truck,
    title: "Modern Equipment",
    description: "High-powered suction machines for thorough cleaning.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Transparent rates with no hidden charges.",
  },
  {
    icon: Sparkles,
    title: "Professional Service",
    description: "Experienced team committed to customer satisfaction.",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Serving Guwahati and nearby areas every day.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" aria-label="Why Choose Us" className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-navy-800/30 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-green-600/5 translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label text-brand-green-400">Why S.K Enterprise</p>
          <h2 className="section-title !text-white">Why Choose Us</h2>
          <p className="section-subtitle !text-navy-300 mx-auto">
            Guwahati&apos;s most trusted septic tank cleaning service with 500+
            successful completions.
          </p>
        </FadeUp>

        {/* Feature grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <div className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-brand-green-400/20 rounded-2xl p-7 transition-all duration-300 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-brand-green-600/15 flex items-center justify-center mb-5 group-hover:bg-brand-green-600/25 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-brand-green-400" />
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-navy-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}