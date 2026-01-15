// config/tools.ts
import type { RegionId } from "./regions";

export type ToolId = "income-tax";

export type ToolDefinition = {
  id: ToolId;
  name: string;
  basePath: string;
  component: "IncomeTaxTool";
  dataKey: "incomeTax";
  supportedRegionIds: RegionId[];
};

export const tools: ToolDefinition[] = [
  {
    id: "income-tax",
    name: "Income tax calculator",
    basePath: "/tools/income-tax",
    component: "IncomeTaxTool",
    dataKey: "incomeTax",
    supportedRegionIds: ["US-VA", "US-MI", "US-MN", "US-UT", "US-AL", "US-OK", "US-HI", "US-KS", "US-ID"],
  },
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}
