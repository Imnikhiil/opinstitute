import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Bust ISR cache for the public site after admin CMS edits.
 * Requires an authenticated Supabase session (admin).
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Announcements live in the root layout — revalidate the full tree
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/op-kids");
  revalidatePath("/institute");
  revalidatePath("/admissions");
  revalidatePath("/events");
  revalidatePath("/faculty");
  revalidatePath("/gallery");
  revalidatePath("/about");

  return NextResponse.json({ revalidated: true, at: Date.now() });
}
