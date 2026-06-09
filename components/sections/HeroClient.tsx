"use client";

import { CountUp } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Phone, Shield, Star } from "lucide-react";

interface HeroClientProps {
  siteSettings: {
    heroTitle?: string;
    heroDescription?: string;
    phone?: string;
    whatsapp?: string;
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroClient({ siteSettings }: HeroClientProps) {
  const phone = siteSettings?.phone || "09864074129";
  const whatsapp = siteSettings?.whatsapp || "919864074129";

  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute inset-0 industrial-grid" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute right-[7%] top-[14%] h-72 w-72 rounded-lg border border-white/10 bg-white/[0.025]"
          style={{ transform: "rotate(14deg)" }}
        />
        <div
          className="absolute right-[17%] top-[36%] h-36 w-36 rounded-lg border border-brand-green-400/20 bg-brand-green-600/10"
          style={{ transform: "rotate(-10deg)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>

      <div className="section-container relative z-10 w-full pt-32 pb-20 lg:pt-36 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-navy-200">
              <Star
                size={15}
                className="text-brand-green-400"
                fill="currentColor"
              />
              <span>4.8 rating trusted across Guwahati</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-4xl text-4xl font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {siteSettings?.heroTitle || (
              <>
                Professional Septic Tank
                <br />
                <span className="text-brand-green-400">Cleaning Services</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-7 text-navy-200 sm:text-lg lg:text-xl"
          >
            {siteSettings?.heroDescription ||
              "Fast, hygienic, and affordable septic tank cleaning services across Guwahati with modern mechanized equipment and 24/7 support."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href={`tel:${phone}`}
              className="group inline-flex items-center gap-2.5 rounded-lg bg-brand-green-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-brand-green-600/20 transition-all duration-200 hover:bg-brand-green-700 hover:shadow-brand-green-600/25"
            >
              <Phone
                size={18}
                className="transition-transform group-hover:scale-105"
              />
              Call Now
            </a>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/10 px-7 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-white/15"
            >
              <MessageCircle
                size={18}
                className="transition-transform group-hover:scale-105"
              />
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-5 text-sm font-medium text-navy-200"
          >
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-green-400" />
              <span>Safe and hygienic</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-green-400" />
              <span>Fast response</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-14 grid max-w-3xl gap-5 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
            <div className="min-w-0">
              <div
                className="text-2xl font-extrabold leading-none text-white sm:text-3xl lg:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <CountUp end={300000} suffix="+" />
              </div>
              <div className="mt-2 text-sm text-navy-300">
                Projects completed
              </div>
            </div>

            <div className="min-w-0 ">
              <div
                className="text-3xl font-extrabold leading-none text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                4.8
              </div>
              <div className="mt-2 text-sm text-navy-300">Customer rating</div>
            </div>

            <div className="min-w-0">
              <div
                className="text-3xl font-extrabold leading-none text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                24/7
              </div>
              <div className="mt-2 text-sm text-navy-300">Availability</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
