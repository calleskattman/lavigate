// components/ads/AffiliateBlock.tsx

const AFFILIATE_ENABLED = process.env.NEXT_PUBLIC_AFFILIATE_ENABLED === "true";

type AffiliateBlockProps = {
  id: string; // t.ex. "income-tax-us-texas", "mortgage-uk"
  title?: string;
  description?: string;
};

export function AffiliateBlock({
  id,
  title = "Relevant offer coming soon",
  description = "This section will later contain a recommended provider or offer tailored to this calculator and region.",
}: AffiliateBlockProps) {
  // När affiliate är avstängt ska inget visas i UI
  if (!AFFILIATE_ENABLED) {
    return null;
  }

  return (
    <div
      className="w-full border rounded-md p-4 bg-slate-50 text-sm text-slate-700 space-y-1"
      data-affiliate-id={id}
    >
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Affiliate placeholder
      </div>
      <h3 className="text-sm font-semibold text-slate-900">
        {title}
      </h3>
      <p className="text-xs text-slate-600">
        {description}
      </p>
    </div>
  );
}
