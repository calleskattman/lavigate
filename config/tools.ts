// config/tools.ts
import type { RegionId } from "./regions";

export type ToolId = "income-tax" | "sales-tax";

export type ToolDefinition = {
  id: ToolId;
  name: string;
  label: string;
  basePath: string;
  component: "IncomeTaxTool" | "SalesTaxTool";
  dataKey: "incomeTax" | "salesTax";
  supportedRegionIds: RegionId[];
};

export const tools: ToolDefinition[] = [
  {
    id: "income-tax",
    name: "Income tax calculator",
    label: "Income tax",
    basePath: "/tools/income-tax",
    component: "IncomeTaxTool",
    dataKey: "incomeTax",
    supportedRegionIds: [
      "US-VA",
      "US-MI",
      "US-MN",
      "US-UT",
      "US-AL",
      "US-OK",
      "US-HI",
      "US-KS",
      "US-ID",
      "US-KY",
      "US-IA",
      "US-ME",
      "US-DE",
      "US-MS",
      "US-OH",
      "US-AR",
      "US-MT",
      "US-NE",
    ],
  },
  {
    id: "sales-tax",
    name: "Sales tax calculator",
    label: "Sales tax",
    basePath: "/tools/sales-tax",
    component: "SalesTaxTool",
    dataKey: "salesTax",
    supportedRegionIds: [
      "US-AL",
      "US-AR",
      "US-AZ",
      "US-CO",
      "US-CT",
      "US-FL",
      "US-GA",
      "US-HI",
      "US-ID",
      "US-IN",
      "US-KS",
      "US-LA",
      "US-MD",
      "US-MA",
      "US-MI",
      // fler regioner läggs till via SEO Studio
    ],
  },
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}
