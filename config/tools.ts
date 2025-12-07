// config/tools.ts
import type { RegionId } from "./regions";

export type ToolId = "income-tax"; // fler läggs till senare

export type ToolDefinition = {
  id: ToolId;
  name: string;
  basePath: string;        // t.ex. "/tools/income-tax"
  component: "IncomeTaxTool"; // namn på komponent (används i switch)
  dataKey: "incomeTax";    // koppling till rätt datafil
  supportedRegionIds: RegionId[];
};

export const tools: ToolDefinition[] = [
  {
    id: "income-tax",
    name: "Income tax calculator",
    basePath: "/tools/income-tax",
    component: "IncomeTaxTool",
    dataKey: "incomeTax",
    supportedRegionIds: ["US-TX", "US-CA"], // börja med Texas + California
  },
  // fler verktyg sen
];

export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}
