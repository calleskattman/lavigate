import Link from "next/link";

import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

type Props = {
  currentToolId: string;
  regionId: string;
};

const MAX_LINKS = 6;

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function RelatedRegionTools({ currentToolId, regionId }: Props) {
  const region = regions.find((r) => r.id === regionId);
  if (!region) return null;

  const availableTools = tools
    .filter(
      (tool) =>
        tool.id !== currentToolId &&
        tool.supportedRegionIds.includes(regionId)
    )
    .sort((a, b) => a.id.localeCompare(b.id));

  if (availableTools.length === 0) return null;

  const startIndex =
    availableTools.length <= MAX_LINKS
      ? 0
      : hashString(`${regionId}:${currentToolId}`) % availableTools.length;

  const rotatedTools =
    availableTools.length <= MAX_LINKS
      ? availableTools
      : [
          ...availableTools.slice(startIndex),
          ...availableTools.slice(0, startIndex),
        ];

  const relatedTools = rotatedTools.slice(0, MAX_LINKS);

  return (
    <section className="mt-12 border-t border-slate-200 pt-6">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Related calculators in {region.displayName}
      </h2>

      <ul className="space-y-2">
        {relatedTools.map((tool) => (
          <li key={tool.id}>
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