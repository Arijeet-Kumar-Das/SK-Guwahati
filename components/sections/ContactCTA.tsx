"use client";

import {
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { FadeUp } from "@/components/ui/motion";

interface ContactCTAProps {
  siteSettings: {
    phone?: string;
    whatsapp?: string;
  };
}

export default function ContactCTA({ siteSettings }: ContactCTAProps) {
  const phone = siteSettings?.phone || "09864074129";
  const whatsapp = siteSettings?.whatsapp || "919864074129";

  return (
    <section
      aria-label="Call to Action"
      className="py-24 lg:py-28 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

      {/* Industrial grid overlay */}
      <div className="absolute inset-0 industrial-grid" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-green-600/8" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-navy-600/20" />
      </div>

      <div className="section-container relative z-10 text-center">
        <FadeUp>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Need Septic Tank Cleaning Today?
          </h2>

          <p className="text-lg text-navy-200 mt-5 max-w-xl mx-auto">
            Contact our team now for fast, professional and hygienic
            service anywhere in Guwahati.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-navy-300">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-green-400" />
              <span>30-Minute Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-brand-green-400"
              />
              <span>No Hidden Charges</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href={`tel:${phone}`}
              className="group inline-flex items-center gap-2.5 bg-brand-green-600 hover:bg-brand-green-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-green-600/25 hover:shadow-brand-green-500/30"
            >
              <Phone
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              Call Now
            </a>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 glass-card bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              <MessageCircle
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              WhatsApp
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}