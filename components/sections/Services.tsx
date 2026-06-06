"use client";

import {
  Truck,
  Zap,
  Building2,
  Factory,
  Droplets,
  Cog,
} from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
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
      className="py-16 lg:py-24 bg-white"
    >
      <div className="section-container">
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured First Card — spans 2 columns on large screens */}
          {featured && (() => {
            const FeaturedIcon =
              iconMap[featured.icon as keyof typeof iconMap] || Cog;

            return (
              <StaggerItem className="lg:col-span-2">
                <div className="group h-full bg-navy-950 rounded-3xl p-8 lg:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
                  {/* Subtle grid texture */}
                  <div className="absolute inset-0 industrial-grid opacity-40" />

                  {/* Glow accent */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-green-600/10 blur-3xl transition-all duration-700 group-hover:bg-brand-green-600/20" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-brand-green-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-green-600/25 transition-transform duration-300 group-hover:scale-110">
                      <FeaturedIcon className="h-8 w-8 text-white" />
                    </div>

                    <div className="flex-1">
                      {/* Label */}
                      <span className="inline-block text-brand-green-400 text-xs font-bold uppercase tracking-widest mb-3">
                        Featured Service
                      </span>

                      {/* Title */}
                      <h3
                        className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {featured.title}
                      </h3>

                      {/* Description */}
                      <p className="text-navy-300 leading-relaxed text-base lg:text-lg max-w-xl">
                        {featured.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })()}

          {/* Regular Service Cards */}
          {rest.map((service) => {
            const Icon =
              iconMap[service.icon as keyof typeof iconMap] || Cog;

            return (
              <StaggerItem key={service._id}>
                <div className="group h-full bg-slate-50 hover:bg-white rounded-2xl p-7 ring-1 ring-slate-200/60 hover:ring-navy-200 shadow-none hover:shadow-xl transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center mb-5 group-hover:bg-brand-green-600 transition-colors duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-navy-900 mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
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