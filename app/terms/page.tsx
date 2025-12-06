// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for Lavigate calculators and other content on the site.",
};

export default function TermsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Terms of Use</h1>
      <p className="max-w-2xl text-sm text-slate-700">
        Lavigate provides simplified calculators and informational content for
        general guidance only. The service is provided “as is”, without any
        warranty of completeness, accuracy or fitness for a particular purpose.
      </p>
      <p className="max-w-2xl text-sm text-slate-700">
        By using this website you agree that you are responsible for verifying
        any important decisions with official sources or professional advice.
        Lavigate cannot be held liable for any decisions made based on the
        calculators or content on this site.
      </p>
    </div>
  );
}
