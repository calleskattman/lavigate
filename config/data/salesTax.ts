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

"US-SC": {
  regionId: "US-SC",
  year: 2026,
  systemName: "South Carolina Sales and Use Tax",
  components: [
    { name: "South Carolina state sales tax", rate: 0.06 }
  ],
  authority: {
    name: "South Carolina Department of Revenue",
    url: "https://dor.sc.gov/tax/sales",
    lastVerified: "2026-01-28",
  },
},

"US-SD": {
  regionId: "US-SD",
  year: 2026,
  systemName: "South Dakota Sales and Use Tax",
  components: [
    { name: "South Dakota state sales tax", rate: 0.042 }
  ],
  authority: {
    name: "South Dakota Department of Revenue",
    url: "https://dor.sd.gov/businesses/taxes/sales-use-tax/",
    lastVerified: "2026-01-28",
  },
},

"US-TN": {
  regionId: "US-TN",
  year: 2026,
  systemName: "Tennessee Sales and Use Tax",
  components: [
    { name: "Tennessee state sales tax", rate: 0.07 }
  ],
  authority: {
    name: "Tennessee Department of Revenue",
    url: "https://www.tn.gov/revenue/taxes/sales-and-use-tax.html",
    lastVerified: "2026-01-28",
  },
},

"US-UT": {
  regionId: "US-UT",
  year: 2026,
  systemName: "Utah Sales and Use Tax",
  components: [
    { name: "Utah state sales tax", rate: 0.0485 }
  ],
  authority: {
    name: "Utah State Tax Commission",
    url: "https://incometax.utah.gov/paying/use-tax",
    lastVerified: "2026-01-28",
  },
},

"US-VA": {
  regionId: "US-VA",
  year: 2026,
  systemName: "Virginia Retail Sales and Use Tax",
  components: [
    { name: "Virginia retail sales and use tax", rate: null }
  ],
  authority: {
    name: "Virginia Tax",
    url: "https://www.tax.virginia.gov/retail-sales-and-use-tax",
    lastVerified: "2026-01-28",
  },
},

"US-WA": {
  regionId: "US-WA",
  year: 2026,
  systemName: "Washington Retail Sales Tax and Use Tax",
  components: [
    { name: "Washington state sales tax", rate: 0.065 }
  ],
  authority: {
    name: "Washington State Department of Revenue",
    url: "https://dor.wa.gov",
    lastVerified: "2026-01-28",
  },
},

"US-WI": {
  regionId: "US-WI",
  year: 2026,
  systemName: "Wisconsin Sales and Use Tax",
  components: [
    { name: "Wisconsin state sales tax", rate: 0.05 }
  ],
  authority: {
    name: "Wisconsin Department of Revenue",
    url: "https://www.revenue.wi.gov/Pages/FAQS/pcs-taxrates.aspx",
    lastVerified: "2026-01-28",
  },
},

"US-WY": {
  regionId: "US-WY",
  year: 2026,
  systemName: "Wyoming sales and use tax",
  components: [
    { name: "Wyoming state sales and use tax", rate: 0.04 }
  ],
  authority: {
    name: "Wyoming Department of Revenue – Excise Tax Division",
    url: "https://excise-tax-div.wyo.gov/general-administrative/excise-tax-faqs",
    lastVerified: "2026-01-28",
  },
},

"US-PR": {
  regionId: "US-PR",
  year: 2026,
  systemName: "Puerto Rico sales and use tax (IVU)",
  components: [
    { name: "Puerto Rico commonwealth sales and use tax (IVU Estatal)", rate: 0.105 },
    { name: "Puerto Rico municipal sales and use tax (IVU Municipal)", rate: 0.01 }
  ],
  authority: {
    name: "Puerto Rico Department of the Treasury (Departamento de Hacienda)",
    url: "https://hacienda.pr.gov/publicaciones/determinacion-administrativa-num-17-04",
    lastVerified: "2026-01-28",
  },
},

"US-CA-ALAMEDA-COUNTY": {
  regionId: "US-CA-ALAMEDA-COUNTY",
  year: 2026,
  systemName: "Alameda County sales and use tax",
  components: [
    { name: "California state sales and use tax", rate: 0.0725 },
    { name: "Alameda County local and district sales and use tax", rate: 0.03 }
  ],
  authority: {
    name: "California Department of Tax and Fee Administration",
    url: "https://cdtfa.ca.gov/taxes-and-fees/ArchivesRates01-01-2025-03-31-2025.pdf",
    lastVerified: "2026-01-28",
  },
},

"US-FL-BROWARD-COUNTY": {
  regionId: "US-FL-BROWARD-COUNTY",
  year: 2026,
  systemName: "Broward County sales and use tax",
  components: [
    { name: "Florida state sales and use tax", rate: 0.06 },
    { name: "Broward County discretionary sales surtax", rate: 0.01 }
  ],
  authority: {
    name: "Florida Department of Revenue",
    url: "https://floridarevenue.com/Forms_library/current/dr15dss.pdf",
    lastVerified: "2026-01-28",
  },
},

"US-NV-CLARK-COUNTY": {
  regionId: "US-NV-CLARK-COUNTY",
  year: 2026,
  systemName: "Clark County sales and use tax",
  components: [
    { name: "Nevada state sales and use tax", rate: 0.0685 },
    { name: "Clark County local and district sales and use tax", rate: 0.01525 }
  ],
  authority: {
    name: "Nevada Department of Taxation",
    url: "https://tax.nv.gov/tax-types/sales-tax-use-tax/",
    lastVerified: "2026-01-28",
  },
},

"US-NY-ERIE-COUNTY": {
  regionId: "US-NY-ERIE-COUNTY",
  year: 2026,
  systemName: "Erie County sales and use tax",
  components: [
    { name: "New York State sales and use tax", rate: 0.04 },
    { name: "Erie County local sales and use tax", rate: 0.0475 },
  ],
  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov/pdf/publications/sales/pub718.pdf",
    lastVerified: "2026-01-29",
  },
},

"US-OH-FRANKLIN-COUNTY": {
  regionId: "US-OH-FRANKLIN-COUNTY",
  year: 2026,
  systemName: "Franklin County sales and use tax",
  components: [
    { name: "Ohio state sales and use tax", rate: 0.0575 },
    { name: "Franklin County and transit authority sales and use tax", rate: 0.0225 }
  ],
  authority: {
    name: "Ohio Department of Taxation",
    url: "https://tax.ohio.gov/home/news-and-events/all-news/2025-04-01-sales-and-use-tax-rate-change",
    lastVerified: "2026-01-29",
  },
},

"US-PA-FRANKLIN-COUNTY": {
  regionId: "US-PA-FRANKLIN-COUNTY",
  year: 2026,
  systemName: "Franklin County sales and use tax",
  components: [
    { name: "Pennsylvania state sales and use tax", rate: 0.06 }
  ],
  authority: {
    name: "Pennsylvania Department of Revenue",
    url: "https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax.html",
    lastVerified: "2026-01-29",
  },
},

"US-NY-FRANKLIN-COUNTY": {
  regionId: "US-NY-FRANKLIN-COUNTY",
  year: 2026,
  systemName: "Franklin County sales and use tax",
  components: [
    { name: "New York State sales and use tax", rate: 0.04 },
    { name: "Franklin County local sales and use tax", rate: 0.04 }
  ],
  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov/pdf/publications/sales/pub718.pdf",
    lastVerified: "2026-01-29",
  },
},

"US-TX-FRANKLIN-COUNTY": {
  regionId: "US-TX-FRANKLIN-COUNTY",
  year: 2026,
  systemName: "Franklin County sales and use tax",
  components: [
    { name: "Texas state sales and use tax", rate: 0.0625 },
    { name: "Franklin County sales and use tax", rate: 0.005 }
  ],
  authority: {
    name: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/taxes/sales/county.php",
    lastVerified: "2026-01-29",
  },
},

"US-FL-POLK-COUNTY": {
  regionId: "US-FL-POLK-COUNTY",
  year: 2026,
  systemName: "Polk County discretionary sales surtax",
  components: [
    { name: "Florida state sales tax", rate: 0.06 },
    { name: "Polk County discretionary sales surtax", rate: 0.005 }
  ],
  authority: {
    name: "Florida Department of Revenue",
    url: "https://floridarevenue.com/taxes/taxesfees/Pages/discretionary.aspx",
    lastVerified: "2026-01-02",
  },
},

"US-NY-SUFFOLK-COUNTY": {
  regionId: "US-NY-SUFFOLK-COUNTY",
  year: 2026,
  systemName: "Suffolk County local sales and use tax",
  components: [
    { name: "New York State sales and use tax", rate: 0.04 },
    { name: "Suffolk County local sales and use tax", rate: 0.04375 },
    { name: "Metropolitan Commuter Transportation District (MCTD) surcharge", rate: 0.00375 }
  ],
  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov/pdf/publications/sales/pub718.pdf",
    lastVerified: "2026-01-29",
  },
},

"US-TX-AUSTIN-CITY": {
  regionId: "US-TX-AUSTIN-CITY",
  year: 2026,
  systemName: "City Sales and Use Tax",
  components: [
    { name: "Texas state sales and use tax", rate: 0.0625 },
    { name: "Austin city sales and use tax", rate: 0.01 }
  ],
  authority: {
    name: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/taxes/sales/",
    lastVerified: "2026-01-29",
  },
},

"US-MA-BOSTON-CITY": {
  regionId: "US-MA-BOSTON-CITY",
  year: 2026,
  systemName: "Sales and use tax",
  components: [
    { name: "Massachusetts state sales and use tax", rate: 0.0625 }
  ],
  authority: {
    name: "Massachusetts Department of Revenue",
    url: "https://www.mass.gov/orgs/massachusetts-department-of-revenue",
    lastVerified: "2026-01-29",
  },
},

"US-TX-DALLAS-CITY": {
  regionId: "US-TX-DALLAS-CITY",
  year: 2026,
  systemName: "Dallas city sales and use tax",
  components: [
    { name: "Texas state sales and use tax", rate: 0.0625 },
    { name: "Dallas city sales and use tax", rate: 0.01 },
    { name: "Dallas Area Rapid Transit sales and use tax", rate: 0.01 }
  ],
  authority: {
    name: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/taxes/sales/",
    lastVerified: "2026-01-29",
  },
},

"US-TX-HOUSTON-CITY": {
  regionId: "US-TX-HOUSTON-CITY",
  year: 2026,
  systemName: "Houston city sales and use tax",
  components: [
    { name: "Texas state sales and use tax", rate: 0.0625 },
    { name: "Houston city sales tax", rate: 0.01 },
    { name: "Metropolitan Transit Authority of Harris County sales and use tax", rate: 0.01 }
  ],
  authority: {
    name: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/taxes/sales/",
    lastVerified: "2026-01-29",
  },
},

"US-MN-MINNEAPOLIS-CITY": {
  regionId: "US-MN-MINNEAPOLIS-CITY",
  year: 2026,
  systemName: "Minneapolis sales and use tax",
  components: [
    { name: "Minnesota state sales and use tax", rate: 0.06875 },
    { name: "Hennepin County sales and use tax", rate: 0.0015 },
    { name: "City of Minneapolis local sales and use tax", rate: 0.005 },
    { name: "Metro Area sales and use tax", rate: 0.01 },
    { name: "County transit sales and use tax", rate: 0.005 }
  ],
  authority: {
    name: "Minnesota Department of Revenue",
    url: "https://www.revenue.state.mn.us",
    lastVerified: "2026-01-01",
  },
},

"US-NY-NEW-YORK-CITY": {
  regionId: "US-NY-NEW-YORK-CITY",
  year: 2026,
  systemName: "New York City sales and use tax",
  components: [
    { name: "New York State sales and use tax", rate: 0.04 },
    { name: "New York City sales tax", rate: 0.045 },
    { name: "Metropolitan Commuter Transportation District surcharge", rate: 0.00375 }
  ],
  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov",
    lastVerified: "2026-01-31",
  },
},

"US-CA-SAN-FRANCISCO-CITY": {
  regionId: "US-CA-SAN-FRANCISCO-CITY",
  year: 2026,
  systemName: "California sales and use tax",
  components: [
    { name: "California state and local sales and use tax (San Francisco)", rate: 0.08625 }
  ],
  authority: {
    name: "California Department of Tax and Fee Administration",
    url: "https://www.cdtfa.ca.gov/",
    lastVerified: "2026-01-02",
  },
},

"US-CA-SAN-JOSE-CITY": {
  regionId: "US-CA-SAN-JOSE-CITY",
  year: 2026,
  systemName: "California sales and use tax",
  components: [
    { name: "California state and local sales and use tax (San Jose)", rate: 0.09375 }
  ],
  authority: {
    name: "California Department of Tax and Fee Administration",
    url: "https://www.cdtfa.ca.gov/",
    lastVerified: "2026-01-02",
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
