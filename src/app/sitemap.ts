import type { MetadataRoute } from "next";
import { siteConfig, navLinks } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = navLinks.map((link) => ({
    url: `${siteConfig.url}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: link.href === "/" ? 1 : link.highlight ? 0.9 : 0.8,
  }));

  return routes;
}
