import { createClient } from "@/lib/supabase/server";

type Row = Record<string, unknown>;

/** Fetch all rows for a table (admin pages). Returns [] on any error. */
export async function fetchRows(
  table: string,
  orderBy: string = "sort_order",
  ascending = true
): Promise<Row[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}
