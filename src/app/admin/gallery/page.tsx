import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "gallery",
  singular: "Photo",
  titleField: "alt",
  subtitleField: "category",
  imageField: "image_url",
  brandField: "brand",
  fields: [
    { name: "image_url", label: "Photo", type: "image", required: true },
    {
      name: "alt",
      label: "Caption / Description",
      type: "text",
      placeholder: "Front desk — Founder Om Prakash",
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: ["preschool", "institute"],
      optionLabels: {
        preschool: "OP Kids Pre School",
        institute: "OP Institute of Studies",
      },
      required: true,
    },
    {
      name: "category",
      label: "Show as",
      type: "select",
      options: [
        "front_desk",
        "reception",
        "campus",
        "classroom",
        "preschool",
        "events",
        "achievements",
      ],
      optionLabels: {
        front_desk: "Front desk / office (home About photo)",
        reception: "Reception desk",
        campus: "Campus / general gallery",
        classroom: "Classroom",
        preschool: "Kids moments",
        events: "Events",
        achievements: "Achievements",
      },
    },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminGalleryPage() {
  const rows = await fetchRows("gallery");
  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Upload photos. Use Show as = Front desk for the home About image. Kids brand + low Order = home Kids collage."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
