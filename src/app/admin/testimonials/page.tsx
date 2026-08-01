import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "testimonials",
  singular: "Testimonial",
  titleField: "name",
  subtitleField: "content",
  imageField: "image_url",
  brandField: "category",
  emptyHint:
    "Add a parent or student review. Pick the brand so it shows on Home, Courses, Institute, or OP Kids.",
  fields: [
    {
      name: "image_url",
      label: "Photo (optional)",
      type: "image",
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Mrs. Rekha Patel",
    },
    {
      name: "role",
      label: "Role",
      type: "text",
      placeholder: "Parent – OP Kids Nursery",
      helpText: "e.g. Parent, CMA student, B.Com alumni.",
    },
    {
      name: "content",
      label: "Review",
      type: "textarea",
      required: true,
      fullWidth: true,
      placeholder: "Write their review here…",
    },
    {
      name: "rating",
      label: "Rating (1–5)",
      type: "number",
      placeholder: "5",
      helpText: "Usually 5.",
    },
    {
      name: "category",
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
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first.",
    },
  ],
};

export default async function AdminTestimonialsPage() {
  const rows = await fetchRows("testimonials");
  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Parent and student reviews on Home, Courses, Institute, and OP Kids pages."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
