"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  SITE_BRAND_COOKIE,
  SITE_BRAND_STORAGE_KEY,
  getNavLinksForBrand,
  parseSiteBrandMode,
  type BrandNavLink,
  type SiteBrandMode,
} from "@/lib/site-brand";

type SiteBrandContextValue = {
  brand: SiteBrandMode;
  setBrand: (mode: SiteBrandMode) => void;
  enterKidsWorld: () => void;
  enterInstitute: () => void;
  exitToMainSite: () => void;
  navLinks: BrandNavLink[];
  isKids: boolean;
  isInstitute: boolean;
  isMixed: boolean;
};

const SiteBrandContext = createContext<SiteBrandContextValue | null>(null);

function readStoredBrand(): SiteBrandMode {
  if (typeof window === "undefined") return "all";
  try {
    const fromStorage = window.localStorage.getItem(SITE_BRAND_STORAGE_KEY);
    if (fromStorage) return parseSiteBrandMode(fromStorage);
  } catch {
    /* ignore */
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SITE_BRAND_COOKIE}=([^;]*)`)
  );
  return parseSiteBrandMode(match?.[1] ? decodeURIComponent(match[1]) : null);
}

function persistBrand(mode: SiteBrandMode) {
  try {
    window.localStorage.setItem(SITE_BRAND_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  document.cookie = `${SITE_BRAND_COOKIE}=${encodeURIComponent(mode)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function SiteBrandProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [brand, setBrandState] = useState<SiteBrandMode>("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setBrandState(readStoredBrand());
    setReady(true);
  }, []);

  const setBrand = useCallback((mode: SiteBrandMode) => {
    setBrandState(mode);
    persistBrand(mode);
  }, []);

  // Landing on brand homes locks the world; main home resets to mixed
  useEffect(() => {
    if (!ready) return;
    if (pathname === "/op-kids" || pathname.startsWith("/op-kids/")) {
      if (brand !== "preschool") setBrand("preschool");
      return;
    }
    if (pathname === "/institute" || pathname.startsWith("/institute/")) {
      if (brand !== "institute") setBrand("institute");
      return;
    }
    if (pathname === "/") {
      if (brand !== "all") setBrand("all");
    }
  }, [pathname, ready, brand, setBrand]);

  const enterKidsWorld = useCallback(() => setBrand("preschool"), [setBrand]);
  const enterInstitute = useCallback(() => setBrand("institute"), [setBrand]);
  const exitToMainSite = useCallback(() => setBrand("all"), [setBrand]);

  const value = useMemo<SiteBrandContextValue>(
    () => ({
      brand,
      setBrand,
      enterKidsWorld,
      enterInstitute,
      exitToMainSite,
      navLinks: getNavLinksForBrand(brand),
      isKids: brand === "preschool",
      isInstitute: brand === "institute",
      isMixed: brand === "all",
    }),
    [brand, setBrand, enterKidsWorld, enterInstitute, exitToMainSite]
  );

  return (
    <SiteBrandContext.Provider value={value}>{children}</SiteBrandContext.Provider>
  );
}

export function useSiteBrand() {
  const ctx = useContext(SiteBrandContext);
  if (!ctx) {
    throw new Error("useSiteBrand must be used within SiteBrandProvider");
  }
  return ctx;
}
