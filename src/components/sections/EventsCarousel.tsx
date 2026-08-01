"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  X,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { contentBrandFilters, type BrandFilter } from "@/data/brands";
import type { Event } from "@/data/events";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  academic: "Academic",
  cultural: "Cultural",
  sports: "Sports",
  preschool: "Kids Activity",
};

function albumPhotos(event: Event): string[] {
  if (event.photos?.length) return event.photos;
  return event.image ? [event.image] : [];
}

function EventAlbumModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  const photos = albumPhotos(event);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-event-album-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="relative z-10 w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-white/20 dark:border-white/10">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 pb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-100 dark:border-white/10">
          <div className="min-w-0">
            <p
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.16em] mb-1",
                event.brand === "preschool"
                  ? "text-kids-600 dark:text-kids-400"
                  : "text-brand-600 dark:text-brand-400"
              )}
            >
              {event.brand === "preschool"
                ? "OP Kids Pre School"
                : "OP Institute of Studies"}
              {" · "}
              {typeLabels[event.type] ?? event.type}
            </p>
            <h2
              id="home-event-album-title"
              className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight"
            >
              {event.title}
            </h2>
            {event.date ? (
              <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {event.date}
              </p>
            ) : null}
            {event.description ? (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {event.description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {photos.length === 0 ? (
            <p className="text-center text-muted-foreground py-10 text-sm">
              No photos in this album yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {photos.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={src}
                    alt={`${event.title} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function EventsCarousel({ events }: { events: Event[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  const filtered =
    brand === "all" ? events : events.filter((e) => e.brand === brand);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(360, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-[#f5f5f7] dark:bg-gray-900/40 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <ScrollReveal>
            <div>
              <span className="eyebrow mb-3">Campus life</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Events & Gallery
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
                Workshops, celebrations, and campus moments from OP Institute
                and OP Kids — tap an album to view photos.
              </p>
            </div>
          </ScrollReveal>
          <Link
            href="/events"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            View all events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Only 2 brand categories + All */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {contentBrandFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setBrand(f.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                brand === f.id
                  ? f.id === "preschool"
                    ? "bg-kids-500 text-white shadow-sm"
                    : "bg-brand-600 text-white shadow-sm"
                  : "text-[#1d2951]/80 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-10 text-sm">
            No events in this category yet.
          </p>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-card hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              aria-label="Previous events"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-card hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              aria-label="Next events"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div
              ref={scrollerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:thin]"
            >
              {filtered.map((event) => {
                const count = albumPhotos(event).length;
                const isKids = event.brand === "preschool";
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setActiveEvent(event)}
                    className="group snap-start shrink-0 w-[280px] sm:w-[320px] text-left rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={cn(
                            "inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide",
                            isKids
                              ? "bg-kids-100 text-kids-700 dark:bg-kids-950/40 dark:text-kids-300"
                              : "bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                          )}
                        >
                          {isKids ? "OP Kids" : "OP Institute"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                          <Camera className="w-3 h-3" />
                          {count} photos
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-snug line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                      <p
                        className={cn(
                          "mt-3 text-xs font-semibold",
                          isKids
                            ? "text-kids-600 dark:text-kids-400"
                            : "text-brand-600 dark:text-brand-400"
                        )}
                      >
                        View gallery →
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {activeEvent ? (
        <EventAlbumModal
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
        />
      ) : null}
    </section>
  );
}
