import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "courses",
  singular: "Course",
  titleField: "name",
  subtitleField: "description",
  emptyHint:
    "Add your first course — it appears on the Courses page and Institute section. Start with CMA, B.Com, or school tuition.",
  fields: [
    {
      name: "name",
      label: "Course name",
      type: "text",
      required: true,
      placeholder: "CMA – Cost & Management Accountancy",
    },
    {
      name: "description",
      label: "Short description",
      type: "textarea",
      placeholder: "What students learn in this course",
      helpText: "1–2 sentences for the course card.",
    },
    {
      name: "duration",
      label: "Duration",
      type: "text",
      placeholder: "Foundation / Inter / Final",
    },
    {
      name: "eligibility",
      label: "Eligibility",
      type: "text",
      placeholder: "Class 12 pass",
    },
    {
      name: "features",
      label: "Key points",
      type: "tags",
      fullWidth: true,
      placeholder: "Expert faculty, Study material, Mock tests",
      helpText: "Separate with commas.",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["professional", "degree", "school"],
      optionLabels: {
        professional: "Professional (CMA / CA style)",
        degree: "Degree (B.Com)",
        school: "School tuition",
      },
      helpText: "Used to group courses on the website.",
    },
    {
      name: "popular",
      label: "Highlight as popular",
      type: "boolean",
      placeholder: "Show a Popular badge on the course card",
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first.",
    },
  ],
};

export default async function AdminCoursesPage() {
  const rows = await fetchRows("courses");
  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Shown on the Courses page and Institute section. Add or edit programme names, duration, and highlights."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
