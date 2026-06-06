"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ShieldCheck } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/ui/motion";

interface Customer {
  _id: string;
  name: string;
  location: string;
  logo?: any;
}

interface TrustedCustomersProps {
  customers: Customer[];
}

export default function TrustedCustomers({ customers }: TrustedCustomersProps) {
  return (
    <section
      id="customers"
      aria-label="Trusted Customers"
      className="py-24 lg:py-32 bg-slate-50"
    >
      <div className="section-container">
        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-5">
            <ShieldCheck className="w-4 h-4" />
            Trusted Organizations
          </div>

          <h2 className="section-title">Trusted By Leading Organizations</h2>

          <p className="section-subtitle mx-auto">
            Our professional septic tank and sewer cleaning services are trusted
            by airports, hospitals, industries, government organizations and
            major commercial establishments across Assam.
          </p>
        </FadeUp>

        {/* Logo Grid — static, no marquee */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {customers.map((customer) => (
            <StaggerItem key={customer._id}>
              <div className="group bg-white rounded-2xl border border-slate-200 hover:border-brand-green-300 p-6 h-44 flex flex-col items-center justify-center text-center transition-all duration-300 card-hover">
                {/* Logo */}
                <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                  {customer.logo && (
                    <Image
                      src={urlFor(customer.logo).width(400).url()}
                      alt={customer.name}
                      fill
                      className="object-contain  transition-all duration-500"
                    />
                  )}
                </div>

                {/* Company name */}
                <h3
                  className="text-sm font-bold text-slate-900 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {customer.name}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {customer.location}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats bar */}
        <FadeUp className="mt-20">
          <div className="bg-navy-950 rounded-3xl p-8 lg:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3
                  className="text-4xl font-bold text-brand-green-400 mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <CountUp end={500} suffix="+" />
                </h3>
                <p className="text-navy-300">Projects Completed</p>
              </div>

              <div>
                <h3
                  className="text-4xl font-bold text-brand-green-400 mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <CountUp end={15} suffix="+" />
                </h3>
                <p className="text-navy-300">Areas Served</p>
              </div>

              <div>
                <h3
                  className="text-4xl font-bold text-brand-green-400 mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  7 Days
                </h3>
                <p className="text-navy-300">Weekly Availability</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
