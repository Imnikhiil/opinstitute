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
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Mrs. Kavita Joshi" },
    { name: "qualification", label: "Qualification", type: "text", placeholder: "M.Ed., B.Ed." },
    { name: "experience", label: "Experience", type: "text", placeholder: "8 Years" },
    { name: "subject", label: "Subject / Role", type: "text", placeholder: "OP Kids – Preschool" },
    { name: "linkedin", label: "LinkedIn URL", type: "text", placeholder: "https://..." },
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
