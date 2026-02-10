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

"US-SC-AIKEN-COUNTY": {
  regionId: "US-SC-AIKEN-COUNTY",
  year: 2026,

  systemName: "Aiken County, South Carolina property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided estimate)", rate: 0 }
    ]
  },

  authority: {
    name: "Aiken County Assessor’s Office",
    url: "https://www.aikencountysc.gov/DspOfc?qOfcID=ASR",
    lastVerified: "2026-02-06"
  }
},

"US-PA-ALLEGHENY-COUNTY": {
  regionId: "US-PA-ALLEGHENY-COUNTY",
  year: 2026,

  systemName: "Allegheny County property tax estimator (base-year assessed value with combined local millage)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Allegheny County millage (official)", rate: 0.00643 },
      { name: "Municipal property tax (varies by municipality)", rate: 0 },
      { name: "School district property tax (varies by district)", rate: 0 },
    ],
  },

  authority: {
    name: "Allegheny County Treasurer / Office of Property Assessments",
    url: "https://alleghenycountytreasurer.us/real-estate-tax/",
    lastVerified: "2026-02-09",
  },
},

"US-IN-ALLEN-COUNTY": {
  regionId: "US-IN-ALLEN-COUNTY",
  year: 2026,

  systemName: "Allen County property tax estimator (assessed value at 100% of market value-in-use with combined local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Composite local property tax rate (county, township, municipal, school, district; varies by tax district)", rate: 0 },
    ],
  },

  authority: {
    name: "Indiana Department of Local Government Finance / Allen County Assessor",
    url: "https://www.in.gov/dlgf/understanding-your-tax-bill/citizens-guide-to-property-tax/",
    lastVerified: "2026-02-09",
  },
},

"US-SC-ANDERSON-COUNTY": {
  regionId: "US-SC-ANDERSON-COUNTY",
  year: 2026,

  systemName: "Anderson County property tax estimator (assessed value with combined local millage)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "County millage (varies by tax district)", rate: 0 },
      { name: "Municipal millage (if applicable)", rate: 0 },
      { name: "School district millage (varies by district)", rate: 0 },
      { name: "Special purpose district millage (if applicable)", rate: 0 },
    ],
  },

  authority: {
    name: "Anderson County Assessor / South Carolina Department of Revenue",
    url: "https://www.andersoncountysc.org/services/assessor/",
    lastVerified: "2026-02-09",
  },
},

"US-MD-ANNE-ARUNDEL-COUNTY": {
  regionId: "US-MD-ANNE-ARUNDEL-COUNTY",
  year: 2026,

  systemName: "Anne Arundel County property tax estimator (SDAT assessed value with combined state and local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Anne Arundel County real property tax rate", rate: 0.00977 },
      { name: "Maryland state real property tax rate", rate: 0.00112 },
      { name: "Municipal real property tax rate (if applicable)", rate: 0 },
    ],
  },

  authority: {
    name: "Anne Arundel County Office of Finance / Maryland Department of Assessments and Taxation",
    url: "https://www.aacounty.org/finance/tax-information/current-tax-rates",
    lastVerified: "2026-02-09",
  },
},

"US-MN-ANOKA-COUNTY": {
  regionId: "US-MN-ANOKA-COUNTY",
  year: 2026,

  systemName: "Anoka County property tax estimator (taxable market value with Minnesota tax capacity system)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "County tax capacity rate (varies by taxing district)", rate: 0 },
      { name: "City or town tax capacity rate (if applicable)", rate: 0 },
      { name: "School district tax capacity rate (varies by district)", rate: 0 },
      { name: "State general property tax (applies to certain property types)", rate: 0 },
    ],
  },

  authority: {
    name: "Anoka County Property Records & Taxation / Minnesota Department of Revenue",
    url: "https://www.anokacountymn.gov/1859/About-Your-Property-Tax-Statement",
    lastVerified: "2026-02-09",
  },
},

"US-AL-BALDWIN-COUNTY": {
  regionId: "US-AL-BALDWIN-COUNTY",
  year: 2026,

  systemName: "Baldwin County property tax estimator (assessed value with combined millage)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "State of Alabama millage", rate: 0 },
      { name: "Baldwin County millage", rate: 0 },
      { name: "School district millage", rate: 0 },
      { name: "Municipal millage (if applicable)", rate: 0 },
      { name: "Special district millage (if applicable)", rate: 0 },
    ],
  },

  authority: {
    name: "Baldwin County Revenue Commission / Alabama Department of Revenue",
    url: "https://baldwincountyal.gov/government/revenue-commission/divisions/assessments",
    lastVerified: "2026-02-09",
  },
},

"US-MD-BALTIMORE-COUNTY": {
  regionId: "US-MD-BALTIMORE-COUNTY",
  year: 2026,

  systemName:
    "Baltimore County property tax estimator (SDAT assessed value; FY 2026 non-utility real property)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Baltimore County real property tax rate (1.1000 per $100 of assessed value)",
        rate: 0.011,
      },
      {
        name: "Maryland state real property tax rate, non-utility property only (0.112 per $100 of assessed value)",
        rate: 0.00112,
      },
    ],
  },

  authority: {
    name: "Maryland Department of Assessments and Taxation",
    url: "https://dat.maryland.gov/Documents/statistics/TaxRates2025-2026.pdf",
    lastVerified: "2026-02-09",
  },
},

"US-TX-BELL-COUNTY": {
  regionId: "US-TX-BELL-COUNTY",
  year: 2026,

  systemName: "Bell County, Texas property tax (locally adopted rates applied to taxable value)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, city, school, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Bell County Appraisal District",
    url: "https://bellcad.org",
    lastVerified: "2026-02-09",
  },
},

"US-SC-BERKELEY-COUNTY": {
  regionId: "US-SC-BERKELEY-COUNTY",
  year: 2026,

  systemName: "Berkeley County, South Carolina property tax (assessed value varies by classification; millage varies by district)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local millage rate (county, school, municipal, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Berkeley County Government — Real Property Services",
    url: "https://berkeleycountysc.gov/dept/realprop/",
    lastVerified: "2026-02-09",
  },
},

"US-NM-BERNALILLO-COUNTY": {
  regionId: "US-NM-BERNALILLO-COUNTY",
  year: 2026,

  systemName:
    "Bernalillo County, New Mexico property tax (taxable value equals one-third of assessed market value; rates vary by tax district)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.3333333333,
  },

  rates: {
    components: [
      {
        name:
          "Combined property tax rate by tax district (state, county, municipal, school, and other levies; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name:
      "Bernalillo County Assessor and Treasurer; New Mexico Taxation and Revenue Department",
    url: "https://treasurer.bernco.gov",
    lastVerified: "2026-02-09",
  },
},

"US-CO-BOULDER-COUNTY": {
  regionId: "US-CO-BOULDER-COUNTY",
  year: 2026,

  systemName:
    "Boulder County, Colorado property tax (assessed value with district-specific mill levies)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined mill levy by tax area (county, municipal, school, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name:
      "Boulder County Assessor; Colorado Division of Property Taxation",
    url: "https://bouldercounty.gov/departments/assessor/",
    lastVerified: "2026-02-09",
  },
},

"US-TX-BRAZORIA-COUNTY": {
  regionId: "US-TX-BRAZORIA-COUNTY",
  year: 2026,

  systemName:
    "Brazoria County, Texas property tax (locally adopted rates applied to taxable value)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Brazoria County Appraisal District",
    url: "https://brazoriacad.org",
    lastVerified: "2026-02-09",
  },
},

"US-FL-BROWARD-COUNTY": {
  regionId: "US-FL-BROWARD-COUNTY",
  year: 2026,

  systemName: "Broward County property tax (estimate based on assessed value and combined local millage)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Broward County Property Appraiser / Florida Department of Revenue",
    url: "https://bcpa.net",
    lastVerified: "2026-02-09"
  }
},

"US-NC-BUNCOMBE-COUNTY": {
  regionId: "US-NC-BUNCOMBE-COUNTY",
  year: 2026,

  systemName: "Buncombe County property tax (district-based rates; estimate using combined local rate)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (district-based; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Buncombe County Tax Department / North Carolina Department of Revenue",
    url: "https://www.buncombecounty.org/governing/depts/tax/",
    lastVerified: "2026-02-09"
  }
},

"US-ND-BURLEIGH-COUNTY": {
  regionId: "US-ND-BURLEIGH-COUNTY",
  year: 2026,

  systemName: "Burleigh County property tax (estimate based on assessed value and district mill levies)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local mill levy (district-based; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Burleigh County Auditor/Treasurer / North Dakota Office of State Tax Commissioner",
    url: "https://www.burleigh.gov/departments/auditortreasurer/taxes-levies/",
    lastVerified: "2026-02-09"
  }
},

"US-MN-CARVER-COUNTY": {
  regionId: "US-MN-CARVER-COUNTY",
  year: 2026,

  systemName:
    "Carver County, Minnesota property tax estimator based on assessed taxable value and combined local tax rates",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city or township, school district, and special districts; varies by tax code area)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Carver County Property & Finance Department",
    url: "https://www.carvercountymn.gov/departments/property-finance/property-tax",
    lastVerified: "2026-02-09"
  }
},

"US-SC-CHARLESTON-COUNTY": {
  regionId: "US-SC-CHARLESTON-COUNTY",
  year: 2026,

  systemName:
    "Charleston County, South Carolina property tax estimator based on assessed value and combined local millage rates",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, school district, municipality, and special districts; varies by tax district)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Charleston County Auditor",
    url: "https://auditor.charlestoncounty.org",
    lastVerified: "2026-02-09"
  }
},

"US-OR-CLACKAMAS-COUNTY": {
  regionId: "US-OR-CLACKAMAS-COUNTY",
  year: 2026,

  systemName:
    "Clackamas County, Oregon property tax estimator based on assessed value under Measure 50 and combined local tax rates",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school district, and special districts; varies by tax code area)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Clackamas County Assessment & Taxation",
    url: "https://www.clackamas.us/at",
    lastVerified: "2026-02-09"
  }
},

"US-FL-CLAY-COUNTY": {
  regionId: "US-FL-CLAY-COUNTY",
  year: 2026,

  systemName:
    "Clay County, Florida property tax estimator based on assessed taxable value and combined local millage rates",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, school board, municipalities, and special districts; varies by tax district)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Clay County Property Appraiser",
    url: "https://www.ccpao.com",
    lastVerified: "2026-02-09"
  }
},

"US-MN-CLAY-COUNTY": {
  regionId: "US-MN-CLAY-COUNTY",
  year: 2026,

  systemName:
    "Clay County, Minnesota property tax estimator based on taxable market value and combined local tax rates",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city or township, school district, and special districts; varies by tax code area)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Clay County Auditor-Treasurer",
    url: "https://claycountymn.gov",
    lastVerified: "2026-02-09"
  }
},

"US-MO-CLAY-COUNTY": {
  regionId: "US-MO-CLAY-COUNTY",
  year: 2026,

  systemName:
    "Clay County, Missouri property tax estimator based on assessed value and combined local tax rates",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school district, and special districts; varies by tax area)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Clay County, Missouri",
    url: "https://www.claycountymo.gov",
    lastVerified: "2026-02-09",
  },
},

"US-NC-CLAY-COUNTY": {
  regionId: "US-NC-CLAY-COUNTY",
  year: 2026,

  systemName:
    "Clay County, North Carolina property tax estimator based on assessed market value and combined local tax rates",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county and municipality if applicable; varies by location)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Clay County Tax Administration",
    url: "https://tax.claync.us",
    lastVerified: "2026-02-09",
  },
},

"US-GA-COBB-COUNTY": {
  regionId: "US-GA-COBB-COUNTY",
  year: 2026,

  systemName:
    "Cobb County, Georgia ad valorem property tax (assessed at 40% of fair market value; millage varies by jurisdiction)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.4,
  },

  rates: {
    components: [
      {
        name: "Combined local millage rate (county, school, city, special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Cobb County Board of Tax Assessors",
    url: "https://assessor.cobbcounty.gov",
    lastVerified: "2026-02-09",
  },
},

"US-FL-COLLIER-COUNTY": {
  regionId: "US-FL-COLLIER-COUNTY",
  year: 2026,

  systemName:
    "Collier County, Florida ad valorem property tax (assessed value with millage varying by jurisdiction)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local millage rate (county, school, city, special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Collier County Property Appraiser",
    url: "https://www.collierappraiser.com",
    lastVerified: "2026-02-09",
  },
},

"US-TX-COLLIN-COUNTY": {
  regionId: "US-TX-COLLIN-COUNTY",
  year: 2026,

  systemName:
    "Collin County, Texas ad valorem property tax (market value appraisal; exemptions and local tax rates vary by jurisdiction)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local tax rate (county, school, city, special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Collin Central Appraisal District",
    url: "https://collincad.org",
    lastVerified: "2026-02-09"
  }
},

"US-TX-COMAL-COUNTY": {
  regionId: "US-TX-COMAL-COUNTY",
  year: 2026,

  systemName:
    "Comal County, Texas ad valorem property tax (market value appraisal; exemptions and local tax rates vary by jurisdiction)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local tax rate (county, school, city, special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Comal Appraisal District",
    url: "https://www.comalcounty.gov/412/Comal-Appraisal-District",
    lastVerified: "2026-02-09"
  }
},

"US-CA-CONTRA-COSTA-COUNTY": {
  regionId: "US-CA-CONTRA-COSTA-COUNTY",
  year: 2026,

  systemName:
    "Contra Costa County, California property tax (Proposition 13 assessed value; base rate plus voter-approved add-ons vary by tax rate area)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Proposition 13 base ad valorem rate", rate: 0.01 },
      { name: "Voter-approved add-on rates (bonds and similar; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "California State Board of Equalization",
    url: "https://boe.ca.gov/proptaxes/pdf/pub29.pdf",
    lastVerified: "2026-02-09"
  }
},

"US-IL-COOK-COUNTY": {
    regionId: "US-IL-COOK-COUNTY",
    year: 2026,

    systemName:
      "Cook County, Illinois property tax (classified assessment with state equalization; levy-based local rates)",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name:
            "Combined local property tax rate (county, municipality, school, and special districts; varies by parcel)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Cook County Clerk – Tax Extension and Rates",
      url: "https://www.cookcountyclerkil.gov/property-taxes/tax-extension-and-rates",
      lastVerified: "2026-02-09",
    },
  },

  "US-OH-CUYAHOGA-COUNTY": {
    regionId: "US-OH-CUYAHOGA-COUNTY",
    year: 2026,

    systemName:
      "Cuyahoga County, Ohio property tax (uniform 35% assessment of market value; levy-based local rates)",

    valuation: {
      method: "marketWithRatio",
      assessmentRatio: 0.35,
    },

    rates: {
      components: [
        {
          name:
            "Combined local property tax rate (inside millage and voted levies by taxing district; varies by parcel)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Cuyahoga County Treasurer / Ohio Department of Taxation",
      url: "https://tax.ohio.gov/help-center/faqs/real-property-tax-general/real-property-tax--general",
      lastVerified: "2026-02-09",
    },
  },

  "US-MN-DAKOTA-COUNTY": {
    regionId: "US-MN-DAKOTA-COUNTY",
    year: 2026,

    systemName:
      "Dakota County, Minnesota property tax (taxable market value with statutory classification rates; levy-based local rates)",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name:
            "Combined local property tax rate (county, city/township, school district, and special districts; varies by parcel)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Dakota County Property Taxation & Records / Minnesota Legislature",
      url: "https://www.co.dakota.mn.us/HomeProperty/Tax101/DeterminingTaxes/Pages/default.aspx",
      lastVerified: "2026-02-09",
    },
  },

  "US-TX-DALLAS-COUNTY": {
  regionId: "US-TX-DALLAS-COUNTY",
  year: 2026,

  systemName:
    "Dallas County, Texas ad valorem property tax (assessed value with locally varying rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school district, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Dallas County Tax Office",
    url: "https://www.dallascounty.org/departments/tax/tax-rates.php",
    lastVerified: "2026-02-09",
  },
},

"US-WI-DANE-COUNTY": {
  regionId: "US-WI-DANE-COUNTY",
  year: 2026,

  systemName:
    "Dane County, Wisconsin ad valorem property tax (assessed value with locally varying rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, municipality, school district, technical college, and state; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Wisconsin Department of Revenue / Dane County Treasurer",
    url: "https://treasurer.danecounty.gov",
    lastVerified: "2026-02-09",
  },
},

"US-UT-DAVIS-COUNTY": {
  regionId: "US-UT-DAVIS-COUNTY",
  year: 2026,

  systemName:
    "Davis County, Utah property tax (market value with statewide primary residential exemption; district-level rates)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 1,
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school, and other districts; varies by tax district)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Utah State Tax Commission / Davis County Treasurer",
    url: "https://tax.utah.gov/propertytax/locally-assessed/residential/",
    lastVerified: "2026-02-09",
  },
},

"US-TX-DENTON-COUNTY": {
  regionId: "US-TX-DENTON-COUNTY",
  year: 2026,

  systemName:
    "Denton County, Texas property tax (market value with caps and exemptions under state law; levy-based local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school district, and special districts; varies by parcel)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Denton Central Appraisal District / Denton County Tax Assessor-Collector",
    url: "https://taxweb.dentoncounty.gov/truth-in-taxation",
    lastVerified: "2026-02-09",
  },
},

"US-SC-DORCHESTER-COUNTY": {
  regionId: "US-SC-DORCHESTER-COUNTY",
  year: 2026,

  systemName:
    "Dorchester County, South Carolina property tax (assessed value with constitutional class ratios; millage-based local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local millage rate (county, school district, municipality, and other taxing authorities; varies by location)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Dorchester County Auditor / South Carolina Revenue and Fiscal Affairs Office",
    url: "https://www.dorchestercountysc.gov/government/property-tax-services/assessor",
    lastVerified: "2026-02-09",
  },
},

"US-CO-DOUGLAS-COUNTY": {
  regionId: "US-CO-DOUGLAS-COUNTY",
  year: 2026,

  systemName:
    "Douglas County, Colorado property tax (assessed value derived from actual value using statewide assessment rates; mill-levy based local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local mill levy (county, school district, municipality, and special districts; varies by location)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Douglas County Assessor / Colorado Division of Property Taxation",
    url: "https://www.douglas.co.us/assessor/",
    lastVerified: "2026-02-09",
  },
},

"US-NE-DOUGLAS-COUNTY": {
  regionId: "US-NE-DOUGLAS-COUNTY",
  year: 2026,

  systemName:
    "Douglas County, Nebraska property tax (assessed value based on market value under statewide ratios; consolidated levy-based local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax levy (county, city, school district, ESU, community college, NRD, and other taxing subdivisions; varies by consolidated tax district)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Douglas County Assessor / Nebraska Department of Revenue",
    url: "https://revenue.nebraska.gov/PAD",
    lastVerified: "2026-02-09",
  },
},

"US-OR-DOUGLAS-COUNTY": {
  regionId: "US-OR-DOUGLAS-COUNTY",
  year: 2026,

  systemName:
    "Douglas County, Oregon property tax (Measure 50 assessed value with Measure 5 constitutional limits and compression)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, city, school, and special districts; varies by tax code area; subject to Measure 5 limits)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Douglas County Assessor / Oregon Department of Revenue",
    url: "https://www.douglascountyor.gov/157/Assessor",
    lastVerified: "2026-02-09",
  },
},

"US-IL-DUPAGE-COUNTY": {
  regionId: "US-IL-DUPAGE-COUNTY",
  year: 2026,

  systemName: "DuPage County, Illinois property tax estimator (fractional assessment; locally levied rates vary by district)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.3333333333
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (municipal, school, county, and special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Illinois Department of Revenue",
    url: "https://tax.illinois.gov",
    lastVerified: "2026-02-09"
  }
},

"US-NC-DURHAM-COUNTY": {
  regionId: "US-NC-DURHAM-COUNTY",
  year: 2026,

  systemName: "Durham County, North Carolina property tax estimator (assessed at market value; combined local rates vary by location)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Durham County property tax rate (countywide)", rate: 0.005542 },
      { name: "Municipal and special district property tax rates (location-dependent; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Durham County Tax Administration",
    url: "https://dconc.gov/Tax-Administration",
    lastVerified: "2026-02-09"
  }
},

"US-CO-EL-PASO-COUNTY": {
  regionId: "US-CO-EL-PASO-COUNTY",
  year: 2026,

  systemName: "El Paso County, Colorado property tax estimator (assessed value derived from market value under state rules; mill levies vary by local districts)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (total mill levy; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "El Paso County Assessor",
    url: "https://assessor.elpasoco.com",
    lastVerified: "2026-02-09"
  }
},

"US-TX-EL-PASO-COUNTY": {
    regionId: "US-TX-EL-PASO-COUNTY",
    year: 2026,

    systemName: "El Paso County, Texas property tax estimator (taxable value input; combined local rates vary by taxing units)",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name: "Combined local property tax rate (county, city, school district, and special districts; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "El Paso Central Appraisal District",
      url: "https://epcad.org",
      lastVerified: "2026-02-09",
    },
  },

  "US-TX-ELLIS-COUNTY": {
    regionId: "US-TX-ELLIS-COUNTY",
    year: 2026,

    systemName: "Ellis County, Texas property tax estimator",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name: "Combined local property tax rate (county, city, school, special districts; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Ellis County Tax Assessor-Collector",
      url: "https://ellistaxoffice.com",
      lastVerified: "2026-02-10",
    },
  },

  "US-NY-ERIE-COUNTY": {
    regionId: "US-NY-ERIE-COUNTY",
    year: 2026,

    systemName: "Erie County, New York property tax estimator",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name: "Combined local property tax rate (county, city/town, school, village, special districts; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Erie County Real Property Tax Services",
      url: "https://www3.erie.gov/ecrpts",
      lastVerified: "2026-02-10",
    },
  },

  "US-FL-ESCAMBIA-COUNTY": {
    regionId: "US-FL-ESCAMBIA-COUNTY",
    year: 2026,

    systemName: "Escambia County, Florida property tax estimator",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name: "Combined local property tax rate (county, city, school, special districts; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Escambia County Tax Collector",
      url: "https://escambiataxcollector.com",
      lastVerified: "2026-02-10",
    },
  },

  "US-AL-ETOWAH-COUNTY": {
    regionId: "US-AL-ETOWAH-COUNTY",
    year: 2026,

    systemName: "Etowah County, Alabama property tax estimator",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name: "Combined local ad valorem tax rate (county + other levies; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Etowah County Revenue Commissioner",
      url: "https://etowahcounty.org/property-taxes/",
      lastVerified: "2026-02-10",
    },
  },

  "US-VA-FAIRFAX-COUNTY": {
    regionId: "US-VA-FAIRFAX-COUNTY",
    year: 2026,

    systemName: "Fairfax County, Virginia property tax estimator",

    valuation: {
      method: "assessed",
    },

    rates: {
      components: [
        {
          name: "Combined local real estate tax rate (county base + applicable special districts; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Fairfax County Department of Tax Administration",
      url: "https://www.fairfaxcounty.gov/taxes/real-estate",
      lastVerified: "2026-02-10",
    },
  },

  "US-GA-FORSYTH-COUNTY": {
    regionId: "US-GA-FORSYTH-COUNTY",
    year: 2026,

    systemName: "Forsyth County, Georgia property tax estimator",

    valuation: {
      method: "marketWithRatio",
      assessmentRatio: 0.4,
    },

    rates: {
      components: [
        {
          name: "Combined local ad valorem tax rate (county, school, fire district; user-provided)",
          rate: 0,
        },
      ],
    },

    authority: {
      name: "Forsyth County Board of Assessors",
      url: "https://www.forsythco.com/Departments-Offices/Board-of-Assessors",
      lastVerified: "2026-02-10",
    },
  },

  "US-MD-FREDERICK-COUNTY": {
  regionId: "US-MD-FREDERICK-COUNTY",
  year: 2026,

  systemName: "Frederick County, Maryland real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, municipal, and district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Frederick County Treasury",
    url: "https://www.frederickcountymd.gov/69/Treasury",
    lastVerified: "2026-02-10"
  }
},

"US-CA-FRESNO-COUNTY": {
  regionId: "US-CA-FRESNO-COUNTY",
  year: 2026,

  systemName: "Fresno County, California real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, city, school, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Fresno County Auditor-Controller / California State Board of Equalization",
    url: "https://www.boe.ca.gov/proptaxes/",
    lastVerified: "2026-02-10"
  }
},

"US-TX-GALVESTON-COUNTY": {
  regionId: "US-TX-GALVESTON-COUNTY",
  year: 2026,

  systemName: "Galveston County, Texas real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, city, school district, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Galveston Central Appraisal District / Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/taxes/property-tax/",
    lastVerified: "2026-02-10"
  }
},

"US-NC-GASTON-COUNTY": {
  regionId: "US-NC-GASTON-COUNTY",
  year: 2026,

  systemName: "Gaston County, North Carolina real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, municipal, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Gaston County Tax Office / North Carolina Department of Revenue",
    url: "https://www.ncdor.gov/taxes-forms/property-tax",
    lastVerified: "2026-02-10"
  }
},

"US-TX-GRAYSON-COUNTY": {
  regionId: "US-TX-GRAYSON-COUNTY",
  year: 2026,

  systemName: "Grayson County, Texas real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, city, school district, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Grayson Central Appraisal District / Texas Comptroller of Public Accounts",
    url: "https://graysonappraisal.org/",
    lastVerified: "2026-02-10"
  }
},

"US-OH-GREENE-COUNTY": {
  regionId: "US-OH-GREENE-COUNTY",
  year: 2026,

  systemName: "Greene County, Ohio real property tax estimator",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.35,
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, township, municipal, school district, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Greene County Auditor / Ohio Department of Taxation",
    url: "https://www.greenecountyohio.gov/963/Real-Estate-Info-Taxes",
    lastVerified: "2026-02-10"
  }
},

"US-SC-GREENVILLE-COUNTY": {
  regionId: "US-SC-GREENVILLE-COUNTY",
  year: 2026,

  systemName: "Greenville County, South Carolina real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, municipal, school, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Greenville County Auditor / South Carolina Department of Revenue",
    url: "https://www.greenvillecounty.org/RealProperty/FAQ.aspx",
    lastVerified: "2026-02-10"
  }
},

"US-NC-GUILFORD-COUNTY": {
  regionId: "US-NC-GUILFORD-COUNTY",
  year: 2026,

  systemName: "Guilford County, North Carolina real property tax estimator",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, municipal, and special district components; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Guilford County Tax Department / North Carolina Department of Revenue",
    url: "https://www.ncdor.gov/taxes-forms/property-tax",
    lastVerified: "2026-02-10"
  }
},

"US-GA-GWINNETT-COUNTY": {
  regionId: "US-GA-GWINNETT-COUNTY",
  year: 2026,

  systemName: "Gwinnett County, Georgia ad valorem property tax (assessed at 40% of fair market value; local millage rates vary)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.4
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, schools, and applicable city; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Gwinnett County Tax Commissioner",
    url: "https://www.gwinnetttaxcommissioner.com/property-tax",
    lastVerified: "2026-02-10"
  }
},

"US-OH-HAMILTON-COUNTY": {
  regionId: "US-OH-HAMILTON-COUNTY",
  year: 2026,

  systemName: "Hamilton County, Ohio ad valorem property tax (assessed at 35% of market value; local millage varies by taxing district)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.35
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, school district, municipality, and other voted levies; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Hamilton County Auditor / Ohio Department of Taxation",
    url: "https://hamiltoncountyauditor.org/retax_menu.asp",
    lastVerified: "2026-02-10"
  }
},

"US-TX-HARRIS-COUNTY": {
  regionId: "US-TX-HARRIS-COUNTY",
  year: 2026,

  systemName: "Harris County, Texas ad valorem property tax (market value-based appraisal; taxable value reduced by exemptions; rates vary by taxing unit)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (sum of applicable taxing unit rates; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Harris County Tax Assessor-Collector / Harris Central Appraisal District / Texas Comptroller of Public Accounts",
    url: "https://www.hctax.net/property/overview",
    lastVerified: "2026-02-10"
  }
},

"US-TX-HAYS-COUNTY": {
  regionId: "US-TX-HAYS-COUNTY",
  year: 2026,

  systemName: "Hays County, Texas ad valorem property tax (market value-based appraisal; taxable value reduced by exemptions; rates vary by taxing unit)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (sum of applicable taxing unit rates; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Hays Central Appraisal District / Hays County Tax Assessor-Collector / Texas Comptroller of Public Accounts",
    url: "https://hayscad.com",
    lastVerified: "2026-02-10"
  }
},

"US-MN-HENNEPIN-COUNTY": {
  regionId: "US-MN-HENNEPIN-COUNTY",
  year: 2026,

  systemName: "Hennepin County, Minnesota property tax (assessed/taxable value with locally set levy rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, city, school district, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Hennepin County Assessor / Minnesota Department of Revenue",
    url: "https://www.hennepin.us/residents/property/property-taxes",
    lastVerified: "2026-02-10"
  }
},

"US-GA-HENRY-COUNTY": {
  regionId: "US-GA-HENRY-COUNTY",
  year: 2026,

  systemName:
    "Henry County, Georgia property tax estimator (assessed value is a statewide percentage of fair market value; combined millage varies by district)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.4
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (total millage across applicable county, school, city, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Henry County Board of Tax Assessors / Henry County Tax Commissioner / Georgia Department of Revenue",
    url: "https://henrycountytax.com",
    lastVerified: "2026-02-10"
  }
},

"US-IN-HENRY-COUNTY": {
  regionId: "US-IN-HENRY-COUNTY",
  year: 2026,

  systemName:
    "Henry County, Indiana property tax estimator (market-based assessed value at 100% ratio; combined local rates vary by taxing district)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (varies by taxing district; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Indiana Department of Local Government Finance / Henry County Assessor / Henry County Treasurer",
    url: "https://www.in.gov/dlgf/county-specific-information/henry/",
    lastVerified: "2026-02-10"
  }
},

"US-FL-HILLSBOROUGH-COUNTY": {
  regionId: "US-FL-HILLSBOROUGH-COUNTY",
  year: 2026,

  systemName:
    "Hillsborough County, Florida property tax estimator (assessed value with homestead assessment limits; combined millage varies by jurisdiction)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, school board, municipality, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Hillsborough County Property Appraiser / Hillsborough County Tax Collector / Florida Department of Revenue",
    url: "https://www.hcpafl.org",
    lastVerified: "2026-02-10"
  }
},

"US-SC-HORRY-COUNTY": {
  regionId: "US-SC-HORRY-COUNTY",
  year: 2026,

  systemName:
    "Horry County, South Carolina property tax estimator (assessed/taxable value with combined local rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, school district, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Horry County Assessor / Horry County Auditor / South Carolina Department of Revenue",
    url: "https://www.horrycountysc.gov",
    lastVerified: "2026-02-10"
  }
},

"US-MD-HOWARD-COUNTY": {
  regionId: "US-MD-HOWARD-COUNTY",
  year: 2026,

  systemName:
    "Howard County, Maryland property tax estimator (market-based assessed value set by the state; combined local and state rates may vary by district)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined property tax rate (county, state, fire, and applicable special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Maryland State Department of Assessments and Taxation / Howard County Government",
    url: "https://dat.maryland.gov",
    lastVerified: "2026-02-10"
  }
},

"US-TX-HUNT-COUNTY": {
  regionId: "US-TX-HUNT-COUNTY",
  year: 2026,

  systemName:
    "Hunt County, Texas property tax estimator (market value appraisal with caps/exemptions under state law; combined local rates vary by taxing units)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, school districts, cities, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Hunt County Appraisal District / Texas Comptroller of Public Accounts",
    url: "https://hunt-cad.org",
    lastVerified: "2026-02-10"
  }
},

"US-MO-JACKSON-COUNTY": {
  regionId: "US-MO-JACKSON-COUNTY",
  year: 2026,

  systemName:
    "Jackson County, Missouri property tax estimator (assessed/taxable value with combined local levy rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, city, school district, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Jackson County Assessment Department / Jackson County Collection Department / Missouri State Tax Commission",
    url: "https://www.jacksongov.org",
    lastVerified: "2026-02-10"
  }
},

"US-MO-JEFFERSON-COUNTY": {
  regionId: "US-MO-JEFFERSON-COUNTY",
  year: 2026,

  systemName:
    "Jefferson County, Missouri property tax estimator (assessed/taxable value with combined local levy rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, city, school district, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Jefferson County Assessment Department / Jefferson County Collector / Missouri State Tax Commission",
    url: "https://www.jeffcomo.gov",
    lastVerified: "2026-02-10"
  }
},

"US-LA-JEFFERSON-PARISH-COUNTY": {
  regionId: "US-LA-JEFFERSON-PARISH-COUNTY",
  year: 2026,

  systemName: "Jefferson Parish, Louisiana property tax estimator (market value with state assessment ratio; ward-specific combined millage rates)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.1
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (parish, municipality, school, and special districts; ward-specific; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Jefferson Parish Assessor",
    url: "https://www.jpassessor.net",
    lastVerified: "2026-02-10"
  }
},

"US-KS-JOHNSON-COUNTY": {
  regionId: "US-KS-JOHNSON-COUNTY",
  year: 2026,

  systemName: "Johnson County, Kansas property tax estimator (market value with statutory assessment ratios; combined local mill levies vary by taxing districts)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.115
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (total mill levy from county, city, school, and special districts; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Johnson County Treasury, Taxation and Vehicles",
    url: "https://www.jocogov.org/department/treasury-taxation-and-vehicles/property-tax",
    lastVerified: "2026-02-10"
  }
},

"US-NC-JOHNSTON-COUNTY": {
  regionId: "US-NC-JOHNSTON-COUNTY",
  year: 2026,

  systemName: "Johnston County, North Carolina property tax estimator (assessed value with combined local rates expressed per $100 of value)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, municipality, and special districts; expressed per $100 of assessed value; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Johnston County Tax Administration",
    url: "https://www.johnstonnc.gov/tax",
    lastVerified: "2026-02-10"
  }
},

"US-IL-KANE-COUNTY": {
  regionId: "US-IL-KANE-COUNTY",
  year: 2026,

  systemName: "Kane County, Illinois property tax estimator (equalized assessed value with combined local rates varying by tax code area)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (aggregate rate from county, municipality, school, and special districts; varies by tax code area; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Kane County Supervisor of Assessments",
    url: "https://assessments.kanecountyil.gov",
    lastVerified: "2026-02-10"
  }
},

"US-TX-KAUFMAN-COUNTY": {
  regionId: "US-TX-KAUFMAN-COUNTY",
  year: 2026,

  systemName: "Kaufman County, Texas property tax estimator (taxable value with combined local rates varying by taxing units)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (sum of applicable county, city, school, and special district rates; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Kaufman County Tax Assessor-Collector / Kaufman Central Appraisal District",
    url: "https://www.kaufmancounty.net/247/Tax-Assessor",
    lastVerified: "2026-02-10"
  }
},

"US-IL-KENDALL-COUNTY": {
  regionId: "US-IL-KENDALL-COUNTY",
  year: 2026,

  systemName: "Kendall County, Illinois property tax estimator (taxable assessed value with combined local rates varying by tax code area)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (aggregate rate from county, municipality, school, and special districts; varies by tax code area; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Kendall County Supervisor of Assessments / Kendall County Clerk",
    url: "https://www.co.kendall.il.us/assessments/",
    lastVerified: "2026-02-10"
  }
},

"US-CA-KERN-COUNTY": {
  regionId: "US-CA-KERN-COUNTY",
  year: 2026,

  systemName: "Kern County, California property tax estimator (assessed value with combined local rates under Proposition 13 and tax rate areas)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (aggregate rate set by taxing jurisdictions including county, city, school and special districts; varies by tax rate area; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Kern County Auditor-Controller / Assessor-Recorder",
    url: "https://www.auditor.co.kern.ca.us/RateBook/",
    lastVerified: "2026-02-10"
  }
},

"US-WA-KING-COUNTY": {
  regionId: "US-WA-KING-COUNTY",
  year: 2026,

  systemName: "King County, Washington property tax estimator (assessed value with combined local levy rates varying by levy code area)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax levy rate (sum of applicable taxing district levies; expressed per $1,000 of assessed value; varies by levy code area; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "King County Assessor",
    url: "https://kingcounty.gov/en/dept/assessor",
    lastVerified: "2026-02-10"
  }
},

"US-IN-LAKE-COUNTY": {
  regionId: "US-IN-LAKE-COUNTY",
  year: 2026,

  systemName: "Lake County, Indiana property tax estimator (assessed value with combined local rates varying by tax district)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (sum of applicable county, city/town, school, and special district rates; varies by tax district; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Lake County Assessor / Indiana Department of Local Government Finance",
    url: "https://legacy.lakecountyin.org/departments/assessor",
    lastVerified: "2026-02-10"
  }
},

"US-SC-LEXINGTON-COUNTY": {
  regionId: "US-SC-LEXINGTON-COUNTY",
  year: 2026,

  systemName: "Lexington County, South Carolina property tax estimator (market value with statutory assessment ratios and district-specific combined millage rates)",

  valuation: {
    method: "marketWithRatio"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (total millage for county, school, municipal, and other taxing agencies; varies by tax district; user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Lexington County Assessor / Auditor",
    url: "https://lex-co.sc.gov/departments/assessor",
    lastVerified: "2026-02-10"
  }
},

"US-IL-MADISON-COUNTY": {
  regionId: "US-IL-MADISON-COUNTY",
  year: 2026,

  systemName: "Madison County, Illinois property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, municipal, school, and district levies; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Madison County Supervisor of Assessments and Treasurer",
    url: "https://www.madisoncountyil.gov",
    lastVerified: "2026-02-10",
  },
},

"US-AZ-MARICOPA-COUNTY": {
  regionId: "US-AZ-MARICOPA-COUNTY",
  year: 2026,

  systemName: "Maricopa County, Arizona property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, city, school, and special district levies; varies by taxing district; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Maricopa County Assessor and Maricopa County Treasurer",
    url: "https://www.maricopa.gov",
    lastVerified: "2026-02-10",
  },
},

"US-CA-MARIN-COUNTY": {
  regionId: "US-CA-MARIN-COUNTY",
  year: 2026,

  systemName: "Marin County, California property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined property tax rate (statewide 1% base plus voter-approved local debt; varies by tax rate area; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "California State Board of Equalization and Marin County Assessor-Recorder",
    url: "https://www.boe.ca.gov",
    lastVerified: "2026-02-10",
  },
},

"US-IN-MARION-COUNTY": {
  regionId: "US-IN-MARION-COUNTY",
  year: 2026,

  systemName: "Marion County, Indiana property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate by taxing district (county, city, township, school, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Indiana Department of Local Government Finance and Marion County Assessor",
    url: "https://www.in.gov/dlgf/",
    lastVerified: "2026-02-10",
  },
},

"US-HI-MAUI-COUNTY": {
  regionId: "US-HI-MAUI-COUNTY",
  year: 2026,

  systemName: "Maui County, Hawaii property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Maui County real property tax rate by property class and tier (per 1,000 of net taxable assessed value; user-selected)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Maui County Department of Finance, Real Property Assessment Division",
    url: "https://www.mauicounty.gov",
    lastVerified: "2026-02-10",
  },
},

"US-IL-MCHENRY-COUNTY": {
  regionId: "US-IL-MCHENRY-COUNTY",
  year: 2026,

  systemName: "McHenry County, Illinois property tax estimator",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.3333333,
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate by taxing district (county, township, municipality, school, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Illinois Department of Revenue and McHenry County assessment and tax offices",
    url: "https://tax.illinois.gov",
    lastVerified: "2026-02-10",
  },
},

"US-NJ-MONMOUTH-COUNTY": {
  regionId: "US-NJ-MONMOUTH-COUNTY",
  year: 2026,

  systemName: "Monmouth County, New Jersey property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate by municipality and district (county, municipal, school, and special districts; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Monmouth County Board of Taxation and New Jersey Division of Taxation",
    url: "https://www.co.monmouth.nj.us",
    lastVerified: "2026-02-10",
  },
},

"US-OR-MARION-COUNTY": {
  regionId: "US-OR-MARION-COUNTY",
  year: 2026,

  systemName: "Marion County, Oregon property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate by taxing district (county, city, school, and special districts; subject to Measure 5 limits; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Marion County Assessor and Oregon Department of Revenue",
    url: "https://www.co.marion.or.us",
    lastVerified: "2026-02-10",
  },
},

"US-OR-MULTNOMAH-COUNTY": {
  regionId: "US-OR-MULTNOMAH-COUNTY",
  year: 2026,

  systemName: "Multnomah County, Oregon property tax estimator",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate by levy code area (county, city, school, and special districts; subject to Measure 5 limits; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Multnomah County Assessment & Taxation and Oregon Department of Revenue",
    url: "https://www.multco.us",
    lastVerified: "2026-02-10",
  },
},

"US-NY-NASSAU-COUNTY": {
  regionId: "US-NY-NASSAU-COUNTY",
  year: 2026,

  systemName:
    "Nassau County property tax estimator (assessed value with parcel-specific combined local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county, town or city, school district, and special districts; parcel-specific)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov",
    lastVerified: "2026-02-10",
  },
},

"US-TX-NUECES-COUNTY": {
  regionId: "US-TX-NUECES-COUNTY",
  year: 2026,

  systemName:
    "Nueces County property tax estimator (assessed value with parcel-specific combined local rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name:
          "Combined local property tax rate (county units, city if applicable, school district, and special districts; parcel-specific)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Nueces County Tax Assessor-Collector",
    url: "https://www.nuecesco.com/county-services/tax-assessor-collector",
    lastVerified: "2026-02-10",
  },
},




  };
  
  export function getPropertyTaxConfig(
    regionId: RegionId
  ): PropertyTaxConfig | undefined {
    return propertyTaxConfigs[regionId];
  }
  