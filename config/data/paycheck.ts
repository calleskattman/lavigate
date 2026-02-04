import type { RegionId } from "../regions";

/* ======================================================
   SHARED TYPES
====================================================== */

export type TaxBracket = {
  from: number;
  to: number | null;
  rate: number;
};

export type FilingStatus = "single" | "married";

/* ======================================================
   FEDERAL CONFIG
====================================================== */

export type FederalTaxConfig = {
  brackets: Record<FilingStatus, TaxBracket[]>;
  standardDeduction: Record<FilingStatus, number>;
};

/* ======================================================
   INCOME TAX CONFIG
====================================================== */

export type IncomeTaxConfig = {
  level: "state" | "city";
  brackets: Record<FilingStatus, TaxBracket[]>;
};



/* ======================================================
   FICA CONFIG
====================================================== */

export type FicaConfig = {
  socialSecurity: {
    rate: number;
    wageBaseLimit: number;
  };
  medicare: {
    rate: number;
    additionalRate: number;
    additionalThreshold: Record<FilingStatus, number>;
  };
};

/* ======================================================
   PAYCHECK CONFIG (ROOT)
====================================================== */

export type PaycheckConfig = {
  regionId: RegionId;
  year: number;

  federal: FederalTaxConfig;
  incomeTaxes: IncomeTaxConfig[];
  fica: FicaConfig;
};


/* ======================================================
   FEDERAL BASELINE (USED BY ALL STATES)
====================================================== */

const federalTaxConfig: FederalTaxConfig = {
  brackets: {
    single: [
      { from: 0, to: 12400, rate: 0.10 },
      { from: 12400, to: 50400, rate: 0.12 },
      { from: 50400, to: 105700, rate: 0.22 },
      { from: 105700, to: 201775, rate: 0.24 },
      { from: 201775, to: 256225, rate: 0.32 },
      { from: 256225, to: 640600, rate: 0.35 },
      { from: 640600, to: null, rate: 0.37 },
    ],
    married: [
      { from: 0, to: 24800, rate: 0.10 },
      { from: 24800, to: 100800, rate: 0.12 },
      { from: 100800, to: 211400, rate: 0.22 },
      { from: 211400, to: 403550, rate: 0.24 },
      { from: 403550, to: 512450, rate: 0.32 },
      { from: 512450, to: 768700, rate: 0.35 },
      { from: 768700, to: null, rate: 0.37 },
    ],
  },
  standardDeduction: {
    single: 16100,
    married: 32200,
  },
};

/* ======================================================
   FICA BASELINE
====================================================== */

const ficaConfig: FicaConfig = {
  socialSecurity: {
    rate: 0.062,
    wageBaseLimit: 184500,
  },
  medicare: {
    rate: 0.0145,
    additionalRate: 0.009,
    additionalThreshold: {
      single: 200000,
      married: 250000,
    },
  },
};

/* ======================================================
   STATE CONFIGS
====================================================== */

export const paycheckConfigs: Record<RegionId, PaycheckConfig> = {
"US-TX": {
  regionId: "US-TX",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0 }],
        married: [{ from: 0, to: null, rate: 0 }],
      },
    },
  ],

  fica: ficaConfig,
},


"US-FL": {
  regionId: "US-FL",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0 }],
        married: [{ from: 0, to: null, rate: 0 }],
      },
    },
  ],

  fica: ficaConfig,
},


"US-IL": {
  regionId: "US-IL",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.0495 }],
        married: [{ from: 0, to: null, rate: 0.0495 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-GA": {
  regionId: "US-GA",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.0519 }],
        married: [{ from: 0, to: null, rate: 0.0519 }],
      },
    },
  ],

  fica: ficaConfig,
},

// config/data/paycheck.ts
"US-CO": {
  regionId: "US-CO",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.044 }],
        married: [{ from: 0, to: null, rate: 0.044 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-TN": {
  regionId: "US-TN",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0 }],
        married: [{ from: 0, to: null, rate: 0 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-VA": {
  regionId: "US-VA",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [
          { from: 0, to: 3000, rate: 0.02 },
          { from: 3001, to: 5000, rate: 0.03 },
          { from: 5001, to: 17000, rate: 0.05 },
          { from: 17001, to: null, rate: 0.0575 },
        ],
        married: [
          { from: 0, to: 3000, rate: 0.02 },
          { from: 3001, to: 5000, rate: 0.03 },
          { from: 5001, to: 17000, rate: 0.05 },
          { from: 17001, to: null, rate: 0.0575 },
        ],
      },
    },
  ],

  fica: ficaConfig,
},

"US-NV": {
  regionId: "US-NV",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0 }],
        married: [{ from: 0, to: null, rate: 0 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-UT": {
  regionId: "US-UT",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [],
        married: [],
      },
    },
  ],

  fica: ficaConfig,
},

"US-WA": {
  regionId: "US-WA",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0 }],
        married: [{ from: 0, to: null, rate: 0 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-MI": {
  regionId: "US-MI",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.0425 }],
        married: [{ from: 0, to: null, rate: 0.0425 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-IN": {
  regionId: "US-IN",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.0295 }],
        married: [{ from: 0, to: null, rate: 0.0295 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-KY": {
  regionId: "US-KY",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.035 }],
        married: [{ from: 0, to: null, rate: 0.035 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-LA": {
  regionId: "US-LA",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.0309 }],
        married: [{ from: 0, to: null, rate: 0.0309 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-MN": {
  regionId: "US-MN",
  year: 2026,

  federal: federalTaxConfig,

  // Estimate-mode state withholding:
  // Minnesota's official withholding is progressive and table/formula-based.
  // We use a single blended rate to produce directionally reasonable estimates.
  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.0625 }],
        married: [{ from: 0, to: null, rate: 0.0625 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-NY": {
  regionId: "US-NY",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [
          { from: 0, to: null, rate: 0.058 }
        ],
        married: [
          { from: 0, to: null, rate: 0.058 }
        ],
      },
    },
  ],

  fica: ficaConfig,
},

"US-AL": {
  regionId: "US-AL",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.05 }],
        married: [{ from: 0, to: null, rate: 0.05 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-MO": {
  regionId: "US-MO",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.047 }],
        married: [{ from: 0, to: null, rate: 0.047 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-AZ": {
  regionId: "US-AZ",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.02 }],
        married: [{ from: 0, to: null, rate: 0.02 }],
      },
    },
  ],

  fica: ficaConfig,
},

"US-WI": {
  regionId: "US-WI",
  year: 2026,

  federal: federalTaxConfig,

  incomeTaxes: [
    {
      level: "state",
      brackets: {
        single: [{ from: 0, to: null, rate: 0.053 }],
        married: [{ from: 0, to: null, rate: 0.053 }],
      },
    },
  ],

  fica: ficaConfig,
},



};

/* ======================================================
   SAFE ACCESS HELPER (MANDATORY)
====================================================== */

export function getPaycheckConfig(
  regionId: RegionId
): PaycheckConfig | undefined {
  return paycheckConfigs[regionId];
}
