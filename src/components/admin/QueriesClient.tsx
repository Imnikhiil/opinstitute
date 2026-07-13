"use client";

import { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  MessageSquare,
  Check,
  Trash2,
  Inbox,
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

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
  status: "new" | "read" | "done";
  created_at: string;
}

type Filter = "all" | "new" | "contact" | "admission";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "contact", label: "Contact" },
  { id: "admission", label: "Admission" },
];

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

export function QueriesClient({ initialQueries }: { initialQueries: Query[] }) {
  const [queries, setQueries] = useState<Query[]>(initialQueries);
  const [filter, setFilter] = useState<Filter>("all");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return queries;
    if (filter === "new") return queries.filter((q) => q.status === "new");
    return queries.filter((q) => q.type === filter);
  }, [queries, filter]);

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
    if (!confirm("Ye query delete karein? Wapas nahi aayegi.")) return;
    setBusy(id);
    const supabase = createClient();
    const { error } = await supabase.from("queries").delete().eq("id", id);
    if (!error) setQueries((prev) => prev.filter((q) => q.id !== id));
    setBusy(null);
  };

  const newCount = queries.filter((q) => q.status === "new").length;

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition",
              filter === f.id
                ? "bg-brand-600 text-white"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
            {f.id === "new" && newCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px]">
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
          <Inbox className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Koi query nahi mili.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => (
            <div
              key={q.id}
              className={cn(
                "rounded-2xl bg-white dark:bg-gray-900 border p-5 transition",
                q.status === "new"
                  ? "border-brand-300 dark:border-brand-700 shadow-sm"
                  : "border-gray-200/70 dark:border-white/10"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      q.type === "admission"
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
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      {q.name}
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide",
                          q.type === "admission"
                            ? "bg-kids-100 text-kids-700 dark:bg-kids-900/40 dark:text-kids-300"
                            : "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                        )}
                      >
                        {q.type}
                      </span>
                      {q.status === "new" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-600 dark:bg-red-950/40">
                          NEW
                        </span>
                      )}
                      {q.status === "done" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-950/40">
                          DONE
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(q.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {q.status !== "done" && (
                    <button
                      onClick={() => updateStatus(q.id, "done")}
                      disabled={busy === q.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 hover:bg-green-100 transition disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Done
                    </button>
                  )}
                  {q.status === "new" && (
                    <button
                      onClick={() => updateStatus(q.id, "read")}
                      disabled={busy === q.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => remove(q.id)}
                    disabled={busy === q.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-50"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {q.parent_name && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    Parent: <span className="text-foreground">{q.parent_name}</span>
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
                    Subject: <span className="text-foreground">{q.subject}</span>
                  </p>
                )}
              </div>

              {q.message && (
                <p className="mt-3 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-foreground/90">
                  {q.message}
                </p>
              )}

              {/* Quick reply */}
              {q.phone && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${q.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#25D366]/10 text-[#128C4A] hover:bg-[#25D366]/20 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${q.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950/30 dark:text-brand-400 hover:bg-brand-100 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
