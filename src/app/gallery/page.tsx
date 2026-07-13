import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/supabase/public-data";
import { GalleryPageClient } from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of OP Institute of Studies and OP Kids Pre School — campus, classrooms, events, and achievements.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryPageClient images={images} />;
}
