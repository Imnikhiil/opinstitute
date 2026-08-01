import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "announcements",
  singular: "Announcement",
  titleField: "title",
  subtitleField: "message",
  emptyHint:
    "Create a top-of-site notice (e.g. Admissions Open). Choose Main / Kids / Institute where it should appear.",
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
      helpText: "Keep it short — shown in the site banner.",
    },
    {
      name: "link_url",
      label: "Button link (optional)",
      type: "text",
      placeholder: "/admissions",
      helpText: "Example: /admissions or a full https://… link.",
    },
    {
      name: "link_label",
      label: "Button text",
      type: "text",
      placeholder: "Apply now",
    },
    {
      name: "show_on_main",
      label: "Show on main website",
      type: "boolean",
      placeholder: "Homepage and general browsing",
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
      type: "date",
      helpText: "Leave empty to start immediately.",
    },
    {
      name: "ends_on",
      label: "End date (optional)",
      type: "date",
      helpText: "Leave empty to keep showing until you turn it off.",
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first if several are active.",
    },
  ],
};

export default async function AdminAnnouncementsPage() {
  const rows = await fetchRows("announcements");
  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Top site banner notices (Admissions Open, new batches, offers). Pick where each one appears: Main, Kids, or Institute."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
