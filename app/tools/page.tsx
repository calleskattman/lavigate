// app/tools/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

export const metadata: Metadata = {
  title: "Finance calculators",
  description:
    "Browse Lavigate’s finance calculators by category and region, including income tax calculators for US states and other regions.",
  alternates: {
    canonical: "https://lavigate.com/tools",
  },
};

export default function ToolsIndexPage() {
  // Kopplar varje verktyg till de regioner som är aktiverade i config
  const toolWithRegions = tools
    .map((tool) => ({
      tool,
      regions: regions.filter((region) =>
        tool.supportedRegionIds.includes(region.id)
      ),
    }))
    .filter((entry) => entry.regions.length > 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* Intro */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Lavigate tools
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Finance calculators
        </h1>

        <p className="max-w-2xl text-sm md:text-base text-slate-600">
          Explore Lavigate’s calculators by region. Each tool uses
          region-specific tax rules and assumptions defined in our config files.
        </p>
      </header>

      {/* Lista med verktyg + regioner */}
      <div className="space-y-8">
        {toolWithRegions.map(({ tool, regions }) => (
          <section key={tool.id} className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {tool.name}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
              <p className="mb-3 text-xs text-slate-600">
                Available regions:
              </p>
              <ul className="flex flex-wrap gap-2 text-sm">
                {regions.map((region) => (
                  <li key={region.id}>
                    <Link
                      href={`/tools/${tool.id}/${region.slug}`}
                      className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:border-blue-500 hover:text-blue-600"
                    >
                      {region.displayName ?? region.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* Global disclaimer */}
      <section className="border-t border-slate-200 pt-4">
        <p className="text-xs text-slate-500">
          Calculators are simplified and for guidance only. Always double-check
          results and current rules with official sources or a qualified
          professional before making financial decisions.
        </p>
      </section>
    </main>
  );
}
