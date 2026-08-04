"use client";

import { useEffect, useState } from "react";
import { Download, CheckCircle2, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStandalone } from "@/components/admin/useAdminStandalone";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Install / Add to Home Screen — hidden once running as installed app.
 */
export function AdminPwaInstall({
  variant = "sidebar",
}: {
  variant?: "sidebar" | "mobile" | "banner";
}) {
  const standalone = useAdminStandalone();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [hint, setHint] = useState(false);
  const [busy, setBusy] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setJustInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone) return null;

  if (justInstalled) {
    if (variant === "banner") return null;
    return (
      <div
        className={cn(
          "admin-pwa-install flex items-center gap-2 text-xs font-medium",
          variant === "mobile"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-emerald-300/90"
        )}
      >
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        Installed — open from home screen
      </div>
    );
  }

  const onInstall = async () => {
    if (deferred) {
      setBusy(true);
      try {
        await deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
      } finally {
        setBusy(false);
      }
      return;
    }
    setHint(true);
  };

  const tip = isIos()
    ? "iPhone: Share → Add to Home Screen, then open OP Admin from the icon (full screen, no Safari bar)."
    : "Install, then always open from the home-screen icon — full screen like a normal app.";

  if (variant === "banner") {
    return (
      <div className="admin-pwa-install rounded-2xl border border-brand-200 dark:border-brand-800/50 bg-white dark:bg-gray-900/80 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-[#1d2951] dark:text-white">
              Install as app
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Full-screen on your phone — like a normal app, not a browser tab.
            </p>
            {hint ? (
              <p className="text-xs text-brand-700 dark:text-brand-300 mt-2">
                {tip}
              </p>
            ) : null}
            <button
              type="button"
              onClick={onInstall}
              disabled={busy}
              className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              {busy ? "Opening…" : "Download / Install"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-pwa-install">
      <button
        type="button"
        onClick={onInstall}
        disabled={busy}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold transition disabled:opacity-60",
          variant === "mobile"
            ? "px-3 py-2.5 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-300"
            : "px-3 py-2.5 bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/10"
        )}
      >
        <Download className="w-3.5 h-3.5" />
        {busy ? "Opening…" : "Install app"}
      </button>
      {hint ? (
        <p
          className={cn(
            "mt-2 text-[11px] leading-snug",
            variant === "mobile" ? "text-muted-foreground" : "text-white/55"
          )}
        >
          {tip}
        </p>
      ) : null}
    </div>
  );
}
