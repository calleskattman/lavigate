// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "State and Local Tax Calculators | Lavigate",
  description:
    "Explore income tax, sales tax, paycheck and property tax calculators by state and city. Clear, region-specific tools built from official tax rules.",
  alternates: {
    canonical: "https://lavigate.com/",
  },
};

export default function HomePage() {
  return (
    <div className="space-y-16">

      {/* Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
          LAVIGATE
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          State and local tax calculators by region
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-700 sm:text-base">
          Lavigate provides clear, region-specific income tax, sales tax,
          paycheck and property tax calculators. Each tool is based on
          officially published brackets and rules, with transparent explanations
          and limitations.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Browse all calculators
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            About Lavigate →
          </Link>
        </div>
      </section>

      {/* Category hub links */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Explore calculators by category
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* Income Tax */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              <Link href="/tools/income-tax" className="hover:underline">
                Income tax calculators
              </Link>
            </h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/tools/income-tax/california" className="text-blue-700 hover:underline">
                  California income tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/income-tax/texas" className="text-blue-700 hover:underline">
                  Texas income tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/income-tax/new-york" className="text-blue-700 hover:underline">
                  New York income tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/income-tax/ohio" className="text-blue-700 hover:underline">
                  Ohio income tax calculator
                </Link>
              </li>
            </ul>

            <div className="mt-3">
              <Link
                href="/tools/income-tax"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                View all income tax calculators →
              </Link>
            </div>
          </div>

          {/* Sales Tax */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              <Link href="/tools/sales-tax" className="hover:underline">
                Sales tax calculators
              </Link>
            </h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/tools/sales-tax/california" className="text-blue-700 hover:underline">
                  California sales tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/sales-tax/texas" className="text-blue-700 hover:underline">
                  Texas sales tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/sales-tax/florida" className="text-blue-700 hover:underline">
                  Florida sales tax calculator
                </Link>
              </li>
            </ul>

            <div className="mt-3">
              <Link
                href="/tools/sales-tax"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                View all sales tax calculators →
              </Link>
            </div>
          </div>

          {/* Property Tax */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              <Link href="/tools/property-tax" className="hover:underline">
                Property tax calculators
              </Link>
            </h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/tools/property-tax/los-angeles-city-california" className="text-blue-700 hover:underline">
                  Los Angeles County property tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/property-tax/cook-county-illinois" className="text-blue-700 hover:underline">
                  Cook County property tax calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/property-tax/san-francisco-california" className="text-blue-700 hover:underline">
                  San Francisco property tax calculator
                </Link>
              </li>
            </ul>

            <div className="mt-3">
              <Link
                href="/tools/property-tax"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                View all property tax calculators →
              </Link>
            </div>
          </div>

          {/* Paycheck */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              <Link href="/tools/paycheck" className="hover:underline">
                Paycheck calculators
              </Link>
            </h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/tools/paycheck/texas" className="text-blue-700 hover:underline">
                  Texas paycheck calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/paycheck/virginia" className="text-blue-700 hover:underline">
                  Virginia paycheck calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/paycheck/michigan" className="text-blue-700 hover:underline">
                  Michigan paycheck calculator
                </Link>
              </li>
            </ul>

            <div className="mt-3">
              <Link
                href="/tools/paycheck"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                View all paycheck calculators →
              </Link>
            </div>
          </div>

          {/* Mortgage */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              <Link href="/tools/mortgage" className="hover:underline">
                Mortgage calculators
              </Link>
            </h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/tools/mortgage/va-mortgage-calculator" className="text-blue-700 hover:underline">
                  VA mortgage calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/mortgage/fha-mortgage-calculator" className="text-blue-700 hover:underline">
                  FHA mortgage calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/mortgage/100k-mortgage-payment" className="text-blue-700 hover:underline">
                  $100K mortgage payment calculator
                </Link>
              </li>
            </ul>

            <div className="mt-3">
              <Link
                href="/tools/mortgage"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                View all mortgage calculators →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="max-w-3xl space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          How regional tax calculators work
        </h2>

        <p className="text-sm text-slate-700">
          Tax rules vary significantly between U.S. states and local jurisdictions.
          Income tax brackets, sales tax rates, property tax assessment rules
          and payroll withholding systems differ by region and year.
        </p>

        <p className="text-sm text-slate-700">
          Lavigate’s calculators are built from officially published brackets,
          rates and assessment frameworks. Each page explains how the estimate
          is calculated and highlights important limitations so you understand
          what is included — and what is not.
        </p>

        <p className="text-sm text-slate-700">
          Explore calculators by category above or browse the complete list
          of available tools.
        </p>
      </section>

    </div>
  );
}
