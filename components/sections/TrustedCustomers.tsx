"use client";

import {
  CountUp,
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

interface Customer {
  _id: string;
  name: string;
  location: string;
  logo?: SanityImageSource;
}

interface TrustedCustomersProps {
  customers: Customer[];
}

export default function TrustedCustomers({ customers }: TrustedCustomersProps) {
  return (
    <section
      id="customers"
      aria-label="Trusted Customers"
      className="bg-navy-50 py-20 lg:py-28"
    >
      <div className="section-container">
        <FadeUp className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-brand-green-600/20 bg-white px-4 py-2 text-sm font-bold text-brand-green-700">
            <ShieldCheck className="h-4 w-4" />
            Trusted organizations
          </div>

          <h2 className="section-title">Trusted by Leading Organizations</h2>

          <p className="section-subtitle mx-auto">
            Airports, hospitals, industries, government organizations, and
            commercial establishments rely on S.K Enterprise for clean,
            dependable field execution.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {customers.map((customer) => (
            <StaggerItem key={customer._id}>
              <article className="enterprise-card card-hover flex h-44 flex-col items-center justify-center p-5 text-center">
                <div className="relative mb-4 h-20 w-full">
                  {customer.logo && (
                    <Image
                      src={urlFor(customer.logo).width(400).url()}
                      alt={customer.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>

                <h3
                  className="text-sm font-extrabold leading-tight text-navy-950"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {customer.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {customer.location}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-14">
          <div className="rounded-lg bg-navy-950 p-7 text-white lg:p-10">
            <div className="grid gap-7 text-center md:grid-cols-3">
              <div>
                <h3
                  className="text-4xl font-extrabold text-brand-green-400"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <CountUp end={300000} suffix="+" />
                </h3>
                <p className="mt-2 text-sm font-medium text-navy-300">
                  Projects completed
                </p>
              </div>

              <div>
                <h3
                  className="text-4xl font-extrabold text-brand-green-400"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <CountUp end={15} suffix="+" />
                </h3>
                <p className="mt-2 text-sm font-medium text-navy-300">
                  Areas served
                </p>
              </div>

              <div>
                <h3
                  className="text-4xl font-extrabold text-brand-green-400"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  7 Days
                </h3>
                <p className="mt-2 text-sm font-medium text-navy-300">
                  Weekly availability
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
