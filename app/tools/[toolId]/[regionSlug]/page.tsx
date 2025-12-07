// app/tools/[toolId]/[regionSlug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getToolById } from "@/config/tools";
import { getRegionBySlug, regions } from "@/config/regions";
import { getIncomeTaxConfig } from "@/config/data/incomeTax";
import { incomeTaxSeoContent } from "@/content/income-tax.en";

import { ToolLayout } from "@/components/layout/ToolLayout";
import IncomeTaxTool from "@/components/tools/IncomeTaxTool";
import { AdsBlock } from "@/components/ads/AdsBlock";
import { AffiliateBlock } from "@/components/ads/AffiliateBlock";

type ToolRegionParams = {
  toolId: string;
  regionSlug: string;
};

// ---------- Metadata ----------

export async function generateMetadata(
  { params }: { params: Promise<ToolRegionParams> }
): Promise<Metadata> {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId);
  const region = getRegionBySlug(regionSlug);

  if (!tool || !region) {
    return {};
  }

  // Just nu hanterar vi bara income-tax
  if (tool.id !== "income-tax") {
    return {};
  }

  const seo = incomeTaxSeoContent[region.id];
  if (!seo) {
    return {};
  }

  const title = seo.meta.title;
  const description = seo.meta.description;
  const canonical =
    typeof seo.meta.canonicalPath === "string"
      ? `https://lavigate.com${seo.meta.canonicalPath}`
      : undefined;

  return {
    title,
    description,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
  };
}

// ---------- Static params (SSG + sitemap) ----------

export function generateStaticParams() {
  const incomeTaxTool = getToolById("income-tax");
  if (!incomeTaxTool) return [];

  return incomeTaxTool.supportedRegionIds
    .map((regionId) => regions.find((r) => r.id === regionId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((region) => ({
      toolId: "income-tax",
      regionSlug: region.slug,
    }));
}

// ---------- Page-komponent ----------

export default async function ToolRegionPage(
  { params }: { params: Promise<ToolRegionParams> }
) {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId);
  const region = getRegionBySlug(regionSlug);

  if (!tool || !region) {
    notFound();
  }

  if (tool.id !== "income-tax") {
    notFound();
  }

  const config = getIncomeTaxConfig(region.id);
  const seo = incomeTaxSeoContent[region.id];

  if (!config || !seo) {
    notFound();
  }

  return (
    <ToolLayout
      title={seo.h1}
      description={seo.intro}
      category={tool.id}              // "income-tax"
      region={region.displayName}     // t.ex. "Texas"
    >
      {/* Kalkylatorn */}
      <IncomeTaxTool config={config} />

      {/* Annonsblock under verktyget */}
      <div className="mt-8">
        <AdsBlock slot="tools-income-tax-below-calculator" />
      </div>

      {/* SEO-sektioner */}
      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          How the {region.displayName} income tax calculator works
        </h2>
        <p className="text-slate-700">{seo.sections.howItWorks}</p>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Examples</h2>
        <p className="text-slate-700">{seo.sections.examples}</p>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Limitations and important notes
        </h2>
        <p className="text-slate-700">{seo.sections.limitations}</p>
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
                <h3 className="font-medium text-slate-900">{item.q}</h3>
                <p className="text-sm text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Affiliate */}
      <div className="mt-10">
        <AffiliateBlock id={`income-tax-${region.id}`} />
      </div>
    </ToolLayout>
  );
}
