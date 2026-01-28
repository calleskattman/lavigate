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

"US-NJ": {
  regionId: "US-NJ",
  year: 2018,
  systemName: "New Jersey Sales and Use Tax Act",
  components: [
    { name: "New Jersey state sales and use tax", rate: 0.06625 }
  ],
  authority: {
    name: "New Jersey Division of Taxation",
    url: "https://www.nj.gov/treasury/taxation/businesses/salestax/index.shtml",
    lastVerified: "2026-01-28"
  }
},

"US-NY": {
  regionId: "US-NY",
  year: 2026,
  systemName: "New York State and local sales and use tax",
  components: [
    { name: "New York state sales and use tax", rate: 0.04 }
  ],
  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov",
    lastVerified: "2026-01-28",
  },
},

"US-NC": {
  regionId: "US-NC",
  year: 2026,
  systemName: "North Carolina Sales and Use Tax Act",
  components: [
    { name: "North Carolina state sales tax", rate: 0.0475 }
  ],
  authority: {
    name: "North Carolina Department of Revenue",
    url: "https://www.ncdor.gov/",
    lastVerified: "2026-01-28",
  },
},

"US-OH": {
  regionId: "US-OH",
  year: 2026,
  systemName: "Ohio state sales and use tax",
  components: [
    { name: "Ohio state sales tax", rate: 0.0575 }
  ],
  authority: {
    name: "Ohio Department of Taxation",
    url: "https://tax.ohio.gov",
    lastVerified: "2026-01-28",
  },
},

"US-OR": {
  regionId: "US-OR",
  year: 2026,
  systemName: "No general Oregon state sales or use tax",
  components: [
    { name: "Oregon state sales tax", rate: 0 }
  ],
  authority: {
    name: "Oregon Department of Revenue",
    url: "https://www.oregon.gov/dor",
    lastVerified: "2026-01-28",
  },
},

"US-PA": {
  regionId: "US-PA",
  year: 2026,
  systemName: "Pennsylvania Sales, Use and Hotel Occupancy Tax",
  components: [
    { name: "Pennsylvania state sales tax", rate: 0.06 }
  ],
  authority: {
    name: "Pennsylvania Department of Revenue",
    url: "https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax",
    lastVerified: "2025-01-01",
  },
},

"US-RI": {
  regionId: "US-RI",
  year: 2026,
  systemName: "Rhode Island Sales and Use Tax",
  components: [
    { name: "Rhode Island state sales tax", rate: 0.07 }
  ],
  authority: {
    name: "Rhode Island Division of Taxation",
    url: "https://tax.ri.gov/tax-sections/sales-excise-taxes/sales-use-tax",
    lastVerified: "2025-01-01",
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
