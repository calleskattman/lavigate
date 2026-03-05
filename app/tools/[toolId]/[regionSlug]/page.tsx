// app/tools/[toolId]/[regionSlug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import type { MortgageConfig } from "@/config/data/mortgage";

import { CURRENT_TAX_YEAR } from "@/config/site";
import { getRegionBySlug, regions } from "@/config/regions";
import { getToolById, tools } from "@/config/tools";

import { getIncomeTaxConfig } from "@/config/data/incomeTax";
import { getSalesTaxConfig } from "@/config/data/salesTax";
import { getPaycheckConfig } from "@/config/data/paycheck";
import { getPropertyTaxConfig } from "@/config/data/propertyTax";
import { mortgageData } from "@/config/data/mortgage";

import { incomeTaxSeoContent } from "@/content/income-tax.en";
import { salesTaxSeoContent } from "@/content/sales-tax.en";
import { paycheckSeoContent } from "@/content/paycheck.en";
import { propertyTaxSeoContent } from "@/content/property-tax.en";
import { mortgageSeoContent } from "@/content/mortgage.en";

import { ToolLayout } from "@/components/layout/ToolLayout";
import IncomeTaxTool from "@/components/tools/IncomeTaxTool";
import SalesTaxTool from "@/components/tools/SalesTaxTool";
import PaycheckTool from "@/components/tools/PaycheckTool";
import PropertyTaxTool from "@/components/tools/PropertyTaxTool";
import MortgageTool from "@/components/tools/MortgageTool";

import { RelatedToolRegions } from "@/components/navigation/RelatedToolRegions";
import { RelatedRegionTools } from "@/components/navigation/RelatedRegionTools";

import {
  buildFaqSchema,
  buildIncomeTaxSoftwareSchema,
  buildSalesTaxSoftwareSchema,
} from "@/lib/schema";

type PageProps = {
  params: Promise<{
    toolId: string;
    regionSlug: string;
  }>;
};



// ---------------------------------
// Metadata (Next 16-safe)
// ---------------------------------

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId as any);
if (!tool) return {};

// mortgage = slug-baserad SEO
if (tool.id === "mortgage") {
  const seo = mortgageSeoContent[regionSlug];
  if (!seo?.meta) return {};

  return {
    title: seo.meta.title,
    description: seo.meta.description,
    alternates: {
      canonical: `https://lavigate.com/tools/mortgage/${regionSlug}`,
    },
  };
}

// övriga verktyg = region-baserade
const region = getRegionBySlug(regionSlug);
if (!region) return {};

  let seo: any;

  switch (tool.id) {
    case "income-tax":
      seo = incomeTaxSeoContent[region.id];
      break;
    case "sales-tax":
      seo = salesTaxSeoContent[region.id];
      break;
    case "paycheck":
      seo = paycheckSeoContent[region.id];
      break;
    case "property-tax":
      seo = propertyTaxSeoContent[region.id];
      break;
    default:
      return {};
  }

  if (!seo?.meta) return {};

  const title = seo.meta.title.replace(
    /\b20\d{2}\b/,
    String(CURRENT_TAX_YEAR)
  );

  return {
    title,
    description: seo.meta.description,
    alternates: {
      canonical: `https://lavigate.com/tools/${tool.id}/${region.slug}`,
    },
  };
}



// ---------------------------------
// Static params
// ---------------------------------

export function generateStaticParams() {
  return tools.flatMap((tool) => {
    if (tool.id === "mortgage") {
      return Object.keys(mortgageData).map((slug) => ({
        toolId: "mortgage",
        regionSlug: slug,
      }));
    }

    return tool.supportedRegionIds
      .map((regionId) => regions.find((r) => r.id === regionId))
      .filter(Boolean)
      .map((region) => ({
        toolId: tool.id,
        regionSlug: region!.slug,
      }));
  });
}




// ---------------------------------
// Page
// ---------------------------------

export default async function ToolRegionPage({
  params,
}: PageProps) {

  const { toolId, regionSlug } = await params;

  const tool = getToolById(toolId as any);
if (!tool) notFound();

const isMortgage = tool.id === "mortgage";
const region = isMortgage
  ? undefined
  : getRegionBySlug(regionSlug);

if (!isMortgage && !region) {
  notFound();
}


  let config: any;
  let seo: any;

  switch (tool.id) {
    case "mortgage":
      config = mortgageData[regionSlug];
      seo = mortgageSeoContent[regionSlug];
      break;    

    case "income-tax":
      config = getIncomeTaxConfig(region!.id);
      seo = incomeTaxSeoContent[region!.id];
      break;

    case "sales-tax":
      config = getSalesTaxConfig(region!.id);
      seo = salesTaxSeoContent[region!.id];
      break;

    case "paycheck":
      config = getPaycheckConfig(region!.id);
      seo = paycheckSeoContent[region!.id];
      break;

    case "property-tax":
      config = getPropertyTaxConfig(region!.id);
      seo = propertyTaxSeoContent[region!.id];
      break;

    default:
      notFound();
  }

  if (!config || !seo) {
    notFound();
  }

  const pageUrl = isMortgage
  ? `https://lavigate.com/tools/mortgage/${regionSlug}`
  : `https://lavigate.com/tools/${tool.id}/${region!.slug}`;


  const faqSchema =
    Array.isArray(seo.faq) && seo.faq.length > 0
      ? buildFaqSchema(seo.faq)
      : null;

  const softwareSchema =
    tool.id === "income-tax"
      ? buildIncomeTaxSoftwareSchema({ content: seo, pageUrl })
      : tool.id === "sales-tax"
      ? buildSalesTaxSoftwareSchema({ content: seo, pageUrl })
      : null;

  const h1 = seo.h1.replace(
    /\b20\d{2}\b/,
    String(CURRENT_TAX_YEAR)
  );



  return (
    <>
      {faqSchema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {softwareSchema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}

      <ToolLayout
        title={h1}
        description={seo.intro}
        category={tool.id}
        region={isMortgage ? "United States" : region!.displayName}
      >
        <p className="text-sm text-slate-600">
        Estimates only. Loan terms and approval depend on lender underwriting.
        </p>

        {tool.id === "income-tax" && <IncomeTaxTool config={config} />}
        {tool.id === "sales-tax" && <SalesTaxTool config={config} />}
        {tool.id === "paycheck" && <PaycheckTool config={config} />}
        {tool.id === "property-tax" && <PropertyTaxTool config={config} />}
        {tool.id === "mortgage" && (
  <MortgageTool config={config as MortgageConfig} />
)}


        {seo.sections?.howItWorks && (
          <section className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              How it works
            </h2>
            <p className="text-slate-700">
              {seo.sections.howItWorks}
            </p>
          </section>
        )}

        {seo.sections?.examples && (
          <section className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Examples
            </h2>
            <p className="text-slate-700">
              {seo.sections.examples}
            </p>
          </section>
        )}

        {seo.sections?.limitations && (
          <section className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Limitations and important notes
            </h2>
            <p className="text-slate-700">
              {seo.sections.limitations}
            </p>
          </section>
        )}

        {Array.isArray(seo.faq) && seo.faq.length > 0 && (
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              FAQs
            </h2>

            {seo.faq.map(
              (item: { q: string; a: string }, index: number) => (
                <div key={index}>
                  <h3 className="font-medium text-slate-900">
                    {item.q}
                  </h3>
                  <p className="text-sm text-slate-700">
                    {item.a}
                  </p>
                </div>
              )
            )}
          </section>
        )}

{!isMortgage && region && (
  <>
    <RelatedToolRegions
      toolId={tool.id}
      currentRegionId={region.id}
    />
    <RelatedRegionTools
      currentToolId={tool.id}
      regionId={region.id}
    />
  </>
)}

      </ToolLayout>
    </>
  );
}
