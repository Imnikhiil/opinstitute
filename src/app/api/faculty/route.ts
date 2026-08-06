import { NextResponse } from "next/server";
import { getFaculty, getLeadership } from "@/lib/supabase/public-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [allFaculty, leaders] = await Promise.all([
    getFaculty(),
    getLeadership(),
  ]);
  const leaderNames = new Set(
    leaders.map((l) => l.name.trim().toLowerCase())
  );
  const faculty = allFaculty.filter(
    (m) => !leaderNames.has(m.name.trim().toLowerCase())
  );

  return NextResponse.json(
    { faculty, leaders },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}
