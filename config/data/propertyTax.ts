import type { RegionId } from "../regions";

/**
 * How the taxable value is derived
 */
export type PropertyValuationMethod =
  | "assessed"            // assessed value is provided directly
  | "marketWithRatio";   // market value × assessmentRatio

/**
 * Optional reductions applied to assessed value
 */
export type PropertyTaxExemption =
  | {
      type: "flat";       // fixed dollar reduction
      amount: number;     // e.g. 25000
    }
  | {
      type: "percentage"; // percentage reduction
      rate: number;       // e.g. 0.10 for 10%
    };

/**
 * Individual tax rate component
 * (county, city, school district, special district, etc.)
 */
export type PropertyTaxRateComponent = {
  name: string;          // descriptive only, never parsed
  rate: number;          // decimal, e.g. 0.0125
};

/**
 * Main config per region
 */
export type PropertyTaxConfig = {
  regionId: RegionId;
  year: number;

  systemName: string;    // e.g. "Alameda County property tax system"

  valuation: {
    method: PropertyValuationMethod;
    assessmentRatio?: number; // required if method = marketWithRatio
  };

  exemptions?: PropertyTaxExemption[];

  rates: {
    components: PropertyTaxRateComponent[];
  };

  authority: {
    name: string;
    url: string;
    lastVerified: string; // ISO date YYYY-MM-DD
  };
};

export const propertyTaxConfigs: Record<RegionId, PropertyTaxConfig> = {
    "US-CA-ALAMEDA-COUNTY": {
  regionId: "US-CA-ALAMEDA-COUNTY",
  year: 2026,

  systemName: "Alameda County property tax system (California Proposition 13)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Countywide ad valorem base rate (Proposition 13)", rate: 0.01 }
    ]
  },

  authority: {
    name: "Alameda County Assessor’s Office",
    url: "https://www.acassessor.org/homeowners/about-property-assessment/proposition-13/",
    lastVerified: "2026-02-06"
  }
},

"US-AR": {
  regionId: "US-AR",
  year: 2026,

  systemName: "Arkansas property tax system",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.2
  },

  rates: {
    components: [
      { name: "Statewide school Uniform Rate of Tax (URT)", rate: 0.025 }
    ]
  },

  authority: {
    name: "Arkansas Department of Finance and Administration – Assessment Coordination Division",
    url: "https://www.dfa.arkansas.gov/office/arkansas-assessment-coordination-division/",
    lastVerified: "2026-02-06"
  }
},

"US-KS": {
  regionId: "US-KS",
  year: 2026,

  systemName: "Kansas property tax system",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.115
  },

  rates: {
    components: [
      { name: "Statewide school levy", rate: 0.020 }
    ]
  },

  authority: {
    name: "Kansas Department of Revenue – Property Valuation Division",
    url: "https://www.ksrevenue.gov/pvdindex.html",
    lastVerified: "2026-02-06"
  }
},

"US-KY": {
  regionId: "US-KY",
  year: 2026,

  systemName: "Kentucky real property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Kentucky state real property tax", rate: 0.00106 }
    ]
  },

  authority: {
    name: "Kentucky Department of Revenue",
    url: "https://revenue.ky.gov/Property/Pages/PropertyTaxRates.aspx",
    lastVerified: "2026-02-06"
  }
},

"US-MI": {
  regionId: "US-MI",
  year: 2026,

  systemName: "Michigan property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "State Education Tax", rate: 0.006 }
    ]
  },

  authority: {
    name: "Michigan Department of Treasury",
    url: "https://www.michigan.gov/taxes/property",
    lastVerified: "2026-02-06"
  }
},

"US-SD": {
  regionId: "US-SD",
  year: 2026,

  systemName: "South Dakota property tax system (85% taxable value with school levy caps)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.85
  },

  rates: {
    components: [
      {
        name: "School district general-fund levy (maximum, other property)",
        rate: 0.005544
      }
    ]
  },

  authority: {
    name: "South Dakota Legislature",
    url: "https://sdlegislature.gov/Statutes/10-12-42",
    lastVerified: "2026-02-06"
  }
},

"US-VT": {
  regionId: "US-VT",
  year: 2026,

  systemName: "Vermont property tax (education property tax base rate; local rates vary)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Vermont statewide nonhomestead education property tax base rate ($1.59 per $100)", rate: 0.0159 }
    ]
  },

  authority: {
    name: "Vermont Legislature",
    url: "https://legislature.vermont.gov/statutes/section/32/135/05402",
    lastVerified: "2026-02-06"
  }
},

"US-VA": {
  regionId: "US-VA",
  year: 2026,

  systemName: "Virginia real estate property tax (local rates vary by county, city, town, and district)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Local real estate property tax rate (varies by locality; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Virginia Department of Taxation",
    url: "https://www.tax.virginia.gov/local-tax-rates",
    lastVerified: "2026-02-06"
  }
},

"US-WV": {
  regionId: "US-WV",
  year: 2026,

  systemName: "West Virginia ad valorem property tax system",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.6
  },

  rates: {
    components: [
      {
        name: "Applicable levy rate (state + local levies; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "West Virginia State Tax Department",
    url: "https://tax.wv.gov/Business/PropertyTax/Pages/AdValoremPropertyTax.aspx",
    lastVerified: "2026-02-06"
  }
},

"US-WI": {
  regionId: "US-WI",
  year: 2026,

  systemName: "Wisconsin property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Wisconsin Department of Revenue",
    url: "https://www.revenue.wi.gov",
    lastVerified: "2026-02-06"
  }
},

"US-WY": {
  regionId: "US-WY",
  year: 2026,

  systemName: "Wyoming property tax system",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.095
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided estimate)", rate: 0 }
    ]
  },

  authority: {
    name: "Wyoming Department of Revenue – Property Tax Division",
    url: "https://ptd.wyo.gov",
    lastVerified: "2026-02-06"
  }
},



  };
  
  export function getPropertyTaxConfig(
    regionId: RegionId
  ): PropertyTaxConfig | undefined {
    return propertyTaxConfigs[regionId];
  }
  