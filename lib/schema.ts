// lib/schema.ts
import type { IncomeTaxContent } from "./types";

export type FaqItem = { q: string; a: string };

/**
 * Build FAQPage schema from content.faq array.
 */
export function buildFaqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * Build SoftwareApplication schema for an income tax calculator page.
 */
export function buildIncomeTaxSoftwareSchema(args: {
  content: IncomeTaxContent;
  pageUrl: string;
}) {
  const { content, pageUrl } = args;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: content.h1,
    description: content.meta.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: pageUrl,
    isAccessibleForFree: true,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Lavigate",
      url: "https://lavigate.com",
    },
  };
}

/**
 * Build SoftwareApplication schema for a sales tax calculator page.
 * (Intentionally identical structure to income tax)
 */
export function buildSalesTaxSoftwareSchema(args: {
  content: {
    h1: string;
    meta: { description: string };
  };
  pageUrl: string;
}) {
  const { content, pageUrl } = args;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: content.h1,
    description: content.meta.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: pageUrl,
    isAccessibleForFree: true,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Lavigate",
      url: "https://lavigate.com",
    },
  };
}
