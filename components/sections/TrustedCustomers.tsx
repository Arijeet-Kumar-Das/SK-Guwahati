"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ShieldCheck } from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
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

export default function TrustedCustomers({
  customers,
}: TrustedCustomersProps) {
  return (
    <section
      id="customers"
      className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-0 w-72 h-72 bg-brand-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-navy-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-5">
            <ShieldCheck className="w-4 h-4" />
            Trusted Organizations
          </div>

          <h2 className="section-title">
            Trusted By Leading Organizations
          </h2>

          <p className="section-subtitle mx-auto">
            Our professional septic tank and sewer cleaning services are
            trusted by airports, hospitals, industries, government
            organizations and major commercial establishments across Assam.
          </p>
        </FadeUp>

        {/* Logo Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {customers.map((customer) => (
            <StaggerItem key={customer._id}>
              <div className="group bg-white rounded-3xl border border-slate-200 hover:border-brand-green-300 p-6 h-44 flex flex-col justify-center items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                {/* Logo */}
                <div className="relative w-full h-24 mb-4 flex items-center justify-center  rounded-xl p-3">                  {customer.logo && (
                    <Image
                      src={urlFor(customer.logo).width(400).url()}
                      alt={customer.name}
                      fill
                      className="object-contain transition-all duration-500"
                    />
                  )}
                </div>

                {/* Company Name */}
                <h3
                  className="text-sm font-bold text-slate-900 leading-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
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

        {/* Stats Section */}
        <FadeUp className="mt-20">
          <div className="bg-navy-950 rounded-3xl p-8 lg:p-12">

            <div className="grid md:grid-cols-3 gap-8 text-center">

              <div>
                <h3 className="text-4xl font-bold text-brand-green-400 mb-2">
                  500+
                </h3>
                <p className="text-navy-300">
                  Projects Completed
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-brand-green-400 mb-2">
                  15+
                </h3>
                <p className="text-navy-300">
                  Areas Served
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-brand-green-400 mb-2">
                  7 Days
                </h3>
                <p className="text-navy-300">
                  Weekly Availability
                </p>
              </div>

            </div>

          </div>
        </FadeUp>

      </div>
    </section>
  );
}