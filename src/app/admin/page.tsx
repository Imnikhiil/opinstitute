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
  GraduationCap,
  Baby,
  Crown,
  Settings,
  Megaphone,
  Video,
  Lightbulb,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function adminDisplayName(
  email?: string | null,
  meta?: Record<string, unknown> | null
) {
  const fromMeta =
    (typeof meta?.full_name === "string" && meta.full_name) ||
    (typeof meta?.name === "string" && meta.name) ||
    (typeof meta?.display_name === "string" && meta.display_name);
  if (fromMeta && fromMeta.trim()) return fromMeta.trim();

  const local = email?.split("@")[0] ?? "Admin";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getDashboardData() {
  const supabase = await createClient();
  const tables = [
    "queries",
    "courses",
    "faculty",
    "testimonials",
    "events",
    "gallery",
    "leadership",
    "announcements",
    "videos",
  ] as const;

  const [{ data: userData }, ...tableResults] = await Promise.all([
    supabase.auth.getUser(),
    ...tables.map((t) =>
      supabase.from(t).select("*", { count: "exact", head: true })
    ),
    supabase
      .from("queries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("queries")
      .select("*", { count: "exact", head: true })
      .eq("brand", "preschool"),
    supabase
      .from("queries")
      .select("*", { count: "exact", head: true })
      .eq("brand", "institute"),
  ]);

  const counts: Record<string, number> = {};
  const tableErrors: string[] = [];
  tables.forEach((t, i) => {
    const result = tableResults[i];
    counts[t] = result.count ?? 0;
    if (result.error) tableErrors.push(t);
  });
  const offset = tables.length;
  counts.newQueries = tableResults[offset].count ?? 0;
  counts.kidsQueries = tableResults[offset + 1].count ?? 0;
  counts.instituteQueries = tableResults[offset + 2].count ?? 0;

  // Soft check: event albums need events.photos column
  let eventsPhotosOk = true;
  const photosProbe = await supabase.from("events").select("photos").limit(1);
  if (photosProbe.error) eventsPhotosOk = false;

  const user = userData.user;
  const adminName = adminDisplayName(
    user?.email,
    user?.user_metadata as Record<string, unknown> | null
  );

  return {
    counts,
    adminName,
    tableErrors,
    eventsPhotosOk,
  };
}

export default async function AdminDashboard() {
  let data: Awaited<ReturnType<typeof getDashboardData>> | null = null;
  try {
    data = await getDashboardData();
  } catch {
    data = null;
  }

  if (!data) {
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

  const { counts, adminName, tableErrors, eventsPhotosOk } = data;
  const setupHints: string[] = [];
  if (tableErrors.includes("videos")) {
    setupHints.push(
      "Videos table is missing — ask the developer to run add_videos.sql in Supabase."
    );
  }
  if (!eventsPhotosOk) {
    setupHints.push(
      "Event photo albums need a database update — ask the developer to run add_event_photos.sql."
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
      iconBg:
        "bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400",
      highlight: counts.newQueries > 0,
    },
    {
      label: "Announcements",
      value: counts.announcements,
      href: "/admin/announcements",
      icon: Megaphone,
      accent: "from-orange-500 to-orange-700",
      iconBg:
        "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
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
      label: "Leadership",
      value: counts.leadership,
      href: "/admin/leadership",
      icon: Crown,
      accent: "from-violet-500 to-violet-700",
      iconBg:
        "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
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
      iconBg:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
    {
      label: "Gallery",
      value: counts.gallery,
      href: "/admin/gallery",
      icon: Images,
      accent: "from-emerald-500 to-emerald-700",
      iconBg:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      label: "Videos",
      value: counts.videos ?? 0,
      href: "/admin/videos",
      icon: Video,
      accent: "from-indigo-500 to-indigo-700",
      iconBg:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
    },
    {
      label: "Site Settings",
      value: "→",
      href: "/admin/settings",
      icon: Settings,
      accent: "from-slate-500 to-slate-700",
      iconBg:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
      isLink: true,
    },
  ];

  const howToSteps = [
    {
      href: "/admin/queries",
      title: "Reply to queries",
      detail: "Open Queries when parents or students send a form.",
    },
    {
      href: "/admin/events",
      title: "Add event photos",
      detail: "Events → cover photo + album (you can add 20–25 photos).",
    },
    {
      href: "/admin/gallery",
      title: "Update Front Desk photo",
      detail: "Gallery → set Show as = Front desk / office.",
    },
    {
      href: "/admin/settings",
      title: "Phone, Front Desk & banner",
      detail: "Settings → contact numbers, Front Desk text, Admissions banner.",
    },
    {
      href: "/admin/announcements",
      title: "Top site banner",
      detail: "Announcements → short notice across the website.",
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
          Welcome, {adminName}
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm sm:text-[15px]">
          {today} · Manage OP Institute & OP Kids content
        </p>
      </div>

      {setupHints.length > 0 ? (
        <div className="mb-6 rounded-2xl border border-amber-300/80 bg-amber-50 dark:bg-amber-950/20 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Setup tip
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {setupHints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mb-7 rounded-2xl border border-brand-200/80 dark:border-brand-800/40 bg-gradient-to-br from-brand-50/80 to-white dark:from-brand-950/20 dark:to-gray-900 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-semibold text-sm mb-3">
          <Lightbulb className="w-4 h-4" />
          How to update the website
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {howToSteps.map((step, i) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="block h-full rounded-xl border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-gray-900/60 p-3.5 hover:border-brand-300 dark:hover:border-brand-700 transition"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400 mb-1">
                  Step {i + 1}
                </p>
                <p className="text-sm font-semibold text-[#1d2951] dark:text-white">
                  {step.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {step.detail}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {counts.newQueries > 0 && (
        <Link
          href="/admin/queries"
          prefetch
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-brand-600 to-brand-700 text-white p-5 sm:p-6 mb-6 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-shadow duration-150"
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
          <ArrowRight className="relative w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-150 shrink-0" />
        </Link>
      )}

      <div className="grid sm:grid-cols-2 gap-3 mb-7">
        <div className="rounded-2xl border border-kids-200 dark:border-kids-800/50 bg-gradient-to-br from-kids-50 to-white dark:from-kids-950/20 dark:to-gray-900 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-kids-700 dark:text-kids-300 font-semibold text-sm mb-1">
            <Baby className="w-4 h-4" />
            OP Kids queries
          </div>
          <p className="font-display text-3xl font-bold text-[#1d2951] dark:text-white">
            {counts.kidsQueries}
          </p>
          <Link
            href="/admin/queries"
            className="inline-flex items-center gap-1 text-xs font-semibold text-kids-600 mt-2 hover:gap-1.5 transition-all"
          >
            Open inbox <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="rounded-2xl border border-brand-200 dark:border-brand-800/50 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950/20 dark:to-gray-900 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-semibold text-sm mb-1">
            <GraduationCap className="w-4 h-4" />
            Institute queries
          </div>
          <p className="font-display text-3xl font-bold text-[#1d2951] dark:text-white">
            {counts.instituteQueries}
          </p>
          <Link
            href="/admin/queries"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 mt-2 hover:gap-1.5 transition-all"
          >
            Open inbox <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            prefetch
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/10 p-5 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md transition-[border-color,box-shadow] duration-150"
          >
            <div
              className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-150`}
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
