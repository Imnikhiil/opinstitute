"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Megaphone, X, ArrowRight } from "lucide-react";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { cn } from "@/lib/utils";
import type { Announcement } from "@/lib/supabase/public-data";
import type { SiteBrandMode } from "@/lib/site-brand";

function matchesSurface(a: Announcement, mode: SiteBrandMode): boolean {
  if (mode === "preschool") return a.showOnKids;
  if (mode === "institute") return a.showOnInstitute;
  return a.showOnMain;
}

function dismissKey(id: string) {
  return `op-announce-dismiss:${id}`;
}

export function AnnouncementBanner({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const { brand } = useSiteBrand();
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    announcements.forEach((a) => {
      try {
        if (sessionStorage.getItem(dismissKey(a.id)) === "1") {
          map[a.id] = true;
        }
      } catch {
        /* ignore */
      }
    });
    setDismissed(map);
    setReady(true);
  }, [announcements]);

  const visible = useMemo(() => {
    if (!ready) return [];
    return announcements.filter(
      (a) => matchesSurface(a, brand) && !dismissed[a.id]
    );
  }, [announcements, brand, dismissed, ready]);

  if (!visible.length) return null;

  const a = visible[0];
  const isKids = brand === "preschool";

  const dismiss = () => {
    try {
      sessionStorage.setItem(dismissKey(a.id), "1");
    } catch {
      /* ignore */
    }
    setDismissed((d) => ({ ...d, [a.id]: true }));
  };

  const cta = a.linkUrl ? (
    a.linkUrl.startsWith("http") ? (
      <a
        href={a.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-2 hover:underline shrink-0"
      >
        {a.linkLabel || "Learn more"}
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    ) : (
      <Link
        href={a.linkUrl}
        className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-2 hover:underline shrink-0"
      >
        {a.linkLabel || "Learn more"}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    )
  ) : null;

  return (
    <div
      className={cn(
        "relative z-30 border-b",
        isKids
          ? "bg-gradient-to-r from-kids-500 via-accent-pink to-kids-600 border-kids-600/30 text-white"
          : "bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 border-brand-800/20 text-white"
      )}
    >
      <div className="container-custom py-2.5 sm:py-3 flex items-start sm:items-center gap-3">
        <span
          className={cn(
            "mt-0.5 sm:mt-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            isKids ? "bg-white/20" : "bg-white/15"
          )}
        >
          <Megaphone className="w-4 h-4" />
        </span>
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-sm sm:text-[15px] leading-snug">
              {a.title}
            </p>
            {a.message && (
              <p className="text-xs sm:text-sm text-white/85 leading-snug mt-0.5 line-clamp-2">
                {a.message}
              </p>
            )}
          </div>
          {cta}
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/15 transition"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {visible.length > 1 && (
        <p className="container-custom pb-2 text-[10px] text-white/70">
          +{visible.length - 1} more notice
          {visible.length - 1 === 1 ? "" : "s"} — check back after dismissing
        </p>
      )}
    </div>
  );
}
