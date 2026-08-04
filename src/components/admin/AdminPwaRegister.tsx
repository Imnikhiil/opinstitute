"use client";

import { useEffect } from "react";

/** Registers the admin-only service worker (needed for installability). */
export function AdminPwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/admin-sw.js", { scope: "/admin" })
      .catch(() => {});
  }, []);
  return null;
}
