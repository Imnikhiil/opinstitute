import type { Metadata } from "next";
import {
  getEvents,
  getFaculty,
  getGalleryImages,
  getLeadership,
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
  const [testimonials, allFaculty, leaders, allGallery, allEvents] =
    await Promise.all([
      getTestimonials(),
      getFaculty(),
      getLeadership(),
      getGalleryImages(),
      getEvents(),
    ]);
  const leaderNames = new Set(
    leaders.map((l) => l.name.trim().toLowerCase())
  );
  const faculty = allFaculty.filter(
    (m) =>
      m.category === "preschool" &&
      !leaderNames.has(m.name.trim().toLowerCase())
  );
  const gallery = allGallery.filter((img) => img.brand === "preschool");
  const events = allEvents.filter((e) => e.brand === "preschool");

  return (
    <OpKidsPage
      testimonials={testimonials}
      faculty={faculty}
      gallery={gallery}
      events={events}
    />
  );
}
