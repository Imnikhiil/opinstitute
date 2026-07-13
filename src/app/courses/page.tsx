import type { Metadata } from "next";
import { getCourses, getTestimonials } from "@/lib/supabase/public-data";
import { CoursesPageClient } from "./CoursesPageClient";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "CMA, B.Com and school tuition programs at OP Institute of Studies — structured coaching for academic and career success.",
};

export const revalidate = 60;

export default async function CoursesPage() {
  const [courses, testimonials] = await Promise.all([
    getCourses(),
    getTestimonials(),
  ]);

  return <CoursesPageClient courses={courses} testimonials={testimonials} />;
}
