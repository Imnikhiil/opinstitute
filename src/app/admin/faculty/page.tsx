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
  fields: [
    { name: "image_url", label: "Photo", type: "image" },
    { name: "name", label: "Name", type: "text", required: true, placeholder: "CA Amit Verma" },
    { name: "category", label: "Category", type: "select", options: ["preschool", "institute"], optionLabels: { preschool: "OP Kids Pre School", institute: "OP Institute of Studies" }, required: true },
    { name: "department", label: "Department", type: "text", placeholder: "Accountancy & CA" },
    { name: "qualification", label: "Qualification", type: "text", placeholder: "Chartered Accountant (FCA)" },
    { name: "experience", label: "Experience", type: "text", placeholder: "18 years" },
    { name: "subject", label: "Subject / Role", type: "text", placeholder: "Accountancy" },
    { name: "subjects_taught", label: "Subjects Taught", type: "text", placeholder: "Direct tax, auditing" },
    { name: "batch_handled", label: "Batch Handled", type: "text", placeholder: "CMA inter & final" },
    { name: "achievement", label: "Achievement Badge", type: "text", placeholder: "98% pass result" },
    { name: "quote", label: "Quote", type: "text", placeholder: "Committed to making complex tax concepts simple..." },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminFacultyPage() {
  const rows = await fetchRows("faculty");
  return (
    <div>
      <PageHeader title="Faculty" subtitle="Manage teacher details and photos." />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
