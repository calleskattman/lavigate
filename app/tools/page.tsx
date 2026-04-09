// app/tools/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { regions } from "@/config/regions";
import { mortgageData } from "@/config/data/mortgage";

function getDeterministicWindow<T>(
  items: T[],
  limit: number,
  seed: string
): T[] {
  if (items.length <= limit) return items;

  const startIndex =
    seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    items.length;

  return Array.from({ length: limit }, (_, index) => {
    return items[(startIndex + index) % items.length];
  });
}


export const metadata: Metadata = {
  title: "Finance calculators by category | Lavigate",
  description:
    "Browse income tax, sales tax, paycheck and property tax calculators by region. Explore official rule-based financial tools by state and locality.",
  alternates: {
    canonical: "https://lavigate.com/tools",
  },
};

export default function ToolsIndexPage() {
  

  const toolEntries = tools
  .map((tool) => {
    if (tool.id === "mortgage") {
      return {
        tool,
        pages: Object.values(mortgageData).map((config) => ({
          slug: config.pageSlug,
          label: config.systemName,
        })),
      };
    }

    return {
      tool,
      pages: regions
        .filter((region) =>
          tool.supportedRegionIds.includes(region.id)
        )
        .map((region) => ({
          slug: region.slug,
          label: region.displayName ?? region.name,
        })),
    };
  })
  .filter((entry) => entry.pages.length > 0);



  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-16">

      {/* Header */}
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Lavigate tools
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Finance calculators by category
        </h1>

        <p className="max-w-3xl text-sm md:text-base text-slate-600">
          Explore region-specific calculators for income tax, sales tax,
          paychecks and property tax. Each tool is based on official
          rules and published brackets, with clear explanations of
          assumptions and limitations.
        </p>
      </header>

      {/* Tool sections */}
      <div className="space-y-12">
        {toolEntries.map(({ tool, pages }) => {
          const prioritizedRegions = regions.slice(0, 8);

          return (
            <section key={tool.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <Link
                  href={`/tools/${tool.id}`}
                  className="text-lg font-semibold text-slate-900 hover:underline"
                >
                  {tool.name}
                </Link>

                <Link
                  href={`/tools/${tool.id}`}
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
              <ul className="flex flex-wrap gap-2 text-sm">
  {getDeterministicWindow([...pages], 8, tool.id).map((page) => (
    <li key={`${tool.id}-${page.slug}`}>
      <Link
        href={`/tools/${tool.id}/${page.slug}`}
        className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:border-blue-500 hover:text-blue-600"
      >
        {page.label}
      </Link>
    </li>
  ))}
</ul>

              </div>
            </section>
          );
        })}
      </div>

      {/* SEO content block */}
      <section className="max-w-3xl space-y-4 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          How to use regional finance calculators
        </h2>

        <p className="text-sm text-slate-600">
          Tax systems and payroll rules vary significantly between states
          and local jurisdictions. Income tax brackets, sales tax rates,
          property tax assessment methods and withholding rules differ
          by region and year.
        </p>

        <p className="text-sm text-slate-600">
          Lavigate calculators are built using official sources and
          structured rule definitions. Results are estimates and
          provided for guidance only.
        </p>
      </section>

    </main>
  );
}
