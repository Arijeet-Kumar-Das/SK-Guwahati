"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  review: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 rating`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-brand-green-500"
          fill="currentColor"
        />
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      id="testimonials"
      aria-label="Customer Testimonials"
      className="bg-white py-20 lg:py-28"
    >
      <div className="section-container">
        <FadeUp className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-label justify-center">Testimonials</p>
          <h2 className="section-title">What Customers Say About the Work</h2>
          <p className="section-subtitle mx-auto">
            Direct feedback from homeowners and business customers across
            Guwahati.
          </p>
        </FadeUp>

        <FadeUp className="mb-8">
          <article className="relative overflow-hidden rounded-lg bg-navy-950 p-7 text-white lg:p-10">
            <div className="absolute inset-0 industrial-grid opacity-70" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-green-600 text-white">
                <Quote size={26} fill="currentColor" />
              </div>

              <div>
                <p className="max-w-5xl text-xl leading-8 text-white lg:text-2xl lg:leading-10">
                  &ldquo;{featured.review}&rdquo;
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-navy-950 text-base font-extrabold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {featured.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4
                      className="font-extrabold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {featured.name}
                    </h4>
                    <Rating rating={featured.rating} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </FadeUp>

        {rest.length > 0 && (
          <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <StaggerItem key={item._id}>
                <article className="enterprise-card card-hover flex h-full flex-col p-6">
                  <Quote
                    size={26}
                    className="mb-5 text-brand-green-600"
                    fill="currentColor"
                  />

                  <p className="flex-1 text-sm leading-7 text-slate-600">
                    &ldquo;{item.review}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-sm font-extrabold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4
                          className="text-sm font-extrabold text-navy-950"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-500">
                          Guwahati
                        </p>
                      </div>
                    </div>

                    <Rating rating={item.rating} />
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
