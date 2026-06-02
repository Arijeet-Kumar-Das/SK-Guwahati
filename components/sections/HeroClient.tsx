"use client";

import { Phone, MessageCircle, Star, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

const stats = [
  { value: "500+", label: "Jobs Completed" },
  { value: "4.8★", label: "Customer Rating" },
  { value: "24/7", label: "Available" },
];

export default function HeroClient({ siteSettings }: HeroClientProps) {
  return (
    <section aria-label="Hero" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background: premium navy gradient with geometric pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />

      {/* Subtle geometric decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-right large circle */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-navy-700/20" />
        {/* Bottom-left soft glow */}
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-brand-green-600/8" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
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
            <div className="inline-flex items-center gap-2 bg-brand-green-600/15 border border-brand-green-400/20 text-brand-green-400 px-4 py-2 rounded-full text-sm font-medium">
              <Star size={14} fill="currentColor" />
              <span>4.8 Rating · Trusted Across Guwahati</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {siteSettings?.heroTitle || (
              <>
                Professional Septic Tank
                <br />
                <span className="text-brand-green-400">
                  Cleaning Services
                </span>
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg lg:text-xl text-navy-200 max-w-2xl leading-relaxed"
          >
            {siteSettings?.heroDescription ||
              "Fast, hygienic, and affordable septic tank cleaning services across Guwahati with modern equipment and 24/7 support."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href={`tel:${siteSettings?.phone || "09864074129"}`}
              className="group inline-flex items-center gap-2.5 bg-brand-green-600 hover:bg-brand-green-500 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-green-600/25 hover:shadow-brand-green-500/30"
            >
              <Phone size={18} className="transition-transform group-hover:scale-110" />
              Call Now
            </a>

            <a
              href={`https://wa.me/${siteSettings?.whatsapp || "919864074129"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust indicators row */}
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

          {/* Stats strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10 max-w-lg"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl lg:text-4xl font-extrabold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-navy-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
