import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "events",
  singular: "Event",
  titleField: "title",
  subtitleField: "description",
  imageField: "image_url",
  fields: [
    { name: "image_url", label: "Photo", type: "image" },
    { name: "title", label: "Event Title", type: "text", required: true, placeholder: "Annual Day Celebration 2025" },
    { name: "event_date", label: "Date", type: "text", placeholder: "December 15, 2025" },
    { name: "description", label: "Description", type: "textarea", fullWidth: true },
    { name: "type", label: "Type", type: "select", options: ["academic", "cultural", "sports", "preschool"] },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminEventsPage() {
  const rows = await fetchRows("events");
  return (
    <div>
      <PageHeader title="Events" subtitle="Manage school events and activities." />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
