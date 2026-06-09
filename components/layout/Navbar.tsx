"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  phone?: string;
}

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ phone = "09864074129" }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showSolid = !isHome || scrolled || mobileOpen;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        showSolid
          ? "border-slate-200/80 bg-white/95 shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur-md"
          : "border-white/10 bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div
              className={`relative h-11 w-11 overflow-hidden rounded-lg border ${
                showSolid ? "border-slate-200 bg-white" : "border-white/15 bg-white/10"
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="S.K Enterprise Logo"
                fill
                className="object-contain p-1"
                sizes="44px"
                priority
              />
            </div>

            <div>
              <div
                className={`text-lg font-extrabold transition-colors duration-300 ${
                  showSolid ? "text-navy-950" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                S.K Enterprise
              </div>
              <div
                className={`text-[11px] font-semibold uppercase transition-colors duration-300 ${
                  showSolid ? "text-slate-500" : "text-navy-200"
                }`}
              >
                Mechanized sanitation services
              </div>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    showSolid
                      ? isActive
                        ? "bg-navy-50 text-navy-950"
                        : "text-slate-600 hover:bg-navy-50 hover:text-navy-950"
                      : isActive
                        ? "bg-white/12 text-white"
                        : "text-navy-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-brand-green-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-brand-green-700 hover:shadow-md"
            >
              <Phone size={16} />
              <span>{phone}</span>
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors lg:hidden ${
              showSolid
                ? "text-navy-950 hover:bg-navy-50"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-20 z-40 bg-navy-950/55 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-20 z-50 w-[min(320px,88vw)] overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-navy-50 text-navy-950"
                          : "text-slate-700 hover:bg-navy-50 hover:text-navy-950"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="h-2 w-2 rounded-sm bg-brand-green-600" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <a
                  href={`tel:${phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green-600 px-5 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-green-700"
                >
                  <Phone size={18} />
                  <span>Call {phone}</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
