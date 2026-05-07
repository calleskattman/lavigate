import Link from "next/link";
import { studiesContent } from "@/content/studies.en";

export default function HiddenCostsOfHomeownership() {
  const data = studiesContent["hidden-costs-of-homeownership"];
  const { sections } = data;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900">
        {data.h1}
      </h1>

      <p className="mb-6 text-sm text-slate-500">
      Published: May 7, 2026
</p>

      <p className="mb-12 max-w-4xl text-lg leading-8 text-slate-600">
        {data.intro}
      </p>

      <section className="mb-14">
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
    
    <h2 className="mb-2 text-2xl font-semibold text-slate-900">
      Hidden ownership costs buyers often underestimate
    </h2>

    <p className="mb-6 max-w-3xl text-slate-700">
      Mortgage payments are only one part of the real cost of owning a home.
      Buyers also need to plan for recurring and irregular housing expenses
      that can change what a home really costs each month.
    </p>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">🏠</div>
        <div className="font-semibold text-slate-900">Property taxes</div>
        <div className="text-sm text-slate-600 mt-1">
          Often varies heavily by state and county.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">🛡️</div>
        <div className="font-semibold text-slate-900">Insurance</div>
        <div className="text-sm text-slate-600 mt-1">
          Homeowners, flood, wind, and wildfire coverage.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">🏘️</div>
        <div className="font-semibold text-slate-900">HOA fees</div>
        <div className="text-sm text-slate-600 mt-1">
          Recurring community and maintenance fees.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">🔧</div>
        <div className="font-semibold text-slate-900">Maintenance</div>
        <div className="text-sm text-slate-600 mt-1">
          Repairs and upkeep that buyers rarely budget for.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">💡</div>
        <div className="font-semibold text-slate-900">Utilities</div>
        <div className="text-sm text-slate-600 mt-1">
          Electricity, water, sewer, trash, and internet.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">🧰</div>
        <div className="font-semibold text-slate-900">Repairs</div>
        <div className="text-sm text-slate-600 mt-1">
          Unexpected costs that can create budget pressure.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">🌊</div>
        <div className="font-semibold text-slate-900">Supplemental insurance</div>
        <div className="text-sm text-slate-600 mt-1">
          Flood, earthquake, or regional hazard coverage.
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 border border-slate-200">
        <div className="text-2xl mb-2">📄</div>
        <div className="font-semibold text-slate-900">Closing costs</div>
        <div className="text-sm text-slate-600 mt-1">
          One-time expenses buyers often underestimate.
        </div>
      </div>

    </div>
  </div>
</section>

      {Array.isArray(sections.calculatorLinks) && sections.calculatorLinks.length > 0 && (
        <section className="mb-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Explore homeownership cost tools
          </h2>

          <p className="mb-5 max-w-3xl text-slate-700">
          Use Lavigate tools to estimate recurring ownership costs, compare mortgage payments, and understand how housing costs can vary by location.
          </p>

          <div className="flex flex-wrap gap-3">
            {sections.calculatorLinks.slice(0, 8).map((item) => (
              <Link
                key={`top-${item.href}`}
                href={item.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-white hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4">
            <Link
              href="/tools"
              className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
            >
              View all calculators →
            </Link>
          </div>
        </section>
      )}

      {Array.isArray(sections.heroStats) && (
        <section className="mb-14">
          <div className="grid gap-4 md:grid-cols-3">
            {sections.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="text-sm font-medium text-slate-500">
                  {stat.label}
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-600">{stat.note}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {Array.isArray(sections.keyTakeaways) && (
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.keyTakeawaysTitle}
          </h2>
          <ul className="list-disc space-y-3 pl-6 text-slate-700">
            {sections.keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(sections.topHighlights) && (
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.topStatesTitle}
          </h2>

          {sections.topStatesIntro && (
            <p className="mb-6 max-w-4xl text-slate-700">
              {sections.topStatesIntro}
            </p>
          )}

<div className="mb-6">
  <a
    href="#full-ranking"
    className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
  >
    View common hidden cost categories ↓
  </a>
</div>

          <div className="grid gap-4 md:grid-cols-2">
            {sections.topHighlights.map((item) => (
              <div
                key={`${item.rank}-${item.state}`}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-2 text-sm font-medium text-slate-500">
                  #{item.rank}
                </div>
                <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900">
  {item.state}
</h3>
                  <div className="text-lg font-bold text-slate-900">
                    {item.rate}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

<section className="mb-14">
  <h2 className="mb-4 text-2xl font-semibold text-slate-900">
    Most Commonly Underestimated Ownership Costs
  </h2>

  <p className="mb-6 max-w-4xl text-slate-700">
    Buyers often focus heavily on the mortgage payment itself, but many recurring
    ownership costs are underestimated during the buying process. These are some
    of the categories that most commonly create budget pressure after closing.
  </p>

  <div className="overflow-x-auto rounded-xl border border-slate-200">
    <table className="w-full min-w-[640px]">
      <thead className="bg-slate-50">
        <tr>
          <th className="p-3 text-left text-sm font-semibold text-slate-900">
            Rank
          </th>

          <th className="p-3 text-left text-sm font-semibold text-slate-900">
            Cost category
          </th>

          <th className="p-3 text-left text-sm font-semibold text-slate-900">
            Common buyer reaction
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">1</td>
          <td className="p-3 font-medium text-slate-900">Repairs</td>
          <td className="p-3 text-slate-700">
            “We didn’t budget for this.”
          </td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">2</td>
          <td className="p-3 font-medium text-slate-900">
            Property taxes
          </td>
          <td className="p-3 text-slate-700">
            “Higher than expected.”
          </td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">3</td>
          <td className="p-3 font-medium text-slate-900">
            Homeowners insurance
          </td>
          <td className="p-3 text-slate-700">
            “Monthly payment jumped.”
          </td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">4</td>
          <td className="p-3 font-medium text-slate-900">Utilities</td>
          <td className="p-3 text-slate-700">
            “Didn’t expect costs this high.”
          </td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">5</td>
          <td className="p-3 font-medium text-slate-900">HOA fees</td>
          <td className="p-3 text-slate-700">
            “Forgot to include them.”
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section className="mb-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
  <h2 className="mb-4 text-2xl font-semibold text-slate-900">
    Example: Monthly Ownership Costs Beyond the Mortgage
  </h2>

  <p className="mb-6 max-w-4xl text-slate-700">
    Buyers often focus on principal and interest payments, but the total monthly
    cost of owning a home can be substantially higher once recurring ownership
    expenses are included.
  </p>

  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table className="w-full min-w-[640px]">
      <thead className="bg-slate-50">
        <tr>
          <th className="p-3 text-left text-sm font-semibold text-slate-900">
            Cost category
          </th>

          <th className="p-3 text-left text-sm font-semibold text-slate-900">
            Estimated monthly cost
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">Property taxes</td>
          <td className="p-3 text-slate-700">$450</td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">
            Homeowners insurance
          </td>
          <td className="p-3 text-slate-700">$180</td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">Utilities</td>
          <td className="p-3 text-slate-700">$320</td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">HOA fees</td>
          <td className="p-3 text-slate-700">$250</td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">
            Maintenance reserve
          </td>
          <td className="p-3 text-slate-700">$300</td>
        </tr>

        <tr className="border-t border-slate-200">
          <td className="p-3 text-slate-700">Repairs reserve</td>
          <td className="p-3 text-slate-700">$150</td>
        </tr>

        <tr className="border-t-2 border-slate-300 bg-slate-50">
          <td className="p-3 font-semibold text-slate-900">
            Total estimated ownership costs
          </td>

          <td className="p-3 font-bold text-slate-900">
            ~$1,650/month
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="mt-5 text-sm leading-6 text-slate-600">
    These figures are illustrative examples only and will vary by location,
    property type, insurance profile, utility usage, HOA structure, and local
    housing costs.
  </p>
</section>

{Array.isArray(sections.allStates) && (
  <section id="full-ranking" className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.allStatesTitle}
          </h2>

          {sections.allStatesIntro && (
            <p className="mb-6 max-w-4xl text-slate-700">
              {sections.allStatesIntro}
            </p>
          )}

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[640px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-slate-900">
                    Rank
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-slate-900">
                    Cost category
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-slate-900">
                    Why buyers overlook it
                  </th>
                </tr>
              </thead>

              <tbody>
              {sections.allStates.map((row) => (
                  <tr
                    key={`all-${row.rank}-${row.state}`}
                    className="border-t border-slate-200"
                  >
                    <td className="p-3 text-slate-700">{row.rank}</td>
                    <td className="p-3 font-medium text-slate-900">
  {row.state}
</td>
                    <td className="p-3 text-slate-700">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {sections.whyItMatters && (
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.whyItMattersTitle}
          </h2>
          <p className="max-w-4xl text-slate-700">{sections.whyItMatters}</p>
        </section>
      )}

      <section className="mb-14">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          {sections.explanationTitle}
        </h2>

        <p className="mb-6 max-w-4xl text-slate-700">{sections.explanation}</p>

        {Array.isArray(sections.explanationPoints) && (
          <ul className="list-disc space-y-3 pl-6 text-slate-700">
            {sections.explanationPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          {sections.methodologyTitle}
        </h2>

        <p className="mb-6 max-w-4xl text-slate-700">{sections.methodology}</p>

        {Array.isArray(sections.methodologyPoints) && (
          <ul className="list-disc space-y-3 pl-6 text-slate-700">
            {sections.methodologyPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      {Array.isArray(sections.limitations) && (
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.limitationsTitle}
          </h2>
          <ul className="list-disc space-y-3 pl-6 text-slate-700">
            {sections.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(sections.calculatorLinks) && (
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.calculatorSectionTitle}
          </h2>

          {sections.calculatorSectionIntro && (
            <p className="mb-6 max-w-4xl text-slate-700">
              {sections.calculatorSectionIntro}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {sections.calculatorLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4">
  <Link
    href="/tools"
    className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
  >
    View all calculators →
  </Link>
</div>
        </section>
      )}

      {sections.citationTitle && sections.citationText && sections.citationExample && (
        <section className="mb-14 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            {sections.citationTitle}
          </h2>
          <p className="mb-4 text-slate-700">{sections.citationText}</p>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {sections.citationExample}
          </div>
        </section>
      )}

      {Array.isArray(sections.faq) && (
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">
            {sections.faqTitle}
          </h2>

          <div className="space-y-4">
            {sections.faq.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {item.q}
                </h3>
                <p className="text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {Array.isArray(sections.sources) && (
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            {sections.sourcesTitle}
          </h2>

          <ul className="list-disc space-y-3 pl-6 text-slate-700">
            {sections.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

<section className="mb-14">
  <h2 className="mb-4 text-2xl font-semibold text-slate-900">
    Related studies and calculators
  </h2>

  <p className="mb-6 max-w-4xl text-slate-700">
    Explore additional housing-cost and property-tax resources from Lavigate.
  </p>

  <div className="grid gap-4 md:grid-cols-2">
    <Link
      href="/studies/real-cost-property-tax-by-state"
      className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
    >
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        Real Cost of Property Taxes by State
      </h3>

      <p className="text-sm leading-6 text-slate-700">
        Compare estimated annual property tax burden across all 50 states.
      </p>
    </Link>

    <Link
      href="/studies/highest-property-tax-states"
      className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
    >
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        States With the Highest Property Taxes
      </h3>

      <p className="text-sm leading-6 text-slate-700">
        See which states have the highest effective property tax rates.
      </p>
    </Link>

    <Link
      href="/tools/mortgage"
      className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
    >
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        Mortgage Calculator
      </h3>

      <p className="text-sm leading-6 text-slate-700">
        Estimate monthly mortgage payments and ownership costs.
      </p>
    </Link>

    <Link
      href="/tools/property-tax"
      className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
    >
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        Property Tax Calculators
      </h3>

      <p className="text-sm leading-6 text-slate-700">
        Compare property tax estimates across multiple states and regions.
      </p>
    </Link>
  </div>
</section>

      {sections.disclaimer && (
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm leading-7 text-slate-600">
            {sections.disclaimer}
          </p>
        </section>
      )}
    </main>
  );
}