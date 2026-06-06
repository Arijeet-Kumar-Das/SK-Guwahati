"use client";

import { Phone, Truck, CheckCircle2 } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const steps = [
  {
    number: "1",
    title: "Contact Us",
    description:
      "Call us or send a WhatsApp message with your requirements. We respond within 30 minutes and provide an instant quote.",
    icon: Phone,
  },
  {
    number: "2",
    title: "We Arrive",
    description:
      "Our trained crew arrives at your location with the right mechanized vehicle, fully equipped for the job at hand.",
    icon: Truck,
  },
  {
    number: "3",
    title: "Job Done",
    description:
      "We complete the cleaning efficiently, dispose of waste responsibly, and leave your premises spotless. Pay only after satisfaction.",
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-label="How It Works"
      className="py-16 lg:py-24 bg-slate-50"
    >
      <div className="section-container">
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label">Simple Process</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How It Works
          </h2>
          <p className="section-subtitle mx-auto">
            Getting your septic tank cleaned has never been easier. Three simple
            steps and we handle the rest.
          </p>
        </FadeUp>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

          {steps.map((step) => {
            const StepIcon = step.icon;

            return (
              <StaggerItem key={step.number} className="text-center relative">
                {/* Number Circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white ring-1 ring-slate-200 shadow-lg flex items-center justify-center relative z-10">
                    <StepIcon className="w-8 h-8 text-brand-green-600" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center z-20 shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-navy-900 mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
