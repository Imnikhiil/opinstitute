import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** URL-safe slug from a title (e.g. Parent Orientation Meeting → parent-orientation-meeting) */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Match event by id or title slug (supports partial: parent-orientation ≈ parent-orientation-meeting) */
export function matchEventSlug<T extends { id: string; title: string }>(
  items: T[],
  slug: string
): T | undefined {
  const key = slugify(slug);
  if (!key) return undefined;
  return (
    items.find((e) => e.id === slug || e.id === key) ||
    items.find((e) => slugify(e.title) === key) ||
    items.find((e) => {
      const t = slugify(e.title);
      return t.startsWith(key) || key.startsWith(t);
    })
  );
}

/** Bump common CDN query params so photos stay sharp on retina displays. */
export function sharpImageUrl(url: string, width = 900): string {
  if (!url) return url;
  try {
    if (url.includes("images.unsplash.com")) {
      const u = new URL(url);
      const current = Number(u.searchParams.get("w") || 0);
      if (!current || current < width) u.searchParams.set("w", String(width));
      u.searchParams.set("q", "90");
      u.searchParams.set("auto", "format");
      u.searchParams.set("fit", "crop");
      return u.toString();
    }
  } catch {
    /* keep original */
  }
  return url;
}
