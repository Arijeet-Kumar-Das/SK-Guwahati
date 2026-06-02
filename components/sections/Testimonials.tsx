"use client";

import { Star, Quote } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  FadeUp,
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
  return (
    <section id="testimonials" aria-label="Customer Testimonials" className="py-24 lg:py-32 bg-slate-50">
      <div className="section-container">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title text-navy-900">
            What Our Customers Say
          </h2>
          <p className="section-subtitle mx-auto">
            Real reviews from homeowners and businesses across Guwahati.
          </p>
        </FadeUp>

        {/* Testimonial cards */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
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
                      <p className="text-xs text-slate-400">Guwahati</p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-amber-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}