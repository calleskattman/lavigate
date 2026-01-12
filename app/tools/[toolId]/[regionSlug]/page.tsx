// app/tools/[toolId]/[regionSlug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

import { getToolById } from "@/config/tools";
import { getRegionBySlug, regions } from "@/config/regions";
import { getIncomeTaxConfig } from "@/config/data/incomeTax";
import { incomeTaxSeoContent } from "@/content/income-tax.en";

import { ToolLayout } from "@/components/layout/ToolLayout";
import IncomeTaxTool from "@/components/tools/IncomeTaxTool";
import { AdsBlock } from "@/components/ads/AdsBlock";
import { AffiliateBlock } from "@/components/ads/AffiliateBlock";

import {
  buildFaqSchema,
  buildIncomeTaxSoftwareSchema,
} from "@/lib/schema";

// ---------- Typer ----------

type ToolRegionParams = {
  toolId: string;
  regionSlug: string;
};

type ToolRegionPageProps = {
  params: Promise<ToolRegionParams>;
};

// ---------- Ads-toggles & density ----------

const ADS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

type AdsDensity = "low" | "medium" | "high";

const ADS_DENSITY: AdsDensity =
  (process.env.NEXT_PUBLIC_ADS_DENSITY as AdsDensity) || "medium";

/**
 * Styr hur många annonsplatser som aktiveras.
 */
function shouldShowAd(order: 1 | 2 | 3): boolean {
  if (!ADS_ENABLED) return false;

  if (ADS_DENSITY === "low") return order === 1;
  if (ADS_DENSITY === "medium") return order === 1 || order === 2;

  return true; // high
}

// ---------- Metadata ----------

export async function generateMetadata(
  { params }: ToolRegionPageProps,
): Promise<Metadata> {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId as any);
  const region = getRegionBySlug(regionSlug);

  if (!tool || !region || tool.id !== "income-tax") {
    return {};
  }

  const seo = incomeTaxSeoContent[region.id];
  if (!seo) return {};

  const canonical = seo.meta.canonicalPath
    ? `https://lavigate.com${seo.meta.canonicalPath}`
    : undefined;

  return {
    title: seo.meta.title,
    description: seo.meta.description,
    alternates: canonical
      ? { canonical }
      : undefined,
  };
}

// ---------- Static params (SSG + sitemap) ----------

export function generateStaticParams() {
  const tool = getToolById("income-tax");
  if (!tool) return [];

  return tool.supportedRegionIds
    .map((regionId) => regions.find((r) => r.id === regionId))
    .filter(Boolean)
    .map((region) => ({
      toolId: "income-tax",
      regionSlug: region!.slug,
    }));
}

// ---------- Page ----------

export default async function ToolRegionPage({
  params,
}: ToolRegionPageProps) {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId as any);
  const region = getRegionBySlug(regionSlug);

  if (!tool || !region || tool.id !== "income-tax") {
    notFound();
  }

  const config = getIncomeTaxConfig(region.id);
  const seo = incomeTaxSeoContent[region.id];

  if (!config || !seo) {
    notFound();
  }

  const pageUrl = `https://lavigate.com${tool.basePath}/${region.slug}`;

  const faqSchema = seo.faq?.length
    ? buildFaqSchema(seo.faq)
    : null;

  const softwareSchema = buildIncomeTaxSoftwareSchema({
    content: seo,
    pageUrl,
  });

  return (
    <>
      {/* ---------- Schema.org ---------- */}
      {faqSchema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      {/* ---------- Page ---------- */}
      <ToolLayout
        title={seo.h1}
        description={seo.intro}
        category={tool.id}
        region={region.displayName}
      >
        {/* Calculator */}
        <IncomeTaxTool config={config} />

        {/* Ad #1 */}
        {shouldShowAd(1) && (
          <div className="mt-8">
            <AdsBlock slot={`${tool.id}-${region.slug}-primary`} />
          </div>
        )}

        {/* SEO sections */}
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">
            How the {region.displayName} income tax calculator works
          </h2>
          <p className="text-slate-700">{seo.sections.howItWorks}</p>
        </section>

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Examples
          </h2>
          <p className="text-slate-700">{seo.sections.examples}</p>
        </section>

        {/* Ad #2 */}
        {shouldShowAd(2) && (
          <section className="mt-8">
            <AdsBlock slot={`${tool.id}-${region.slug}-mid`} />
          </section>
        )}

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Limitations and important notes
          </h2>
          <p className="text-slate-700">
            {seo.sections.limitations}
          </p>
        </section>

        {/* FAQ */}
        {seo.faq?.length > 0 && (
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              FAQs about income tax in {region.displayName}
            </h2>

            <div className="space-y-4">
              {seo.faq.map((item, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium text-slate-900">
                    {item.q}
                  </h3>
                  <p className="text-sm text-slate-700">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ad #3 */}
        {shouldShowAd(3) && (
          <section className="mt-8">
            <AdsBlock slot={`${tool.id}-${region.slug}-bottom`} />
          </section>
        )}

        {/* Affiliate */}
        <div className="mt-10">
          <AffiliateBlock id={`income-tax-${region.id}`} />
        </div>
      </ToolLayout>
    </>
  );
}
