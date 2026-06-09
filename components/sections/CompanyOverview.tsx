"use client";

import { SlideIn } from "@/components/ui/motion";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface CompanyOverviewProps {
  overview: {
    title: string;
    description: string;
  };
}

const capabilities = [
  {
    icon: Truck,
    title: "Specialized Fleet",
    description:
      "Mechanized vehicles sized for residential lanes, commercial sites, and heavy-duty industrial work.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Handling",
    description:
      "Structured process reduces manual contact and keeps cleaning work controlled and professional.",
  },
  {
    icon: BadgeCheck,
    title: "Compliant Operations",
    description:
      "Operational practices aligned with local civic and environmental expectations.",
  },
  {
    icon: Building2,
    title: "Multi-Sector Support",
    description:
      "Trusted by domestic, hospital, airport, institutional, commercial, and industrial clients.",
  },
];

const proofPoints = ["Modern equipment", "Trained crew", "Transparent service"];

export default function CompanyOverview({ overview }: CompanyOverviewProps) {
  const paragraphs = overview?.description?.split("\n\n").filter(Boolean) ?? [];

  return (
    <section
      aria-label="About S.K Enterprise"
      className="bg-white py-20 lg:py-28"
    >
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* LEFT SIDE */}

          <SlideIn direction="left">
            <div className="max-w-2xl">
              <p className="section-label">About S.K Enterprise</p>

              <h2 className="section-title max-w-2xl">
                {overview?.title ||
                  "Mechanized sanitation services for Guwahati"}
              </h2>

              {paragraphs[0] && (
                <p className="mt-6 text-lg leading-8 text-slate-700">
                  {paragraphs[0]}
                </p>
              )}

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-navy-900"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green-600" />
                    {point}
                  </div>
                ))}
              </div>

              {paragraphs.length > 1 && (
                <div className="mt-10 space-y-6 text-base leading-8 text-slate-600">
                  {paragraphs.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </SlideIn>

          {/* RIGHT SIDE */}

          <SlideIn direction="right" delay={0.12}>
            <div className="lg:sticky lg:top-28">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* STATS CARD */}

                <div className="enterprise-card relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-[#032b22] p-7 text-white sm:col-span-2">
                  <div className="industrial-grid absolute inset-0 opacity-20" />

                  <div className="relative z-10">
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div>
                        <p
                          className="text-4xl font-extrabold text-white"
                          style={{
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          5+
                        </p>

                        <p className="mt-2 text-sm text-white/70">
                          Fleet Units
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-4xl font-extrabold text-white"
                          style={{
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          24/7
                        </p>

                        <p className="mt-2 text-sm text-white/70">
                          Availability
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-4xl font-extrabold text-white"
                          style={{
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          100%
                        </p>

                        <p className="mt-2 text-sm text-white/70">
                          Mechanized Focus
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CAPABILITY CARDS */}

                {capabilities.map((item) => (
                  <article
                    key={item.title}
                    className="enterprise-card card-hover group p-6"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-600/10 text-brand-green-700 transition-all duration-300 group-hover:bg-brand-green-600 group-hover:text-white">
                      <item.icon className="h-5 w-5" />
                    </div>

                    <h3
                      className="text-lg font-extrabold text-navy-950"
                      style={{
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
