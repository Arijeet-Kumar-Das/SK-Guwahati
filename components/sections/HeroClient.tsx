"use client";

import { Phone, MessageCircle, Star, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/motion";

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
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background: premium navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />

      {/* Industrial grid overlay */}
      <div className="absolute inset-0 industrial-grid" />

      {/* Decorative geometric elements — right side */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-16 right-[8%] w-[340px] h-[340px] rounded-3xl bg-navy-800/25 border border-white/[0.04]"
          style={{ transform: "rotate(15deg)" }}
        />
        <div
          className="absolute top-[35%] right-[4%] w-[260px] h-[260px] rounded-2xl bg-navy-700/15 border border-white/[0.03]"
          style={{ transform: "rotate(-12deg)" }}
        />
        <div
          className="absolute top-[22%] right-[22%] w-[120px] h-[120px] rounded-xl bg-brand-green-600/8 border border-brand-green-400/10"
          style={{ transform: "rotate(30deg)" }}
        />
        <div
          className="absolute bottom-[10%] right-[12%] w-[200px] h-[200px] rounded-2xl bg-navy-800/20 border border-white/[0.03]"
          style={{ transform: "rotate(-25deg)" }}
        />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-brand-green-600/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full pt-32 pb-20 lg:pt-36 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Trust badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 text-sm text-navy-300">
              <Star
                size={14}
                className="text-brand-green-400"
                fill="currentColor"
              />
              <span className="font-medium">
                4.8 Rating · Trusted Across Guwahati
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight"
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

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg lg:text-xl text-navy-200 max-w-2xl leading-relaxed"
          >
            {siteSettings?.heroDescription ||
              "Fast, hygienic, and affordable septic tank cleaning services across Guwahati with modern mechanized equipment and 24/7 support."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href={`tel:${phone}`}
              className="group inline-flex items-center gap-2.5 bg-brand-green-600 hover:bg-brand-green-500 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-green-600/25 hover:shadow-brand-green-500/30"
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
              className="group inline-flex items-center gap-2.5 glass-card bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              <MessageCircle
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mt-10 text-sm text-navy-300"
          >
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-green-400" />
              <span>Safe &amp; Hygienic</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-green-400" />
              <span>Fast Response</span>
            </div>
          </motion.div>

          {/* Stats strip - fixed */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-[1.35fr_1fr_1fr] gap-6 mt-16 pt-10 border-t border-white/10 max-w-3xl"
          >
            {/* Projects */}
            <div className="min-w-0">
              <div
                className="text-[2rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold text-white leading-none tracking-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <CountUp end={200000} suffix="+" />
              </div>
              <div className="text-sm text-navy-300 mt-2">
                Projects Completed
              </div>
            </div>

            {/* Rating */}
            <div className="min-w-0">
              <div
                className="text-[2rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold text-white leading-none tracking-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                4.8★
              </div>
              <div className="text-sm text-navy-300 mt-2">Customer Rating</div>
            </div>

            {/* Available */}
            <div className="min-w-0">
              <div
                className="text-[2rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold text-white leading-none tracking-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                24/7
              </div>
              <div className="text-sm text-navy-300 mt-2">Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
