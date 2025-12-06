// app/tools/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finance calculators",
  description:
    "Browse Lavigate’s finance calculators by category, starting with income tax calculators for selected regions. More tools for paychecks, loans and interest are coming soon.",
  alternates: {
    canonical: "https://lavigate.com/tools",
  },
};

export default function ToolsPage() {
  return (
    <div className="space-y-8 md:space-y-10">
      {/* Intro */}
      <section aria-labelledby="tools-heading" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Lavigate tools
        </p>

        <h1
          id="tools-heading"
          className="text-3xl font-semibold tracking-tight text-slate-900"
        >
          Finance calculators
        </h1>

        <p className="max-w-2xl text-sm md:text-base text-slate-600">
          Lavigate will gradually roll out calculators for income tax,
          paychecks, car loans and mortgages across multiple regions. For now
          you can preview the income tax layout for a few test regions.
        </p>
      </section>

      {/* Categories */}
      <section
        aria-label="Calculator categories"
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Income tax calculators */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="text-lg font-semibold text-slate-900">
            Income tax calculators
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Estimate your state or regional income tax for a given year using
            progressive tax brackets and clear explanations.
          </p>

          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <Link
                href="/tools/income-tax/texas"
                className="text-blue-700 hover:text-blue-800 underline-offset-2 hover:underline"
              >
                Texas income tax calculator 2025
              </Link>
              <span className="ml-2 text-xs text-slate-500">(demo layout)</span>
            </li>
            <li>
              <Link
                href="/tools/income-tax/california"
                className="text-blue-700 hover:text-blue-800 underline-offset-2 hover:underline"
              >
                California income tax calculator 2025
              </Link>
              <span className="ml-2 text-xs text-slate-500">(demo layout)</span>
            </li>
          </ul>

          <p className="mt-4 text-xs text-slate-500">
            As we add more regions, they will automatically appear here using
            the same structure.
          </p>
        </article>

        {/* Paycheck calculators */}
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="text-lg font-semibold text-slate-900">
            Paycheck calculators
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Coming soon: net salary estimates by region, including tax, social
            security and other deductions.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Once the income tax structure is stable, we&apos;ll reuse the same
            pattern here for paycheck / net salary tools.
          </p>
        </article>

        {/* Loans & interest calculators */}
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Loan & interest calculators
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Coming soon: calculators for car loans, mortgages and compound
            interest with clear breakdowns over time.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            These tools will follow the same layout principles as the income tax
            calculators, with region-specific parameters and transparent
            explanations.
          </p>
        </article>
      </section>
    </div>
  );
}
