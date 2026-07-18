import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "events",
  singular: "Event",
  titleField: "title",
  subtitleField: "event_date",
  imageField: "image_url",
  brandField: "brand",
  fields: [
    { name: "image_url", label: "Photo", type: "image" },
    {
      name: "title",
      label: "Event Title",
      type: "text",
      required: true,
      placeholder: "Annual Day Celebration 2026",
    },
    {
      name: "event_date",
      label: "Date",
      type: "text",
      placeholder: "December 15, 2026",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      fullWidth: true,
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
      name: "type",
      label: "Type",
      type: "select",
      options: ["academic", "cultural", "sports", "preschool"],
      optionLabels: {
        academic: "Academic",
        cultural: "Cultural",
        sports: "Sports",
        preschool: "Kids Activity",
      },
    },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminEventsPage() {
  const rows = await fetchRows("events");
  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Set Brand first (Kids or Institute), then Type — so each event shows in the right filter."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
