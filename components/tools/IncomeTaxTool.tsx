// components/tools/IncomeTaxTool.tsx
"use client";

import { useMemo, useState } from "react";
import type { IncomeTaxConfig } from "@/lib/types";

type IncomeTaxToolProps = {
  config: IncomeTaxConfig;
};

export default function IncomeTaxTool({ config }: IncomeTaxToolProps) {
  const [incomeInput, setIncomeInput] = useState<string>("");

  const income = useMemo(() => {
    const cleaned = incomeInput.replace(/\s+/g, "").replace(",", ".");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [incomeInput]);

  const { tax, effectiveRate, afterTaxIncome } = useMemo(() => {
    if (income <= 0) {
      return { tax: 0, effectiveRate: 0, afterTaxIncome: 0 };
    }

    let remaining = income;
    let totalTax = 0;

    for (const bracket of config.brackets) {
      const from = bracket.from;
      const to = bracket.to ?? Infinity;

      if (income <= from) continue;

      const taxableInBracket = Math.min(remaining, to - from);
      if (taxableInBracket <= 0) continue;

      const bracketTax = taxableInBracket * bracket.rate;
      totalTax += bracketTax;
      remaining -= taxableInBracket;

      if (remaining <= 0) break;
    }

    const effectiveRateCalc = totalTax / income;
    const afterTax = income - totalTax;

    return {
      tax: totalTax,
      effectiveRate: effectiveRateCalc,
      afterTaxIncome: afterTax,
    };
  }, [income, config.brackets]);

  const formatUsd = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const formatPercent = (value: number) =>
    `${(value * 100).toFixed(2).replace(".", ",")}%`;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Input-kolumn */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="income-input"
            className="block text-sm mb-1 text-slate-800"
          >
            Annual taxable income
          </label>
          <input
            id="income-input"
            type="number"
            inputMode="decimal"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
            placeholder="e.g. 60,000"
            min={0}
          />
          <p className="mt-1 text-xs text-slate-500">
            Annual taxable income for the selected tax year.
          </p>
        </div>
      </div>

      {/* Resultat-kolumn */}
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Estimated state income tax
        </h3>

        {income <= 0 ? (
          <p className="text-sm text-slate-700">
            Shows an estimated state income tax and an effective rate based on the provided values.
          </p>
        ) : (
          <>
            <dl className="space-y-2 text-sm text-slate-800">
              <div className="flex items-center justify-between gap-4">
                <dt>Estimated tax</dt>
                <dd className="font-medium">{formatUsd(tax)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Effective tax rate</dt>
                <dd className="font-medium text-emerald-700">
                  {formatPercent(effectiveRate)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-2 mt-2">
                <dt className="font-semibold">Income after tax</dt>
                <dd className="text-lg font-bold text-slate-900">
                  {formatUsd(afterTaxIncome)}
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-xs text-slate-500">
              Calculations are simplified and based only on the configured state
              brackets. Federal taxes, local taxes, deductions and credits are
              not included.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
