// config/data/incomeTax.ts
import type { RegionId } from "../regions";

export type IncomeTaxConfig = {
  regionId: RegionId;
  year: number;
  systemName: string;
  brackets: { from: number; to: number | null; rate: number }[];
  standardDeduction?: number;
  notes?: string[];
  authority: {
    name: string;
    url: string;
    lastVerified: string;
  };
};

export const incomeTaxConfigs: Record<RegionId, IncomeTaxConfig> = {
  "US-TX": {
    regionId: "US-TX",
    year: 2025,
    systemName: "Texas state income tax",
    brackets: [
      { from: 0, to: null, rate: 0 }, // Texas har ingen state income tax
    ],
    authority: {
      name: "Texas Comptroller of Public Accounts",
      url: "https://comptroller.texas.gov/",
      lastVerified: "2025-01-01",
    },
  },
  "US-CA": {
    regionId: "US-CA",
    year: 2025,
    systemName: "California state income tax",
    brackets: [
      { from: 0, to: 10000, rate: 0.01 },
      // ...dummyvärden just nu
      { from: 10000, to: null, rate: 0.02 },
    ],
    authority: {
      name: "Franchise Tax Board",
      url: "https://www.ftb.ca.gov/",
      lastVerified: "2025-01-01",
    },
  },
  // fler regioner sen
};

export function getIncomeTaxConfig(regionId: RegionId): IncomeTaxConfig | undefined {
  return incomeTaxConfigs[regionId];
}
