"use client";

import { useEffect, useState } from "react";

export function useAdminStandalone() {
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const check = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      ("standalone" in navigator &&
        Boolean(
          (navigator as Navigator & { standalone?: boolean }).standalone
        ));

    const apply = () => {
      const on = check();
      setStandalone(on);
      document.documentElement.classList.toggle("admin-standalone", on);
      document.body.classList.toggle("admin-standalone", on);
    };

    apply();
    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener?.("change", apply);
    return () => {
      mq.removeEventListener?.("change", apply);
      document.documentElement.classList.remove("admin-standalone");
      document.body.classList.remove("admin-standalone");
    };
  }, []);

  return standalone;
}
