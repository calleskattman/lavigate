// components/navigation/RelatedToolRegions.tsx
import Link from "next/link";

import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

type Props = {
  toolId: string;
  currentRegionId: string;
};

export function RelatedToolRegions({ toolId, currentRegionId }: Props) {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return null;

  const relatedRegions = tool.supportedRegionIds
    .filter((id) => id !== currentRegionId)
    .map((id) => regions.find((r) => r.id === id))
    .filter(Boolean)
    .slice(0, 3);

  if (relatedRegions.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-6">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">
        Related {tool.label} calculators
      </h2>

      <ul className="space-y-2">
        {relatedRegions.map((region) => (
          <li key={region!.id}>
            <Link
              href={`${tool.basePath}/${region!.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {region!.displayName} {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
