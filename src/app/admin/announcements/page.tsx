import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "announcements",
  singular: "Announcement",
  titleField: "title",
  subtitleField: "message",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Admissions Open 2026–27",
      fullWidth: true,
    },
    {
      name: "message",
      label: "Short message",
      type: "textarea",
      fullWidth: true,
      placeholder: "Enquire now for new batches / preschool seats…",
    },
    {
      name: "link_url",
      label: "Button link (optional)",
      type: "text",
      placeholder: "/admissions or https://…",
    },
    {
      name: "link_label",
      label: "Button text",
      type: "text",
      placeholder: "Apply now",
    },
    {
      name: "show_on_main",
      label: "Show on Main website",
      type: "boolean",
      placeholder: "Homepage & main browsing",
    },
    {
      name: "show_on_kids",
      label: "Show on OP Kids",
      type: "boolean",
      placeholder: "Kids World pages",
    },
    {
      name: "show_on_institute",
      label: "Show on Institute",
      type: "boolean",
      placeholder: "Institute World pages",
    },
    {
      name: "active",
      label: "Enabled",
      type: "boolean",
      placeholder: "Turn off to hide everywhere without deleting",
    },
    {
      name: "starts_on",
      label: "Start date (optional)",
      type: "text",
      placeholder: "2026-04-01",
    },
    {
      name: "ends_on",
      label: "End date (optional)",
      type: "text",
      placeholder: "2026-07-31",
    },
    {
      name: "sort_order",
      label: "Order (lower shows first)",
      type: "number",
    },
  ],
};

export default async function AdminAnnouncementsPage() {
  const rows = await fetchRows("announcements");
  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Create notices like Admissions Open, new batches, or offers — pick Main / Kids / Institute where each one should appear."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
