import Link from "next/link";
import type { Metadata } from "next";

import { mortgageData } from "@/config/data/mortgage";
import { mortgageSeoContent } from "@/content/mortgage.en";

export const metadata: Metadata = {
  title: "Mortgage calculators | Lavigate",
  description:
    "Browse mortgage calculators including VA, FHA, USDA and common loan scenarios. Estimates only.",
  alternates: {
    canonical: "https://lavigate.com/tools/mortgage",
  },
};

export default function MortgageIndexPage() {
  const pages = Object.values(mortgageData).map((cfg) => {
    const seo = mortgageSeoContent[cfg.pageSlug];
    return {
      slug: cfg.pageSlug,
      label: seo?.h1 ?? cfg.systemName,
      intro: seo?.intro,
    };
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Mortgage
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Mortgage calculators
        </h1>
        <p className="max-w-3xl text-sm md:text-base text-slate-600">
          Browse mortgage calculators for different loan programs and common
          scenarios. Results are estimates for guidance only.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
        <ul className="flex flex-wrap gap-2 text-sm">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/tools/mortgage/${p.slug}`}
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
