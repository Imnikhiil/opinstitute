import { NextResponse } from "next/server";
import { getFaculty, getLeadership } from "@/lib/supabase/public-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [faculty, leaders] = await Promise.all([
    getFaculty(),
    getLeadership(),
  ]);

  return NextResponse.json(
    { faculty, leaders },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}
