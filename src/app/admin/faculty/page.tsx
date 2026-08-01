import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "faculty",
  singular: "Teacher",
  titleField: "name",
  subtitleField: "subject",
  imageField: "image_url",
  brandField: "category",
  emptyHint:
    "Add a teacher with photo and brand (OP Kids or Institute). They appear on the Faculty page.",
  fields: [
    {
      name: "image_url",
      label: "Photo",
      type: "image",
      helpText: "Portrait crop is applied automatically.",
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "CA Amit Verma",
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
      helpText: "Chooses which Faculty list they appear in.",
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Accountancy & CA",
    },
    {
      name: "qualification",
      label: "Qualification",
      type: "text",
      placeholder: "Chartered Accountant (FCA)",
    },
    {
      name: "experience",
      label: "Experience",
      type: "text",
      placeholder: "18 years",
    },
    {
      name: "subject",
      label: "Main subject / role",
      type: "text",
      placeholder: "Accountancy",
      helpText: "Short label on the card.",
    },
    {
      name: "subjects_taught",
      label: "Subjects taught",
      type: "text",
      placeholder: "Direct tax, auditing",
      helpText: "Optional detail under the card.",
    },
    {
      name: "batch_handled",
      label: "Batches handled",
      type: "text",
      placeholder: "CMA inter & final",
    },
    {
      name: "achievement",
      label: "Achievement badge",
      type: "text",
      placeholder: "98% pass result",
      helpText: "Optional short highlight.",
    },
    {
      name: "quote",
      label: "Quote",
      type: "text",
      placeholder: "Committed to making complex tax concepts simple...",
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first.",
    },
  ],
};

export default async function AdminFacultyPage() {
  const rows = await fetchRows("faculty");
  return (
    <div>
      <PageHeader
        title="Faculty"
        subtitle="Teacher profiles and photos on the Faculty page. Filter by OP Kids or Institute when editing."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
