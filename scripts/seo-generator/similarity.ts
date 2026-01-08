/**
 * Mycket enkel men stabil similarity-check för SEO-texter.
 * Vi jämför normaliserad text och räknar gemensamma ord.
 *
 * Returnerar true om texterna är FÖR lika.
 */
export function isTooSimilar(
    a: any,
    b: any,
    maxSimilarity: number
  ): boolean {
    const textA = normalize(extractText(a));
    const textB = normalize(extractText(b));
  
    if (!textA || !textB) return false;
  
    const wordsA = new Set(textA.split(" "));
    const wordsB = new Set(textB.split(" "));
  
    let overlap = 0;
    for (const w of wordsA) {
      if (wordsB.has(w)) overlap++;
    }
  
    const similarity = overlap / Math.max(wordsA.size, 1);
  
    return similarity >= maxSimilarity;
  }
  
  /**
   * Plockar ut all relevant text ur SEO-objektet
   */
  function extractText(obj: any): string {
    return [
      obj.h1,
      obj.intro,
      obj.sections?.howItWorks,
      obj.sections?.examples,
      obj.sections?.limitations,
      ...(obj.faq?.map((f: any) => `${f.q} ${f.a}`) ?? []),
      obj.meta?.title,
      obj.meta?.description,
    ]
      .filter(Boolean)
      .join(" ");
  }
  
  /**
   * Normaliserar text för jämförelse
   */
  function normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  