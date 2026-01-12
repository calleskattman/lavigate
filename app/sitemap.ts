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
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  // 2) Dynamiska verktygssidor
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  for (const tool of tools) {
    const toolRegions = regions.filter((region) =>
      tool.supportedRegionIds.includes(region.id)
    );

    for (const region of toolRegions) {
      dynamicRoutes.push({
        url: `${BASE_URL}${tool.basePath}/${region.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
