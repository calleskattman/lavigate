// app/sitemap.ts
import type { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

const BASE_URL = "https://lavigate.com";

// Använd ett stabilt datum (t.ex. deploy-datum eller projektstart)
const LAST_MODIFIED = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  // 1) Statiska sidor
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
      changeFrequency: "monthly",
      priority,
    })
  );

  // 2) Dynamiska verktyg + regioner
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  for (const tool of tools) {
    const toolRegions = regions.filter((region) =>
      tool.supportedRegionIds.includes(region.id)
    );

    for (const region of toolRegions) {
      dynamicRoutes.push({
        url: `${BASE_URL}${tool.basePath}/${region.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
