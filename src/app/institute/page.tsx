import type { Metadata } from "next";
import { getCourses, getTestimonials } from "@/lib/supabase/public-data";
import { InstitutePage } from "./InstitutePage";

export const metadata: Metadata = {
  title: "OP Institute of Studies",
  description:
    "OP Institute of Studies — CMA coaching, B.Com mentoring and Class I–XII tuition in Mahavir Enclave, New Delhi. Excellence since 2003.",
};

export const revalidate = 60;

export default async function Page() {
  const [testimonials, courses] = await Promise.all([
    getTestimonials(),
    getCourses(),
  ]);
  return <InstitutePage testimonials={testimonials} courses={courses} />;
}
