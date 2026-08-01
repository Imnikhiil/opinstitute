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
import type { GalleryImage } from "@/data/gallery";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { cn } from "@/lib/utils";

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
      params.delete("topic");
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
    if (activeBrand === "all") return images;
    return images.filter((img) => img.brand === activeBrand);
  }, [images, activeBrand]);

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
              "Moments from OP Institute of Studies and OP Kids Pre School.",
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
          {brandFilters.length > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
              {brandFilters.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBrand(b.id)}
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
