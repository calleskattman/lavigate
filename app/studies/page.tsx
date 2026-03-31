import Link from "next/link";

export default function StudiesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        Research and data studies
      </h1>

      <p className="text-lg text-gray-600 mb-12">
        Data-driven studies about taxes, property costs, and financial trends
        across the United States.
      </p>

      <div className="grid gap-6">

        <Link
          href="/studies/highest-property-tax-states"
          className="border rounded-lg p-6 hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            States With the Highest Property Taxes (2026)
          </h2>

          <p className="text-gray-600">
            Compare effective property tax rates across all U.S. states and see
            where homeowners pay the most.
          </p>
        </Link>

        <Link
          href="/studies/real-cost-property-tax-by-state"
          className="border rounded-lg p-6 hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Real Cost of Property Taxes by State (2026)
          </h2>

          <p className="text-gray-600">
            Compare nominal property tax rates with actual homeowner costs to
            understand the true financial burden across all U.S. states.
          </p>
        </Link>

      </div>

    </main>
  );
}