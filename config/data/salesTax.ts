// config/data/salesTax.ts

import type { RegionId } from "../regions";
import type { SalesTaxConfig } from "@/lib/types";

/**
 * Sales tax configs per region.
 * All rates are decimals (e.g. 0.0725 = 7.25%).
 * This file must never contain UI text or SEO content.
 */

export const salesTaxConfigs: Record<RegionId, SalesTaxConfig> = {
  // EXEMPEL – California (State-level only, local components can be added later)
  "US-CA": {
    regionId: "US-CA",
    year: 2025,
    systemName: "California sales tax",
    components: [
      {
        name: "California state sales tax",
        rate: 0.0725,
      },
    ],
    authority: {
      name: "California Department of Tax and Fee Administration",
      url: "https://www.cdtfa.ca.gov",
      lastVerified: "2025-01-15",
    },
  },

  // Fler regioner läggs till här via SEO Studio / Quick Import
};

/**
 * Helper – enda tillåtna sättet att läsa sales tax-config i UI eller pages
 */
export function getSalesTaxConfig(
  regionId: RegionId
): SalesTaxConfig | undefined {
  return salesTaxConfigs[regionId];
}
