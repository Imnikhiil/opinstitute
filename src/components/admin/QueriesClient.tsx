"use client";

import { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  MessageSquare,
  Check,
  Trash2,
  Inbox,
  User,
  Search,
  RotateCcw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import type { ContentBrand } from "@/data/brands";

export interface Query {
  id: string;
  type: "contact" | "admission";
  name: string;
  parent_name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  program?: string | null;
  age?: string | null;
  message?: string | null;
  brand?: ContentBrand | string | null;
  status: "new" | "read" | "done";
  created_at: string;
}

type BrandFilter = "all" | "kids" | "institute";
type TypeFilter = "all" | "contact" | "admission";
type StatusFilter = "all" | "new" | "done";

function resolveQueryBrand(q: Query): ContentBrand | null {
  const raw = (q.brand || "").toLowerCase();
  if (raw === "preschool" || raw === "institute") return raw;
  const program = q.program || "";
  if (/kids|preschool|play group|nursery|\blkg\b|\bukg\b/i.test(program)) {
    return "preschool";
  }
  if (q.type === "admission" && program.trim()) return "institute";
  return null;
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function waLink(phone: string) {
  let digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return `https://wa.me/${digits}`;
}

export function QueriesClient({ initialQueries }: { initialQueries: Query[] }) {
  const [queries, setQueries] = useState<Query[]>(initialQueries);
  const [brandFilter, setBrandFilter] = useState<BrandFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const qText = search.trim().toLowerCase();
    return queries.filter((q) => {
      const brand = resolveQueryBrand(q);
      if (brandFilter === "kids" && brand !== "preschool") return false;
      if (brandFilter === "institute" && brand !== "institute") return false;
      if (typeFilter !== "all" && q.type !== typeFilter) return false;
      if (statusFilter === "new" && q.status !== "new") return false;
      if (statusFilter === "done" && q.status !== "done") return false;
      if (!qText) return true;
      const hay = [
        q.name,
        q.parent_name,
        q.email,
        q.phone,
        q.program,
        q.subject,
        q.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(qText);
    });
  }, [queries, brandFilter, typeFilter, statusFilter, search]);

  const updateStatus = async (id: string, status: Query["status"]) => {
    setBusy(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("queries")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status } : q))
      );
    }
    setBusy(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this query? This cannot be undone.")) return;
    setBusy(id);
    const supabase = createClient();
    const { error } = await supabase.from("queries").delete().eq("id", id);
    if (!error) setQueries((prev) => prev.filter((q) => q.id !== id));
    setBusy(null);
  };

  const newCount = queries.filter((q) => q.status === "new").length;
  const kidsCount = queries.filter(
    (q) => resolveQueryBrand(q) === "preschool"
  ).length;
  const instituteCount = queries.filter(
    (q) => resolveQueryBrand(q) === "institute"
  ).length;

  const chip = (
    active: boolean,
    kidsTone: boolean,
    className?: string
  ) =>
    cn(
      "px-3.5 py-2 rounded-xl text-sm font-medium transition-all",
      active
        ? kidsTone
          ? "bg-kids-500 text-white shadow-sm"
          : "bg-brand-600 text-white shadow-sm"
        : "text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800",
      className
    );

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email, program…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
        />
      </div>

      <div className="space-y-2.5 mb-6">
        <div className="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-white/10 shadow-sm">
          {(
            [
              { id: "all" as const, label: "All brands" },
              { id: "kids" as const, label: "OP Kids", count: kidsCount },
              {
                id: "institute" as const,
                label: "Institute",
                count: instituteCount,
              },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setBrandFilter(f.id)}
              className={chip(brandFilter === f.id, f.id === "kids")}
            >
              {f.label}
              {"count" in f && f.count > 0 && (
                <span
                  className={cn(
                    "ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                    brandFilter === f.id
                      ? "bg-white/20 text-white"
                      : f.id === "kids"
                        ? "bg-kids-100 text-kids-700"
                        : "bg-brand-100 text-brand-700"
                  )}
                >
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-white/10 shadow-sm">
            {(
              [
                { id: "all" as const, label: "All types" },
                { id: "admission" as const, label: "Admission" },
                { id: "contact" as const, label: "Contact" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setTypeFilter(f.id)}
                className={chip(typeFilter === f.id, false)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-white/10 shadow-sm">
            {(
              [
                { id: "all" as const, label: "All status" },
                { id: "new" as const, label: "New", count: newCount },
                { id: "done" as const, label: "Done" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={chip(statusFilter === f.id, false)}
              >
                {f.label}
                {"count" in f && f.count !== undefined && f.count > 0 && (
                  <span
                    className={cn(
                      "ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                      statusFilter === f.id
                        ? "bg-white/20 text-white"
                        : "bg-red-500 text-white"
                    )}
                  >
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        Showing {filtered.length} of {queries.length} quer
        {queries.length === 1 ? "y" : "ies"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 p-14 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">
            {queries.length === 0 ? "No queries yet" : "No matching queries"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {queries.length === 0
              ? "Enquiries from the website will appear here."
              : "Try clearing search or filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((q) => {
            const brand = resolveQueryBrand(q);
            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl bg-white dark:bg-gray-900/80 border p-5 sm:p-6 transition-shadow",
                  q.status === "new"
                    ? brand === "preschool"
                      ? "border-kids-300 dark:border-kids-700 shadow-md shadow-kids-500/5"
                      : "border-brand-300 dark:border-brand-700 shadow-md shadow-brand-600/5"
                    : "border-gray-200/80 dark:border-white/10 hover:shadow-sm"
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                        brand === "preschool"
                          ? "bg-kids-50 text-kids-600 dark:bg-kids-950/30"
                          : "bg-brand-50 text-brand-600 dark:bg-brand-950/30"
                      )}
                    >
                      {q.type === "admission" ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : (
                        <MessageSquare className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold flex flex-wrap items-center gap-2 text-[#1d2951] dark:text-white">
                        {q.name}
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {q.type}
                        </span>
                        {brand === "preschool" && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-kids-100 text-kids-700 dark:bg-kids-900/40 dark:text-kids-300">
                            OP Kids
                          </span>
                        )}
                        {brand === "institute" && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                            Institute
                          </span>
                        )}
                        {q.status === "new" && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-red-100 text-red-600 dark:bg-red-950/40">
                            NEW
                          </span>
                        )}
                        {q.status === "done" && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-green-100 text-green-700 dark:bg-green-950/40">
                            DONE
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {timeAgo(q.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {q.status !== "done" && (
                      <button
                        onClick={() => updateStatus(q.id, "done")}
                        disabled={busy === q.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 hover:bg-green-100 transition disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Done
                      </button>
                    )}
                    {q.status === "done" && (
                      <button
                        onClick={() => updateStatus(q.id, "read")}
                        disabled={busy === q.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reopen
                      </button>
                    )}
                    {q.status === "new" && (
                      <button
                        onClick={() => updateStatus(q.id, "read")}
                        disabled={busy === q.id}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => remove(q.id)}
                      disabled={busy === q.id}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {q.parent_name && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-3.5 h-3.5 shrink-0" />
                      Parent:{" "}
                      <span className="text-foreground">{q.parent_name}</span>
                    </p>
                  )}
                  {q.phone && (
                    <a
                      href={`tel:${q.phone}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-brand-600"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      {q.phone}
                    </a>
                  )}
                  {q.email && (
                    <a
                      href={`mailto:${q.email}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-brand-600 truncate"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {q.email}
                    </a>
                  )}
                  {q.program && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                      {q.program}
                      {q.age ? ` · ${q.age}` : ""}
                    </p>
                  )}
                  {q.subject && (
                    <p className="text-muted-foreground">
                      Subject:{" "}
                      <span className="text-foreground">{q.subject}</span>
                    </p>
                  )}
                </div>

                {q.message && (
                  <p className="mt-4 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3.5 text-foreground/90 border border-gray-100 dark:border-white/5">
                    {q.message}
                  </p>
                )}

                {q.phone && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={waLink(q.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#25D366]/10 text-[#128C4A] hover:bg-[#25D366]/20 transition"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${q.phone}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/30 dark:text-brand-400 hover:bg-brand-100 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
