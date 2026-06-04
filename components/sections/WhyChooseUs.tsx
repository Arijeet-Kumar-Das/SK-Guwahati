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

const iconMap: Record<string, any> = {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Building2,
  Leaf,
  Award,
};

export default function WhyChooseUs({
  items,
}: WhyChooseUsProps) {
  return (
    <section
      id="why-us"
      aria-label="Why Choose Us"
      className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-navy-800/30 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-green-600/5 translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="section-container relative z-10">

        <FadeUp className="text-center mb-16">
          <p className="section-label text-brand-green-400">
            Why S.K Enterprise
          </p>

          <h2 className="section-title !text-white">
            Why Choose Us
          </h2>

          <p className="section-subtitle !text-navy-300 mx-auto">
            Trusted by industries, hospitals, government organizations
            and residential customers across Guwahati.
          </p>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => {
            const Icon =
              iconMap[item.icon] || ShieldCheck;

            return (
              <StaggerItem key={item._id}>
                <div className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-brand-green-400/20 rounded-2xl p-7 transition-all duration-300 card-hover">

                  <div className="w-12 h-12 rounded-xl bg-brand-green-600/15 flex items-center justify-center mb-5 group-hover:bg-brand-green-600/25 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-brand-green-400" />
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.title}
                  </h3>

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