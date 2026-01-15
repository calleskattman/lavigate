// config/data/incomeTax.ts
import type { RegionId } from "../regions";

export type IncomeTaxBracket = {
  from: number;
  to: number | null;
  rate: number;
};

export type IncomeTaxConfig = {
  regionId: RegionId;
  year: number;
  systemName: string;
  brackets: IncomeTaxBracket[];
  standardDeduction?: number;
  personalExemption?: number;
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
    brackets: [{ from: 0, to: null, rate: 0 }],
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
      { from: 10000, to: null, rate: 0.02 }, // placeholder
    ],
    authority: {
      name: "Franchise Tax Board",
      url: "https://www.ftb.ca.gov/",
      lastVerified: "2025-01-01",
    },
  },

  "US-VA": {
    regionId: "US-VA",
    year: 2025,
    systemName: "Virginia state income tax",
    brackets: [
      { from: 0, to: 3000, rate: 0.02 },
      { from: 3000, to: 5000, rate: 0.03 },
      { from: 5000, to: 17000, rate: 0.05 },
      { from: 17000, to: null, rate: 0.0575 },
    ],
    notes: [
      "Personal exemption of $930 applies per filer and per dependent.",
      "Additional exemption of $800 applies for taxpayers age 65 or over.",
      "Additional exemption of $800 applies for blindness.",
      "Part-year residents must prorate exemption amounts based on residency period.",
    ],
    authority: {
      name: "Virginia Department of Taxation",
      url: "https://www.tax.virginia.gov",
      lastVerified: "2026-01-12",
    },
  },

  "US-MI": {
    regionId: "US-MI",
    year: 2025,
    systemName: "Michigan state income tax",
    brackets: [{ from: 0, to: null, rate: 0.0425 }],
    personalExemption: 5800,
    authority: {
      name: "Michigan Department of Treasury",
      url: "https://www.michigan.gov/treasury",
      lastVerified: "2025-05-01",
    },
  },

  "US-MN": {
  regionId: "US-MN",
  year: 2024,
  systemName: "Minnesota state income tax",
  brackets: [
      { from: 0, to: 31690, rate: 0.0535 },
      { from: 31691, to: 104090, rate: 0.068 },
      { from: 104091, to: 193240, rate: 0.0785 },
      { from: 193241, to: null, rate: 0.0985 }
  ],
  standardDeduction: 14575,
  personalExemption: 5050,
  notes: ["Uses Single filer brackets only. Other filing statuses are not included in v1."],
  authority: {
    name: "Minnesota Department of Revenue",
    url: "https://www.revenue.state.mn.us/mndor-pp/19621?type=html",
    lastVerified: "2026-01-14",
  },
},

  // fler regioner sen
};

export function getIncomeTaxConfig(
  regionId: RegionId
): IncomeTaxConfig | undefined {
  return incomeTaxConfigs[regionId];
}
