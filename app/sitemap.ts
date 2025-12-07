// app/sitemap.ts
import type { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

const BASE_URL = "https://lavigate.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1) Statiska sidor
  const staticPaths = [
    "",
    "/tools",
    "/about",
    "/contact",
    "/privacy-policy",
    "/cookies",
    "/terms",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));

  // 2) Dynamiska verktygssidor: /tools/[toolId]/[regionSlug]
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  for (const tool of tools) {
    const toolRegions = regions.filter((region) =>
      tool.supportedRegionIds.includes(region.id)
    );

    for (const region of toolRegions) {
      dynamicRoutes.push({
        url: `${BASE_URL}/tools/${tool.id}/${region.slug}`,
        lastModified: now,
      });
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
