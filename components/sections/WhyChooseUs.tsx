"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  Award,
  BadgeCheck,
  Building2,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";

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
      className="relative overflow-hidden bg-navy-950 py-20 lg:py-28"
    >
      <div className="absolute inset-0 industrial-grid" />

      <div className="section-container relative z-10">
        <FadeUp className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-label justify-center text-brand-green-400">
            Why S.K Enterprise
          </p>
          <h2 className="section-title !text-white">Built for Reliable Field Work</h2>
          <p className="section-subtitle mx-auto !text-navy-200">
            Professional systems, trained operators, and modern vehicles for
            customers who need clean execution without uncertainty.
          </p>
        </FadeUp>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || ShieldCheck;

            return (
              <StaggerItem key={item._id}>
                <article className="enterprise-card-dark card-hover group h-full p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-brand-green-400 transition-colors duration-300 group-hover:bg-brand-green-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3
                    className="text-lg font-extrabold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-navy-200">
                    {item.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
