"use client";

import { FadeUp } from "@/components/ui/motion";
import { CheckCircle2, Clock, MessageCircle, Phone } from "lucide-react";

interface ContactCTAProps {
  siteSettings: {
    phone?: string;
    whatsapp?: string;
  };
}

export default function ContactCTA({ siteSettings }: ContactCTAProps) {
  const phone = siteSettings?.phone || "09864074129";
  const whatsapp = siteSettings?.whatsapp || "918005429901";

  return (
    <section
      aria-label="Call to Action"
      className="relative overflow-hidden bg-navy-950 py-20 lg:py-24"
    >
      <div className="absolute inset-0 industrial-grid" />

      <div className="section-container relative z-10 text-center">
        <FadeUp>
          <p className="section-label justify-center text-brand-green-400">
            Request Service
          </p>

          <h2
            className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Need septic tank or drain cleaning today?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-navy-200 sm:text-lg">
            Contact the S.K Enterprise operations team for fast scheduling,
            clear coordination, and professional mechanized service in Guwahati.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-semibold text-navy-200">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-green-400" />
              <span>Prompt response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-green-400" />
              <span>Transparent service coordination</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-green-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-green-600/20 transition-all duration-200 hover:bg-brand-green-700 hover:shadow-brand-green-600/25"
            >
              <Phone size={18} className="transition-transform group-hover:scale-105" />
              Call Now
            </a>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/10 px-8 py-4 text-base font-bold text-white transition-colors duration-200 hover:bg-white/15"
            >
              <MessageCircle
                size={18}
                className="transition-transform group-hover:scale-105"
              />
              WhatsApp
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
