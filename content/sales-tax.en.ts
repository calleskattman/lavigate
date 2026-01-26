// content/sales-tax.en.ts
import type { SalesTaxSeoEntry } from "@/lib/types";

export const salesTaxSeoContent: Record<string, SalesTaxSeoEntry> = {
  "US-CA": {
    h1: "California sales tax calculator",

    intro:
      "Use this California sales tax calculator to quickly estimate how much sales tax applies to a purchase based on the applicable tax rate.",

    sections: {
      howItWorks:
        "Enter the purchase amount and the calculator applies the relevant California sales tax rate to estimate the tax and total cost.",

      examples:
        "For example, a $100 purchase with a 7.25% sales tax results in $7.25 in tax, for a total of $107.25.",

      limitations:
        "Sales tax rates can vary by city, county, and special tax districts. This calculator provides an estimate and may not reflect the exact rate applied at checkout.",
    },

    faq: [
      {
        q: "What is the sales tax rate in California?",
        a: "California has a statewide base sales tax rate, but the total rate varies depending on local and district taxes.",
      },
      {
        q: "Does this calculator include local sales taxes?",
        a: "The calculator estimates sales tax based on available rate data but may not include every local district surcharge.",
      },
    ],

    meta: {
      title: "California Sales Tax Calculator – Estimate Your Total Cost",
      description:
        "Estimate sales tax in California based on purchase amount and applicable tax rates. Quick and easy sales tax calculation.",
      canonicalPath: "/tools/sales-tax/california",
    },
  },
};
