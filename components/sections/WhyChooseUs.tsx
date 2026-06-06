"use client";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Building2,
  Leaf,
  Award,
} from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  FadeUp,
} from "@/components/ui/motion";

interface WhyChooseUsItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsProps {
  items: WhyChooseUsItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Building2,
  Leaf,
  Award,
};

export default function WhyChooseUs({ items }: WhyChooseUsProps) {
  return (
    <section
      id="why-us"
      aria-label="Why Choose Us"
      className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden"
    >
      {/* Industrial grid overlay */}
      <div className="absolute inset-0 industrial-grid" />

      {/* Decorative background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-navy-800/20 -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-green-600/5 translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label text-brand-green-400">
            Why S.K Enterprise
          </p>
          <h2 className="section-title !text-white">Why Choose Us</h2>
          <p className="section-subtitle !text-navy-300 mx-auto">
            Trusted by industries, hospitals, government organizations
            and residential customers across Guwahati.
          </p>
        </FadeUp>

        {/* Cards grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || ShieldCheck;

            return (
              <StaggerItem key={item._id}>
                <div className="group glass-card rounded-2xl p-7 hover:border-brand-green-400/20 transition-all duration-300 card-hover h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-green-600/15 flex items-center justify-center mb-5 group-hover:bg-brand-green-600/25 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-brand-green-400" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-navy-300 text-sm leading-relaxed">
                    {item.description}
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