import type { Metadata } from "next";
import { Suspense } from "react";
import { FacultyPageClient } from "./FacultyPageClient";
import { getFaculty, getLeadership } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet our leadership and expert faculty at OP Institute of Studies — Founder Om Prakash, Academic & Management Heads, and our dedicated teaching team.",
  alternates: { canonical: "/faculty" },
};

export const revalidate = 60;

type FacultyPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

export default async function FacultyPage({ searchParams }: FacultyPageProps) {
  const [faculty, leaders] = await Promise.all([
    getFaculty(),
    getLeadership(),
  ]);

  const params = (await searchParams) ?? {};
  const raw = params.category;
  const initialCategory =
    raw === "preschool" || raw === "institute" ? raw : "all";

  return (
    <Suspense
      fallback={
        <div className="section-padding container-custom text-center text-muted-foreground">
          Loading faculty…
        </div>
      }
    >
      <FacultyPageClient
        faculty={faculty}
        leaders={leaders}
        initialCategory={initialCategory}
      />
    </Suspense>
  );
}
