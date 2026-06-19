"use client";

import { useEffect, useState, useCallback } from "react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const showSolid = !isHome || scrolled || mobileOpen;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${showSolid
          ? "border-slate-200/80 bg-white/95 shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur-md"
          : "border-white/10 bg-transparent"
          }`}
      >
        <div className="section-container">
          <div className="flex h-16 items-center justify-between sm:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12 bg-white shadow-sm ${showSolid ? "border border-slate-200" : "border border-white/20 shadow-md"
                  }`}
              >
                <Image
                  src="/images/logo.png"
                  alt="S.K Enterprise Logo"
                  fill
                  className="object-contain p-1.5"
                  sizes="48px"
                  priority
                  unoptimized
                  key="logo-v3-cropped"
                />
              </div>

              <div className="min-w-0">
                <div
                  className={`text-base font-extrabold transition-colors duration-300 sm:text-lg ${showSolid ? "text-navy-950" : "text-white"
                    }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  S.K Enterprise
                </div>
                <div
                  className={`hidden text-[11px] font-semibold uppercase transition-colors duration-300 sm:block ${showSolid ? "text-slate-500" : "text-navy-200"
                    }`}
                >
                  Mechanized sanitation services
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
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
                    className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${showSolid
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

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-brand-green-700 hover:shadow-md"
              >
                <Phone size={16} />
                <span>{phone}</span>
              </a>
            </div>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={toggleMobile}
              className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-lg transition-colors lg:hidden ${showSolid
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
      </header>

      {/* Mobile menu - rendered as portal-like sibling to avoid header clipping */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-navy-950/60 backdrop-blur-sm lg:hidden"
              style={{ top: 0 }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-0 z-[60] flex w-[min(320px,85vw)] flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-2xl lg:hidden"
              aria-label="Mobile navigation"
            >
              {/* Panel header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5 sm:h-20">
                <span
                  className="text-base font-extrabold text-navy-950"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-950 transition-colors hover:bg-navy-50"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 space-y-1 p-5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-semibold transition-colors ${isActive
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

              {/* CTA buttons */}
              <div className="shrink-0 space-y-3 border-t border-slate-200 p-5">
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
    </>
  );
}
