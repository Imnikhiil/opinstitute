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
  emptyHint:
    "Add an event with a cover photo, then upload album photos (20–25 is fine). Visitors open the album when they tap the card.",
  fields: [
    {
      name: "image_url",
      label: "Cover photo",
      type: "image",
      helpText: "Shown on the event card on Home and Events.",
    },
    {
      name: "photos",
      label: "Album photos",
      type: "images",
      fullWidth: true,
      helpText:
        "Shown when someone opens the event. You can select many photos at once.",
    },
    {
      name: "title",
      label: "Event title",
      type: "text",
      required: true,
      placeholder: "Annual Day Celebration 2026",
    },
    {
      name: "event_date",
      label: "Date",
      type: "text",
      placeholder: "December 15, 2026",
      helpText: "Write it how you want it to appear (e.g. December 15, 2026).",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      fullWidth: true,
      helpText: "Short summary under the title.",
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
      helpText: "Controls Kids / Institute filters on the site.",
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
        preschool: "Kids activity",
      },
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first.",
    },
  ],
};

export default async function AdminEventsPage() {
  const rows = await fetchRows("events");
  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Home carousel and Events page. Cover = card image. Album photos open when visitors click the event."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
