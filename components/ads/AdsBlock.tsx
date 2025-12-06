// components/ads/AdsBlock.tsx

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

type AdsBlockProps = {
  slot: string; // identifier så vi kan veta var annonsen sitter (t.ex. "income-tax-top")
};

export function AdsBlock({ slot }: AdsBlockProps) {
  // När ads är avstängda ska inget synas alls i UI
  if (!ADS_ENABLED) {
    return null;
  }

  return (
    <div
      className="w-full min-h-[90px] bg-slate-100 border border-dashed border-slate-300 rounded-md flex items-center justify-center text-xs text-slate-500"
      data-ad-slot={slot}
    >
      {/* Ad placeholder – replace with real AdSense code later */}
      Ad placeholder ({slot})
    </div>
  );
}
