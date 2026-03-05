export type LoanType =
  | "conventional"
  | "va"
  | "fha"
  | "usda"
  | "custom"
  | "cashout-refinance"
  | "affordability";


export type MortgageFeatureFlags = {
  enableARM?: boolean;
  enableInterestOnly?: boolean;
  enableExtraPayments?: boolean;
  enableBalloon?: boolean;
  enableRefinance?: boolean;
  enableAffordability?: boolean;
  enableBiweekly?: boolean;
  enablePoints?: boolean;
  enableEquity?: boolean;
  enableClosingCosts?: boolean;
  enableOffset?: boolean;
};

export type MortgageDefaults = {
  defaultPrincipal?: number;
  defaultRate?: number;
  defaultTermYears?: number;

  // V2-related defaults
  defaultInterestOnlyMonths?: number;
  defaultARMIntroYears?: number;
  defaultARMIntroRate?: number;
  defaultARMResetRate?: number;
  defaultBalloonMonth?: number;
  defaultOffsetBalance?: number;
};

export type MortgageConfig = {
  pageSlug: string;
  systemName: string;
  loanType?: LoanType;
  defaults?: MortgageDefaults;
  features?: MortgageFeatureFlags;

  engineVersion?: "v1" | "v2" | "affordability";

  // V2 ARM helper
  rateScheduleTemplate?: {
    introYears?: number;
    introRate?: number;
    resetRate?: number;
  };
};

export const mortgageData: Record<string, MortgageConfig> = {
  "va-mortgage-calculator": {
  pageSlug: "va-mortgage-calculator",
  systemName: "VA Mortgage Calculator",
  loanType: "va",
  features: {
    enableARM: false,
    enableInterestOnly: false,
    enableExtraPayments: true,
    enableBalloon: false,
    enableRefinance: true,
    enableAffordability: false,
    enableBiweekly: true,
    enablePoints: false,
    enableEquity: false,
    enableClosingCosts: false
  }
},

  "fha-mortgage-calculator": {
  pageSlug: "fha-mortgage-calculator",
  systemName: "FHA Mortgage Calculator",
  loanType: "fha",
  features: {
    enableARM: false,
    enableInterestOnly: false,
    enableExtraPayments: true,
    enableBalloon: false,
    enableRefinance: true,
    enableAffordability: false,
    enableBiweekly: true,
    enablePoints: false,
    enableEquity: false,
    enableClosingCosts: false
  }
},

  "usda-mortgage-calculator": {
  pageSlug: "usda-mortgage-calculator",
  systemName: "USDA Mortgage Calculator",
  loanType: "usda",
  features: {
    enableARM: false,
    enableInterestOnly: false,
    enableExtraPayments: true,
    enableBalloon: false,
    enableRefinance: true,
    enableAffordability: false,
    enableBiweekly: true,
    enablePoints: false,
    enableEquity: false,
    enableClosingCosts: false
  }
},

"100k-mortgage-payment": {
  pageSlug: "100k-mortgage-payment",
  systemName: "$100K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 100000
  },
  features: {
    enableExtraPayments: true
  }
},

"150k-mortgage-payment": {
  pageSlug: "150k-mortgage-payment",
  systemName: "$150K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 150000
  },
  features: {
    enableExtraPayments: true
  }
},

"170k-mortgage-payment": {
  pageSlug: "170k-mortgage-payment",
  systemName: "$170K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 170000
  },
  features: {
    enableExtraPayments: true
  }
},

"200k-mortgage-payment": {
  pageSlug: "200k-mortgage-payment",
  systemName: "$200K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 200000
  },
  features: {
    enableExtraPayments: true
  }
},

"250k-mortgage-payment": {
  pageSlug: "250k-mortgage-payment",
  systemName: "$250K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 250000
  },
  features: {
    enableExtraPayments: true
  }
},

"275k-mortgage-payment": {
  pageSlug: "275k-mortgage-payment",
  systemName: "$275K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 275000
  },
  features: {
    enableExtraPayments: true
  }
},

  "300k-mortgage-payment": {
  pageSlug: "300k-mortgage-payment",
  systemName: "$300K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 300000
  },
  features: {
    enableExtraPayments: true
  }
},

"350k-mortgage-payment": {
  pageSlug: "350k-mortgage-payment",
  systemName: "$350K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 350000
  },
  features: {
    enableExtraPayments: true
  }
},

"400k-mortgage-payment": {
  pageSlug: "400k-mortgage-payment",
  systemName: "$400K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 400000
  },
  features: {
    enableExtraPayments: true
  }
},

"450k-mortgage-payment": {
  pageSlug: "450k-mortgage-payment",
  systemName: "$450K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 450000
  },
  features: {
    enableExtraPayments: true
  }
},

  "500k-mortgage-payment": {
  pageSlug: "500k-mortgage-payment",
  systemName: "$500K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 500000
  },
  features: {
    enableExtraPayments: true
  }
},

"600k-mortgage-payment": {
  pageSlug: "600k-mortgage-payment",
  systemName: "$600K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 600000
  },
  features: {
    enableExtraPayments: true
  }
},

"700k-mortgage-payment": {
  pageSlug: "700k-mortgage-payment",
  systemName: "$700K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 700000
  },
  features: {
    enableExtraPayments: true
  }
},

"750k-mortgage-payment": {
  pageSlug: "750k-mortgage-payment",
  systemName: "$750K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 750000
  },
  features: {
    enableExtraPayments: true
  }
},

"900k-mortgage-payment": {
  pageSlug: "900k-mortgage-payment",
  systemName: "$900K Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 900000
  },
  features: {
    enableExtraPayments: true
  }
},

"1-million-mortgage-payment": {
  pageSlug: "1-million-mortgage-payment",
  systemName: "$1 Million Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 1000000
  },
  features: {
    enableExtraPayments: true
  }
},

"2-million-mortgage-payment": {
  pageSlug: "2-million-mortgage-payment",
  systemName: "$2 Million Mortgage Payment",
  loanType: "conventional",
  defaults: {
    defaultPrincipal: 2000000
  },
  features: {
    enableExtraPayments: true
  }
},

"va-refinance-calculator": {
  pageSlug: "va-refinance-calculator",
  systemName: "VA Refinance Calculator",
  loanType: "va",
  features: {
    enableRefinance: true,
    enableExtraPayments: true
  }
},

"alabama-mortgage-calculator": {
  pageSlug: "alabama-mortgage-calculator",
  systemName: "Alabama Mortgage Calculator",
  loanType: "conventional",
  features: {
    enableExtraPayments: true
  }
},

"alaska-mortgage-calculator": {
  pageSlug: "alaska-mortgage-calculator",
  systemName: "Alaska Mortgage Calculator",
  loanType: "conventional"
},

"arkansas-mortgage-calculator": {
  pageSlug: "arkansas-mortgage-calculator",
  systemName: "Arkansas Mortgage Calculator",
  loanType: "conventional"
},

"delaware-mortgage-calculator": {
  pageSlug: "delaware-mortgage-calculator",
  systemName: "Delaware Mortgage Calculator",
  loanType: "conventional"
},

"hawaii-mortgage-calculator": {
  pageSlug: "hawaii-mortgage-calculator",
  systemName: "Hawaii Mortgage Calculator",
  loanType: "conventional"
},

"idaho-mortgage-calculator": {
  pageSlug: "idaho-mortgage-calculator",
  systemName: "Idaho Mortgage Calculator",
  loanType: "conventional"
},

"kansas-mortgage-calculator": {
  pageSlug: "kansas-mortgage-calculator",
  systemName: "Kansas Mortgage Calculator",
  loanType: "conventional"
},

"maine-mortgage-calculator": {
  pageSlug: "maine-mortgage-calculator",
  systemName: "Maine Mortgage Calculator",
  loanType: "conventional"
},

"maryland-mortgage-calculator": {
  pageSlug: "maryland-mortgage-calculator",
  systemName: "Maryland Mortgage Calculator",
  loanType: "conventional"
},

"mississippi-mortgage-calculator": {
  pageSlug: "mississippi-mortgage-calculator",
  systemName: "Mississippi Mortgage Calculator",
  loanType: "conventional"
},

"montana-mortgage-calculator": {
  pageSlug: "montana-mortgage-calculator",
  systemName: "Montana Mortgage Calculator",
  loanType: "conventional"
},

"nebraska-mortgage-calculator": {
  pageSlug: "nebraska-mortgage-calculator",
  systemName: "Nebraska Mortgage Calculator",
  loanType: "conventional"
},

"nevada-mortgage-calculator": {
  pageSlug: "nevada-mortgage-calculator",
  systemName: "Nevada Mortgage Calculator",
  loanType: "conventional"
},

"new-mexico-mortgage-calculator": {
  pageSlug: "new-mexico-mortgage-calculator",
  systemName: "New Mexico Mortgage Calculator",
  loanType: "conventional"
},

"oklahoma-mortgage-calculator": {
  pageSlug: "oklahoma-mortgage-calculator",
  systemName: "Oklahoma Mortgage Calculator",
  loanType: "conventional"
},

"south-dakota-mortgage-calculator": {
  pageSlug: "south-dakota-mortgage-calculator",
  systemName: "South Dakota Mortgage Calculator",
  loanType: "conventional"
},

"utah-mortgage-calculator": {
  pageSlug: "utah-mortgage-calculator",
  systemName: "Utah Mortgage Calculator",
  loanType: "conventional"
},

"virginia-mortgage-calculator": {
  pageSlug: "virginia-mortgage-calculator",
  systemName: "Virginia Mortgage Calculator",
  loanType: "conventional"
},

"wyoming-mortgage-calculator": {
  pageSlug: "wyoming-mortgage-calculator",
  systemName: "Wyoming Mortgage Calculator",
  loanType: "conventional"
},

"west-virginia-mortgage-calculator": {
  pageSlug: "west-virginia-mortgage-calculator",
  systemName: "West Virginia Mortgage Calculator",
  loanType: "conventional"
},

"mortgage-payoff-calculator": {
  pageSlug: "mortgage-payoff-calculator",
  systemName: "Mortgage Payoff Calculator",
  loanType: "conventional"
},

"pay-off-mortgage-early-calculator": {
  pageSlug: "pay-off-mortgage-early-calculator",
  systemName: "Pay Off Mortgage Early Calculator",
  loanType: "conventional",
  features: {
    enableExtraPayments: true,
    enableBiweekly: true
  }
},

"interest-only-mortgage-calculator": {
  pageSlug: "interest-only-mortgage-calculator",
  systemName: "Interest Only Mortgage Calculator",
  loanType: "custom",
  features: {
    enableInterestOnly: true
  },
  engineVersion: "v2"
},

"biweekly-mortgage-calculator": {
  pageSlug: "biweekly-mortgage-calculator",
  systemName: "Biweekly Mortgage Calculator",
  loanType: "custom",
  features: {
    enableBiweekly: true
  },
  engineVersion: "v2"
},

"balloon-mortgage-calculator": {
  pageSlug: "balloon-mortgage-calculator",
  systemName: "Balloon Mortgage Calculator",
  loanType: "custom",
  features: {
    enableBalloon: true
  },
  engineVersion: "v2"
},

"mortgage-offset-calculator": {
  pageSlug: "mortgage-offset-calculator",
  systemName: "Mortgage Offset Calculator",
  loanType: "custom",
  features: {
    enableOffset: true
  },
  engineVersion: "v2"
},

"cash-out-refinance-calculator": {
  pageSlug: "cash-out-refinance-calculator",
  systemName: "Cash-Out Refinance Calculator",
  loanType: "cashout-refinance",
  engineVersion: "v2"
},

"mortgage-affordability-calculator": {
  pageSlug: "mortgage-affordability-calculator",
  systemName: "Mortgage Affordability Calculator",
  loanType: "affordability",
  engineVersion: "affordability"
},

"mortgage-amortization-schedule-calculator": {
  pageSlug: "mortgage-amortization-schedule-calculator",
  systemName: "Mortgage Amortization Schedule Calculator",
  loanType: "conventional",
  engineVersion: "v2",
  features: {
    enableExtraPayments: false
  }
},

"arm-mortgage-calculator": {
  pageSlug: "arm-mortgage-calculator",
  systemName: "ARM Mortgage Calculator",
  loanType: "conventional",
  engineVersion: "v2",
  features: {
    enableARM: true
  }
},





};
