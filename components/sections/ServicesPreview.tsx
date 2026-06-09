"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  ArrowRight,
  Building2,
  Cog,
  Droplets,
  Factory,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="section-container">
        <FadeUp className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-label justify-center">What We Do</p>
          <h2 className="section-title">Enterprise-Grade Cleaning Services</h2>
          <p className="section-subtitle mx-auto">
            Mechanized septic, drain, sewer, and waste-management support for
            residential, commercial, institutional, and industrial sites.
          </p>
        </FadeUp>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((service) => {
            const Icon = iconMap[service.icon] || Cog;

            return (
              <StaggerItem key={service._id}>
                <article className="enterprise-card card-hover group flex h-full flex-col p-6 lg:p-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white transition-colors duration-300 group-hover:bg-brand-green-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3
                    className="text-xl font-extrabold leading-snug text-navy-950"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeUp className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-navy-950 transition-colors hover:border-brand-green-600 hover:text-brand-green-700"
          >
            View All Services
            <ArrowRight size={17} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
