import { Phone, MapPin, MessageCircle } from "lucide-react";

interface FooterProps {
  siteSettings: {
    companyName: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
}

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Customer Reviews", href: "#testimonials" },
  { label: "Areas Served", href: "#areas" },
  { label: "Contact Us", href: "#contact" },
];

const serviceLinks = [
  "Septic Tank Cleaning",
  "Drain Cleaning",
  "Sewer Cleaning",
  "Emergency Service",
];

export default function Footer({ siteSettings }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-white">
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
              className="font-bold text-sm uppercase tracking-wider text-navy-200 mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-navy-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider text-navy-200 mb-5"
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
              className="font-bold text-sm uppercase tracking-wider text-navy-200 mb-5"
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
                <span className="text-sm">{siteSettings.whatsapp}</span>
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