"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  contentBrandFilters,
  contentBrandLabels,
  parseBrandFilter,
  type BrandFilter,
} from "@/data/brands";
import { eventTypeFilters, type Event } from "@/data/events";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { cn } from "@/lib/utils";

type TypeFilter = (typeof eventTypeFilters)[number]["id"];

const typeColors: Record<string, string> = {
  academic: "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300",
  cultural: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  sports: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  preschool: "bg-kids-100 text-kids-700 dark:bg-kids-900/30 dark:text-kids-300",
};

function parseType(value: string | null | undefined): TypeFilter {
  if (eventTypeFilters.some((t) => t.id === value)) {
    return value as TypeFilter;
  }
  return "all";
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
  const activeType = parseType(searchParams.get("type"));

  const setParams = useCallback(
    (next: { brand?: BrandFilter; type?: TypeFilter }) => {
      const params = new URLSearchParams(searchParams.toString());
      const brand = next.brand ?? activeBrand;
      const type = next.type ?? activeType;

      if (brand === "all") params.delete("brand");
      else params.set("brand", brand);

      if (type === "all") params.delete("type");
      else params.set("type", type);

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [activeBrand, activeType, pathname, router, searchParams]
  );

  const byBrand = useMemo(() => {
    if (activeBrand === "all") return events;
    return events.filter((e) => e.brand === activeBrand);
  }, [events, activeBrand]);

  const availableTypes = useMemo(() => {
    const present = new Set(byBrand.map((e) => e.type));
    return eventTypeFilters.filter(
      (t) => t.id === "all" || present.has(t.id)
    );
  }, [byBrand]);

  const filtered = useMemo(() => {
    if (activeType === "all") return byBrand;
    return byBrand.filter((e) => e.type === activeType);
  }, [byBrand, activeType]);

  const heroCopy =
    activeBrand === "preschool"
      ? {
          title: "OP Kids Events",
          subtitle:
            "Camps, celebrations and fun activities for our little learners.",
        }
      : activeBrand === "institute"
        ? {
            title: "Institute Events",
            subtitle:
              "Academic programs, cultural days and campus activities at OP Institute of Studies.",
          }
        : {
            title: "Events & Activities",
            subtitle:
              "Stay updated with programs from OP Institute of Studies and OP Kids Pre School.",
          };

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
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <SectionHeader
              badge="Timeline"
              title={
                activeBrand === "all"
                  ? "Our Events"
                  : contentBrandLabels[activeBrand]
              }
            />
          </ScrollReveal>

          {brandFilters.length > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {brandFilters.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setParams({ brand: b.id, type: "all" })}
                  className={cn(
                    "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all",
                    activeBrand === b.id
                      ? b.id === "preschool"
                        ? "bg-kids-500 text-white"
                        : "bg-brand-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}

          {availableTypes.length > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
              {availableTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setParams({ type: type.id })}
                  className={cn(
                    "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all border",
                    activeType === type.id
                      ? activeBrand === "preschool"
                        ? "border-kids-400 bg-kids-50 text-kids-700 dark:bg-kids-950/40 dark:text-kids-300"
                        : "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                      : "border-transparent bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {type.label}
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
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 dark:bg-brand-800 md:-translate-x-px" />

              {filtered.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.08}>
                  <div
                    className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2" />
                    <div
                      className={cn(
                        "absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-4 border-white dark:border-gray-950 -translate-x-1/2 mt-6 z-10",
                        event.brand === "preschool"
                          ? "bg-kids-500"
                          : "bg-brand-500"
                      )}
                    />

                    <div className="md:w-1/2 pl-12 md:pl-0">
                      <div className="glass-card overflow-hidden hover:shadow-card-hover transition-shadow">
                        <div className="relative h-40 sm:h-48">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${typeColors[event.type] ?? typeColors.academic}`}
                            >
                              {event.type === "preschool"
                                ? "Kids Activity"
                                : event.type}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              {event.date}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-lg sm:text-xl mb-1.5 sm:mb-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
