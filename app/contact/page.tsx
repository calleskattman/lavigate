// app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Lavigate project.",
};

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
      <p className="max-w-2xl text-sm text-slate-700">
        Lavigate is currently a small project under active development.
        If you have feedback about a calculator, notice incorrect data or
        want to suggest a new region, you can reach out via email:
      </p>
      <p className="text-sm font-medium text-blue-700">
        {/* byt till din riktiga adress när du vill */}
        contact@lavigate.com
      </p>
    </div>
  );
}
