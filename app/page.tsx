// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero / intro */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
          LAVIGATE
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Navigate your finances with clear, region-specific calculators.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-700 sm:text-base">
          Lavigate helps you understand income tax, paychecks, loans and
          interest with transparent calculators tailored to each region.
          No sign-up, no fluff – just numbers you can trust.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Browse calculators
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Learn more about Lavigate →
          </Link>
        </div>
      </section>

      {/* Intro till första versionen */}
      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">
          Starting with tax and paycheck calculators
        </h2>
        <p className="max-w-3xl text-sm text-slate-700">
          The first version of Lavigate focuses on income tax and paycheck
          calculators for selected regions. Each calculator is built from
          official brackets and rules, with clear explanations and limitations
          on every page.
        </p>
      </section>

      {/* Feature-kort */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            Income tax calculators
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Understand how much tax you pay by region and year, including
            federal and state components where applicable.
          </p>
          <div className="mt-4">
            <Link
              href="/tools/income-tax/texas"
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              View an example – Texas →
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            Built for transparency
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Each tool explains how the calculation works, links to official
            sources, and highlights important limitations so you always know
            what the numbers mean.
          </p>
          <div className="mt-4 text-xs text-slate-500">
            More calculators – paychecks, loans and interest – will be added
            step by step as the project grows.
          </div>
        </article>
      </section>
    </div>
  );
}
