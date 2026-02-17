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

"US-NY-ONONDAGA-COUNTY": {
  regionId: "US-NY-ONONDAGA-COUNTY",
  year: 2026,

  systemName: "Onondaga County property tax (locally assessed value with multiple local tax components)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "County property tax rate (per $1,000 of assessed value; user-provided)", rate: 0 },
      { name: "City or town property tax rate (per $1,000 of assessed value; user-provided)", rate: 0 },
      { name: "School district property tax rate (per $1,000 of assessed value; user-provided)", rate: 0 },
      { name: "Village or special district rate (if applicable; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Onondaga County Real Property Tax Services",
    url: "https://onondaga.gov/rpts/",
    lastVerified: "2026-02-11"
  }
},

"US-FL-OSCEOLA-COUNTY": {
  regionId: "US-FL-OSCEOLA-COUNTY",
  year: 2026,

  systemName: "Osceola County property tax (assessed value with multi-authority millage rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "County millage rate (per $1,000 of taxable value; user-provided)", rate: 0 },
      { name: "Municipal millage rate (if applicable; user-provided)", rate: 0 },
      { name: "School board millage rate (user-provided)", rate: 0 },
      { name: "Independent or special district millage rate (if applicable; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Osceola County Property Appraiser",
    url: "https://www.property-appraiser.org/",
    lastVerified: "2026-02-11"
  }
},

"US-TX-PARKER-COUNTY": {
  regionId: "US-TX-PARKER-COUNTY",
  year: 2026,

  systemName: "Parker County ad valorem property tax (market value appraisal; combined local rates vary by taxing unit)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 1
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county + city + school + special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Parker County Appraisal District",
    url: "https://www.parkercad.org",
    lastVerified: "2026-02-11"
  }
},

"US-IL-PEORIA-COUNTY": {
  regionId: "US-IL-PEORIA-COUNTY",
  year: 2026,

  systemName: "Peoria County ad valorem property tax (assessed at 33.33% of market value; combined local rates vary by taxing district)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.3333
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county + city/village + school + special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Peoria County Supervisor of Assessments",
    url: "https://www.peoriacounty.gov/386/Understanding-Your-Tax-Bill",
    lastVerified: "2026-02-11"
  }
},

"US-MD-PRINCE-GEORGES-COUNTY": {
  regionId: "US-MD-PRINCE-GEORGES-COUNTY",
  year: 2026,

  systemName: "Prince George's County ad valorem property tax (assessed at 100% of market value; combined local rates vary by jurisdiction)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 1
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county + municipal + state + special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Maryland Department of Assessments and Taxation",
    url: "https://dat.maryland.gov/realproperty/pages/homeowners-guide.aspx",
    lastVerified: "2026-02-11"
  }
},

"US-VA-PRINCE-WILLIAM-COUNTY": {
  regionId: "US-VA-PRINCE-WILLIAM-COUNTY",
  year: 2026,

  systemName: "Prince William County real estate tax (assessed at 100% of fair market value; combined local rates may include special levies)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local real estate tax rate (county + special/service districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Prince William County Real Estate Assessments Office",
    url: "https://www.pwcva.gov/department/finance/real-estate-assessments",
    lastVerified: "2026-02-11"
  }
},

"US-WA-PIERCE-COUNTY": {
  regionId: "US-WA-PIERCE-COUNTY",
  year: 2026,

  systemName: "Pierce County ad valorem property tax (assessed at 100% of true and fair market value; combined district rates vary)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 1
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (state + county + city + school + special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Pierce County Assessor-Treasurer",
    url: "https://www.piercecountywa.gov/746/Property-Assessment",
    lastVerified: "2026-02-11"
  }
},

"US-AZ-PIMA-COUNTY": {
  regionId: "US-AZ-PIMA-COUNTY",
  year: 2026,

  systemName: "Pima County property tax (Arizona net assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (varies by taxing jurisdiction; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Arizona Department of Revenue",
    url: "https://azdor.gov/sites/default/files/2023-03/PROPERTY_AZPropertyTaxation.pdf",
    lastVerified: "2026-02-11"
  }
},

"US-FL-PINELLAS-COUNTY": {
  regionId: "US-FL-PINELLAS-COUNTY",
  year: 2026,

  systemName: "Pinellas County ad valorem property tax (taxable value × combined millage rate)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, school board, municipality/district – user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Pinellas County Property Appraiser",
    url: "https://www.pcpao.gov/learn-about/value-definitions",
    lastVerified: "2026-02-11"
  }
},

"US-FL-POLK-COUNTY": {
  regionId: "US-FL-POLK-COUNTY",
  year: 2026,

  systemName: "Polk County ad valorem property tax (taxable value × combined millage rate)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, school board, municipality/district – user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Polk County Property Appraiser",
    url: "https://www.polkpa.org/",
    lastVerified: "2026-02-11"
  }
},

"US-SC-RICHLAND-COUNTY": {
  regionId: "US-SC-RICHLAND-COUNTY",
  year: 2026,

  systemName: "Richland County property tax estimator (market value × 6% assessment ratio × combined millage rate for 6% class property)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.06
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (taxing district millage – user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Richland County Assessor",
    url: "https://www.richlandcountysc.gov/Government/Departments/Taxes/Assessor/Classification-of-Property",
    lastVerified: "2026-02-11"
  }
},

"US-CA-RIVERSIDE-COUNTY": {
  regionId: "US-CA-RIVERSIDE-COUNTY",
  year: 2026,

  systemName: "Riverside County property tax estimator (assessed value × combined local rate under Proposition 13)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Proposition 13 base rate (1% of assessed value)", rate: 0.01 },
      { name: "Additional voter-approved local rates (bonds, school, special districts – user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "California State Board of Equalization / Riverside County Auditor-Controller",
    url: "https://boe.ca.gov/proptaxes/pdf/pub29.pdf",
    lastVerified: "2026-02-11"
  }
},

"US-NC-ROBESON-COUNTY": {
  regionId: "US-NC-ROBESON-COUNTY",
  year: 2026,

  systemName: "Robeson County property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Robeson County base property tax rate (per $1 of assessed value)", rate: 0.0075 }
    ]
  },

  authority: {
    name: "Robeson County Tax Office",
    url: "https://www.robesoncountync.gov",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SACRAMENTO-COUNTY": {
  regionId: "US-CA-SACRAMENTO-COUNTY",
  year: 2026,

  systemName: "Sacramento County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "Sacramento County Auditor-Controller",
    url: "https://finance.saccounty.net/AuditorController",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SAN-DIEGO-COUNTY": {
  regionId: "US-CA-SAN-DIEGO-COUNTY",
  year: 2026,

  systemName: "San Diego County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "County of San Diego Auditor & Controller",
    url: "http://sdcounty.ca.gov/content/sdc/auditor/ptsfaq.html",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SAN-JOAQUIN-COUNTY": {
  regionId: "US-CA-SAN-JOAQUIN-COUNTY",
  year: 2026,

  systemName: "San Joaquin County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "San Joaquin County Assessor",
    url: "https://sjgov.org/department/assessor/property-information/homeowners/assessed-value---homeowner",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SAN-MATEO-COUNTY": {
  regionId: "US-CA-SAN-MATEO-COUNTY",
  year: 2026,

  systemName: "San Mateo County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "San Mateo County Assessor-County Clerk-Recorder",
    url: "https://smcacre.gov/assessor",
    lastVerified: "2026-02-11"
  }
},

"US-IL-SANGAMON-COUNTY": {
  regionId: "US-IL-SANGAMON-COUNTY",
  year: 2026,

  systemName: "Sangamon County property tax system (33.33% assessment ratio)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.3333
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (varies by tax code; user-provided decimal)", rate: 0 }
    ]
  },

  authority: {
    name: "Sangamon County Treasurer",
    url: "https://sangamonil.gov/departments/s-z/treasurer/how-to-estimate-your-property-taxes",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SANTA-BARBARA-COUNTY": {
  regionId: "US-CA-SANTA-BARBARA-COUNTY",
  year: 2026,

  systemName: "Santa Barbara County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "Santa Barbara County Treasurer-Tax Collector",
    url: "https://taxes.co.santa-barbara.ca.us/propertytax",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SANTA-CLARA-COUNTY": {
  regionId: "US-CA-SANTA-CLARA-COUNTY",
  year: 2026,

  systemName: "Santa Clara County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "Santa Clara County Assessor",
    url: "https://www.sccassessor.org/faq/understanding-proposition-13",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SANTA-CRUZ-COUNTY": {
  regionId: "US-CA-SANTA-CRUZ-COUNTY",
  year: 2026,

  systemName: "Santa Cruz County ad valorem property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California constitutional general levy (1% of assessed value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "Santa Cruz County Auditor-Controller",
    url: "https://www.santacruzcountyca.gov/Departments/Auditor-ControllerHome/AssessedValuePropertyTaxes.aspx",
    lastVerified: "2026-02-11"
  }
},

"US-IA-SCOTT-COUNTY": {
  regionId: "US-IA-SCOTT-COUNTY",
  year: 2026,

  systemName: "Scott County, Iowa property tax estimator (taxable value after Iowa rollbacks; levy rates vary by taxing district)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local levy rate (varies by taxing district; user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Scott County Assessor (Iowa)",
    url: "https://www.scottcountyiowa.gov/assessor/tax-levies-assessed-values",
    lastVerified: "2026-02-11",
  },
},

"US-KS-SEDGWICK-COUNTY": {
  regionId: "US-KS-SEDGWICK-COUNTY",
  year: 2026,

  systemName: "Sedgwick County, Kansas residential property tax estimator (market value × 11.5% assessment rate; mill levy varies by taxing jurisdiction)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.115
  },

  rates: {
    components: [
      { name: "Combined local mill levy (county, city, school, and special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Sedgwick County Treasurer (Kansas)",
    url: "https://www.sedgwickcounty.org/treasurer/propertytax101/",
    lastVerified: "2026-02-11"
  }
},

"US-TN-SHELBY-COUNTY": {
  regionId: "US-TN-SHELBY-COUNTY",
  year: 2026,

  systemName: "Shelby County, Tennessee residential property tax estimator (market value × 25% assessment ratio; county and city rates vary by location)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.25
  },

  rates: {
    components: [
      { name: "Shelby County tax rate (uniform county portion; user-provided)", rate: 0 },
      { name: "Municipal tax rate (if applicable; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Shelby County Trustee (Tennessee)",
    url: "https://www.shelbycountytrustee.com/208/Calculate-Taxes",
    lastVerified: "2026-02-11"
  }
},

"US-TX-SMITH-COUNTY": {
  regionId: "US-TX-SMITH-COUNTY",
  year: 2026,

  systemName: "Smith County Texas property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county + city + school + special districts, user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Smith County Appraisal District",
    url: "https://www.smithcad.org",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SOLANO-COUNTY": {
  regionId: "US-CA-SOLANO-COUNTY",
  year: 2026,

  systemName: "Solano County California property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California base ad valorem property tax rate", rate: 0.01 },
      { name: "Additional voter-approved bonds and special assessments (varies by tax rate area; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Solano County Assessor/Recorder",
    url: "https://www.solanocounty.gov/government/assessorrecorder/assessor-division/property-tax-system",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SONOMA-COUNTY": {
  regionId: "US-CA-SONOMA-COUNTY",
  year: 2026,

  systemName: "Sonoma County California property tax system",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "California base ad valorem property tax rate", rate: 0.01 },
      { name: "Additional voter-approved bonds and special assessments (varies by tax rate area; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Sonoma County Assessor",
    url: "https://sonomacounty.ca.gov/administrative-support-and-fiscal-services/clerk-recorder-assessor-registrar-of-voters/assessor",
    lastVerified: "2026-02-11"
  }
},

"US-SC-SPARTANBURG-COUNTY": {
  regionId: "US-SC-SPARTANBURG-COUNTY",
  year: 2026,

  systemName: "Spartanburg County owner-occupied residential property tax estimator (market value × 4% assessment ratio × combined local millage)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.04
  },

  rates: {
    components: [
      { name: "Combined local millage rate (county + school district + municipal + special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Spartanburg County Auditor",
    url: "https://www.spartanburgcounty.org/171/Auditor",
    lastVerified: "2026-02-11"
  }
},

"US-IL-ST-CLAIR-COUNTY": {
  regionId: "US-IL-ST-CLAIR-COUNTY",
  year: 2026,

  systemName: "St. Clair County property tax estimator (market value × one-third assessment level × combined local rate)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.3333333333
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (varies by taxing district; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Illinois Department of Revenue",
    url: "https://tax.illinois.gov/localgovernments/property.html",
    lastVerified: "2026-02-11"
  }
},

"US-MO-ST-LOUIS-COUNTY": {
  regionId: "US-MO-ST-LOUIS-COUNTY",
  year: 2026,

  systemName: "St. Louis County residential property tax estimator (market value × 19% assessment ratio × combined local levy)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.19
  },

  rates: {
    components: [
      { name: "Combined local property tax levy (county + municipality + school district + special districts; user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Missouri State Tax Commission",
    url: "https://stc.mo.gov/definitions/",
    lastVerified: "2026-02-11"
  }
},

"US-NY-SUFFOLK-COUNTY": {
  regionId: "US-NY-SUFFOLK-COUNTY",
  year: 2026,

  systemName: "Suffolk County property tax (assessed value-based system with locally determined rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "County property tax (varies by taxing jurisdiction)", rate: 0 },
      { name: "Town property tax (varies by town)", rate: 0 },
      { name: "School district property tax (varies by district)", rate: 0 },
    ],
  },

  authority: {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov",
    lastVerified: "2026-02-11",
  },
},

"US-UT-SUMMIT-COUNTY": {
  regionId: "US-UT-SUMMIT-COUNTY",
  year: 2026,

  systemName: "Summit County, Utah property tax estimator (rates vary by taxing entity; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Summit County, Utah",
    url: "https://www.summitcountyutah.gov/1313/Property-Tax-101",
    lastVerified: "2026-02-11",
  },
},

"US-TX-TARRANT-COUNTY": {
  regionId: "US-TX-TARRANT-COUNTY",
  year: 2026,

  systemName: "Tarrant County, Texas property tax estimator (rates vary by taxing unit; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Tarrant County Tax Assessor-Collector",
    url: "https://www.tarrantcountytx.gov/en/tax/property-tax.html",
    lastVerified: "2026-02-11",
  },
},

"US-TX-TRAVIS-COUNTY": {
  regionId: "US-TX-TRAVIS-COUNTY",
  year: 2026,

  systemName: "Travis County, Texas property tax estimator (rates vary by taxing unit; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Travis County Tax Office",
    url: "https://www.traviscountytx.gov/tax-rates",
    lastVerified: "2026-02-11",
  },
},

"US-NC-WAKE-COUNTY": {
  regionId: "US-NC-WAKE-COUNTY",
  year: 2026,

  systemName: "Wake County, North Carolina property tax estimator (assessed at market value; rates vary by municipality/district; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Wake County Tax Administration",
    url: "https://www.wake.gov/departments-government/tax-administration/real-estate/revaluation",
    lastVerified: "2026-02-11",
  },
},

"US-WI-WALWORTH-COUNTY": {
  regionId: "US-WI-WALWORTH-COUNTY",
  year: 2026,

  systemName: "Walworth County, Wisconsin property tax estimator (district-based mill rates; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local mill rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Walworth County Treasurer",
    url: "https://www.co.walworth.wi.us/Archive.aspx?ADID=420",
    lastVerified: "2026-02-11",
  },
},

"US-OR-WASHINGTON-COUNTY": {
  regionId: "US-OR-WASHINGTON-COUNTY",
  year: 2026,

  systemName: "Washington County, Oregon property tax estimator (RMV assessed at 100%; MAV limit; district-based rates; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Washington County Department of Assessment & Taxation",
    url: "https://www.washingtoncountyor.gov/at/property-taxes",
    lastVerified: "2026-02-11",
  },
},

"US-NV-WASHOE-COUNTY": {
  regionId: "US-NV-WASHOE-COUNTY",
  year: 2026,

  systemName: "Washoe County, Nevada property tax estimator (assessed value-based; district-based combined rates; user-provided rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Washoe County Treasurer",
    url: "https://www.washoecounty.gov/treas/Tax_Rates.php",
    lastVerified: "2026-02-11",
  },
},

"US-WI-WAUKESHA-COUNTY": {
  regionId: "US-WI-WAUKESHA-COUNTY",
  year: 2026,

  systemName: "Waukesha County, Wisconsin property tax estimator (assessed value-based; district-based combined rates; user-provided rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Waukesha County Treasurer",
    url: "https://www.waukeshacounty.gov/treasurer/",
    lastVerified: "2026-02-11",
  },
},

"US-IL-WILL-COUNTY": {
  regionId: "US-IL-WILL-COUNTY",
  year: 2026,

  systemName: "Will County, Illinois property tax estimator (EAV-based; tax-code-area rates; user-provided combined rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Will County Treasurer",
    url: "https://willcounty.gov/County-Offices/Finance-and-Revenue/Treasurer-Office/Tax-Bill/How-Your-Tax-Bill-is-Calculated",
    lastVerified: "2026-02-11",
  },
},

"US-TX-WILLIAMSON-COUNTY": {
  regionId: "US-TX-WILLIAMSON-COUNTY",
  year: 2026,

  systemName: "Williamson County, Texas property tax estimator (assessed value-based; district-based combined rates; user-provided rate)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Williamson County Tax Assessor-Collector",
    url: "https://www.wilcotx.gov/734/Property-Tax",
    lastVerified: "2026-02-11",
  },
},

"US-IL-WINNEBAGO-COUNTY": {
  regionId: "US-IL-WINNEBAGO-COUNTY",
  year: 2026,

  systemName: "Winnebago County, Illinois property tax estimator (EAV-based; tax-code-area rates; user-provided combined rate)",

  valuation: {
    method: "assessed", // user enters Equalized Assessed Value (EAV)
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (user-provided)", rate: 0 },
    ],
  },

  authority: {
    name: "Winnebago County Treasurer",
    url: "https://wincoil.gov/departments/treasurer",
    lastVerified: "2026-02-11",
  },
},

"US-TX-AUSTIN-CITY": {
  regionId: "US-TX-AUSTIN-CITY",
  year: 2026,

  systemName: "City of Austin property tax (Texas ad valorem system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "City of Austin adopted property tax rate (per $1 of taxable value)", rate: 0.00574017 }
    ]
  },

  authority: {
    name: "City of Austin",
    url: "https://www.austintexas.gov/page/tax-rates",
    lastVerified: "2026-02-11"
  }
},

"US-MD-BALTIMORE-CITY": {
    regionId: "US-MD-BALTIMORE-CITY",
    year: 2026,

    systemName: "Baltimore City real property tax (Maryland ad valorem system)",

    valuation: {
      method: "assessed"
    },

    rates: {
      components: [
        { name: "Baltimore City real property tax rate (per $1 of assessed value)", rate: 0.02248 }
      ]
    },

    authority: {
      name: "Baltimore City Department of Finance",
      url: "https://www.baltimorecity.gov/finance/real-property-taxes",
      lastVerified: "2026-02-11"
    }
  },

  "US-MA-BOSTON-CITY": {
  regionId: "US-MA-BOSTON-CITY",
  year: 2024,

  systemName: "Boston property tax (Massachusetts classified rate system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Boston residential property tax rate (per $1 of assessed value)", rate: 0.0109 }
    ]
  },

  authority: {
    name: "City of Boston Assessing Department",
    url: "https://www.boston.gov/departments/assessing/how-we-tax-your-property",
    lastVerified: "2026-02-11"
  }
},

"US-VA-CHESAPEAKE-CITY": {
  regionId: "US-VA-CHESAPEAKE-CITY",
  year: 2026,

  systemName: "Chesapeake real estate tax (Virginia ad valorem system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Chesapeake real estate tax rate (per $1 of assessed value)", rate: 0.0100 }
    ]
  },

  authority: {
    name: "City of Chesapeake City Council",
    url: "https://www.cityofchesapeake.net/FAQ.aspx?QID=484",
    lastVerified: "2026-02-11"
  }
},

"US-VA-CHESTERFIELD-COUNTY": {
  regionId: "US-VA-CHESTERFIELD-COUNTY",
  year: 2026,

  systemName: "Chesterfield County real estate property tax",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Chesterfield County real estate tax rate", rate: 0.0089 }
    ]
  },

  authority: {
    name: "Chesterfield County, Virginia",
    url: "https://www.chesterfield.gov/823/Real-Estate-Assessments",
    lastVerified: "2026-02-11"
  }
},

"US-IL-CHICAGO-CITY": {
  regionId: "US-IL-CHICAGO-CITY",
  year: 2026,

  systemName: "Chicago property tax (Cook County Equalized Assessed Value system)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 0.1
  },

  rates: {
    components: [
      { name: "Combined Cook County composite rate (user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Cook County Clerk",
    url: "https://www.cookcountyclerkil.gov/property-taxes/tax-extension-and-rates",
    lastVerified: "2026-02-11"
  }
},

"US-HI-HONOLULU-CITY": {
  regionId: "US-HI-HONOLULU-CITY",
  year: 2026,

  systemName: "Honolulu real property tax (net taxable value with class-based rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined Honolulu real property tax rate (varies by property class and tier; user-provided)",
        rate: 0.0000001
      }
    ]
  },

  authority: {
    name: "City and County of Honolulu, Real Property Assessment Division",
    url: "https://realproperty.honolulu.gov/media/j4xaoww0/state-report-fy26-final-tax-rates.pdf",
    lastVerified: "2026-02-11"
  }
},

"US-TX-HOUSTON-CITY": {
  regionId: "US-TX-HOUSTON-CITY",
  year: 2026,

  systemName: "Houston property tax (Texas market value system with local taxing units)",

  valuation: {
    method: "marketWithRatio",
    assessmentRatio: 1
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (city, county, school district, and other taxing units – user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/taxes/property-tax/valuing-property.php",
    lastVerified: "2026-02-11"
  }
},

"US-AL-HUNTSVILLE-CITY": {
  regionId: "US-AL-HUNTSVILLE-CITY",
  year: 2026,

  systemName: "Huntsville property tax (Alabama assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (state, county, school, and city millage – user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Alabama Department of Revenue",
    url: "https://www.revenue.alabama.gov/property-tax/property-tax-assessment/",
    lastVerified: "2026-02-11"
  }
},

"US-NJ-JERSEY-CITY-CITY": {
  regionId: "US-NJ-JERSEY-CITY-CITY",
  year: 2026,

  systemName: "Jersey City property tax (New Jersey assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (municipal, county, and school – user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "New Jersey Division of Taxation",
    url: "https://www.nj.gov/treasury/taxation/lpt/genlpt.shtml",
    lastVerified: "2026-02-11"
  }
},

"US-NV-LAS-VEGAS-CITY": {
  regionId: "US-NV-LAS-VEGAS-CITY",
  year: 2026,

  systemName: "Las Vegas property tax (Nevada assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (tax district rate – user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Clark County Assessor",
    url: "https://www.clarkcountynv.gov/government/assessor/real-property",
    lastVerified: "2026-02-11"
  }
},

"US-CA-LOS-ANGELES-CITY": {
  regionId: "US-CA-LOS-ANGELES-CITY",
  year: 2026,

  systemName: "Los Angeles city property tax (California Proposition 13 system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "General ad valorem property tax levy (1% of net taxable value)", rate: 0.01 }
    ]
  },

  authority: {
    name: "Los Angeles County Auditor-Controller",
    url: "https://auditor.lacounty.gov/faqs/",
    lastVerified: "2026-02-11"
  }
},

"US-WI-MILWAUKEE-CITY": {
  regionId: "US-WI-MILWAUKEE-CITY",
  year: 2026,

  systemName: "Milwaukee city property tax (Wisconsin assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "Combined local property tax rate (county, city, school district, technical college district – user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Wisconsin Department of Revenue",
    url: "https://www.revenue.wi.gov/DORReports/PropTaxOverview2025.pdf",
    lastVerified: "2026-02-11"
  }
},

"US-TN-NASHVILLE-CITY": {
  regionId: "US-TN-NASHVILLE-CITY",
  year: 2026,

  systemName: "Nashville property tax (Davidson County assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      { name: "General Services District (GSD) property tax rate (per $100 of assessed value – user-provided)", rate: 0 },
      { name: "Urban Services District (USD) property tax rate (per $100 of assessed value – user-provided)", rate: 0 }
    ]
  },

  authority: {
    name: "Davidson County Property Assessor",
    url: "https://www.padctn.org/resources/tax-rates-and-calculator/",
    lastVerified: "2026-02-11"
  }
},

"US-LA-NEW-ORLEANS-CITY": {
  regionId: "US-LA-NEW-ORLEANS-CITY",
  year: 2026,

  systemName: "New Orleans property tax (Louisiana assessed value and millage system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (total millage across applicable taxing authorities — user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "City of New Orleans, Treasury",
    url: "https://nola.gov/next/treasury/topics/how-taxes-are-calculated/",
    lastVerified: "2026-02-11"
  }
},

"US-NY-NEW-YORK-CITY": {
  regionId: "US-NY-NEW-YORK-CITY",
  year: 2026,

  systemName: "New York City property tax (class-based assessed value system)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "NYC property tax rate (class-specific — user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "New York City Department of Finance",
    url: "https://www.nyc.gov/site/finance/property/definitions-of-property-assessment-terms.page",
    lastVerified: "2026-02-11"
  }
},

"US-CA-OAKLAND-CITY": {
  regionId: "US-CA-OAKLAND-CITY",
  year: 2026,

  systemName: "Oakland property tax (California assessed value system with TRA-based rates)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (varies by Tax Rate Area; user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Alameda County Auditor-Controller, Property Tax Division",
    url: "https://auditor.alamedacountyca.gov/property-tax/",
    lastVerified: "2026-02-11",
  },
},


"US-FL-ORLANDO-CITY": {
  regionId: "US-FL-ORLANDO-CITY",
  year: 2026,

  systemName: "Orlando property tax (Florida assessed value system)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (county, city, school, special districts – user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Florida Department of Revenue – Property Tax Oversight",
    url: "https://floridarevenue.com/property/Pages/Millage.aspx",
    lastVerified: "2026-02-11",
  },
},

"US-PA-PHILADELPHIA-CITY": {
  regionId: "US-PA-PHILADELPHIA-CITY",
  year: 2026,

  systemName: "Philadelphia real estate tax (assessed value system)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined City and School District real estate tax rate (user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "City of Philadelphia – Real Estate Tax",
    url: "https://www.phila.gov/services/payments-assistance-taxes/taxes/property-and-real-estate-taxes/real-estate-tax/",
    lastVerified: "2026-02-11",
  },
},

"US-OR-PORTLAND-CITY": {
  regionId: "US-OR-PORTLAND-CITY",
  year: 2026,

  systemName: "Portland property tax (Oregon assessed value and tax code area system)",

  valuation: {
    method: "assessed",
  },

  rates: {
    components: [
      {
        name: "Combined property tax rate for your tax code area (user-provided)",
        rate: 0,
      },
    ],
  },

  authority: {
    name: "Multnomah County Assessment and Taxation",
    url: "https://multco.us/info/how-your-property-taxes-are-calculated",
    lastVerified: "2026-02-11",
  },
},

"US-NC-RALEIGH-CITY": {
  regionId: "US-NC-RALEIGH-CITY",
  year: 2026,

  systemName: "Raleigh property tax (North Carolina assessed value system with jurisdiction-based rates)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "Combined local property tax rate (Wake County, City of Raleigh, and applicable districts — user-provided)",
        rate: 0
      }
    ]
  },

  authority: {
    name: "Wake County Tax Administration",
    url: "https://www.wake.gov/departments-government/tax-administration/tax-bill-help/tax-rates-fees",
    lastVerified: "2026-02-11"
  }
},

"US-VA-RICHMOND-CITY": {
  regionId: "US-VA-RICHMOND-CITY",
  year: 2026,

  systemName: "Richmond real estate tax (100% fair market value assessment)",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "City of Richmond real estate tax rate",
        rate: 0.012
      }
    ]
  },

  authority: {
    name: "City of Richmond Department of Finance",
    url: "https://www.rva.gov/finance/real-estate",
    lastVerified: "2026-02-11"
  }
},

"US-CA-SAN-FRANCISCO-CITY": {
  regionId: "US-CA-SAN-FRANCISCO-CITY",
  year: 2026,

  systemName: "San Francisco secured property tax",

  valuation: {
    method: "assessed"
  },

  rates: {
    components: [
      {
        name: "San Francisco secured property tax rate",
        rate: 0.0118268325
      }
    ]
  },

  authority: {
    name: "City and County of San Francisco Treasurer & Tax Collector",
    url: "http://sftreasurer.org/property/secured-property-taxes",
    lastVerified: "2026-02-11"
  }
},









  };
  
  export function getPropertyTaxConfig(
    regionId: RegionId
  ): PropertyTaxConfig | undefined {
    return propertyTaxConfigs[regionId];
  }
  