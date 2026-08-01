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
    {
      name: "image_url",
      label: "Cover photo (card)",
      type: "image",
    },
    {
      name: "photos",
      label: "Album photos (shown when visitors click the event)",
      type: "images",
      fullWidth: true,
    },
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
        subtitle="Cover = timeline card. Album photos = open when someone clicks the event. Set Brand (Kids / Institute) so filters work."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
