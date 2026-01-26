// components/tools/SalesTaxTool.tsx
"use client";

import { useMemo, useState } from "react";
import type { SalesTaxConfig } from "@/lib/types";

type SalesTaxToolProps = {
  config: SalesTaxConfig;
};

export default function SalesTaxTool({ config }: SalesTaxToolProps) {
  const [amountInput, setAmountInput] = useState<string>("");

  const amount = useMemo(() => {
    const cleaned = amountInput.replace(/\s+/g, "").replace(",", ".");
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [amountInput]);

  const totalRate = useMemo(() => {
    return config.components.reduce((sum, c) => sum + c.rate, 0);
  }, [config.components]);

  const taxAmount = useMemo(() => {
    if (amount <= 0) return 0;
    return amount * totalRate;
  }, [amount, totalRate]);

  const totalWithTax = amount + taxAmount;

  const formatUsd = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  const formatPercent = (value: number) =>
    `${(value * 100).toFixed(2)}%`;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Input-kolumn */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="amount-input"
            className="block text-sm mb-1 text-slate-800"
          >
            Purchase amount
          </label>
          <input
            id="amount-input"
            type="number"
            inputMode="decimal"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="e.g. 100.00"
            min={0}
          />
          <p className="mt-1 text-xs text-slate-500">
            Enter the purchase price before sales tax.
          </p>
        </div>
      </div>

      {/* Resultat-kolumn */}
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Estimated sales tax
        </h3>

        {amount <= 0 ? (
          <p className="text-sm text-slate-700">
            Shows an estimated sales tax amount based on the configured rates.
          </p>
        ) : (
          <>
            <dl className="space-y-2 text-sm text-slate-800">
              <div className="flex items-center justify-between gap-4">
                <dt>Total sales tax rate</dt>
                <dd className="font-medium text-emerald-700">
                  {formatPercent(totalRate)}
                </dd>
              </div>

              {config.components.map((component) => (
                <div
                  key={component.name}
                  className="flex items-center justify-between gap-4 text-slate-600"
                >
                  <dt>{component.name}</dt>
                  <dd>{formatPercent(component.rate)}</dd>
                </div>
              ))}

              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-2 mt-2">
                <dt>Sales tax</dt>
                <dd className="font-medium">{formatUsd(taxAmount)}</dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="font-semibold">Total price</dt>
                <dd className="text-lg font-bold text-slate-900">
                  {formatUsd(totalWithTax)}
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-xs text-slate-500">
              Calculations are simplified and based on the configured sales tax
              components. Actual tax may vary depending on local rules and
              exemptions.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
