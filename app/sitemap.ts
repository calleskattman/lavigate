// app/sitemap.ts
import type { MetadataRoute } from "next";
import { incomeTaxConfigs } from "@/config/data/incomeTax";
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

  // 2) Income tax-sidor per region
  const incomeTaxRoutes: MetadataRoute.Sitemap = incomeTaxConfigs
    .map((config) => {
      const region = regions.find((r) => r.id === config.regionId);
      if (!region) return null;

      return {
        url: `${BASE_URL}/tools/income-tax/${region.slug}`,
        lastModified: now,
      } as MetadataRoute.Sitemap[number];
    })
    .filter(
      (route): route is MetadataRoute.Sitemap[number] => route !== null,
    );

  return [...staticRoutes, ...incomeTaxRoutes];
}
