// config/tools.ts
import type { RegionId } from "./regions";

export type ToolId =
  | "income-tax"
  | "sales-tax"
  | "paycheck"
  | "property-tax";

export type ToolDefinition = {
  id: ToolId;
  name: string;
  label: string;
  basePath: string;
  component:
    | "IncomeTaxTool"
    | "SalesTaxTool"
    | "PaycheckTool"
    | "PropertyTaxTool";
  dataKey:
    | "incomeTax"
    | "salesTax"
    | "paycheck"
    | "propertyTax";
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
      "US-MN-MINNEAPOLIS-CITY",
      "US-NY-NEW-YORK-CITY",
      "US-CA-SAN-FRANCISCO-CITY",
      "US-CA-SAN-JOSE-CITY",
      "US-UT-SALT-LAKE-CITY",
      "US-DC",
      "US-VT",
      "US-ME",
      "US-NC-WAKE-COUNTY",
      "US-NC-MECKLENBURG-COUNTY",
      "US-AZ-PHOENIX-CITY",
      "US-CO-DENVER-CITY",
    ],
  },
  {
    id: "paycheck",
    name: "Paycheck calculator",
    label: "Paycheck",
    basePath: "/tools/paycheck",
    component: "PaycheckTool",
    dataKey: "paycheck",
    supportedRegionIds: [
      "US-TX",
      "US-FL",
      "US-IL",
      "US-GA",
      "US-CO",
      "US-TN",
      "US-VA",
      "US-NV",
      "US-UT",
      "US-WA",
      "US-MI",
      "US-IN",
      "US-KY",
      "US-LA",
      "US-MN",
      "US-NY",
      "US-AL",
      "US-MO",
      "US-AZ",
      "US-WI",
      "US-OH",
      "US-MD",
      "US-NJ",
      "US-IA",
      "US-AK",
      "US-NM",
      "US-WY",
      "US-MS",
      "US-SD",
      "US-CT",
      "US-VT",
      "US-ND",
      "US-WV",
      "US-DC",
      "US-RI",
      "US-CO-COLORADO-SPRINGS-CITY",
    ],
  },  
  {
    id: "property-tax",
    name: "Property tax calculator",
    label: "Property tax",
    basePath: "/tools/property-tax",
    component: "PropertyTaxTool",
    dataKey: "propertyTax",
    supportedRegionIds: [
      "US-CA-ALAMEDA-COUNTY",
      "US-AR",
      "US-KS",
      "US-KY",
      "US-MI",
      "US-SD",
      "US-VT",
      "US-VA",
      "US-WV",
      "US-WI",
      "US-WY",
    ],
  }  
  
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}
