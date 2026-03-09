// app/sitemap.ts
import type { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

const BASE_URL = "https://lavigate.com";
const LAST_MODIFIED = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPaths = [
    { path: "", priority: 1.0 },
    { path: "/tools", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/cookies", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map(
    ({ path, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority,
    })
  );

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  for (const tool of tools) {

    const toolRegions = regions.filter((region) =>
      tool.supportedRegionIds.includes(region.id)
    );

    for (const region of toolRegions) {

      const url = `${BASE_URL}${tool.basePath}/${region.slug}`;

      dynamicRoutes.push({
        url,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });

    }
  }

  // Deduplicera URL:er
  const deduped = Array.from(
    new Map(
      [...staticRoutes, ...dynamicRoutes].map((entry) => [entry.url, entry])
    ).values()
  );

  return deduped;

}