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
  const [popupOpen, setPopupOpen] = useState(false);

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

  // Top bar: first notice not yet dismissed on the bar
  const barActive = useMemo(() => {
    if (!ready) return null;
    return forSurface.find((a) => !barDismissed[a.id]) ?? null;
  }, [ready, forSurface, barDismissed]);

  // Popup queue: all undismissed notices, one at a time
  const popupQueue = useMemo(() => {
    if (!ready) return [] as Announcement[];
    return forSurface.filter((a) => !popupDismissed[a.id]);
  }, [ready, forSurface, popupDismissed]);

  const popupActive = popupQueue[0] ?? null;
  const popupIndex = popupActive
    ? forSurface.findIndex((a) => a.id === popupActive.id) + 1
    : 0;
  const popupTotal = forSurface.length;

  useEffect(() => {
    if (!popupActive) {
      setPopupOpen(false);
      return;
    }
    const t = window.setTimeout(() => setPopupOpen(true), 450);
    return () => window.clearTimeout(t);
  }, [popupActive?.id]);

  useEffect(() => {
    if (!popupOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [popupOpen]);

  useEffect(() => {
    const h = barActive ? "42px" : "0px";
    document.documentElement.style.setProperty("--op-announce-h", h);
    return () => {
      document.documentElement.style.setProperty("--op-announce-h", "0px");
    };
  }, [barActive]);

  const dismissBar = () => {
    if (!barActive) return;
    try {
      localStorage.setItem(barKey(barActive.id), "1");
    } catch {
      /* ignore */
    }
    setBarDismissed((d) => ({ ...d, [barActive.id]: true }));
  };

  const dismissPopup = () => {
    if (!popupActive) return;
    const id = popupActive.id;
    try {
      localStorage.setItem(popupKey(id), "1");
    } catch {
      /* ignore */
    }
    // Close briefly so the next card can animate in cleanly
    setPopupOpen(false);
    window.setTimeout(() => {
      setPopupDismissed((d) => ({ ...d, [id]: true }));
    }, 220);
  };

  if (!ready || forSurface.length === 0) return null;

  const isKids = brand === "preschool";
  const showBar = Boolean(barActive);
  const showPopup = Boolean(popupOpen && popupActive);

  return (
    <>
      {/* Top strip — cycles to next after dismiss */}
      <AnimatePresence>
        {showBar && barActive && (
          <motion.div
            key={`bar-${barActive.id}`}
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
                {barActive.title}
                {barActive.message ? (
                  <span className="hidden sm:inline font-normal text-white/85">
                    {" "}
                    — {barActive.message}
                  </span>
                ) : null}
              </p>
              {popupTotal > 1 ? (
                <span className="text-[10px] font-bold uppercase tracking-wide bg-white/15 px-2 py-0.5 rounded-full shrink-0">
                  {forSurface.filter((a) => !barDismissed[a.id]).length} notices
                </span>
              ) : null}
              <CtaLink
                a={barActive}
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

      {/* Popup queue — one card at a time; dismiss → next */}
      <AnimatePresence>
        {showPopup && popupActive ? (
          <motion.div
            key="announce-overlay"
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
            <AnimatePresence mode="wait">
              <motion.div
                key={popupActive.id}
                role="dialog"
                aria-modal="true"
                aria-labelledby="announce-title"
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative w-full max-w-[380px] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden border border-white/20"
              >
                <div
                  className={cn(
                    "px-5 pt-5 pb-3.5 text-white",
                    isKids
                      ? "bg-gradient-to-br from-kids-500 to-accent-pink"
                      : "bg-gradient-to-br from-brand-600 to-brand-800"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider bg-white/20 rounded-full px-2.5 py-1">
                        <Megaphone className="w-3 h-3" />
                        Announcement
                      </span>
                      {popupTotal > 1 ? (
                        <span className="text-[11px] font-semibold text-white/80 tabular-nums">
                          {popupIndex} / {popupTotal}
                        </span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={dismissPopup}
                      className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition shrink-0"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h2
                    id="announce-title"
                    className="mt-3 font-display text-xl font-bold leading-snug"
                  >
                    {popupActive.title}
                  </h2>
                </div>
                <div className="px-5 py-4">
                  {popupActive.message && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {popupActive.message}
                    </p>
                  )}
                  {(popupActive.startsOn || popupActive.endsOn) && (
                    <p className="mt-2.5 text-xs text-muted-foreground">
                      {popupActive.endsOn
                        ? `Valid until ${popupActive.endsOn}`
                        : popupActive.startsOn
                          ? `From ${popupActive.startsOn}`
                          : null}
                    </p>
                  )}

                  {popupTotal > 1 ? (
                    <div className="mt-4 flex items-center justify-center gap-1.5">
                      {forSurface.map((a) => (
                        <span
                          key={a.id}
                          className={cn(
                            "h-1.5 rounded-full transition-all",
                            a.id === popupActive.id
                              ? isKids
                                ? "w-5 bg-kids-500"
                                : "w-5 bg-brand-600"
                              : popupDismissed[a.id]
                                ? "w-1.5 bg-gray-200 dark:bg-gray-700"
                                : "w-1.5 bg-gray-300 dark:bg-gray-600"
                          )}
                          aria-hidden
                        />
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    {popupActive.linkUrl ? (
                      <CtaLink
                        a={popupActive}
                        onClick={dismissPopup}
                        className={cn(
                          "inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition",
                          isKids
                            ? "bg-kids-500 hover:bg-kids-600"
                            : "bg-brand-600 hover:bg-brand-700"
                        )}
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={dismissPopup}
                      className="inline-flex flex-1 items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      {popupQueue.length > 1
                        ? "Next"
                        : popupActive.linkUrl
                          ? "Maybe later"
                          : "Got it"}
                    </button>
                  </div>
                  {popupQueue.length > 1 ? (
                    <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                      {popupQueue.length - 1} more notice
                      {popupQueue.length - 1 === 1 ? "" : "s"} after this
                    </p>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
