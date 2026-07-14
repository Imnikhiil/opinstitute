import { createClient } from "@/lib/supabase/server";
import { QueriesClient, type Query } from "@/components/admin/QueriesClient";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

export default async function QueriesPage() {
  let queries: Query[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("queries")
      .select("*")
      .order("created_at", { ascending: false });
    queries = (data as Query[]) ?? [];
  } catch {
    queries = [];
  }

  return (
    <div>
      <PageHeader
        title="Queries"
        subtitle="All enquiries from Contact and Admission forms — reply via WhatsApp or call."
      />
      <QueriesClient initialQueries={queries} />
    </div>
  );
}
