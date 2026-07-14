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
  Sparkles,
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

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
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
        <div className="rounded-2xl border border-amber-300/80 bg-amber-50 dark:bg-amber-950/20 p-6 shadow-sm">
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
      accent: "from-brand-500 to-brand-700",
      iconBg: "bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400",
      highlight: counts.newQueries > 0,
    },
    {
      label: "Courses",
      value: counts.courses,
      href: "/admin/courses",
      icon: BookOpen,
      accent: "from-sky-500 to-sky-700",
      iconBg: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
    },
    {
      label: "Faculty",
      value: counts.faculty,
      href: "/admin/faculty",
      icon: Users,
      accent: "from-teal-500 to-teal-700",
      iconBg: "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400",
    },
    {
      label: "Testimonials",
      value: counts.testimonials,
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      accent: "from-rose-500 to-rose-700",
      iconBg: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    },
    {
      label: "Events",
      value: counts.events,
      href: "/admin/events",
      icon: CalendarDays,
      accent: "from-amber-500 to-amber-700",
      iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
    {
      label: "Gallery",
      value: counts.gallery,
      href: "/admin/gallery",
      icon: Images,
      accent: "from-emerald-500 to-emerald-700",
      iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 mb-1.5">
          Overview
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1d2951] dark:text-white">
          {greeting()}
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm sm:text-[15px]">
          {today} · Manage your website content and enquiries
        </p>
      </div>

      {counts.newQueries > 0 && (
        <Link
          href="/admin/queries"
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-brand-600 to-brand-700 text-white p-5 sm:p-6 mb-7 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center ring-1 ring-white/20">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-lg leading-tight">
                {counts.newQueries} new{" "}
                {counts.newQueries === 1 ? "query" : "queries"} received
              </p>
              <p className="text-white/80 text-sm mt-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                View and reply now
              </p>
            </div>
          </div>
          <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
        </Link>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/10 p-5 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-lg hover:shadow-brand-900/5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div
              className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
            />
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${c.iconBg}`}
            >
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold font-display tracking-tight text-[#1d2951] dark:text-white">
              {c.value}
              {c.total !== undefined && c.total !== c.value && (
                <span className="text-base text-muted-foreground font-normal">
                  {" "}
                  / {c.total}
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-1.5">
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
