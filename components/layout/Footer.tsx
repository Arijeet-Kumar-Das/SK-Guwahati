import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
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
  "Emergency Response",
];

export default function Footer({ siteSettings }: FooterProps) {
  return (
    <footer className="relative bg-navy-950 text-white">
      <div className="h-px bg-brand-green-600/60" />

      <div className="border-b border-white/10">
        <div className="section-container py-10 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-green-400">
                <ShieldCheck size={16} />
                Professional mechanized sanitation support
              </div>
              <h3
                className="text-2xl font-extrabold leading-tight text-white lg:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Need a dependable septic or drain cleaning team?
              </h3>
              <p className="mt-3 text-sm leading-6 text-navy-200 sm:text-base">
                Call our Guwahati operations team for prompt scheduling,
                transparent coordination, and clean mechanized execution.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteSettings.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-green-700"
              >
                <Phone size={16} />
                Call Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
              >
                Request Service
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] lg:gap-12">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-white/10 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="S.K Enterprise Logo"
                  fill
                  className="object-contain p-1"
                  sizes="44px"
                />
              </div>
              <div>
                <div
                  className="text-lg font-extrabold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {siteSettings.companyName}
                </div>
                <p className="text-xs font-semibold uppercase text-navy-300">
                  Guwahati sanitation services
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-navy-300">
              Mechanized septic tank cleaning, drain maintenance, sewer
              cleaning, and waste management support for homes, institutions,
              commercial sites, and industrial facilities.
            </p>
          </div>

          <div>
            <h4
              className="mb-5 text-sm font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pages
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex text-sm font-medium text-navy-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5 text-sm font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item} className="text-sm font-medium text-navy-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5 text-sm font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${siteSettings.phone}`}
                className="flex items-start gap-3 text-navy-300 transition-colors hover:text-white"
              >
                <Phone size={17} className="mt-0.5 shrink-0 text-brand-green-400" />
                <span className="text-sm font-medium">{siteSettings.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteSettings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-navy-300 transition-colors hover:text-white"
              >
                <MessageCircle
                  size={17}
                  className="mt-0.5 shrink-0 text-brand-green-400"
                />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
              <div className="flex items-start gap-3 text-navy-300">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-brand-green-400"
                />
                <span className="text-sm leading-6">{siteSettings.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-navy-400 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {siteSettings.companyName}.
            All rights reserved.
          </p>
          <p>Professional septic tank services in Guwahati, Assam.</p>
        </div>
      </div>
    </footer>
  );
}
