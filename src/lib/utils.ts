import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
