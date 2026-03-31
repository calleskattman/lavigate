import Link from "next/link";
import { studiesContent } from "@/content/studies.en";
import PropertyTaxCostMap from "@/components/studies/PropertyTaxCostMap";

export default function HighestPropertyTaxStates() {
  const data = studiesContent["real-cost-property-tax-by-state"];
  const { sections } = data;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900">
        {data.h1}
      </h1>

      <p className="mb-6 text-sm text-slate-500">
      Published: March 27, 2026 · Last updated: March 27, 2026
</p>

      <p className="mb-12 max-w-4xl text-lg leading-8 text-slate-600">
        {data.intro}
      </p>

      {data.heroHook && (
  <div className="mb-12 rounded-2xl border border-slate-200 bg-blue-50 p-5">
    <p className="text-xl font-semibold leading-8 text-slate-900 md:text-2xl">
      {data.heroHook}
    </p>
    <p className="mt-2 text-sm text-slate-500">
  Based on effective tax rates and median home values across all 50 states.
</p>
  </div>
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

<PropertyTaxCostMap />

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
    View full 50-state ranking ↓
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
  {[
  "Vermont",
  "Kansas",
  "Wisconsin",
  "Michigan",
  "South Dakota",
  "Virginia",
  "Kentucky",
  "Arkansas",
  "Wyoming",
  "West Virginia",
].includes(item.state) ? (
    <Link
      href={`/tools/property-tax/${item.state.toLowerCase().replace(" ", "-")}`}
      className="hover:underline"
    >
      {item.state}
    </Link>
  ) : (
    item.state
  )}
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
                    State
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-slate-900">
                  Estimated Annual Property Tax
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
  {[
    "Vermont",
    "Kansas",
    "Wisconsin",
    "Michigan",
    "South Dakota",
    "Virginia",
    "Kentucky",
    "Arkansas",
    "Wyoming",
    "West Virginia",
  ].includes(row.state) ? (
    <Link
      href={`/tools/property-tax/${row.state.toLowerCase().replaceAll(" ", "-")}`}
      className="hover:underline"
    >
      {row.state}
    </Link>
  ) : (
    row.state
  )}
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
    href="/tools/property-tax"
    className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
  >
    View all property tax calculators by state →
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