"use client";

import { FadeUp } from "@/components/ui/motion";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="page-header pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 industrial-grid" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="section-container relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="font-medium text-navy-300 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span className="text-navy-500">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="font-medium text-navy-300 transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <FadeUp>
          <div className="accent-divider mb-6" />
          <h1
            className="max-w-4xl text-4xl font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-3xl text-base leading-7 text-navy-200 sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
