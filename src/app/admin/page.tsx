import Link from "next/link";
import {
  Inbox,
  BookOpen,
  Users,
  MessageSquareQuote,
  CalendarDays,
  Images,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = await createClient();
  const tables = [
    "queries",
    "courses",
    "faculty",
    "testimonials",
    "events",
    "gallery",
  ] as const;

  const counts: Record<string, number> = {};
  await Promise.all(
    tables.map(async (t) => {
      const { count } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      counts[t] = count ?? 0;
    })
  );

  const { count: newQueries } = await supabase
    .from("queries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");
  counts.newQueries = newQueries ?? 0;

  return counts;
}

export default async function AdminDashboard() {
  let counts: Record<string, number> | null = null;
  try {
    counts = await getCounts();
  } catch {
    counts = null;
  }

  if (!counts) {
    return (
      <div className="max-w-2xl">
        <div className="rounded-2xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-6">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold mb-2">
            <AlertTriangle className="w-5 h-5" />
            Setup incomplete
          </div>
          <p className="text-sm text-muted-foreground">
            Database connection not found. Please set the Supabase environment
            variables (.env.local) and run schema.sql. Contact the developer for
            setup steps.
          </p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "New Queries",
      value: counts.newQueries,
      total: counts.queries,
      href: "/admin/queries",
      icon: Inbox,
      color: "text-brand-600 bg-brand-50 dark:bg-brand-950/30",
      highlight: counts.newQueries > 0,
    },
    { label: "Courses", value: counts.courses, href: "/admin/courses", icon: BookOpen, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30" },
    { label: "Faculty", value: counts.faculty, href: "/admin/faculty", icon: Users, color: "text-sky-600 bg-sky-50 dark:bg-sky-950/30" },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials", icon: MessageSquareQuote, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/30" },
    { label: "Events", value: counts.events, href: "/admin/events", icon: CalendarDays, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
    { label: "Gallery", value: counts.gallery, href: "/admin/gallery", icon: Images, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your entire website from here. Welcome back!
        </p>
      </div>

      {counts.newQueries > 0 && (
        <Link
          href="/admin/queries"
          className="group flex items-center justify-between gap-4 rounded-2xl bg-brand-600 text-white p-5 mb-6 shadow-premium hover:bg-brand-700 transition"
        >
          <div className="flex items-center gap-3">
            <Inbox className="w-6 h-6" />
            <div>
              <p className="font-semibold">
                {counts.newQueries} new{" "}
                {counts.newQueries === 1 ? "query" : "queries"} received
              </p>
              <p className="text-white/80 text-sm">View and reply now</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-white/10 p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${c.color}`}>
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold font-display">
              {c.value}
              {c.total !== undefined && c.total !== c.value && (
                <span className="text-base text-muted-foreground font-normal">
                  {" "}/ {c.total}
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              {c.label}
              {c.highlight && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
