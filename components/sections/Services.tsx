"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Building2, Cog, Droplets, Factory, Truck, Zap } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Truck,
  Zap,
  Building2,
  Factory,
  Droplets,
  Cog,
};

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) return null;

  const [featured, ...rest] = services;

  return (
    <section
      id="services"
      aria-label="Our Services"
      className="bg-white py-16 lg:py-24"
    >
      <div className="section-container">
        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured &&
            (() => {
              const FeaturedIcon =
                iconMap[featured.icon as keyof typeof iconMap] || Cog;

              return (
                <StaggerItem className="lg:col-span-2">
                  <article className="enterprise-card-dark relative flex h-full overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-[#032b22] p-8 lg:p-10">
                    <div className="absolute inset-0 industrial-grid opacity-60" />
                    <div className="relative z-10 grid gap-6 sm:grid-cols-[auto_1fr]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-600 text-white shadow-[0_0_35px_rgba(34,197,94,0.35)]">
                        <FeaturedIcon className="h-7 w-7" />
                      </div>

                      <div>
                        <span className="inline-block text-sm font-bold tracking-[0.25em] uppercase text-brand-green-400">
                          Featured Service
                        </span>
                        <h3
                          className="mt-3 text-2xl font-extrabold leading-tight text-white lg:text-3xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {featured.title}
                        </h3>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-navy-200">
                          {featured.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })()}

          {rest.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Cog;

            return (
              <StaggerItem key={service._id}>
                <article className="enterprise-card card-hover group flex h-full flex-col p-6 lg:p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white transition-colors duration-300 group-hover:bg-brand-green-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3
                    className="text-xl font-extrabold leading-snug text-navy-950"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
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
