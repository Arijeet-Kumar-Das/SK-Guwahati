"use client";

import Link from "next/link";
import {
  Truck,
  Zap,
  Building2,
  Factory,
  Droplets,
  Cog,
  ArrowRight,
} from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesPreviewProps {
  services: Service[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  Zap,
  Building2,
  Factory,
  Droplets,
  Cog,
};

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  const previewServices = services.slice(0, 3);

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="section-container">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Professional septic tank, drain, and sewer cleaning services
            with modern mechanized equipment for homes and businesses.
          </p>
        </FadeUp>

        {/* Service cards */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previewServices.map((service) => {
            const Icon = iconMap[service.icon] || Cog;

            return (
              <StaggerItem key={service._id}>
                <div className="group bg-slate-50 hover:bg-white rounded-2xl p-7 ring-1 ring-slate-200/60 hover:ring-navy-200 transition-all duration-300 card-hover h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 group-hover:bg-brand-green-600 flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-navy-900 mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View all link */}
        <FadeUp className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand-green-600 hover:text-brand-green-500 font-semibold text-base transition-colors duration-200 group"
          >
            View All Services
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
