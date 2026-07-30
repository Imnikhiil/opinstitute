import type { Metadata } from "next";
import {
  getKidsShowcaseImages,
  getTestimonials,
} from "@/lib/supabase/public-data";
import { OpKidsPage } from "./OpKidsPage";

export const metadata: Metadata = {
  title: "OP Kids Pre School",
  description:
    "OP Kids Pre School — joyful, safe and playful early childhood education. Play Group, Nursery, LKG & UKG in Mahavir Enclave, New Delhi.",
};

export const revalidate = 60;

export default async function Page() {
  const [testimonials, showcaseImages] = await Promise.all([
    getTestimonials(),
    getKidsShowcaseImages(4),
  ]);
  return (
    <OpKidsPage
      testimonials={testimonials}
      showcaseImages={showcaseImages}
    />
  );
}
