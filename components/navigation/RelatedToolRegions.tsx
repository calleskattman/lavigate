// components/navigation/RelatedToolRegions.tsx
import Link from "next/link";

import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

type Props = {
  toolId: string;
  currentRegionId: string;
};

const MAX_LINKS = 4;

export function RelatedToolRegions({ toolId, currentRegionId }: Props) {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return null;

  const availableRegions = tool.supportedRegionIds
    .map((id) => regions.find((r) => r.id === id))
    .filter((region): region is NonNullable<typeof region> => Boolean(region))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  if (availableRegions.length <= 1) return null;

  const currentIndex = availableRegions.findIndex(
    (region) => region.id === currentRegionId
  );

  if (currentIndex === -1) return null;

  const selected: typeof availableRegions = [];
  const selectedIds = new Set<string>();

  const addRegion = (region: (typeof availableRegions)[number] | undefined) => {
    if (!region) return;
    if (region.id === currentRegionId) return;
    if (selectedIds.has(region.id)) return;

    selected.push(region);
    selectedIds.add(region.id);
  };

  const total = availableRegions.length;

  const preferredOffsets = [
    1,
    Math.floor(total / 3),
    Math.floor(total / 2),
    Math.floor((2 * total) / 3),
  ].filter((offset) => offset > 0);

  for (const offset of preferredOffsets) {
    const candidate = availableRegions[(currentIndex + offset) % total];
    addRegion(candidate);

    if (selected.length >= MAX_LINKS) break;
  }

  for (let step = 1; step < total && selected.length < MAX_LINKS; step++) {
    const candidate = availableRegions[(currentIndex + step) % total];
    addRegion(candidate);
  }

  if (selected.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-6">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Related {tool.label} calculators
      </h2>

      <ul className="space-y-2">
        {selected.map((region) => (
          <li key={region.id}>
            <Link
              href={`${tool.basePath}/${region.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {region.displayName} {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}