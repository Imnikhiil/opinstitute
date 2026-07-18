import type { Metadata } from "next";
import { Suspense } from "react";
import { getGalleryImages } from "@/lib/supabase/public-data";
import { parseBrandFilter } from "@/data/brands";
import { GalleryPageClient } from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of OP Institute of Studies and OP Kids Pre School — campus, classrooms, events, and achievements.",
};

export const revalidate = 60;

type GalleryPageProps = {
  searchParams?: Promise<{ brand?: string }> | { brand?: string };
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const images = await getGalleryImages();
  const params = await Promise.resolve(searchParams ?? {});
  const initialBrand = parseBrandFilter(params.brand);

  return (
    <Suspense
      fallback={
        <div className="section-padding container-custom text-center text-muted-foreground">
          Loading gallery…
        </div>
      }
    >
      <GalleryPageClient images={images} initialBrand={initialBrand} />
    </Suspense>
  );
}
