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
      {/* Industrial grid texture */}
      <div className="absolute inset-0 industrial-grid" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-navy-700/15" />
        <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-brand-green-600/5" />
      </div>

      <div className="section-container relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-navy-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-navy-600">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-navy-400 hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-navy-200 font-medium">
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
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg lg:text-xl text-navy-300 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
