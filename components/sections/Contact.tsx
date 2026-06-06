"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import { FadeUp, SlideIn } from "@/components/ui/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactProps {
  siteSettings: {
    phone: string;
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

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const PHONE_REGEX = /^(?:\+91|0)?[6-9]\d{9}$/;

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else {
    const cleaned = data.phone.replace(/[\s-]/g, "");
    if (!PHONE_REGEX.test(cleaned)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
  }

  if (!data.address.trim()) {
    errors.address = "Address is required";
  }

  if (!data.service || data.service === "Select Service") {
    errors.service = "Please select a service";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Contact info items
// ---------------------------------------------------------------------------

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Visit Us",
    key: "address" as const,
  },
  {
    icon: Phone,
    label: "Call Us",
    key: "phone" as const,
  },
  {
    icon: Clock,
    label: "Working Hours",
    key: "workingHours" as const,
  },
];

// ---------------------------------------------------------------------------
// Shared input class builder
// ---------------------------------------------------------------------------

function inputClasses(hasError: boolean): string {
  return `w-full bg-white/[0.06] border ${
    hasError
      ? "border-red-400/60 bg-red-500/10"
      : "border-white/[0.08]"
  } text-white placeholder-navy-400 rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Contact({ siteSettings }: ContactProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // ---- Handlers ----

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setStatus("success");
        setStatusMessage(result.message);
        setFormData(INITIAL_FORM);

        // Auto-dismiss success after 6 seconds
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 6000);
      } else {
        setStatus("error");
        setStatusMessage(result.message);

        // Map server-side field errors
        if (result.errors) {
          setErrors(result.errors as FormErrors);
        }
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Could not connect to server. Please try again or call us directly."
      );
    }
  }

  const isSubmitting = status === "submitting";

  // ---- Render ----

  return (
    <section
      id="contact"
      aria-label="Contact Us"
      className="py-16 lg:py-24 bg-navy-950 relative overflow-hidden"
    >
      {/* Industrial grid overlay */}
      <div className="absolute inset-0 industrial-grid" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-green-600/5" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-navy-800/30" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <FadeUp className="text-center mb-14">
          <p className="section-label text-brand-green-400">Get In Touch</p>
          <h2 className="section-title !text-white">Contact Us</h2>
          <p className="section-subtitle !text-navy-300 mx-auto">
            Ready to schedule a septic tank cleaning? Reach out to us or fill
            in the form below.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ---- LEFT COLUMN: Contact Info + Map ---- */}
          <SlideIn direction="left">
            <div className="space-y-5">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="glass-card rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:bg-white/[0.08]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-green-600/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-green-400" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.label}
                      </h3>
                      <p className="text-navy-300 text-sm leading-relaxed">
                        {siteSettings[item.key]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Google Maps */}
            <div className="mt-6 rounded-2xl overflow-hidden shadow-lg h-[350px] ring-1 ring-white/10">
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
          </SlideIn>

          {/* ---- RIGHT COLUMN: Request Service Form ---- */}
          <SlideIn direction="right" delay={0.15}>
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 border border-white/[0.06]">
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Request Service
              </h3>
              <p className="text-navy-400 text-sm mb-8">
                Fill out the form and we&apos;ll get back to you within 30
                minutes.
              </p>

              {/* ---- Status Toast ---- */}
              {status === "success" && (
                <div className="mb-6 flex items-start gap-3 p-4 bg-brand-green-600/20 border border-brand-green-500/30 rounded-xl text-brand-green-300 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{statusMessage}</p>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-start gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{statusMessage}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClasses(!!errors.name)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClasses(!!errors.phone)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClasses(!!errors.address)}
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                  />
                  {errors.address && (
                    <p
                      id="address-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClasses(!!errors.service)}
                    aria-invalid={!!errors.service}
                    aria-describedby={
                      errors.service ? "service-error" : undefined
                    }
                  >
                    <option value="" className="bg-navy-900 text-navy-400">
                      Select Service
                    </option>
                    {SERVICES.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-navy-900 text-white"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p
                      id="service-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`${inputClasses(!!errors.message)} resize-y`}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-green-600 hover:bg-brand-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand-green-600/20 hover:shadow-brand-green-600/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Request Service
                    </>
                  )}
                </button>
              </form>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}