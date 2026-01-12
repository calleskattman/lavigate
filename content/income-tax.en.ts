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
  /* ---------- Texas (placeholder / scaffold) ---------- */
  "US-TX": {
    h1: "Texas income tax calculator 2025",
    intro:
      "Texas has no state income tax. Use this calculator to understand how the absence of state income tax affects your estimated net income.",
    sections: {
      howItWorks:
        "This calculator assumes a 0% state income tax rate for Texas. When you enter your taxable income, the estimated state income tax is $0. Federal taxes and other payroll taxes are not included.",
      examples:
        "Example: If you earn $60,000 in Texas in 2025, your estimated state income tax is $0 because Texas does not levy a state income tax.",
      limitations:
        "This tool only reflects Texas state income tax rules. It does not include federal taxes, local taxes, deductions, credits, or special situations.",
    },
    faq: [
      {
        q: "Does Texas have a state income tax?",
        a: "No. Texas does not levy a state income tax on individual income.",
      },
      {
        q: "Do Texas residents still pay federal tax?",
        a: "Yes. Texas residents still pay federal income tax and payroll taxes.",
      },
    ],
    meta: {
      title: "Texas income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your Texas state income tax for 2025. Texas has no state income tax, but this calculator helps illustrate the impact on your net income.",
      canonicalPath: "/tools/income-tax/texas",
    },
  },

  /* ---------- California (placeholder / scaffold) ---------- */
  "US-CA": {
    h1: "California income tax calculator 2025",
    intro:
      "Use this California income tax calculator to estimate your state income tax based on progressive tax brackets.",
    sections: {
      howItWorks:
        "This calculator applies simplified California state income tax brackets for 2025 and estimates state tax based on your taxable income.",
      examples:
        "Example: If you earn $60,000 in California in 2025, your income is taxed progressively across multiple brackets to estimate your total state tax.",
      limitations:
        "This calculator does not include federal tax, local taxes, deductions, credits, or filing-status-specific rules.",
    },
    faq: [
      {
        q: "Does California use progressive income tax?",
        a: "Yes. California uses a progressive income tax system with multiple tax brackets.",
      },
      {
        q: "Are deductions included?",
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

  /* ---------- Virginia (REAL target – content comes later) ---------- */
  "US-VA": {
    h1: "Virginia income tax calculator 2025",
    intro:
  "Use this Virginia income tax calculator to estimate your state income tax for 2025. Enter your Virginia taxable income and the calculator applies the official Virginia income tax brackets to estimate how much state income tax you may owe. This tool focuses only on Virginia state income tax and is intended for planning and comparison purposes.",
    sections: {
      howItWorks:
  "This Virginia income tax calculator estimates your state income tax by applying Virginia’s progressive income tax brackets to your taxable income. You enter your annual Virginia taxable income, and the calculator splits that amount across the applicable brackets. Each portion of income is taxed at its corresponding rate, and the results are added together to produce an estimated total Virginia state income tax.\n\nVirginia uses the same income tax bracket thresholds for all individual filers. This means the bracket ranges themselves do not change based on filing status. What typically differs between taxpayers is how taxable income is calculated before the rates are applied, depending on deductions, exemptions, and personal circumstances. Because of this, the calculator starts from taxable income rather than gross income.\n\nThe result includes an estimated total Virginia state income tax and an effective state tax rate. The effective rate represents the average rate paid across all brackets, which is often lower than the highest marginal rate shown in the top bracket. This approach helps you understand how Virginia income tax brackets work in practice and how changes in taxable income can affect your overall state tax liability.",
  examples:
  "Example 1: Taxable income of $30,000. When you enter $30,000 as Virginia taxable income, the calculator applies the lower tax rates to the first portions of income and higher rates only to the amounts that exceed each bracket threshold. The final estimate reflects the total Virginia state income tax owed for the year and shows an effective tax rate that is lower than the top marginal rate.\n\nExample 2: Comparing two income levels. If your Virginia taxable income increases from $60,000 to $70,000, the additional $10,000 is not taxed entirely at the highest rate. Only the portion of income above the top bracket threshold is taxed at the highest rate, while the rest remains taxed at lower rates. Running both values through the calculator helps illustrate how Virginia income tax brackets affect incremental income.\n\nExample 3: Planning and budgeting. If you are evaluating a job change, bonus, or side income, you can use the calculator to estimate how different taxable income amounts impact your Virginia state income tax. By testing multiple scenarios, you can better understand how changes in taxable income influence your estimated state tax and effective rate, while keeping federal taxes separate.",
  limitations:
  "This Virginia income tax calculator provides a simplified estimate based on published state income tax brackets and general rules. It does not account for federal income tax, local taxes, filing status differences, itemized deductions, tax credits, or special situations such as self-employment income, retirement income, or capital gains.\n\nThe calculation assumes standard bracket application and does not reflect every adjustment that may apply on an actual Virginia tax return. Individual circumstances can significantly affect the final tax owed, including exemptions, additional deductions, and changes in tax law.\n\nState income tax brackets and exemption rules used in this calculator are based on information published by the Virginia Department of Taxation (https://www.tax.virginia.gov). For official guidance and the most up-to-date rules, always refer to the Virginia Department of Taxation or consult a qualified tax professional before relying on the estimates provided.",
    },
    faq: [
      {
        q: "Does Virginia have a state income tax?",
        a: "Yes. Virginia levies a state income tax on individual income. The tax uses a progressive bracket structure, meaning different portions of income are taxed at different rates depending on income level. All residents with taxable income may be subject to Virginia state income tax, in addition to federal income tax."
      },
      {
        q: "What are Virginia’s income tax brackets?",
        a: "Virginia uses four state income tax brackets with increasing rates as income rises. The brackets apply progressively, so only the portion of income within each range is taxed at the corresponding rate. The highest marginal rate applies only to income above the top threshold, not to total income."
      },
      {
        q: "Does Virginia offer personal exemptions?",
        a: "Yes. Virginia allows a personal exemption for each filer and dependent. Additional exemptions may apply for taxpayers who are age 65 or older or who are blind. These exemptions reduce taxable income but are subject to eligibility rules defined by the state."
      },
      {
        q: "Are Virginia income tax rates the same for all filing statuses?",
        a: "Virginia applies the same tax brackets and rates regardless of filing status. However, total tax owed can still vary based on income level, available exemptions, and deductions. Filing status mainly affects how income is reported rather than the rates themselves."
      }
    ],    
    meta: {
      title: "Virginia income tax calculator 2025 – estimate your state taxes",
      description:
        "Estimate your Virginia state income tax for 2025. Calculate tax brackets, personal exemptions, and your after-tax income.",
      canonicalPath: "/tools/income-tax/virginia",
    },
  },
};
