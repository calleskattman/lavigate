// config/tools.ts
import type { ComponentType } from "react";

/**
 * Övergripande kategorier för Lavigate.
 * Alla verktyg ligger inom finance, men vi delar upp dem tematiskt.
 */
export type ToolCategory =
  | "tax"       // income tax, capital gains, etc.
  | "income"    // paycheck, salary, net/gross
  | "loans"     // generic loans, car loans
  | "mortgage"  // home loans / mortgages
  | "fees"      // bank fees, card fees, misc charges
  | "other";    // fallback / misc finance tools

/**
 * Identifierare för verktygstyper.
 * Dessa matchar våra huvudtyper och används i routing & config.
 */
export type ToolId =
  | "income-tax"
  | "paycheck"
  | "car-loan"
  | "mortgage"
  | "loan-interest"
  | "fee-calculator";

/**
 * Bas-typ för ett verktyg i registret.
 * component är optional just nu – vi fyller i den när respektive
 * Tool-komponent finns (IncomeTaxTool, PaycheckTool etc.).
 */
export type Tool = {
  id: ToolId;
  slug: string;             // URL-del, t.ex. "income-tax"
  name: string;             // Visningsnamn, t.ex. "Income tax calculator"
  shortDescription: string; // Kort beskrivning för listor / /tools-sida
  category: ToolCategory;
  basePath: string;         // t.ex. "/tools/income-tax"
  component?: ComponentType<any>;
  showOnHome?: boolean;
};

/**
 * Globalt verktygsregister.
 * Detta används senare för /tools-sidor, "related calculators" m.m.
 * Just nu fyller vi bara i metadata, inte component.
 */
export const tools: Tool[] = [
  {
    id: "income-tax",
    slug: "income-tax",
    name: "Income tax calculator",
    shortDescription:
      "Estimate your income tax and net income based on local tax rules.",
    category: "tax",
    basePath: "/tools/income-tax",
    showOnHome: true,
  },
  {
    id: "paycheck",
    slug: "paycheck",
    name: "Paycheck calculator",
    shortDescription:
      "Convert between gross and net salary and understand your take-home pay.",
    category: "income",
    basePath: "/tools/paycheck",
    showOnHome: true,
  },
  {
    id: "car-loan",
    slug: "car-loan",
    name: "Car loan calculator",
    shortDescription:
      "Calculate monthly payments, total interest and costs for car loans.",
    category: "loans",
    basePath: "/tools/car-loan",
    showOnHome: true,
  },
  {
    id: "mortgage",
    slug: "mortgage",
    name: "Mortgage calculator",
    shortDescription:
      "Estimate mortgage payments and total costs for different interest rates and terms.",
    category: "mortgage",
    basePath: "/tools/mortgage",
    showOnHome: true,
  },
  {
    id: "loan-interest",
    slug: "loan-interest",
    name: "Loan interest calculator",
    shortDescription:
      "Break down interest, principal and total cost for generic loans.",
    category: "loans",
    basePath: "/tools/loan-interest",
  },
  {
    id: "fee-calculator",
    slug: "fees",
    name: "Fees & charges calculator",
    shortDescription:
      "Understand effective costs when banks or providers charge fees.",
    category: "fees",
    basePath: "/tools/fees",
  },
];
