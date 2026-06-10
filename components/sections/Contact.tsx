"use client";

import { FadeUp, SlideIn } from "@/components/ui/motion";
import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface ContactProps {
  siteSettings: {
    phone: string;
    whatsapp?: string;
    address: string;
    workingHours: string;
    googleMapsUrl: string;
  };
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  service?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success";

const PHONE_REGEX = /^(?:\+91|0)?[6-9]\d{9}$/;

/** WhatsApp booking number — form enquiries go here */
const WHATSAPP_BOOKING_NUMBER = "918005429901";

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = "Name is required";

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else {
    const cleaned = data.phone.replace(/[\s-]/g, "");
    if (!PHONE_REGEX.test(cleaned)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
  }

  if (!data.address.trim()) errors.address = "Address is required";
  if (!data.service) errors.service = "Please select a service";
  if (!data.message.trim()) errors.message = "Message is required";

  return errors;
}

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  address: "",
  service: "",
  message: "",
};

const SERVICES = [
  "Septic Tank Cleaning",
  "Drain Cleaning",
  "Emergency Service",
] as const;

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Office",
    key: "address" as const,
  },
  {
    icon: Phone,
    label: "Phone",
    key: "phone" as const,
  },
  {
    icon: Clock,
    label: "Working Hours",
    key: "workingHours" as const,
  },
];

function inputClasses(hasError: boolean): string {
  return `w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-slate-400 transition-all duration-200 focus:border-brand-green-600 focus:outline-none focus:ring-3 focus:ring-brand-green-600/15 disabled:cursor-not-allowed disabled:opacity-50 ${
    hasError ? "border-red-400 bg-red-50/50" : "border-slate-300"
  }`;
}

/**
 * Build a WhatsApp message URL with the form data.
 * Opens a new tab/window to WhatsApp with a pre-filled professional message.
 */
function buildWhatsAppUrl(data: FormData): string {
  const message = [
    "🔧 *New Service Request — S.K Enterprise*",
    "",
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    `*Location:* ${data.address}`,
    `*Service Required:* ${data.service}`,
    `*Message:* ${data.message}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_BOOKING_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Contact({ siteSettings }: ContactProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Open WhatsApp with the pre-filled message
    const whatsappUrl = buildWhatsAppUrl(formData);
    window.open(whatsappUrl, "_blank");

    // Show success state
    setStatus("success");
    setFormData(INITIAL_FORM);

    setTimeout(() => {
      setStatus("idle");
    }, 6000);
  }

  const whatsapp = siteSettings.whatsapp || "919864074129";

  return (
    <section
      id="contact"
      aria-label="Contact Us"
      className="bg-white py-16 lg:py-24"
    >
      <div className="section-container">
        <FadeUp className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-label justify-center">Get in Touch</p>
          <h2 className="section-title">Book a Professional Cleaning Service</h2>
          <p className="section-subtitle mx-auto">
            Call, message, or fill out the service request form below. Your
            enquiry will be sent directly via WhatsApp for a fast response.
          </p>
        </FadeUp>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <SlideIn direction="left">
            <div className="space-y-5">
              <div className="rounded-lg bg-navy-950 p-6 text-white lg:p-7">
                <p className="section-label text-brand-green-400">
                  Direct Support
                </p>
                <h3
                  className="mt-4 text-2xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Fast response for scheduled and urgent sanitation work
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${siteSettings.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-green-700"
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>

              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.key}
                    className="enterprise-card flex items-start gap-4 p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green-600/10 text-brand-green-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-extrabold text-navy-950"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {siteSettings[item.key]}
                      </p>
                    </div>
                  </article>
                );
              })}

              <div className="h-[330px] overflow-hidden rounded-lg border border-slate-200 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
                <iframe
                  src={
                    siteSettings.googleMapsUrl ||
                    "https://maps.google.com/maps?q=Solapara%20Road%20Guwahati&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  }
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  title="S.K Enterprise location on Google Maps"
                  className="border-0"
                />
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <div className="enterprise-card p-6 lg:p-8">
              <div className="mb-7">
                <h3
                  className="text-2xl font-extrabold text-navy-950"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Request Service
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fill in your details and your enquiry will open directly in
                  WhatsApp for instant communication.
                </p>
              </div>

              {status === "success" && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-brand-green-600/20 bg-brand-green-600/10 p-4 text-brand-green-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm font-semibold">
                    Your enquiry has been opened in WhatsApp. If WhatsApp did not
                    open, please call us directly at {siteSettings.phone}.
                  </p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-navy-950"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses(!!errors.name)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-navy-950"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses(!!errors.phone)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-bold text-navy-950"
                    >
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputClasses(!!errors.service)}
                      aria-invalid={!!errors.service}
                      aria-describedby={
                        errors.service ? "service-error" : undefined
                      }
                    >
                      <option value="">Select service</option>
                      {SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p
                        id="service-error"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-bold text-navy-950"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Service address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClasses(!!errors.address)}
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                  />
                  {errors.address && (
                    <p
                      id="address-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-navy-950"
                  >
                    Requirement
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe your requirement"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses(!!errors.message)} resize-y`}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-green-600/20 transition-all duration-200 hover:bg-brand-green-700 hover:shadow-brand-green-600/25"
                >
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
