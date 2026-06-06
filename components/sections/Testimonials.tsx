"use client";

import { Star, Quote } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";

interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  review: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      id="testimonials"
      aria-label="Customer Testimonials"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="section-container">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Real reviews from homeowners and businesses across Guwahati.
          </p>
        </FadeUp>

        {/* Featured testimonial — full width */}
        <FadeUp className="mb-10">
          <div className="relative bg-navy-950 rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Decorative quote icon */}
            <Quote
              size={120}
              className="absolute top-6 right-8 text-navy-800 opacity-40"
              fill="currentColor"
            />

            <div className="relative z-10">
              <p className="text-xl lg:text-2xl text-white leading-relaxed max-w-4xl">
                &ldquo;{featured.review}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4">
                {/* Avatar initial */}
                <div
                  className="w-12 h-12 rounded-full bg-brand-green-600 text-white flex items-center justify-center text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {featured.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4
                    className="font-bold text-white text-base"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {featured.name}
                  </h4>

                  {/* Star rating */}
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: featured.rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-amber-400"
                          fill="currentColor"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Remaining testimonials — 3 column grid */}
        {rest.length > 0 && (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((item) => (
              <StaggerItem key={item._id}>
                <div className="group bg-white rounded-2xl p-7 ring-1 ring-slate-200/60 hover:ring-navy-200 transition-all duration-300 card-hover h-full flex flex-col">
                  {/* Quote icon */}
                  <div className="mb-4">
                    <Quote
                      size={28}
                      className="text-navy-200 group-hover:text-brand-green-400 transition-colors duration-300"
                      fill="currentColor"
                    />
                  </div>

                  {/* Review text */}
                  <p className="text-slate-600 leading-relaxed flex-1 text-[15px]">
                    &ldquo;{item.review}&rdquo;
                  </p>

                  {/* Footer: name + rating */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar initial */}
                      <div
                        className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center text-sm font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4
                          className="font-bold text-navy-900 text-sm"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Guwahati
                        </p>
                      </div>
                    </div>

                    {/* Star rating */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-amber-400"
                            fill="currentColor"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}