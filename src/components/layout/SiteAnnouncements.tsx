"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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

function barKey(id: string) {
  return `op-announce-bar:${id}`;
}
function popupKey(id: string) {
  return `op-announce-popup:${id}`;
}

function CtaLink({
  a,
  className,
  onClick,
}: {
  a: Announcement;
  className?: string;
  onClick?: () => void;
}) {
  if (!a.linkUrl) return null;
  const label = a.linkLabel || "Learn more";
  const inner = (
    <>
      {label}
      <ArrowRight className="w-4 h-4" />
    </>
  );
  if (a.linkUrl.startsWith("http")) {
    return (
      <a
        href={a.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={a.linkUrl} onClick={onClick} className={className}>
      {inner}
    </Link>
  );
}

export function SiteAnnouncements({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const { brand } = useSiteBrand();
  const [ready, setReady] = useState(false);
  const [barDismissed, setBarDismissed] = useState<Record<string, boolean>>({});
  const [popupDismissed, setPopupDismissed] = useState<Record<string, boolean>>(
    {}
  );
  const [showPopup, setShowPopup] = useState(false);

  const forSurface = useMemo(
    () => announcements.filter((a) => matchesSurface(a, brand)),
    [announcements, brand]
  );

  useEffect(() => {
    const bars: Record<string, boolean> = {};
    const pops: Record<string, boolean> = {};
    forSurface.forEach((a) => {
      try {
        if (localStorage.getItem(barKey(a.id)) === "1") bars[a.id] = true;
        if (localStorage.getItem(popupKey(a.id)) === "1") pops[a.id] = true;
      } catch {
        /* ignore */
      }
    });
    setBarDismissed(bars);
    setPopupDismissed(pops);
    setReady(true);
  }, [forSurface]);

  const active = forSurface[0] ?? null;
  const showBar = Boolean(ready && active && !barDismissed[active.id]);
  const popupEligible = Boolean(
    ready && active && !popupDismissed[active.id]
  );

  useEffect(() => {
    if (!popupEligible) {
      setShowPopup(false);
      return;
    }
    const t = window.setTimeout(() => setShowPopup(true), 500);
    return () => window.clearTimeout(t);
  }, [popupEligible, active?.id]);

  useEffect(() => {
    if (!showPopup) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showPopup]);

  // Push fixed navbar below the top strip
  useEffect(() => {
    const h = showBar ? "42px" : "0px";
    document.documentElement.style.setProperty("--op-announce-h", h);
    return () => {
      document.documentElement.style.setProperty("--op-announce-h", "0px");
    };
  }, [showBar]);

  const dismissBar = () => {
    if (!active) return;
    try {
      localStorage.setItem(barKey(active.id), "1");
    } catch {
      /* ignore */
    }
    setBarDismissed((d) => ({ ...d, [active.id]: true }));
  };

  const dismissPopup = () => {
    if (!active) return;
    try {
      localStorage.setItem(popupKey(active.id), "1");
    } catch {
      /* ignore */
    }
    setPopupDismissed((d) => ({ ...d, [active.id]: true }));
    setShowPopup(false);
  };

  if (!active) return null;

  const isKids = brand === "preschool";

  return (
    <>
      {/* Top strip — sits above fixed navbar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "fixed inset-x-0 top-0 z-[60] text-white shadow-md",
              isKids
                ? "bg-gradient-to-r from-kids-600 to-accent-pink"
                : "bg-gradient-to-r from-brand-700 to-brand-600"
            )}
          >
            <div className="container-custom h-[42px] flex items-center gap-3">
              <Megaphone className="w-4 h-4 shrink-0 opacity-90" />
              <p className="flex-1 min-w-0 text-sm font-semibold truncate">
                {active.title}
                {active.message ? (
                  <span className="hidden sm:inline font-normal text-white/85">
                    {" "}
                    — {active.message}
                  </span>
                ) : null}
              </p>
              <CtaLink
                a={active}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full shrink-0 transition"
              />
              <button
                type="button"
                onClick={dismissBar}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              aria-label="Close announcement"
              onClick={dismissPopup}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="announce-title"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden border border-white/20"
            >
              <div
                className={cn(
                  "px-6 pt-6 pb-4 text-white",
                  isKids
                    ? "bg-gradient-to-br from-kids-500 to-accent-pink"
                    : "bg-gradient-to-br from-brand-600 to-brand-800"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 rounded-full px-3 py-1">
                    <Megaphone className="w-3.5 h-3.5" />
                    Announcement
                  </span>
                  <button
                    type="button"
                    onClick={dismissPopup}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h2
                  id="announce-title"
                  className="mt-4 font-display text-2xl font-bold leading-tight"
                >
                  {active.title}
                </h2>
              </div>
              <div className="px-6 py-5">
                {active.message && (
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {active.message}
                  </p>
                )}
                {(active.startsOn || active.endsOn) && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {active.endsOn
                      ? `Valid until ${active.endsOn}`
                      : active.startsOn
                        ? `From ${active.startsOn}`
                        : null}
                  </p>
                )}
                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  {active.linkUrl ? (
                    <CtaLink
                      a={active}
                      onClick={dismissPopup}
                      className={cn(
                        "inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition",
                        isKids
                          ? "bg-kids-500 hover:bg-kids-600"
                          : "bg-brand-600 hover:bg-brand-700"
                      )}
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={dismissPopup}
                    className="inline-flex flex-1 items-center justify-center px-5 py-3 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {active.linkUrl ? "Maybe later" : "Got it"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
