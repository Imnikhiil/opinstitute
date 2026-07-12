import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore courses at OP Institute of Studies — CA, CS, CMA, B.Com (Pass/Hons), and school tuition for Classes I–XII.",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
