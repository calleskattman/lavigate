// config/data/incomeTax.ts

import { regions } from "@/config/regions";
import type {
  IncomeTaxConfig,
  IncomeTaxConfigWithRegion,
} from "@/lib/types";

// Typad lista med skatte-konfig per region
export const incomeTaxConfigs: IncomeTaxConfig[] = [
  {
    regionId: "US-TX",
    year: 2025,
    systemName: "Texas state income tax",
    brackets: [
      // Texas har ingen state income tax → alltid 0 %
      { from: 0, to: null, rate: 0 },
    ],
    authority: {
      name: "Texas Comptroller of Public Accounts",
      url: "https://comptroller.texas.gov/",
      lastVerified: "2025-02-10",
    },
  },
  {
    regionId: "US-CA",
    year: 2025,
    systemName: "California state income tax",
    // OBS! Exempelsiffror – byt ut när du har riktiga data
    brackets: [
      { from: 0, to: 10_000, rate: 0.01 },
      { from: 10_000, to: 50_000, rate: 0.02 },
      { from: 50_000, to: 100_000, rate: 0.04 },
      { from: 100_000, to: null, rate: 0.06 },
    ],
    authority: {
      name: "Franchise Tax Board",
      url: "https://www.ftb.ca.gov/",
      lastVerified: "2025-02-10",
    },
  },
];

// 🔍 Helper som används av sidan – hämtar config + lägger på regionName
export function getIncomeTaxData(
  regionSlug: string
): IncomeTaxConfigWithRegion | undefined {
  const region = regions.find((r) => r.slug === regionSlug);
  if (!region) return undefined;

  const baseConfig = incomeTaxConfigs.find(
    (config) => config.regionId === region.id && config.year === 2025
  );
  if (!baseConfig) return undefined;

  // Lägg på regionens namn som extra fält
  return {
    ...baseConfig,
    regionName: region.name,
  };
}
