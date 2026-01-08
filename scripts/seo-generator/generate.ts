import * as fs from "fs";
import path from "path";

import { jobConfig } from "./jobConfig";
import { writeSeoText } from "./writer";
import { validateSeoOutput } from "./validators";
import { isTooSimilar } from "./similarity";
import { getRegionById } from "../../config/regions";

/**
 * Authority per region (kan senare brytas ut till egen fil)
 */
const REGION_AUTHORITIES: Record<string, { name: string; url: string }> = {
  "US-TX": {
    name: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov",
  },
  "US-CA": {
    name: "California Franchise Tax Board",
    url: "https://www.ftb.ca.gov",
  },
  "US-FL": {
    name: "Florida Department of Revenue",
    url: "https://floridarevenue.com",
  },
  "US-NY": {
    name: "New York State Department of Taxation and Finance",
    url: "https://www.tax.ny.gov",
  },
  "US-WA": {
    name: "Washington State Department of Revenue",
    url: "https://dor.wa.gov",
  },
};

/**
 * TEMPORÄRA primary keywords
 * (ersätts av CSV / Ahrefs i nästa fas)
 */
const PRIMARY_KEYWORDS: Record<string, string> = {
  "US-TX": "texas income tax calculator 2025",
  "US-CA": "california income tax calculator 2025",
};


const OUTPUT_DIR = path.resolve(
  process.cwd(),
  "scripts/seo-generator/content-output",
  jobConfig.toolId
);

async function run(): Promise<void> {
  console.log(`\nGenererar SEO för tool: ${jobConfig.toolId}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const results: any[] = [];

  for (const regionId of jobConfig.regionIds) {
    const region = getRegionById(regionId);

    if (!region) {
      console.warn(`Okänd region: ${regionId}`);
      continue;
    }

    const authority = REGION_AUTHORITIES[region.id];
    if (!authority) {
      throw new Error(`Authority saknas för region ${region.id}`);
    }

    console.log(`Genererar SEO för ${region.name}...`);

    let attempt = 0;
let seo: any | null = null;

const primaryKeyword = `${region.name} income tax calculator ${jobConfig.year}`;

let repairNotes: string | undefined = undefined;

while (attempt < jobConfig.maxRetriesPerRegion) {
  attempt++;

  try {
    seo = await writeSeoText({
      toolName: jobConfig.toolId,
      regionName: region.name,
      regionSlug: region.slug,
      countryCode: region.countryCode,
      year: jobConfig.year,
      authorityName: authority.name,
      authorityUrl: authority.url,
      primaryKeyword,
      repairNotes,
    });

    // Validatorn kastar throw vid fel
    validateSeoOutput(seo);

    const isDuplicate = results.some((existing) =>
      isTooSimilar(existing, seo, jobConfig.maxSimilarity)
    );

    if (isDuplicate) {
      repairNotes = `- Output too similar to previous region output. Rewrite with different phrasing while keeping all rules and length minimums.`;
      console.warn(
        `För lik text (${region.name}), försök ${attempt}/${jobConfig.maxRetriesPerRegion}`
      );
      seo = null;
      continue;
    }

    // ✅ Allt OK
    break;
  } catch (err: any) {
    // Bygg feedback till nästa försök
    const msg = String(err?.message ?? err ?? "");

    // Plocka ut validator-listan om den finns
    // Din validator skriver ofta:
    // "SEO-validering misslyckades:\n- ...\n- ..."
    if (msg.includes("SEO-validering misslyckades")) {
      const lines = msg
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      // behåll rader som börjar med "-"
      const bulletLines = lines.filter((l) => l.startsWith("-"));
      repairNotes = bulletLines.length
        ? bulletLines.join("\n")
        : `- Fix validation issues and increase length with margin.`;
    } else {
      repairNotes = `- Fix the error and return valid JSON only. Error: ${msg}`;
    }

    console.warn(
      `Validering/generering misslyckades (${region.name}), försök ${attempt}/${jobConfig.maxRetriesPerRegion}`
    );
    seo = null;
  }
}    

      if (!seo) {
        throw new Error(
          `SEO misslyckades för ${region.name} efter ${jobConfig.maxRetriesPerRegion} försök. Inget sparades.`
        );
      }           

    const outputPath = path.join(OUTPUT_DIR, `${region.slug}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(seo, null, 2), "utf8");

    results.push(seo);
    console.log(`Klar: ${region.name}`);
  }

  console.log(`\nKlar! ${results.length} regioner genererade.\n`);
}

run().catch((err) => {
  console.error("Generatorn kraschade:", err);
  process.exit(1);
});
