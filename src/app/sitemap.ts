import type { MetadataRoute } from "next";
import { siteConfig, navLinks } from "@/data/site";

/** Extra brand-world routes not in the mixed-site navLinks list */
const brandHomes = [
  { href: "/op-kids", priority: 0.95 },
  { href: "/institute", priority: 0.95 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const routes: MetadataRoute.Sitemap = [];

  for (const link of navLinks) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    routes.push({
      url: `${siteConfig.url}${link.href === "/" ? "" : link.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: link.href === "/" ? 1 : link.highlight ? 0.9 : 0.8,
    });
  }

  for (const home of brandHomes) {
    if (seen.has(home.href)) continue;
    seen.add(home.href);
    routes.push({
      url: `${siteConfig.url}${home.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: home.priority,
    });
  }

  return routes;
}
