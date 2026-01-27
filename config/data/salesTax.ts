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

"US-FL": {
  regionId: "US-FL",
  year: 2026,
  systemName: "Florida sales and use tax",
  components: [
    { name: "Florida state sales tax", rate: 0.06 }
  ],
  authority: {
    name: "Florida Department of Revenue",
    url: "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx",
    lastVerified: "2026-01-27",
  },
},

"US-GA": {
regionId: "US-GA",
year: 2026,
systemName: "Georgia sales and use tax",
components: [
{ name: "State sales and use tax", rate: 0.04 },
{ name: "Local sales taxes", rate: null }
],
authority: {
name: "Georgia Department of Revenue",
url: "https://dor.georgia.gov/taxes/sales-use-tax",
lastVerified: "2026-01-01",
},
},

"US-HI": {
  regionId: "US-HI",
  year: 2026,
  systemName: "General Excise Tax (GET)",
  components: [
    { name: "General excise tax – retail transactions", rate: 0.04 },
    { name: "County surcharge on general excise tax (maximum)", rate: 0.005 }
  ],
  authority: {
    name: "Hawaii Department of Taxation",
    url: "https://tax.hawaii.gov/",
    lastVerified: "2026-01-27",
  },
},

"US-ID": {
  regionId: "US-ID",
  year: 2026,
  systemName: "Sales and use tax",
  components: [
    { name: "State sales tax", rate: 0.06 },
    { name: "Local option sales tax (resort cities)", rate: 0 }
  ],
  authority: {
    name: "Idaho State Tax Commission",
    url: "https://tax.idaho.gov/",
    lastVerified: "2026-01-27",
  },
},

"US-IN": {
  regionId: "US-IN",
  year: 2026,
  systemName: "State gross retail tax",
  components: [
    { name: "State sales tax", rate: 0.07 }
  ],
  authority: {
    name: "Indiana Department of Revenue",
    url: "https://www.in.gov/dor/",
    lastVerified: "2026-01-27",
  },
},

"US-KS": {
  regionId: "US-KS",
  year: 2026,
  systemName: "State Retailers Sales Tax",
  components: [
    { name: "State sales tax", rate: 0.065 }
  ],
  authority: {
    name: "Kansas Department of Revenue",
    url: "https://www.ksrevenue.gov",
    lastVerified: "2026-01-27",
  },
},

"US-LA": {
  regionId: "US-LA",
  year: 2026,
  systemName: "State general sales and use tax",
  components: [
    { name: "State sales tax", rate: 0.05 }
  ],
  authority: {
    name: "Louisiana Department of Revenue",
    url: "https://revenue.louisiana.gov",
    lastVerified: "2026-01-27",
  },
},

"US-MD": {
  regionId: "US-MD",
  year: 2025,
  systemName: "Maryland sales and use tax",
  components: [{ name: "Maryland state sales and use tax", rate: 0.06 }],
  authority: {
    name: "Comptroller of Maryland",
    url: "https://www.marylandtaxes.gov",
    lastVerified: "2025-03-01",
  },
},

"US-MA": {
  regionId: "US-MA",
  year: 2025,
  systemName: "Massachusetts sales and use tax",
  components: [
    { name: "Massachusetts state sales and use tax", rate: 0.0625 }
  ],
  authority: {
    name: "Massachusetts Department of Revenue",
    url: "https://www.mass.gov/orgs/massachusetts-department-of-revenue",
    lastVerified: "2025-03-01",
  },
},

"US-MI": {
  regionId: "US-MI",
  year: 2025,
  systemName: "Michigan sales and use taxes",
  components: [
    { name: "Michigan state sales tax", rate: 0.06 }
  ],
  authority: {
    name: "Michigan Department of Treasury",
    url: "https://www.michigan.gov/taxes",
    lastVerified: "2025-03-01",
  },
},

"US-MN": {
regionId: "US-MN",
year: 2025,
systemName: "Minnesota sales and use taxes",
components: [
{ name: "Minnesota state sales tax", rate: 0.065 },
{ name: "Minnesota additional state sales tax", rate: 0.00375 },
{ name: "Local sales and use taxes", rate: null }
],
authority: {
name: "Minnesota Department of Revenue",
url: "https://www.revenue.state.mn.us/sales-and-use-tax",
lastVerified: "2025-03-01",
},
},

"US-MO": {
  regionId: "US-MO",
  year: 2026,
  systemName: "Missouri Sales/Use Tax",
  components: [
    { name: "Missouri state sales tax", rate: 0.04225 }
  ],
  authority: {
    name: "Missouri Department of Revenue",
    url: "https://dor.mo.gov/taxation/business/tax-types/sales-use/",
    lastVerified: "2026-01-27",
  },
},

"US-NV": {
  regionId: "US-NV",
  year: 2026,
  systemName: "Sales and Use Tax Act",
  components: [
    { name: "Nevada state sales tax", rate: 0.0685 }
  ],
  authority: {
    name: "Nevada Department of Taxation",
    url: "https://tax.nv.gov/tax-types/sales-tax-use-tax/",
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
