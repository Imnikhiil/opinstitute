import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "leadership",
  singular: "Leader",
  titleField: "name",
  subtitleField: "title",
  imageField: "image_url",
  emptyHint:
    "Add the Founder or Management Head — their photo and message appear on Home, About, and Faculty pages.",
  fields: [
    {
      name: "image_url",
      label: "Photo",
      type: "image",
      helpText: "Square crop works best.",
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Om Prakash",
    },
    {
      name: "title",
      label: "Title / role",
      type: "text",
      required: true,
      placeholder: "Founder & Director",
    },
    {
      name: "organization",
      label: "Organization",
      type: "text",
      placeholder: "OP Institute of Studies",
    },
    {
      name: "initials",
      label: "Initials",
      type: "text",
      placeholder: "OP",
      helpText: "Shown if the photo is missing.",
    },
    {
      name: "accent",
      label: "Card colour",
      type: "select",
      options: ["brand", "gold"],
      optionLabels: {
        brand: "Blue (Institute)",
        gold: "Gold accent",
      },
    },
    {
      name: "credentials",
      label: "Credentials",
      type: "tags",
      placeholder: "Founder, Since 2003",
      fullWidth: true,
      helpText: "Short tags, separated by commas.",
    },
    {
      name: "experience",
      label: "Experience",
      type: "text",
      placeholder: "20+ years",
    },
    {
      name: "education",
      label: "Education",
      type: "text",
      placeholder: "M.Com, B.Ed",
    },
    {
      name: "since_year",
      label: "Since year (optional)",
      type: "text",
      placeholder: "2003",
    },
    {
      name: "stats",
      label: "Highlight stats (optional)",
      type: "stat_lines",
      fullWidth: true,
      placeholder: "500+|Students mentored\n2|Institutes led",
      helpText:
        "One per line: number|label. Example: 500+|Students mentored. Leave blank if unsure.",
    },
    {
      name: "message",
      label: "Quote / message",
      type: "textarea",
      placeholder: "Education is the most powerful tool...",
      fullWidth: true,
      helpText: "Shown on leadership cards and About.",
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first.",
    },
  ],
};

export default async function AdminLeadershipPage() {
  const rows = await fetchRows("leadership");
  return (
    <div>
      <PageHeader
        title="Leadership"
        subtitle="Founder and management profiles — photos and messages on Home, About, and Faculty."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
