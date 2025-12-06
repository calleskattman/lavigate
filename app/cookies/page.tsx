// app/cookies/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Learn how cookies may be used on Lavigate and how you can control them.",
};

export default function CookiesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Cookies</h1>
      <p className="max-w-2xl text-sm text-slate-700">
        Lavigate may use cookies or similar technologies to remember basic
        preferences and to measure anonymous usage statistics. These cookies
        are not intended to identify you as an individual.
      </p>
      <p className="max-w-2xl text-sm text-slate-700">
        You can control or delete cookies at any time in your browser settings.
        If you choose to block cookies, the calculators should still work, but
        some analytics or personalization features may be limited.
      </p>
    </div>
  );
}
