// components/ads/AffiliateBlock.tsx

const AFFILIATE_ENABLED =
  process.env.NEXT_PUBLIC_AFFILIATE_ENABLED === "true";

type AffiliateBlockProps = {
  id: string; // t.ex. "income-tax-US-TX"
};

export function AffiliateBlock({ id }: AffiliateBlockProps) {
  // Global toggle – rendera inget om affiliate är avstängt
  if (!AFFILIATE_ENABLED) {
    return null;
  }

  return (
    <aside
      className="w-full rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
      data-affiliate-id={id}
      aria-label="Recommended providers"
    >
      {/* Placeholder-text – ersätts senare med riktig affiliate-content */}
      <p className="font-medium text-slate-900">
        Recommended providers for this calculator
      </p>
      <p className="mt-1 text-xs text-slate-600">
        This section will later contain carefully selected offers and providers
        relevant to this calculator and region.
      </p>
    </aside>
  );
}
