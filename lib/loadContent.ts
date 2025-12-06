// lib/loadContent.ts
import fs from "fs";
import path from "path";
import type { IncomeTaxContent } from "@/lib/types";

/**
 * Load income tax content JSON for a given region slug.
 * For now we only support US regions with filenames "us-[slug].json".
 */
export function loadIncomeTaxContent(regionSlug: string): IncomeTaxContent {
  const filePath = path.join(
    process.cwd(),
    "content",
    "income-tax",
    `us-${regionSlug}.json`
  );

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as IncomeTaxContent;
}
