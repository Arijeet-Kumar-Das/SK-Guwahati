"use client";

import {
  ShieldCheck,
  Truck,
  Building2,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { SlideIn } from "@/components/ui/motion";

interface CompanyOverviewProps {
  overview: {
    title: string;
    description: string;
  };
}

const capabilities = [
  {
    icon: Truck,
    title: "5 Specialized Vehicles",
    description:
      "Modern mechanized fleet including a high-capacity 6000L Super Sucker.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Mechanized",
    description:
      "No direct human contact with septic sludge, ensuring safer operations.",
  },
  {
    icon: BadgeCheck,
    title: "GMC & NGT Compliant",
    description:
      "Processes aligned with environmental and regulatory requirements.",
  },
  {
    icon: Building2,
    title: "Domestic & Commercial",
    description:
      "Trusted across homes, hospitals, industries, and airport facilities.",
  },
];

export default function CompanyOverview({ overview }: CompanyOverviewProps) {
  const paragraphs = overview?.description?.split("\n\n").filter(Boolean) ?? [];

  return (
    <section
      aria-label="About S.K Enterprise"
      className="relative overflow-hidden bg-[#07111f] py-24 lg:py-32"
    >
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute right-[-5%] top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <SlideIn direction="left">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-emerald-400/70" />
                <p className="text-sm font-medium tracking-[0.18em] text-emerald-300/90 uppercase">
                  About S.K. Enterprise
                </p>
              </div>

              <h2
                className="max-w-[11ch] text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {overview?.title}
              </h2>

              {paragraphs[0] && (
                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                  {paragraphs[0]}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-emerald-300" />
                  Trusted Across Guwahati
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  Safe & Hygienic Process
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <p className="text-2xl font-semibold text-white">5+</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Specialized units
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,0.12)]">
                  <p className="text-2xl font-semibold text-white">100%</p>
                  <p className="mt-1 text-sm text-emerald-100/80">
                    Mechanized handling
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <p className="text-2xl font-semibold text-white">GMC</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Compliant operations
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-5 text-base leading-8 text-slate-300">
                {paragraphs.slice(1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            <div className="grid gap-5 sm:grid-cols-2">
              {capabilities.map((item, index) => (
                <div
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/30 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(34,197,94,0.12)] ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_24px_rgba(74,222,128,0.16)]">
                      <item.icon className="h-6 w-6" />
                    </div>

                    <h3
                      className="text-xl font-semibold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-[28ch] text-sm leading-7 text-slate-300 sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-60" />
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
