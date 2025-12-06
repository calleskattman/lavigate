// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Lavigate",
  description:
    "Learn what Lavigate is, why it exists and how we build our finance calculators.",
};

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">About Lavigate</h1>
      <p className="max-w-2xl text-sm text-slate-700">
        Lavigate is a project focused on making financial calculations easier
        to understand. The goal is to offer clear, region-specific calculators
        for taxes, paychecks and loans, together with transparent explanations
        and links to official sources.
      </p>
      <p className="max-w-2xl text-sm text-slate-700">
        All calculators are simplified models. We always recommend verifying
        important decisions with official authorities, banks or a qualified
        professional.
      </p>
    </div>
  );
}
