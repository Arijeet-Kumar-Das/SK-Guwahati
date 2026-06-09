"use client";

import { FadeUp, SlideIn } from "@/components/ui/motion";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Play,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface GalleryItem {
  _id: string;
  title: string;
  orientation: string;
  image: SanityImageSource;
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
    "Mechanized cleaning process",
    "High-capacity suction vehicles",
    "Safe and hygienic operations",
    "Compliant field procedures",
  ];

  return (
    <>
      <section
        id="gallery"
        aria-label="Project Gallery"
        className="bg-white py-16 lg:py-24"
      >
        <div className="section-container">
          <div className="mb-16 lg:mb-20">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <SlideIn direction="left">
                <div className="mx-auto w-full max-w-[360px]">
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-navy-950 shadow-[0_18px_46px_rgba(15,23,42,0.12)]">
                    <video controls className="h-auto w-full" preload="metadata">
                      <source src="/video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </SlideIn>

              <SlideIn direction="right" delay={0.15}>
                <div className="max-w-2xl">
                  <div className="mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase text-brand-green-700">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-600/10 text-brand-green-700">
                      <Play className="ml-0.5 h-4 w-4" />
                    </span>
                    Live project footage
                  </div>

                  <h3
                    className="max-w-2xl text-3xl font-extrabold leading-tight text-navy-950 lg:text-4xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Real field execution from active drain and septic cleaning
                    work
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 lg:text-lg">
                    A closer look at the mechanized process, equipment handling,
                    and field coordination used by S.K Enterprise across
                    Guwahati.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {checklist.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-navy-50 px-4 py-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-600" />
                        <span className="text-sm font-semibold leading-6 text-navy-900">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>

          <FadeUp>
            <div className="mb-10 text-center lg:mb-12">
              <p className="section-label justify-center">Project Photos</p>
              <h2 className="section-title mx-auto max-w-3xl">
                Fieldwork, Equipment, and On-Site Project Highlights
              </h2>
            </div>
          </FadeUp>

          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const isPortrait = item.orientation === "portrait";

              return (
                <button
                  key={item._id}
                  onClick={() => openLightbox(index)}
                  className={`group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-left shadow-sm transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:border-brand-green-600/40 hover:shadow-[0_18px_44px_rgba(15,23,42,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-600 ${
                    isPortrait ? "row-span-2" : "row-span-1"
                  }`}
                  aria-label={`Open gallery image ${index + 1}`}
                >
                  <Image
                    src={urlFor(item.image).width(1400).url()}
                    alt={item.title || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-navy-950/70 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand-green-600">
                    <Expand className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-navy-950/95"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15 lg:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15 lg:right-8"
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
              <div className="relative h-[72vh] w-full overflow-hidden rounded-lg bg-black/20">
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
                <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
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
