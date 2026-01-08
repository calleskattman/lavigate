export const jobConfig = {
  /**
   * Vilket verktyg vi kör
   */
  toolId: "income-tax" as const,

  /**
   * Årtal som ska synas i H1, meta title m.m.
   */
  year: 2025,

  /**
   * Pilot-regioner.
   * Dessa MÅSTE finnas i config/regions.ts
   */
  regionIds: [
    "US-TX",
    "US-CA",
    "US-FL",
    "US-NY",
    "US-WA",
  ] as const,

  /**
   * Modell som skriver SEO-texten
   */
  writerModel: "gpt-4o-mini-2024-07-18",

  /**
   * Embedding-modell för duplicate-check
   */
  embeddingModel: "text-embedding-3-small",

  /**
   * Max tillåten likhet mellan två regiontexter
   */
  maxSimilarity: 0.85,

  /**
   * Hur många försök per region
   */
  maxRetriesPerRegion: 3,

  /**
   * Keyword-källa (kopplas in senare via Ahrefs)
   * Lämnas undefined tills riktig data finns
   */
  keywords: undefined as
    | Record<string, string>
    | undefined,
};
