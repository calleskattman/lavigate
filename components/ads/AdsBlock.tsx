// components/ads/AdsBlock.tsx
type AdsBlockProps = {
  slot: string;
  className?: string;
};

const ADS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

/**
 * Generisk annons-placeholder.
 * Visas bara om NEXT_PUBLIC_ADS_ENABLED=true.
 */
export function AdsBlock({ slot, className }: AdsBlockProps) {
  if (!ADS_ENABLED) {
    return null;
  }

  return (
    <div
      className={
        className ??
        "w-full min-h-[90px] bg-slate-100 border border-dashed border-slate-300 rounded-md flex items-center justify-center text-xs text-slate-500"
      }
      data-ad-slot={slot}
    >
      {/* Ad placeholder – ersätts med riktig AdSense-kod senare */}
      Ad placeholder ({slot})
    </div>
  );
}
