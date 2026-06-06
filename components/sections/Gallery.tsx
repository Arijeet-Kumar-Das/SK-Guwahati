"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Expand,
} from "lucide-react";
import { FadeUp, SlideIn } from "@/components/ui/motion";

interface GalleryItem {
  _id: string;
  title: string;
  orientation: string;
  image: any;
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null || items.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  }, [lightboxIndex, items.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null || items.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  }, [lightboxIndex, items.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const selectedImage = lightboxIndex !== null ? items[lightboxIndex] : null;

  const checklist = [
    "Fully Mechanized Cleaning Process",
    "High-Capacity Super Sucker Vehicles",
    "Safe & Hygienic Operations",
    "GMC & NGT Compliant Procedures",
  ];

  return (
    <>
      <section
        id="gallery"
        aria-label="Project Gallery"
        className="bg-white py-16 lg:py-24"
      >
        <div className="section-container">
          {/* Video Section */}
          <div className="mb-20 lg:mb-24">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <SlideIn direction="left">
                <div className="mx-auto w-full max-w-[340px]">
                  <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-black shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                    <video
                      controls
                      className="w-full h-auto"
                      preload="metadata"
                      poster=""
                    >
                      <source src="/video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </SlideIn>

              <SlideIn direction="right" delay={0.15}>
                <div className="max-w-2xl">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <Play className="ml-0.5 h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
                      Live Project Footage
                    </p>
                  </div>

                  <h3
                    className="max-w-[16ch] text-3xl font-semibold tracking-tight text-slate-950 lg:text-4xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Real drain cleaning operations and field execution in action
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 lg:text-lg">
                    This footage shows our mechanized cleaning process during
                    active drainage maintenance work in Guwahati, using
                    high-capacity suction and jetting systems in real operating
                    conditions.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {checklist.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <span className="text-sm font-medium leading-6 text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>

          {/* Gallery Heading */}
          <FadeUp>
            <div className="mb-10 text-center lg:mb-12">
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-emerald-500/60" />
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
                  Project Photos
                </p>
                <span className="h-px w-10 bg-emerald-500/60" />
              </div>

              <h2
                className="mx-auto max-w-[23ch] text-3xl font-semibold tracking-tight text-slate-950 lg:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Fieldwork, equipment, and on-site project highlights
              </h2>
            </div>
          </FadeUp>

          {/* Gallery Grid */}
          <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const isPortrait = item.orientation === "portrait";

              return (
                <button
                  key={item._id}
                  onClick={() => openLightbox(index)}
                  className={`group relative overflow-hidden rounded-[16px] border border-slate-200 bg-slate-100 text-left shadow-sm transition-all duration-500 hover:z-10 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isPortrait ? "row-span-2" : "row-span-1"
                  }`}
                  aria-label={`Open gallery image ${index + 1}`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={urlFor(item.image).width(1400).url()}
                      alt={item.title || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-slate-950/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* expand icon only */}
                    <div className="absolute inset-0 flex items-end justify-end p-4 lg:p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white/18">
                        <Expand className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-slate-950/92 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          <div
            className="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 py-16 lg:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full">
              <div className="relative h-[72vh] w-full overflow-hidden rounded-[18px] bg-black/20">
                <Image
                  src={urlFor(selectedImage.image).width(2200).url()}
                  alt={
                    selectedImage.title || `Gallery image ${lightboxIndex + 1}`
                  }
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
                  {lightboxIndex + 1} / {items.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
