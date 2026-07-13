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
  fields: [
    { name: "image_url", label: "Photo", type: "image", required: true },
    { name: "alt", label: "Caption / Description", type: "text", placeholder: "Annual day celebration" },
    { name: "category", label: "Category", type: "select", options: ["campus", "classroom", "preschool", "events", "achievements"] },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminGalleryPage() {
  const rows = await fetchRows("gallery");
  return (
    <div>
      <PageHeader title="Gallery" subtitle="Upload and manage the website photos." />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
