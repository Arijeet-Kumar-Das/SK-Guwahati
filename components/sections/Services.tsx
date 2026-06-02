"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  StaggerContainer,
  StaggerItem,
  FadeUp,
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

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" aria-label="Our Services" className="py-24 lg:py-32 bg-white">
      <div className="section-container">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label">What We Do</p>
          <h2 className="section-title text-navy-900">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Professional septic tank and drainage solutions with modern
            equipment and trained technicians.
          </p>
        </FadeUp>

        {/* Service cards */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => (
            <StaggerItem key={service._id}>
              <Card className="card-hover group h-full border-0 bg-slate-50 hover:bg-white ring-1 ring-slate-200/60 hover:ring-navy-200 shadow-none hover:shadow-xl">
                <CardContent className="p-7">
                  {/* Icon area */}
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-5 group-hover:bg-brand-green-600 transition-colors duration-300">
                    <span className="text-xl text-white">
                      {service.icon === "Droplets" && "💧"}
                      {service.icon === "Wrench" && "🔧"}
                      {service.icon === "PipetteIcon" && "🚿"}
                      {service.icon === "AlertTriangle" && "⚡"}
                      {service.icon === "Truck" && "🚛"}
                      {service.icon === "ShieldCheck" && "🛡️"}
                      {!["Droplets", "Wrench", "PipetteIcon", "AlertTriangle", "Truck", "ShieldCheck"].includes(service.icon) && "🔧"}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-navy-900 mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}