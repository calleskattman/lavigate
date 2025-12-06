// app/tools/income-tax/[region]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolLayout } from "@/components/layout/ToolLayout";
import { AdsBlock } from "@/components/ads/AdsBlock";
import { AffiliateBlock } from "@/components/ads/AffiliateBlock";

import IncomeTaxTool from "@/components/tools/IncomeTaxTool";
import { getIncomeTaxData } from "@/config/data/incomeTax";
import { loadIncomeTaxContent } from "@/lib/loadContent";
import type { IncomeTaxContent, PageProps } from "@/lib/types";

// ✅ Vilka regioner vi bygger statiska sidor för just nu
export function generateStaticParams() {
  return [
    { region: "texas" },
    { region: "california" },
  ];
}

// ✅ Metadata per region – hämtas från content JSON
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { region } = await params;

  const content = (await loadIncomeTaxContent(region)) as IncomeTaxContent;

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `https://lavigate.com${content.meta.canonicalPath}`,
    },
  };
}

// ✅ Själva sidan
export default async function IncomeTaxRegionPage({ params }: PageProps) {
  const { region } = await params;

  const data = getIncomeTaxData(region);

  if (!data) {
    // notFound() kastar ett undantag (never), men TS fattar inte alltid det.
    notFound();
    return null; // <- den här raden körs aldrig på riktigt, men gör TS nöjd.
  }

  const content = (await loadIncomeTaxContent(region)) as IncomeTaxContent;

  return (
    <ToolLayout
      title={content.h1}
      description={content.intro}
      category="income-tax"
      region={data.regionName}
    >
      <div className="space-y-10">
        {/* Kalkylator + annons */}
        <section aria-labelledby="income-tax-calculator">
          <h2 id="income-tax-calculator" className="sr-only">
            Income tax calculator for {data.regionName}
          </h2>

          <IncomeTaxTool config={data} />

          <div className="mt-6">
            <AdsBlock slot="income-tax-below-calculator" />
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="income-tax-how">
          <h2
            id="income-tax-how"
            className="text-lg font-semibold text-slate-900"
          >
            How the {data.regionName} income tax calculator works
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            {content.sections.howItWorks}
          </p>
        </section>

        {/* Examples */}
        <section aria-labelledby="income-tax-examples">
          <h2
            id="income-tax-examples"
            className="text-lg font-semibold text-slate-900"
          >
            Examples
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            {content.sections.examples}
          </p>
        </section>

        {/* Limitations */}
        <section aria-labelledby="income-tax-limitations">
          <h2
            id="income-tax-limitations"
            className="text-lg font-semibold text-slate-900"
          >
            Limitations and important notes
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            {content.sections.limitations}
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="income-tax-faq">
          <h2
            id="income-tax-faq"
            className="text-lg font-semibold text-slate-900"
          >
            FAQs about income tax in {data.regionName}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            {content.faq.map((item) => (
              <article key={item.q}>
                <h3 className="font-semibold">{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Affiliate-ruta */}
        <AffiliateBlock id={`income-tax-${region}-primary`} />
      </div>
    </ToolLayout>
  );
}
