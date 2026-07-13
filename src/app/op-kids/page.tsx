import type { Metadata } from "next";
import { getTestimonials } from "@/lib/supabase/public-data";
import { OpKidsPage } from "./OpKidsPage";

export const metadata: Metadata = {
  title: "OP Kids Pre School",
  description:
    "OP Kids Pre School — joyful, safe and playful early childhood education. Play Group, Nursery, LKG & UKG in Mahavir Enclave, New Delhi.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const testimonials = await getTestimonials();
  return <OpKidsPage testimonials={testimonials} />;
}
