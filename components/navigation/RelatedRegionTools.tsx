import Link from "next/link";
import { tools } from "@/config/tools";
import { regions } from "@/config/regions";

type Props = {
  currentToolId: string;
  regionId: string;
};

export function RelatedRegionTools({ currentToolId, regionId }: Props) {
  const region = regions.find((r) => r.id === regionId);
  if (!region) return null;

  const relatedTools = tools
    .filter(
      (tool) =>
        tool.id !== currentToolId &&
        tool.supportedRegionIds.includes(regionId)
    )
    .slice(0, 2);

  if (relatedTools.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-6">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">
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
