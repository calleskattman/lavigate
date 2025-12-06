// components/layout/ToolLayout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

type ToolLayoutProps = {
  title: string;
  description?: string;
  category: string; // t.ex. "income-tax"
  region?: string;  // t.ex. "Texas"
  children: ReactNode;
};

export function ToolLayout({
  title,
  description,
  category,
  region,
  children,
}: ToolLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav
        className="text-xs text-slate-500"
        aria-label="Breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-slate-700">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools" className="hover:text-slate-700">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="capitalize text-slate-600">
            {category.replace("-", " ")}
          </li>
          {region && (
            <>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700">{region}</li>
            </>
          )}
        </ol>
      </nav>

      {/* Titel + intro */}
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm text-slate-700">{description}</p>
        )}
      </header>

      {/* Huvudinnehåll – vit kortlayout */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {children}
      </section>

      {/* Global disclaimer för alla kalkylatorer */}
      <section className="border-t border-slate-200 pt-4">
        <p className="text-xs text-slate-500">
          Calculations are simplified and for guidance only. Always double-check
          results and current rules with official sources or a qualified
          professional before making financial decisions.
        </p>
      </section>
    </div>
  );
}
