import { Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  siteSettings: {
    companyName: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
}

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  "Septic Tank Cleaning",
  "Drain Cleaning",
  "Sewer Cleaning",
  "Emergency Service",
];

export default function Footer({ siteSettings }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-white relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-green-600/40 to-transparent" />

      {/* Pre-footer CTA */}
      <div className="border-b border-white/[0.06]">
        <div className="section-container py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl lg:text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to Get Started?
              </h3>
              <p className="text-navy-300 mt-2">
                Contact us today for fast, professional septic tank cleaning.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${siteSettings.phone}`}
                className="inline-flex items-center gap-2 bg-brand-green-600 hover:bg-brand-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                <Phone size={16} />
                Call Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                Request Service
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-600 text-white font-extrabold text-sm"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                SK
              </div>
              <div>
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {siteSettings.companyName}
                </div>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed">
              Professional septic tank cleaning services across Guwahati with
              modern equipment, trained technicians, and reliable 24/7 support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-[0.2em] text-navy-200 mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-green-400 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-[0.2em] text-navy-200 mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <span className="text-navy-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-[0.2em] text-navy-200 mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${siteSettings.phone}`}
                className="flex gap-3 items-start text-navy-400 hover:text-white transition-colors duration-200 group"
              >
                <Phone
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-brand-green-400"
                />
                <span className="text-sm">{siteSettings.phone}</span>
              </a>

              <a
                href={`https://wa.me/${siteSettings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-start text-navy-400 hover:text-white transition-colors duration-200 group"
              >
                <MessageCircle
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-brand-green-400"
                />
                <span className="text-sm">WhatsApp</span>
              </a>

              <div className="flex gap-3 items-start text-navy-400">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-brand-green-400"
                />
                <span className="text-sm">{siteSettings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-sm">
            © {new Date().getFullYear()} {siteSettings.companyName}. All rights
            reserved.
          </p>
          <p className="text-navy-600 text-xs">
            Professional Septic Tank Services · Guwahati, Assam
          </p>
        </div>
      </div>
    </footer>
  );
}