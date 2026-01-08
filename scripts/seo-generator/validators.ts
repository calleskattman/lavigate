// scripts/seo-generator/validators.ts

import type { SeoOutput } from "./writer";

/**
 * Förbjudna AI-fraser enligt master-spec
 * (case-insensitive)
 */
const FORBIDDEN_PHRASES = [
  "in summary",
  "in conclusion",
  "ultimately",
  "let’s dive in",
  "let's dive in",
  "let’s take a closer look",
  "here’s what you need to know",
  "it's important to note",
  "it is important to note",
  "as you can see",
  "in today’s world",
  "in today's world",
];

/**
 * Grundläggande längdkrav per sektion (ord)
 */
const LENGTH_RULES = {
  intro: { min: 80, max: 150 },
  section: { min: 150, max: 300 },
  faqAnswer: { min: 40, max: 120 },
};

/**
 * Kör alla SEO-valideringar
 * ❌ kastar Error direkt vid fel
 */
export function validateSeoOutput(seo: SeoOutput): void {
  const errors: string[] = [];

  // 1. Förbjudna AI-fraser
  const fullText = [
    seo.h1,
    seo.intro,
    ...Object.values(seo.sections),
    ...seo.faq.map((f) => `${f.q} ${f.a}`),
  ]
    .join(" ")
    .toLowerCase();

  for (const phrase of FORBIDDEN_PHRASES) {
    if (fullText.includes(phrase)) {
      errors.push(`Förbjuden AI-fras hittad: "${phrase}"`);
    }
  }

  // 2. Intro-längd
  const introWords = seo.intro.split(/\s+/).length;
  if (
    introWords < LENGTH_RULES.intro.min ||
    introWords > LENGTH_RULES.intro.max
  ) {
    errors.push(
      `Intro har ${introWords} ord (krav: ${LENGTH_RULES.intro.min}–${LENGTH_RULES.intro.max})`
    );
  }

  // 3. Sektioner
  for (const [key, text] of Object.entries(seo.sections)) {
    const words = text.split(/\s+/).length;
    if (
      words < LENGTH_RULES.section.min ||
      words > LENGTH_RULES.section.max
    ) {
      errors.push(
        `Sektionen "${key}" har ${words} ord (krav: ${LENGTH_RULES.section.min}–${LENGTH_RULES.section.max})`
      );
    }
  }

  // 4. FAQ-svar
  for (const { q, a } of seo.faq) {
    const words = a.split(/\s+/).length;
    if (
      words < LENGTH_RULES.faqAnswer.min ||
      words > LENGTH_RULES.faqAnswer.max
    ) {
      errors.push(
        `FAQ-svaret "${q}" har ${words} ord (krav: ${LENGTH_RULES.faqAnswer.min}–${LENGTH_RULES.faqAnswer.max})`
      );
    }
  }

  // ❌ Stoppa generatorn direkt
  if (errors.length > 0) {
    throw new Error(`SEO-validering misslyckades:\n- ${errors.join("\n- ")}`);
  }
}
