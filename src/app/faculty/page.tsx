import type { Metadata } from "next";
import { Suspense } from "react";
import { FacultyPageClient } from "./FacultyPageClient";
import { getFaculty, getLeadership } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet our leadership and expert faculty at OP Institute of Studies — Founder Om Prakash, Academic & Management Heads, and our dedicated teaching team.",
};

export const revalidate = 60;

type FacultyPageProps = {
  searchParams?: Promise<{ category?: string }> | { category?: string };
};

export default async function FacultyPage({ searchParams }: FacultyPageProps) {
  const [allFaculty, leaders] = await Promise.all([
    getFaculty(),
    getLeadership(),
  ]);
  const leaderNames = new Set(
    leaders.map((l) => l.name.trim().toLowerCase())
  );
  const faculty = allFaculty.filter(
    (m) => !leaderNames.has(m.name.trim().toLowerCase())
  );

  const params = await Promise.resolve(searchParams ?? {});
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
