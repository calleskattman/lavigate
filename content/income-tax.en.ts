// content/income-tax.en.ts

// Typdefinitioner för SEO-content per region
export type IncomeTaxSeoSections = {
  howItWorks: string;
  examples: string;
  limitations: string;
};

export type IncomeTaxSeoFaqItem = {
  q: string;
  a: string;
};

export type IncomeTaxSeoMeta = {
  title: string;
  description: string;
  canonicalPath: string; // t.ex. "/tools/income-tax/texas"
};

export type IncomeTaxSeoEntry = {
  h1: string;
  intro: string;
  sections: IncomeTaxSeoSections;
  faq: IncomeTaxSeoFaqItem[];
  meta: IncomeTaxSeoMeta;
};

// Ny, enkel struktur: key = Region.id (t.ex. "US-TX")
export const incomeTaxSeoContent: Record<string, IncomeTaxSeoEntry> = {
  "US-TX": {
    h1: "Texas income tax calculator 2025",
    intro:
      "Texas has no state income tax. Use this calculator to understand your estimated tax liability based solely on federal tax brackets and how that affects your net income.",
    sections: {
      howItWorks:
        "This calculator assumes a 0% state income tax rate for Texas. When you enter your annual taxable income, the tool estimates your state tax as $0 and focuses on showing how your effective tax rate would look if only federal rules apply. In reality, your total tax bill will also include federal income tax, Social Security and Medicare, plus any local taxes that may apply.",
      examples:
        "Example: If you earn $60,000 in Texas in 2025, the estimated state income tax is $0 because Texas does not levy a state income tax. Your effective tax rate will instead be driven by federal brackets and payroll taxes. This simplified example helps you understand the impact of living in a state without an additional income tax layer.",
      limitations:
        "This calculator focuses only on the state-level income tax in Texas, which is set to 0%. It does not include federal taxes, local surcharges, deductions, credits or special situations such as self-employment tax. Always verify the latest rules with the IRS or an official tax professional before making financial decisions.",
    },
    faq: [
      {
        q: "Does Texas have state income tax?",
        a: "No. Texas is one of a few US states that do not levy a state income tax on individual income. Residents still pay federal income tax and payroll taxes.",
      },
      {
        q: "What taxes do I pay in Texas?",
        a: "You pay federal income tax, Social Security and Medicare taxes, and various local taxes such as sales and property tax. There is no additional state income tax layer on your salary.",
      },
    ],
    meta: {
      title: "Texas income tax calculator 2025 – estimate your state taxes",
      description:
        "Use this Texas income tax calculator to understand how a 0% state income tax affects your estimated tax burden and net income in 2025.",
      canonicalPath: "/tools/income-tax/texas",
    },
  },

  // Exempel för California (kan justeras senare eller tas bort ur supportedRegionIds)
  "US-CA": {
    h1: "California income tax calculator 2025",
    intro:
      "Use this California income tax calculator to estimate your state income tax burden for 2025 based on progressive tax brackets.",
    sections: {
      howItWorks:
        "This calculator applies a simplified version of the California state income tax brackets for 2025. When you enter your annual taxable income, the tool distributes that income across the configured brackets and calculates the estimated state tax. The result is an approximate state tax and an effective tax rate for California only.",
      examples:
        "Example: If you earn $60,000 in California in 2025, part of your income is taxed in lower brackets and the rest in higher brackets. The calculator sums the tax from each bracket to estimate your total state income tax and effective rate. This example is simplified and may not match your exact filing situation.",
      limitations:
        "This tool does not include federal income tax, local surcharges, deductions, credits, filing status, or special situations such as self-employment tax. The brackets used here are simplified and may not reflect every detail of the official rules. Always double-check with the California Franchise Tax Board or a tax professional.",
    },
    faq: [
      {
        q: "Does California have progressive income tax?",
        a: "Yes. California uses a progressive state income tax system with multiple brackets. Higher portions of your income are taxed at higher rates.",
      },
      {
        q: "Are deductions and credits included in this calculator?",
        a: "No. This calculator is simplified and does not include itemized deductions, credits, or different filing statuses. It is meant for rough estimates only.",
      },
    ],
    meta: {
      title: "California income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your 2025 California state income tax with this simplified calculator using progressive tax brackets.",
      canonicalPath: "/tools/income-tax/california",
    },
  },
};
