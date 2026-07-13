import { createClient } from "@/lib/supabase/server";
import { QueriesClient, type Query } from "@/components/admin/QueriesClient";

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
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Queries</h1>
        <p className="text-muted-foreground mt-1">
          All enquiries received from the Contact and Admission forms.
        </p>
      </div>
      <QueriesClient initialQueries={queries} />
    </div>
  );
}
