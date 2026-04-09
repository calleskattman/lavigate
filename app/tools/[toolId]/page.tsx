// app/tools/[toolId]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { tools, getToolById, type ToolId } from "@/config/tools";
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

type Props = {
  params: Promise<{
    toolId: string;
  }>;
};

function getToolPages(toolId: ToolId) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  if (tool.id === "mortgage") {
    const pages = Object.values(mortgageData)
      .map((config) => ({
        slug: config.pageSlug,
        label: config.systemName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return { tool, pages };
  }

  const pages = regions
    .filter((region) => tool.supportedRegionIds.includes(region.id))
    .map((region) => ({
      slug: region.slug,
      label: region.displayName ?? region.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return { tool, pages };
}

// ---------- Static params ----------

export function generateStaticParams() {
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}

// ---------- Metadata ----------

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;

  const entry = getToolPages(toolId as ToolId);
  if (!entry) {
    return {};
  }

  return {
    title: `${entry.tool.name} by region | Lavigate`,
    description: `Browse all available ${entry.tool.name.toLowerCase()} pages on Lavigate.`,
    alternates: {
      canonical: `https://lavigate.com/tools/${entry.tool.id}`,
    },
  };
}

// ---------- Page ----------

export default async function ToolCategoryPage({ params }: Props) {
  const { toolId } = await params;

  const entry = getToolPages(toolId as ToolId);
  if (!entry) notFound();

  const { tool, pages } = entry;

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-4 py-12">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Lavigate tools
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {tool.name} by region
        </h1>

        <p className="max-w-3xl text-sm text-slate-600 md:text-base">
          Browse all available {tool.name.toLowerCase()} pages on Lavigate.
          These pages are organized by region or scenario and grouped in one
          place for easier navigation.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Available pages
          </h2>

          <Link
            href="/tools"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Back to all tools
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
          <ul className="grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
            {pages.map((page) => (
              <li key={`${tool.id}-${page.slug}`}>
                <Link
                  href={`/tools/${tool.id}/${page.slug}`}
                  className="block rounded-lg border border-slate-200 p-3 hover:border-blue-500 hover:text-blue-600"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-3xl space-y-4 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          About this calculator category
        </h2>

        <p className="text-sm text-slate-600">
          Tax, payroll and finance rules can vary by region and use case. This
          category page brings related calculators together in one place and
          makes it easier to browse the full set of available pages.
        </p>

        <p className="text-sm text-slate-600">
          Results across Lavigate are estimates and should be used as guidance,
          not as official tax, payroll or lending determinations.
        </p>
      </section>
      {/* Additional internal links */}
      <section className="border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          More {tool.name.toLowerCase()} calculators
        </h2>

        <ul className="flex flex-wrap gap-2 text-sm">
          {getDeterministicWindow([...pages], 12, tool.id).map((page) => (
              <li key={`extra-${tool.id}-${page.slug}`}>
                <Link
                  href={`/tools/${tool.id}/${page.slug}`}
                  className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:border-blue-500 hover:text-blue-600"
                >
                  {page.label}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}