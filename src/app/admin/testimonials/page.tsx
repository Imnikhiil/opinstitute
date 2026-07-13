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
  fields: [
    { name: "image_url", label: "Photo (optional)", type: "image" },
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Mrs. Rekha Patel" },
    { name: "role", label: "Role", type: "text", placeholder: "Parent – OP Kids Nursery" },
    { name: "content", label: "Review", type: "textarea", required: true, fullWidth: true, placeholder: "Write their review here…" },
    { name: "rating", label: "Rating (1-5)", type: "number", placeholder: "5" },
    { name: "category", label: "Category", type: "select", options: ["preschool", "institute"] },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminTestimonialsPage() {
  const rows = await fetchRows("testimonials");
  return (
    <div>
      <PageHeader title="Testimonials" subtitle="Manage reviews from parents and students." />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
