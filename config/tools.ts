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
      "US-MN",
      "US-MO",
      "US-NV",
      "US-NJ",
      "US-NY",
      "US-NC",
      "US-OH",
      "US-OR",
      "US-PA",
      "US-RI",
      "US-SC",
      "US-SD",
      "US-TN",
      "US-UT",
      "US-VA",
      "US-WA",
      "US-WI",
      "US-WY",
      "US-PR",
      "US-CA-ALAMEDA-COUNTY",
      "US-FL-BROWARD-COUNTY",
      "US-NV-CLARK-COUNTY",
      "US-NY-ERIE-COUNTY",
      "US-OH-FRANKLIN-COUNTY",
      "US-PA-FRANKLIN-COUNTY",
      "US-NY-FRANKLIN-COUNTY",
      "US-TX-FRANKLIN-COUNTY",
      "US-FL-POLK-COUNTY",
      "US-NY-SUFFOLK-COUNTY",
      "US-TX-AUSTIN-CITY",
      "US-MA-BOSTON-CITY",
      "US-TX-DALLAS-CITY",
      "US-TX-HOUSTON-CITY",
      // fler regioner läggs till via SEO Studio
    ],
  },
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}
