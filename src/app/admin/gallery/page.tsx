import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "gallery",
  singular: "Photo",
  titleField: "alt",
  subtitleField: "brand",
  imageField: "image_url",
  fields: [
    { name: "image_url", label: "Photo", type: "image", required: true },
    {
      name: "alt",
      label: "Caption / Description",
      type: "text",
      placeholder: "Annual day celebration",
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
      label: "Topic",
      type: "select",
      options: ["campus", "classroom", "preschool", "events", "achievements"],
      optionLabels: {
        campus: "Campus",
        classroom: "Classroom",
        preschool: "Kids Moments",
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
        subtitle="Set Brand first (Kids or Institute), then Topic — so each photo shows in the right filter."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
