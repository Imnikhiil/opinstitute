"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Camera, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  contentBrandFilters,
  contentBrandLabels,
  parseBrandFilter,
  type BrandFilter,
} from "@/data/brands";
import type { Event } from "@/data/events";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
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

export function EventsPageClient({
  events,
  initialBrand = "all",
}: {
  events: Event[];
  initialBrand?: BrandFilter;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isKids, isInstitute } = useSiteBrand();
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  const brandFilters = useMemo(() => {
    if (isKids) return contentBrandFilters.filter((b) => b.id === "preschool");
    if (isInstitute)
      return contentBrandFilters.filter((b) => b.id === "institute");
    return contentBrandFilters;
  }, [isKids, isInstitute]);

  const activeBrand = isKids
    ? "preschool"
    : isInstitute
      ? "institute"
      : parseBrandFilter(searchParams.get("brand") ?? initialBrand);

  const setBrand = useCallback(
    (brand: BrandFilter) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("type");
      if (brand === "all") params.delete("brand");
      else params.set("brand", brand);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const filtered = useMemo(() => {
    if (activeBrand === "all") return events;
    return events.filter((e) => e.brand === activeBrand);
  }, [events, activeBrand]);

  useEffect(() => {
    if (!activeEvent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveEvent(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeEvent]);

  const heroCopy =
    activeBrand === "preschool"
      ? {
          title: "OP Kids Events",
          subtitle:
            "Camps, celebrations and fun activities for our little learners. Tap an event to open its photo album.",
        }
      : activeBrand === "institute"
        ? {
            title: "Institute Events",
            subtitle:
              "Academic programs, cultural days and campus activities. Tap an event to open its photo album.",
          }
        : {
            title: "Events & Activities",
            subtitle:
              "Mixed events from OP Institute of Studies and OP Kids Pre School. Filter by brand, then tap an album.",
          };

  const modalPhotos = activeEvent ? albumPhotos(activeEvent) : [];

  return (
    <>
      <section className="page-hero">
        <div className="container-custom relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-3 sm:mb-4">
            {heroCopy.title}
          </h1>
          <p className="text-[#666666] text-base sm:text-lg max-w-2xl">
            {heroCopy.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Event albums"
              title={
                activeBrand === "all"
                  ? "Our Events"
                  : contentBrandLabels[activeBrand]
              }
              subtitle="Only two filters — OP Kids or OP Institute. Click any event for more photos."
            />
          </ScrollReveal>

          {brandFilters.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {brandFilters.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBrand(b.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                    activeBrand === b.id
                      ? b.id === "preschool"
                        ? "bg-kids-500 text-white shadow-sm"
                        : "bg-brand-600 text-white shadow-sm"
                      : "text-[#1d2951]/80 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No events in this section yet
              {activeBrand !== "all"
                ? ` for ${contentBrandLabels[activeBrand]}`
                : ""}
              .
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((event, index) => {
                const count = albumPhotos(event).length;
                const isKidsBrand = event.brand === "preschool";
                return (
                  <ScrollReveal key={event.id} delay={Math.min(index, 8) * 0.05}>
                    <button
                      type="button"
                      onClick={() => setActiveEvent(event)}
                      className="group w-full text-left rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <span
                          className={cn(
                            "absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm",
                            isKidsBrand ? "bg-kids-600/90" : "bg-brand-700/90"
                          )}
                        >
                          <Camera className="w-3 h-3" />
                          {count} {count === 1 ? "photo" : "photos"}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
                          <span
                            className={cn(
                              "inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide mb-1.5",
                              isKidsBrand
                                ? "bg-kids-100 text-kids-700"
                                : "bg-brand-100 text-brand-700"
                            )}
                          >
                            {isKidsBrand ? "OP Kids" : "OP Institute"}
                          </span>
                          <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug line-clamp-2">
                            {event.title}
                          </h3>
                          {event.date ? (
                            <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                              <Calendar className="w-3 h-3" />
                              {event.date}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="px-3.5 py-3 border-t border-gray-100 dark:border-white/5">
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                        <p
                          className={cn(
                            "mt-2 text-xs font-semibold",
                            isKidsBrand
                              ? "text-kids-600 dark:text-kids-400"
                              : "text-brand-600 dark:text-brand-400"
                          )}
                        >
                          Open gallery →
                        </p>
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {activeEvent && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-album-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Close gallery"
            onClick={() => setActiveEvent(null)}
          />
          <div className="relative z-10 w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-white/20 dark:border-white/10">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 pb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-100 dark:border-white/10">
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.16em] mb-1",
                    activeEvent.brand === "preschool"
                      ? "text-kids-600 dark:text-kids-400"
                      : "text-brand-600 dark:text-brand-400"
                  )}
                >
                  {activeEvent.brand === "preschool"
                    ? "OP Kids Pre School"
                    : "OP Institute of Studies"}
                  {" · "}
                  {typeLabels[activeEvent.type] ?? activeEvent.type}
                </p>
                <h2
                  id="event-album-title"
                  className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight"
                >
                  {activeEvent.title}
                </h2>
                {activeEvent.date ? (
                  <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeEvent.date}
                  </p>
                ) : null}
                {activeEvent.description ? (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {activeEvent.description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setActiveEvent(null)}
                className="shrink-0 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {modalPhotos.length === 0 ? (
                <p className="text-center text-muted-foreground py-10 text-sm">
                  No photos in this album yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {modalPhotos.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                    >
                      <Image
                        src={src}
                        alt={`${activeEvent.title} photo ${i + 1}`}
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
      )}
    </>
  );
}
