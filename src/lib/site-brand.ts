import type { ContentBrand } from "@/data/brands";

/** Site browsing mode — mixed home vs a single brand world */
export type SiteBrandMode = "all" | ContentBrand;

export const SITE_BRAND_COOKIE = "op-site-brand";
export const SITE_BRAND_STORAGE_KEY = "op-site-brand";

export type BrandNavLink = {
  href: string;
  label: string;
  highlight?: boolean;
};

export function parseSiteBrandMode(
  value: string | null | undefined
): SiteBrandMode {
  if (value === "preschool" || value === "institute" || value === "all") {
    return value;
  }
  return "all";
}

/** Nav links for the current world */
export function getNavLinksForBrand(mode: SiteBrandMode): BrandNavLink[] {
  if (mode === "preschool") {
    return [
      { href: "/op-kids", label: "Home" },
      { href: "/faculty?category=preschool", label: "Faculty" },
      { href: "/gallery?brand=preschool", label: "Gallery" },
      { href: "/events?brand=preschool", label: "Events" },
      { href: "/admissions", label: "Admissions" },
      { href: "/contact", label: "Contact" },
    ];
  }

  if (mode === "institute") {
    return [
      { href: "/institute", label: "Home" },
      { href: "/courses", label: "Courses" },
      { href: "/faculty?category=institute", label: "Faculty" },
      { href: "/gallery?brand=institute", label: "Gallery" },
      { href: "/events?brand=institute", label: "Events" },
      { href: "/admissions", label: "Admissions" },
      { href: "/contact", label: "Contact" },
    ];
  }

  return [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/faculty", label: "Faculty" },
    { href: "/gallery", label: "Gallery" },
    { href: "/events", label: "Events" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" },
  ];
}

export function isBrandNavActive(
  href: string,
  pathname: string,
  search: string
): boolean {
  const [path, query = ""] = href.split("?");
  if (pathname !== path) return false;
  if (!query) {
    // Prefer exact bare path when sibling links have query params
    if (path === "/faculty" || path === "/gallery" || path === "/events") {
      return !search || search === "?";
    }
    return true;
  }
  const want = new URLSearchParams(query);
  const have = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  for (const [key, value] of want.entries()) {
    if (have.get(key) !== value) return false;
  }
  return true;
}
