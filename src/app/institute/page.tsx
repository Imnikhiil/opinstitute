import type { Metadata } from "next";
import {
  getCourses,
  getTestimonials,
  getVideos,
} from "@/lib/supabase/public-data";
import { InstitutePage } from "./InstitutePage";

export const metadata: Metadata = {
  title: "OP Institute of Studies",
  description:
    "OP Institute of Studies — CMA coaching, B.Com mentoring and Class I–XII tuition in Mahavir Enclave, New Delhi. Excellence since 2003.",
  alternates: { canonical: "/institute" },
};

export const revalidate = 60;

export default async function Page() {
  const [testimonials, courses, studentVideos] = await Promise.all([
    getTestimonials(),
    getCourses(),
    getVideos({ kind: "student_experience", brand: "institute" }),
  ]);
  return (
    <InstitutePage
      testimonials={testimonials}
      courses={courses}
      studentVideos={studentVideos}
    />
  );
}
