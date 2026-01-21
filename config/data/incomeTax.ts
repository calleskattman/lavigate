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
      lastVerified: "2026-01-12",
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
      lastVerified: "2026-01-12",
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
      lastVerified: "2026-01-12",
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

"US-UT": {
  regionId: "US-UT",
  year: 2024,
  systemName: "Utah individual income tax",
  brackets: [{ from: 0, to: null, rate: 0.0455 }],
  personalExemption: 2046,
  notes: [
    "Utah uses a nonrefundable Utah taxpayer tax credit rather than a direct state standard deduction. Federal standard or itemized deductions and a per-dependent personal exemption amount are combined and used to compute the credit, which may be phased out based on income and filing status. This calculator applies the flat rate only and does not model the taxpayer tax credit phase-out.",
  ],
  authority: {
    name: "Utah State Tax Commission",
    url: "https://incometax.utah.gov",
    lastVerified: "2026-01-14",
  },
},

"US-AL": {
  regionId: "US-AL",
  year: 2023,
  systemName: "Alabama individual income tax",
  brackets: [
    { from: 0, to: 500, rate: 0.02 },
    { from: 500, to: 3000, rate: 0.04 },
    { from: 3000, to: null, rate: 0.05 }
  ],
  standardDeduction: 3000,
  personalExemption: 1500,
  notes: [
    "Alabama uses a progressive income tax with very low bracket thresholds; most taxable income above $3,000 is taxed at 5% for single filers.",
    "Standard deduction amounts are income-based and subject to phase-out; this calculator applies the base standard deduction only.",
    "Personal exemption amounts vary by filing status; this calculator applies the single-filer exemption.",
    "Federal income tax paid may be deductible for Alabama purposes but is not modeled.",
    "Assumes a full-year Alabama resident and does not model nonresident or part-year proration."
  ],
  authority: {
    name: "Alabama Department of Revenue",
    url: "https://www.revenue.alabama.gov/tax-types/individual-income-tax/",
    lastVerified: "2026-01-14"
  }
},

"US-OK": {
  regionId: "US-OK",
  year: 2025,
  systemName: "Oklahoma state income tax",
  // Derived from 2025 Oklahoma Tax Commission tax tables for Single/MFS.
  // Oklahoma does not publish an explicit marginal bracket schedule.
  brackets: [
    { from: 0, to: 1000, rate: 0.0025 },
    { from: 1000, to: 2500, rate: 0.0075 },
    { from: 2500, to: 3750, rate: 0.0175 },
    { from: 3750, to: 4900, rate: 0.0275 },
    { from: 4900, to: 7200, rate: 0.0375 },
    { from: 7200, to: null, rate: 0.0475 },
  ],
  standardDeduction: 6350,
  personalExemption: 1000,
  notes: [
    "IMPORTANT: Oklahoma publishes tax tables, not a formal marginal bracket schedule, for tax year 2025.",
    "The marginal rates and thresholds shown here are a derived approximation based on the official 2025 Oklahoma Tax Commission tax tables and are used for estimation purposes only.",
    "This configuration applies only to Single or Married Filing Separately filers and does not apply the separate tables used for Head of Household, Married Filing Jointly, or qualifying widow(er).",
    "The Oklahoma standard deduction shown applies only if the taxpayer claimed the federal standard deduction and filed as Single or Married Filing Separately.",
    "Oklahoma allows a personal or dependent exemption of $1,000 per exemption, with additional exemptions potentially available for eligible blind or age-65-plus taxpayers, subject to income and filing-status rules in the official instructions.",
    "Credits, special adjustments, nonresident or part-year rules, and filing-status-specific variations are not modeled.",
  ],
  authority: {
    name: "Oklahoma Tax Commission",
    url: "https://oklahoma.gov/tax/individuals/income-tax.html",
    lastVerified: "2026-01-14",
  },
},
"US-HI": {
  regionId: "US-HI",
  year: 2025,
  systemName: "Hawaii state income tax (Single filer)",

  // Schedule I – Single
  brackets: [
    { from: 0, to: 9600, rate: 0.014 },
    { from: 9600, to: 14400, rate: 0.032 },
    { from: 14400, to: 19200, rate: 0.055 },
    { from: 19200, to: 24000, rate: 0.064 },
    { from: 24000, to: 36000, rate: 0.068 },
    { from: 36000, to: 48000, rate: 0.072 },
    { from: 48000, to: 125000, rate: 0.076 },
    { from: 125000, to: 175000, rate: 0.079 },
    { from: 175000, to: 225000, rate: 0.0825 },
    { from: 225000, to: 275000, rate: 0.09 },
    { from: 275000, to: 325000, rate: 0.10 },
    { from: 325000, to: null, rate: 0.11 },
  ],

  standardDeduction: 4400,
  personalExemption: 1144,

  notes: [
    "This calculator applies only to single filers under Hawaii Schedule I.",
    "Hawaii publishes separate rate schedules for other filing statuses, which are not modeled here.",
    "Official instructions require using the 2025 Hawaii Tax Table for taxable income under $100,000; this calculator applies the Schedule I marginal rates across all income levels for estimation only.",
    "The published personal exemption amount ($1,144) is applied without modeling detailed eligibility rules or potential limitations under Hawaii law.",
  ],

  authority: {
    name: "Hawaii Department of Taxation",
    url: "https://tax.hawaii.gov/forms/d_25table-on/",
    lastVerified: "2026-01-14",
  },
},

"US-KS": {
    regionId: "US-KS",
    year: 2025,
    systemName: "Kansas state individual income tax",
    brackets: [
      { from: 0, to: 23000, rate: 0.052 },
      { from: 23000, to: null, rate: 0.0558 },
    ],
    notes: [
      "This configuration estimates Kansas tax on Kansas taxable income using the two-bracket rate structure effective for tax year 2024 and all tax years thereafter.",
      "This calculator supports a single calculation model: 'all other individuals' (not married filing jointly). The married filing jointly threshold and base tax differ and are not supported in the calculation logic.",
      "Kansas taxable income is a state-specific figure defined under Kansas law. This configuration does not compute Kansas taxable income from federal AGI, Kansas modifications, deductions, or exemptions.",
    ],
    authority: {
      name: "Kansas Department of Revenue",
      url: "https://www.ksrevenue.gov/taxnotices/notice24-08.pdf",
      lastVerified: "2026-01-14",
    },
  },

  "US-ID": {
  regionId: "US-ID",
  year: 2025,
  systemName: "Idaho state individual income tax",
  brackets: [
    { from: 0, to: 4811, rate: 0.0 },
    { from: 4811, to: null, rate: 0.053 },
  ],
  notes: [
    "This configuration estimates Idaho tax on Idaho taxable income using the flat-rate worksheet structure applicable for tax year 2025.",
    "This calculator supports a single calculation model: Single and Married Filing Separately. Idaho uses a different threshold for Married Filing Jointly, Head of Household, and Qualifying Surviving Spouse, which are not supported in the calculation logic.",
    "Idaho taxable income is a state-specific figure reported on Idaho Form 40, line 19. This configuration does not compute Idaho taxable income from federal adjusted gross income, Idaho additions or subtractions, deductions, or credits.",
  ],
  authority: {
    name: "Idaho State Tax Commission",
    url: "https://tax.idaho.gov/wp-content/uploads/forms/EIN00046/EIN00046_09-29-2025.pdf",
    lastVerified: "2025-01-14",
  },
},

"US-KY": {
        regionId: "US-KY",
        year: 2024,
        systemName: "Kentucky state income tax",
        brackets: [
            { from: 0, to: null, rate: 0.04 }
        ],
        standardDeduction: 3160,
        
        notes: ["Kentucky does not allow a personal exemption. Instead, it provides fixed personal tax credits such as age, blindness, and other specified credits reported on Schedule ITC."],
        authority: {
          name: "Kentucky Department of Revenue",
          url: "https://revenue.ky.gov/Individual/Individual-Income-Tax/Pages/default.aspx",
          lastVerified: "2026-01-21",
        },
      },

      "US-IA": {
        regionId: "US-IA",
        year: 2024,
        systemName: "Iowa state income tax",
        brackets: [
            { from: 0, to: 6210, rate: 0.044 },
      { from: 6210, to: 31050, rate: 0.0482 },
      { from: 31050, to: null, rate: 0.057 }
        ],
        
        personalExemption: 0,
        notes: ["For tax year 2024, Iowa instructs taxpayers to enter the standard deduction or itemized deductions from federal Form 1040, line 12 (referenced as line 12e in Iowa expanded instructions). For certain Iowa computations, the deduction amount from IA 1040 line 1d is capped at the amount included in IA 1040 line 2. Iowa does not allow a personal exemption deduction for tax year 2024; the federal personal exemption amount is $0. Iowa provides exemption credits (e.g., personal/dependent/age/blind credits) which are credits against tax and are not represented by this personalExemption field. Iowa has a separate 2024 bracket schedule for married filing jointly (thresholds 0..12420..62100) which is not included in this single-bracket-list configuration."],
        authority: {
          name: "Iowa Department of Revenue",
          url: "https://revenue.iowa.gov",
          lastVerified: "2026-01-21",
        },
      },

      "US-ME": {
  regionId: "US-ME",
  year: 2024,
  systemName: "Maine state income tax",
  brackets: [
    { from: 0, to: 26050, rate: 0.058 },
    { from: 26050, to: 61600, rate: 0.0675 },
    { from: 61600, to: null, rate: 0.0715 }
  ],
  standardDeduction: 14600,
  personalExemption: 5000,
  notes: [
    "Scope: Tax year 2024 only.",
    "Scope: ONLY Tax Rate Schedule #1 (Single and Married Filing Separately).",
    "Head of Household and Married Filing Jointly / Qualifying Surviving Spouse schedules are not included.",
    "Standard deduction and personal exemption amounts shown apply only to Single / Married Filing Separately filers.",
    "Maine personal exemption is an income deduction of 5000 per exemption and may be reduced by phaseout at higher Maine adjusted gross income levels, which is not applied in this simplified estimate."
  ],
  authority: {
    name: "Maine Revenue Services",
    url: "https://www.maine.gov/revenue",
    lastVerified: "2026-01-21"
  }
},

"US-DE": {
  regionId: "US-DE",
  year: 2024,
  systemName: "Delaware state income tax",
  brackets: [
    { from: 60000, to: null, rate: 0.066 }
  ],
  notes: [
    "Taxable income below 60000 is calculated using an official Delaware state tax table rather than a formula-based bracket schedule. For taxable income of 60000 or more, Delaware applies a base tax of 2943.50 USD plus 6.60 percent of the amount over 60000. Filing status affects deductions and adjustments but does not change tax rate thresholds. Personal exemptions are implemented as credits in Delaware, but the exact credit amount for Tax Year 2024 is not explicitly stated in individual return instructions."
  ],
  authority: {
    name: "Delaware Division of Revenue, Department of Finance",
    url: "https://revenue.delaware.gov",
    lastVerified: "2026-01-21"
  }
},

"US-MS": {
        regionId: "US-MS",
        year: 2025,
        systemName: "Mississippi state income tax",
        brackets: [
            { from: 0, to: 10000, rate: 0 },
      { from: 10000, to: null, rate: 0.044 }
        ],
        
        
        notes: ["Mississippi Department of Revenue states that for Tax Year 2025 taxable income is taxed at 0 percent on the first 10000 and at 4.4 percent on all taxable income in excess of 10000. No tax table is used. Standard deduction and exemption amounts vary by filing status but are not specified in accessible official sources and are therefore not included."],
        authority: {
          name: "Mississippi Department of Revenue",
          url: "https://www.dor.ms.gov",
          lastVerified: "2026-01-21",
        },
      },

      "US-OH": {
  regionId: "US-OH",
  year: 2024,
  systemName: "Ohio state income tax",
  brackets: [
    {
      from: 0,
      to: 26050,
      rate: 0,
    },
    {
      from: 26051,
      to: 100000,
      rate: 0.0275,
    },
    {
      from: 100001,
      to: null,
      rate: 0.035,
    },
  ],
  notes: [
    "Brackets apply to Ohio taxable nonbusiness income.",
    "Ohio’s official tax tables calculate tax using base tax amounts plus a marginal rate above each bracket threshold.",
    "This configuration provides the official bracket thresholds and marginal rates for tax year 2024.",
    "The full Ohio tax computation includes base tax amounts that are not represented directly in this bracket structure.",
    "Taxable business income above the business income deduction is taxed separately at a flat 3% rate."
  ],
  authority: {
    name: "Ohio Department of Taxation",
    url: "https://tax.ohio.gov/individual/file-now/annual-tax-rates",
    lastVerified: "2026-01-21",
  },
},

"US-AR": {
  regionId: "US-AR",
  year: 2024,
  systemName: "Arkansas state income tax",
  brackets: [
    { from: 0, to: 5499, rate: 0.0 },
    { from: 5500, to: 10899, rate: 0.02 },
    { from: 10900, to: 15599, rate: 0.03 },
    { from: 15600, to: 25699, rate: 0.034 },
    { from: 25700, to: 92300, rate: 0.039 },
    { from: 92301, to: null, rate: 0.039 }
  ],
  notes: [
    "Arkansas publishes indexed income tax tables with percentage rates and adjustment constants calculated at the midpoint of each income range. This calculator groups the published indexed ranges into a simplified marginal structure for estimation purposes and may not exactly match Arkansas DFA tax table calculations."
  ],
  authority: {
    name: "Arkansas Department of Finance and Administration",
    url: "https://www.dfa.arkansas.gov/office/taxes/income-tax-administration/individual-income-tax/forms/",
    lastVerified: "2026-01-21"
  }
},

"US-MT": {
  regionId: "US-MT",
  year: 2024,
  systemName: "Montana individual income tax",
  brackets: [
    { from: 0, to: 20500, rate: 0.047 },
    { from: 20500, to: null, rate: 0.059 }
  ],
  notes: [
    "Montana applies two marginal tax rates to ordinary income in Tax Year 2024. The income thresholds shown here correspond to the bracket group used for single filers, married filing separately, estates, trusts, and PTE composite tax filers. Other filing statuses use higher thresholds under Montana law.",
    "Montana-specific standard deductions and personal exemptions were repealed effective Tax Year 2024 under Senate Bill 399.",
    "This calculator models ordinary income tax only and does not include Montana’s separate net long-term capital gains tax schedule."
  ],
  authority: {
    name: "Montana Department of Revenue",
    url: "https://mtrevenue.gov",
    lastVerified: "2026-01-21"
  }
},

"US-NE": {
  regionId: "US-NE",
  year: 2024,
  systemName: "Nebraska Individual Income Tax",
  brackets: [
    { from: 0, to: 3900, rate: 0.0246 },
    { from: 3900, to: 23370, rate: 0.0351 },
    { from: 23370, to: 37670, rate: 0.0501 },
    { from: 37670, to: null, rate: 0.0584 }
  ],
  standardDeduction: 8350,
  notes: [
    "This entry applies the 2024 Nebraska Tax Calculation Schedule values for Single and Married Filing Separately taxpayers.",
    "The bracket thresholds and rates used here correspond to those shown in the published 2024 Nebraska Tax Calculation Schedule.",
    "The standard deduction amount of 8,350 applies only to Single and Married Filing Separately for tax year 2024.",
    "Nebraska provides a personal exemption credit on Form 1040N; tax credits are not included in this calculation."
  ],
  authority: {
    name: "Nebraska Department of Revenue",
    url: "https://revenue.nebraska.gov",
    lastVerified: "2026-01-21"
  }
},


  // fler regioner sen
};

export function getIncomeTaxConfig(
  regionId: RegionId
): IncomeTaxConfig | undefined {
  return incomeTaxConfigs[regionId];
}
