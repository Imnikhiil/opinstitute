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
  fields: [
    { name: "image_url", label: "Photo", type: "image" },
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Om Prakash" },
    { name: "title", label: "Title / Role", type: "text", required: true, placeholder: "Founder & Director" },
    { name: "organization", label: "Organization", type: "text", placeholder: "O.P. Institute of Studies" },
    { name: "initials", label: "Initials (for fallback avatar)", type: "text", placeholder: "OP" },
    { name: "accent", label: "Card Color", type: "select", options: ["brand", "gold"] },
    { name: "credentials", label: "Credentials (tags)", type: "tags", placeholder: "Founder, Since 2003", fullWidth: true },
    { name: "experience", label: "Experience", type: "text", placeholder: "20+ years" },
    { name: "education", label: "Education", type: "text", placeholder: "M.Com, B.Ed" },
    { name: "since_year", label: "Since Year (optional)", type: "text", placeholder: "2003" },
    { name: "stats", label: "Stats (JSON)", type: "textarea", placeholder: '[{"value":"500+","label":"students mentored"},{"value":"2","label":"institutes led"}]', fullWidth: true },
    { name: "message", label: "Quote / Message", type: "textarea", placeholder: "Education is the most powerful tool...", fullWidth: true },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminLeadershipPage() {
  const rows = await fetchRows("leadership");
  return (
    <div>
      <PageHeader title="Leadership" subtitle="Manage founder & management team profiles and photos." />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
