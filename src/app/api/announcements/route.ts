import { NextResponse } from "next/server";
import { getAnnouncements } from "@/lib/supabase/public-data";

/** Always fresh — not cached with the page ISR, so new admin posts show immediately. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const announcements = await getAnnouncements();
  return NextResponse.json(announcements, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
