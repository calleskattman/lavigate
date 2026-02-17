// app/tools/[toolId]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getToolById, type ToolId } from "@/config/tools";
import { regions } from "@/config/regions";

type Props = {
  params: Promise<{
    toolId: string;
  }>;
};

// ---------- Static params ----------

export function generateStaticParams() {
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}

// ---------- Metadata ----------

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { toolId } = await params;

  const tool = getToolById(toolId as ToolId);
  if (!tool) return {};

  return {
    title: `${tool.name}s by region | Lavigate`,
    description: `Browse ${tool.label.toLowerCase()} calculators by region.`,
    alternates: {
      canonical: `https://lavigate.com/tools/${tool.id}`,
    },
  };
}

// ---------- Page ----------

export default async function ToolCategoryPage({
  params,
}: Props) {
  const { toolId } = await params;

  const tool = getToolById(toolId as ToolId);
  if (!tool) notFound();

  const supportedRegions = regions.filter((region) =>
    tool.supportedRegionIds.includes(region.id)
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {tool.name}s by region
        </h1>

        <p className="max-w-3xl text-sm md:text-base text-slate-600">
          Explore {tool.label.toLowerCase()} calculators available by
          state, county and city.
        </p>
      </header>

      <section>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-sm">
          {supportedRegions.map((region) => (
            <li key={region.id}>
              <Link
                href={`/tools/${tool.id}/${region.slug}`}
                className="block rounded-lg border border-slate-200 p-3 hover:border-blue-500 hover:text-blue-600"
              >
                {region.displayName ?? region.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}
