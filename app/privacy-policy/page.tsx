// app/privacy-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Information about how Lavigate handles data, cookies and analytics.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="max-w-2xl text-sm text-slate-700">
        Lavigate does not require you to create an account to use the
        calculators. Any analytics used are only to understand general traffic
        patterns and improve the service. No personally identifying information
        is knowingly collected or sold.
      </p>
      <p className="max-w-2xl text-sm text-slate-700">
        If third-party analytics or advertising tools are added in the future,
        this policy will be updated to describe what data is collected and how
        you can manage your preferences.
      </p>
    </div>
  );
}
