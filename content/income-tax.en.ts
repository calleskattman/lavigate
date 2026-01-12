// content/income-tax.en.ts

import type { RegionId } from "@/config/regions";

/* =========================
   Typdefinitioner
   ========================= */

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
  canonicalPath: string;
};

export type IncomeTaxSeoEntry = {
  h1: string;
  intro: string;
  sections: IncomeTaxSeoSections;
  faq: IncomeTaxSeoFaqItem[];
  meta: IncomeTaxSeoMeta;
};

/* =========================
   SEO-content per region
   ========================= */

export const incomeTaxSeoContent: Record<RegionId, IncomeTaxSeoEntry> = {
  /* ---------- Texas ---------- */
  "US-TX": {
    h1: "Texas income tax calculator 2025",
    intro:
      "Texas has no state income tax. Use this Texas income tax calculator to understand how the absence of state income tax affects your estimated after-tax income.",
    sections: {
      howItWorks:
        "Texas does not levy a state income tax on individual income. This calculator therefore applies a 0 percent state income tax rate to your taxable income. The result shows that no Texas state income tax is due, regardless of income level.",
      examples:
        "Example: If you earn $60,000 in Texas in 2025, your estimated Texas state income tax is $0 because Texas does not impose a state income tax.",
      limitations:
        "This calculator reflects Texas state income tax rules only. It does not include federal income tax, payroll taxes, deductions, credits, or local taxes.\n\nOfficial tax information is published by the Texas Comptroller of Public Accounts (https://comptroller.texas.gov).",
    },
    faq: [
      {
        q: "Does Texas have a state income tax?",
        a: "No. Texas does not levy a state income tax on individual income.",
      },
      {
        q: "Do Texas residents still pay federal income tax?",
        a: "Yes. Texas residents are subject to federal income tax and payroll taxes.",
      },
    ],
    meta: {
      title: "Texas income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your Texas state income tax for 2025. Texas has no state income tax, and this calculator shows how that affects your after-tax income.",
      canonicalPath: "/tools/income-tax/texas",
    },
  },

  /* ---------- California ---------- */
  "US-CA": {
    h1: "California income tax calculator 2025",
    intro:
      "Use this California income tax calculator to estimate your state income tax for 2025 based on progressive California income tax brackets.",
    sections: {
      howItWorks:
        "California uses a progressive state income tax system with multiple tax brackets. This calculator applies simplified California income tax brackets to your taxable income to estimate your total state income tax.",
      examples:
        "Example: If you earn $60,000 in California in 2025, your income is taxed progressively across several brackets. Only the portion of income within each bracket is taxed at that bracket’s rate.",
      limitations:
        "This calculator provides a simplified estimate of California state income tax. It does not include federal tax, local taxes, filing status rules, deductions, or credits.\n\nOfficial California income tax rules are published by the California Franchise Tax Board (https://www.ftb.ca.gov).",
    },
    faq: [
      {
        q: "Does California use progressive income tax?",
        a: "Yes. California applies progressive income tax brackets with increasing rates at higher income levels.",
      },
      {
        q: "Are deductions included in this calculator?",
        a: "No. This calculator provides a simplified estimate and does not include deductions or credits.",
      },
    ],
    meta: {
      title: "California income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your California state income tax for 2025 using simplified progressive tax brackets.",
      canonicalPath: "/tools/income-tax/california",
    },
  },

  /* ---------- Virginia ---------- */
  "US-VA": {
    h1: "Virginia income tax calculator 2025",
    intro:
      "Use this Virginia income tax calculator to estimate your state income tax for 2025. Enter your Virginia taxable income and see how Virginia income tax brackets apply to your income.",
    sections: {
      howItWorks:
        "Virginia uses a progressive state income tax system with four tax brackets. This calculator applies the Virginia income tax brackets to your taxable income and adds the tax from each bracket to estimate your total Virginia state income tax.\n\nVirginia applies the same income tax brackets to all individual filers. Differences in tax liability usually come from how taxable income is calculated, including exemptions and deductions applied before the tax rates.",
      examples:
        "Example 1: With $30,000 in Virginia taxable income, the lower brackets apply to the first portions of income, while higher rates apply only to income above each threshold.\n\nExample 2: Increasing taxable income from $60,000 to $70,000 does not re-tax all income at the highest rate. Only the income above the top threshold is taxed at the highest rate.",
      limitations:
        "This calculator provides a simplified estimate of Virginia state income tax. It does not include federal tax, local taxes, itemized deductions, credits, or special circumstances.\n\nOfficial Virginia income tax rules are published by the Virginia Department of Taxation (https://www.tax.virginia.gov).",
    },
    faq: [
      {
        q: "Does Virginia have a state income tax?",
        a: "Yes. Virginia levies a state income tax using a progressive bracket structure.",
      },
      {
        q: "Are Virginia income tax brackets the same for all filers?",
        a: "Yes. Virginia applies the same brackets and rates regardless of filing status.",
      },
      {
        q: "Does Virginia allow personal exemptions?",
        a: "Yes. Virginia allows personal exemptions that reduce taxable income, subject to eligibility rules.",
      },
    ],
    meta: {
      title: "Virginia income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your Virginia state income tax for 2025. Calculate income tax brackets and after-tax income.",
      canonicalPath: "/tools/income-tax/virginia",
    },
  },

  /* ---------- Michigan ---------- */
  "US-MI": {
    h1: "Michigan income tax calculator 2025",
    intro:
      "Use this Michigan income tax calculator to estimate your Michigan state income tax for the 2025 tax year. Michigan applies a flat income tax rate to taxable income and allows a personal exemption per qualifying filer or dependent.",
    sections: {
      howItWorks:
        "This Michigan income tax calculator estimates Michigan state income tax using the current flat tax rate for the 2025 tax year. Michigan uses a flat state income tax system. For tax year 2025, the Michigan individual income tax rate is 4.25 percent.\n\nThe calculation starts with Michigan-taxable income and applies the flat tax rate after subtracting the applicable personal exemption amount. Michigan does not use a federal-style standard deduction. Instead, each qualifying exemption reduces taxable income by a fixed amount before the tax rate is applied.",
      examples:
        "Example 1: A single filer with $60,000 in Michigan-taxable income applies the personal exemption first, then the 4.25 percent flat tax rate to the remaining taxable amount.\n\nExample 2: A household with dependents applies multiple personal exemptions, reducing the taxable base before the flat tax rate is applied.\n\nExample 3: Increasing income does not change the tax rate. Michigan income tax increases proportionally because the same rate applies at all income levels.",
      limitations:
        "This Michigan income tax calculator provides a simplified estimate for the 2025 tax year. It does not account for federal income tax, local taxes, credits, residency rules, or special filing situations.\n\nOfficial Michigan income tax rules and rates are published by the Michigan Department of Treasury (https://www.michigan.gov/treasury).",
    },
    faq: [
      {
        q: "Does Michigan have a flat income tax?",
        a: "Yes. Michigan uses a flat individual income tax rate that applies to all taxable income.",
      },
      {
        q: "What is the Michigan income tax rate for 2025?",
        a: "For tax year 2025, Michigan’s individual income tax rate is 4.25 percent.",
      },
      {
        q: "Does Michigan have a standard deduction?",
        a: "No. Michigan does not use a standard deduction. Instead, it applies a personal exemption amount per qualifying exemption.",
      },
      {
        q: "What is the Michigan personal exemption amount for 2025?",
        a: "For tax year 2025, the Michigan personal exemption amount is $5,800 per qualifying exemption, subject to state rules.",
      },
    ],
    meta: {
      title: "Michigan income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your Michigan state income tax for 2025 using the flat tax rate and personal exemption rules. Calculate your after-tax income.",
      canonicalPath: "/tools/income-tax/michigan",
    },
  },
};
