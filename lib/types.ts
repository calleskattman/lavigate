// lib/types.ts

// ✅ Region-typ som används av config/regions.ts
export type Region = {
  id: string; // t.ex. "US-TX"
  slug: string; // t.ex. "texas"
  name: string; // t.ex. "Texas"
  countryCode: "US" | "CA" | "UK" | "AU";
  displayName?: string;
};

// ✅ Grundkonfig för inkomstskatt per region & år
export type IncomeTaxConfig = {
  regionId: string; // kopplas mot Region.id, t.ex. "US-TX"
  year: number; // t.ex. 2025
  systemName: string; // t.ex. "Texas state income tax"
  brackets: {
    from: number;
    to: number | null; // null = ingen övre gräns
    rate: number; // t.ex. 0.22 = 22 %
  }[];
  standardDeduction?: number;
  notes?: string[];
  authority: {
    name: string; // Officiell myndighet
    url: string; // Länk till källa
    lastVerified: string; // ISO-datum, t.ex. "2025-02-10"
  };
};

// ✅ Används på sidan – samma som ovan men med regionName pålagt
export type IncomeTaxConfigWithRegion = IncomeTaxConfig & {
  regionName: string; // t.ex. "Texas"
};

// ✅ Återanvändbar FAQ-typ (NYTT men helt kompatibelt)
export type FaqItem = { q: string; a: string };

// ✅ SEO/content-struktur för JSON-filerna i content/income-tax/*
export type IncomeTaxContent = {
  h1: string;
  intro: string;
  sections: {
    howItWorks: string;
    examples: string;
    limitations: string;
  };
  faq: FaqItem[];
  meta: {
    title: string;
    description: string;
    canonicalPath: string; // t.ex. "/tools/income-tax/texas"
  };
};

// ✅ Typ för Next-route props i nya App Router (params som Promise)
export type PageParams = {
  region: string;
};

export type PageProps = {
  params: Promise<PageParams>;
};

// ==============================
// Sales tax – typer (NYTT VERKTYG)
// ==============================

export type SalesTaxComponent = {
  name: string; // e.g. "California state sales tax"
  rate: number | null; // null = exists but varies by location
};

export type SalesTaxConfig = {
  regionId: string; // kopplas mot Region.id, t.ex. "US-CA"
  year: number; // t.ex. 2025
  systemName: string; // t.ex. "California sales tax"
  components: SalesTaxComponent[];
  notes?: string[];
  authority: {
    name: string; // Officiell myndighet
    url: string; // Länk till källa (.gov)
    lastVerified: string; // ISO-datum
  };
};

// ✅ SEO/content-struktur för content/sales-tax.en.ts (NYTT men separat)
export type SalesTaxSeoEntry = {
  h1: string;
  intro: string;

  sections: {
    howItWorks: string;
    examples?: string;
    limitations: string;
  };

  faq: FaqItem[];

  meta: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};
