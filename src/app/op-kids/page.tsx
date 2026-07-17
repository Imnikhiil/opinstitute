import type { Metadata } from "next";
import { getFaculty, getLeadership, getTestimonials } from "@/lib/supabase/public-data";
import { OpKidsPage } from "./OpKidsPage";

export const metadata: Metadata = {
  title: "OP Kids Pre School",
  description:
    "OP Kids Pre School — joyful, safe and playful early childhood education. Play Group, Nursery, LKG & UKG in Mahavir Enclave, New Delhi.",
};

export const revalidate = 60;

export default async function Page() {
  const [testimonials, allFaculty, leaders] = await Promise.all([
    getTestimonials(),
    getFaculty(),
    getLeadership(),
  ]);
  const leaderNames = new Set(
    leaders.map((l) => l.name.trim().toLowerCase())
  );
  const faculty = allFaculty.filter(
    (m) =>
      m.category === "preschool" &&
      !leaderNames.has(m.name.trim().toLowerCase())
  );
  return <OpKidsPage testimonials={testimonials} faculty={faculty} />;
}
