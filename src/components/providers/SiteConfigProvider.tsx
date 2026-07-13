"use client";

import { createContext, useContext } from "react";
import { siteConfig as staticSiteConfig } from "@/data/site";
import type { SiteConfig } from "@/lib/supabase/public-data";

const SiteConfigContext = createContext<SiteConfig>(staticSiteConfig);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
