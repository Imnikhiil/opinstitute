"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  contentBrandFilters,
  contentBrandLabels,
  parseBrandFilter,
  type BrandFilter,
} from "@/data/brands";
import { galleryTopics, type GalleryImage } from "@/data/gallery";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { cn } from "@/lib/utils";

type TopicFilter = (typeof galleryTopics)[number]["id"];

function parseTopic(value: string | null | undefined): TopicFilter {
  if (galleryTopics.some((t) => t.id === value)) {
    return value as TopicFilter;
  }
  return "all";
}

export function GalleryPageClient({
  images,
  initialBrand = "all",
}: {
  images: GalleryImage[];
  initialBrand?: BrandFilter;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isKids, isInstitute } = useSiteBrand();

  // In Kids / Institute world, lock brand tabs to that world only
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
  const activeTopic = parseTopic(searchParams.get("topic"));

  const setParams = useCallback(
    (next: { brand?: BrandFilter; topic?: TopicFilter }) => {
      const params = new URLSearchParams(searchParams.toString());
      const brand = next.brand ?? activeBrand;
      const topic = next.topic ?? activeTopic;

      if (brand === "all") params.delete("brand");
      else params.set("brand", brand);

      if (topic === "all") params.delete("topic");
      else params.set("topic", topic);

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [activeBrand, activeTopic, pathname, router, searchParams]
  );

  const byBrand = useMemo(() => {
    if (activeBrand === "all") return images;
    return images.filter((img) => img.brand === activeBrand);
  }, [images, activeBrand]);

  const availableTopics = useMemo(() => {
    const present = new Set(byBrand.map((img) => img.category));
    return galleryTopics.filter(
      (t) => t.id === "all" || present.has(t.id)
    );
  }, [byBrand]);

  const filtered = useMemo(() => {
    if (activeTopic === "all") return byBrand;
    return byBrand.filter((img) => img.category === activeTopic);
  }, [byBrand, activeTopic]);

  const heroCopy =
    activeBrand === "preschool"
      ? {
          title: "OP Kids Gallery",
          subtitle:
            "Joyful moments from classrooms, playtime, and celebrations at OP Kids Pre School.",
        }
      : activeBrand === "institute"
        ? {
            title: "Institute Gallery",
            subtitle:
              "Campus life, classrooms, events and achievements at OP Institute of Studies.",
          }
        : {
            title: "Gallery",
            subtitle:
              "Moments from OP Institute of Studies and OP Kids Pre School — pick a brand below to explore.",
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
        <div className="container-custom">
          {/* Brand tabs — hidden when already locked in Kids / Institute world */}
          {brandFilters.length > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {brandFilters.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setParams({ brand: b.id, topic: "all" })}
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

          {/* Topic chips */}
          {availableTopics.length > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
              {availableTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setParams({ topic: topic.id })}
                  className={cn(
                    "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all border",
                    activeTopic === topic.id
                      ? activeBrand === "preschool"
                        ? "border-kids-400 bg-kids-50 text-kids-700 dark:bg-kids-950/40 dark:text-kids-300"
                        : "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                      : "border-transparent bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No photos in this section yet
              {activeBrand !== "all"
                ? ` for ${contentBrandLabels[activeBrand]}`
                : ""}
              .
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
              {filtered.map((img, index) => (
                <ScrollReveal key={img.id} delay={index * 0.05}>
                  <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">{img.alt}</p>
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
