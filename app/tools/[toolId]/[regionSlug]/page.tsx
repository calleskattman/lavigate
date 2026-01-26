// app/tools/[toolId]/[regionSlug]/page.tsx
import { CURRENT_TAX_YEAR } from "@/config/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

import { getRegionBySlug, regions } from "@/config/regions";
import { getIncomeTaxConfig } from "@/config/data/incomeTax";
import { incomeTaxSeoContent } from "@/content/income-tax.en";

import { ToolLayout } from "@/components/layout/ToolLayout";
import IncomeTaxTool from "@/components/tools/IncomeTaxTool";
import SalesTaxTool from "@/components/tools/SalesTaxTool";
import { AdsBlock } from "@/components/ads/AdsBlock";
import { AffiliateBlock } from "@/components/ads/AffiliateBlock";

import { getToolById, tools } from "@/config/tools";
import { getSalesTaxConfig } from "@/config/data/salesTax";
import { salesTaxSeoContent } from "@/content/sales-tax.en";

import {
  buildFaqSchema,
  buildIncomeTaxSoftwareSchema,
  buildSalesTaxSoftwareSchema,
} from "@/lib/schema";

// ---------- Typer ----------

type ToolRegionParams = {
  toolId: string;
  regionSlug: string;
};

type ToolRegionPageProps = {
  params: Promise<ToolRegionParams>;
};

// ---------- Ads ----------

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
type AdsDensity = "low" | "medium" | "high";
const ADS_DENSITY: AdsDensity =
  (process.env.NEXT_PUBLIC_ADS_DENSITY as AdsDensity) || "medium";

function shouldShowAd(order: 1 | 2 | 3): boolean {
  if (!ADS_ENABLED) return false;
  if (ADS_DENSITY === "low") return order === 1;
  if (ADS_DENSITY === "medium") return order === 1 || order === 2;
  return true;
}

// ---------- Metadata ----------

export async function generateMetadata(
  { params }: ToolRegionPageProps
): Promise<Metadata> {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId as any);
  const region = getRegionBySlug(regionSlug);
  if (!tool || !region) return {};

  const seo =
    tool.id === "income-tax"
      ? incomeTaxSeoContent[region.id]
      : tool.id === "sales-tax"
      ? salesTaxSeoContent[region.id]
      : undefined;

  if (!seo) return {};

  const canonical = seo.meta.canonicalPath
    ? `https://lavigate.com${seo.meta.canonicalPath}`
    : undefined;

  const title = seo.meta.title.replace(
    /\b(20\d{2})\b/,
    String(CURRENT_TAX_YEAR)
  );

  return {
    title,
    description: seo.meta.description,
    alternates: canonical ? { canonical } : undefined,
  };
}

// ---------- Static params ----------

export function generateStaticParams() {
  return tools.flatMap((tool) =>
    tool.supportedRegionIds
      .map((regionId) => regions.find((r) => r.id === regionId))
      .filter(Boolean)
      .map((region) => ({
        toolId: tool.id,
        regionSlug: region!.slug,
      }))
  );
}

// ---------- Page ----------

export default async function ToolRegionPage({
  params,
}: ToolRegionPageProps) {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId as any);
  const region = getRegionBySlug(regionSlug);
  if (!tool || !region) notFound();

  let config: any;
let seo: any;

switch (tool.id) {
  case "income-tax":
    config = getIncomeTaxConfig(region.id);
    seo = incomeTaxSeoContent[region.id];
    break;

  case "sales-tax":
    config = getSalesTaxConfig(region.id);
    seo = salesTaxSeoContent[region.id];
    break;

  default:
    notFound();
}

  if (!config || !seo) notFound();

  const pageUrl = `https://lavigate.com${tool.basePath}/${region.slug}`;

  const faqSchema =
    Array.isArray(seo.faq) && seo.faq.length > 0
      ? buildFaqSchema(seo.faq)
      : null;

  const softwareSchema =
    tool.id === "income-tax"
      ? buildIncomeTaxSoftwareSchema({ content: seo, pageUrl })
      : buildSalesTaxSoftwareSchema({ content: seo, pageUrl });

  const h1 = seo.h1.replace(/\b(20\d{2})\b/, String(CURRENT_TAX_YEAR));

  return (
    <>
      {faqSchema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <ToolLayout
        title={h1}
        description={seo.intro}
        category={tool.id}
        region={region.displayName}
      >
        {/* Disclaimer */}
        <p className="text-sm text-slate-600 mb-6">
          Estimates are shown for the {CURRENT_TAX_YEAR} tax year. In cases where
          official figures have not yet been finalized, calculations are based
          on the most recently available data and may be updated when final
          guidance is published.
        </p>

        {tool.id === "income-tax" && <IncomeTaxTool config={config} />}
        {tool.id === "sales-tax" && <SalesTaxTool config={config} />}

        {shouldShowAd(1) && (
          <div className="mt-8">
            <AdsBlock slot={`${tool.id}-${region.slug}-primary`} />
          </div>
        )}

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {h1} – how it works
          </h2>
          <p className="text-slate-700">{seo.sections.howItWorks}</p>
        </section>

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">Examples</h2>
          <p className="text-slate-700">{seo.sections.examples}</p>
        </section>

        {shouldShowAd(2) && (
          <section className="mt-8">
            <AdsBlock slot={`${tool.id}-${region.slug}-mid`} />
          </section>
        )}

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Limitations and important notes
          </h2>
          <p className="text-slate-700">{seo.sections.limitations}</p>
        </section>

        {Array.isArray(seo.faq) && seo.faq.length > 0 && (
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              FAQs about {h1}
            </h2>

            {seo.faq.map(
              (item: { q: string; a: string }, index: number) => (
                <div key={index}>
                  <h3 className="font-medium text-slate-900">{item.q}</h3>
                  <p className="text-sm text-slate-700">{item.a}</p>
                </div>
              )
            )}
          </section>
        )}

        {shouldShowAd(3) && (
          <section className="mt-8">
            <AdsBlock slot={`${tool.id}-${region.slug}-bottom`} />
          </section>
        )}

        <div className="mt-10">
          <AffiliateBlock id={`${tool.id}-${region.id}`} />
        </div>
      </ToolLayout>
    </>
  );
}
