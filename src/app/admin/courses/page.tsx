import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "courses",
  singular: "Course",
  titleField: "name",
  subtitleField: "description",
  fields: [
    { name: "name", label: "Course Name", type: "text", required: true, placeholder: "CMA – Cost & Management Accountancy" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Short description" },
    { name: "duration", label: "Duration", type: "text", placeholder: "Foundation / Inter / Final" },
    { name: "eligibility", label: "Eligibility", type: "text", placeholder: "Class 12 pass" },
    { name: "features", label: "Features", type: "tags", fullWidth: true, placeholder: "Feature 1, Feature 2, Feature 3" },
    { name: "category", label: "Category", type: "select", options: ["professional", "degree", "school"] },
    { name: "popular", label: "Popular?", type: "boolean", placeholder: "Feature on homepage" },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminCoursesPage() {
  const rows = await fetchRows("courses");
  return (
    <div>
      <PageHeader title="Courses" subtitle="Add, edit or delete the institute's courses." />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
