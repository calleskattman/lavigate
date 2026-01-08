import { openai } from "./openaiClient";
import { jobConfig } from "./jobConfig";

export type SeoOutput = {
  h1: string;
  intro: string;
  sections: {
    howItWorks: string;
    examples: string;
    limitations: string;
  };
  faq: { q: string; a: string }[];
  meta: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};

function buildPrompt(params: {
  toolName: string;
  regionName: string;
  regionSlug: string;
  countryCode: string;
  year: number;
  authorityName: string;
  authorityUrl: string;
  primaryKeyword: string;
  repairNotes?: string;
}): string {
  const {
    toolName,
    regionName,
    regionSlug,
    countryCode,
    year,
    authorityName,
    authorityUrl,
    primaryKeyword,
    repairNotes,
  } = params;

  const repairBlock = repairNotes
    ? `
====================================================
REVISION REQUEST (FROM VALIDATOR) — MUST FIX
====================================================

Your previous output FAILED validation. Fix ONLY what is listed below.
Do NOT shorten any section. Keep all minimums with margin.

Validation errors:
${repairNotes.trim()}

Return the FULL corrected JSON again.
`
    : "";

  return `
You are a senior finance writer working in a production SEO system.

THIS OUTPUT IS MACHINE-VALIDATED.
If ANY requirement below is violated, the output will be rejected.

====================================================
HARD MINIMUM LENGTHS (WRITE ABOVE THESE)
====================================================

You MUST exceed these minimums with margin:

- intro: at least 120 words
- howItWorks: at least 200 words
- examples: at least 200 words
- limitations: at least 200 words
- EACH FAQ answer: at least 70 words

If unsure, WRITE MORE. Never less.

====================================================
STRUCTURE (JSON ONLY — NO EXCEPTIONS)
====================================================

Return ONLY valid JSON.
NO trailing commas.
NO markdown.
NO explanations.

{
  "h1": string,
  "intro": string,
  "sections": {
    "howItWorks": string,
    "examples": string,
    "limitations": string
  },
  "faq": [
    { "q": string, "a": string },
    { "q": string, "a": string },
    { "q": string, "a": string },
    { "q": string, "a": string }
  ],
  "meta": {
    "title": string,
    "description": string,
    "canonicalPath": string
  }
}

====================================================
STYLE & TONE (STRICT)
====================================================

- Neutral, factual, professional
- Human finance writer
- No conversational tone
- No AI clichés
- No meta commentary

FORBIDDEN PHRASES:
"In summary", "In conclusion", "Ultimately",
"Let’s dive in", "Let's dive in",
"It’s important to note", "As you can see",
"In today’s world", "Here’s what you need to know"

====================================================
CONTENT CONTEXT
====================================================

Tool: ${toolName}
Region: ${regionName}
Country: ${countryCode}
Year: ${year}
Canonical path: /tools/income-tax/${regionSlug}

Authority rules:
- Mention ${authorityName}
- Include URL ${authorityUrl}
- State clearly that calculations are simplified estimates
- Limitations MUST contain a disclaimer encouraging verification with official sources

PRIMARY KEYWORD (MUST USE NATURALLY):
${primaryKeyword}

SEO rules:
- Primary keyword must appear naturally in:
  - h1
  - meta.title
  - meta.description
  - intro

${repairBlock}

====================================================
FINAL SELF-CHECK (MANDATORY)
====================================================

Before responding:
- Count words in EVERY section
- Rewrite anything below minimum
- Ensure NO forbidden phrases exist
- Ensure JSON has NO trailing commas

Return ONLY the JSON.
`.trim();
}

export async function writeSeoText(params: {
  toolName: string;
  regionName: string;
  regionSlug: string;
  countryCode: string;
  year: number;
  authorityName: string;
  authorityUrl: string;
  primaryKeyword: string;
  repairNotes?: string;
}): Promise<SeoOutput> {
  const prompt = buildPrompt(params);

  const response = await openai.responses.create({
    model: jobConfig.writerModel,
    input: prompt,
    temperature: 0.25,
  });

  const raw = response.output_text;

  if (!raw) {
    throw new Error("Tomt svar från OpenAI");
  }

  // Sanera vanliga JSON-fel (LLM trailing commas)
  const sanitized = raw.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").trim();

  try {
    return JSON.parse(sanitized) as SeoOutput;
  } catch {
    console.error("RAW OUTPUT:\n", raw);
    console.error("SANITIZED OUTPUT:\n", sanitized);
    throw new Error("Kunde inte parsa SEO-output som giltig JSON");
  }
}
