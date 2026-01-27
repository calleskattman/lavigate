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
"US-AL": {
  regionId: "US-AL",
  year: 2025,
  systemName: "Alabama general state sales tax (4% general rate only)",
  components: [
    { name: "Alabama state sales tax", rate: 0.04 }
  ],
  authority: {
    name: "Alabama Department of Revenue",
    url: "https://www.revenue.alabama.gov/sales-use/state-sales-use-tax-rates/",
    lastVerified: "2026-01-22",
  },
},

"US-AR": {
  regionId: "US-AR",
  year: 2026,
  systemName: "Arkansas state sales and use tax",
  components: [
    { name: "Arkansas state sales and use tax", rate: 0.065 }
  ],
  authority: {
    name: "Arkansas Department of Finance and Administration",
    url: "https://www.dfa.arkansas.gov",
    lastVerified: "2026-01-01",
  },
},

"US-AZ": {
  regionId: "US-AZ",
  year: 2025,
  systemName: "Arizona transaction privilege tax",
  components: [
    {
      name: "Arizona state transaction privilege tax",
      rate: 0.056
    }
  ],
  authority: {
    name: "Arizona Department of Revenue",
    url: "https://azdor.gov",
    lastVerified: "2025-07-01"
  }
},

"US-CO": {
  regionId: "US-CO",
  year: 2026,
  systemName: "Colorado sales and use tax",
  components: [
    { name: "Colorado state sales tax", rate: 0.029 }
  ],
  authority: {
    name: "Colorado Department of Revenue",
    url: "https://tax.colorado.gov/sales-use-tax",
    lastVerified: "2026-01-27",
  },
},

"US-CT": {
  regionId: "US-CT",
  year: 2026,
  systemName: "Sales and Use Tax",
  components: [
    { name: "Connecticut state sales tax", rate: 0.0635 }
  ],
  authority: {
    name: "Connecticut Department of Revenue Services",
    url: "https://portal.ct.gov/DRS",
    lastVerified: "2026-01-27",
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
