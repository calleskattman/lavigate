"use client";

import { useMemo, useState } from "react";
import type { PropertyTaxConfig } from "@/config/data/propertyTax";

type Props = {
  config: PropertyTaxConfig;
};

export default function PropertyTaxTool({ config }: Props) {
  const [propertyValue, setPropertyValue] = useState<number | "">("");

  const result = useMemo(() => {
    if (propertyValue === "" || propertyValue <= 0) {
      return null;
    }

    const inputValue = Number(propertyValue);

    // 1. Assessed value
    let assessedValue = inputValue;

    if (config.valuation.method === "marketWithRatio") {
      const ratio = config.valuation.assessmentRatio ?? 1;
      assessedValue = inputValue * ratio;
    }

    // 2. Apply exemptions
    let taxableValue = assessedValue;

    if (config.exemptions) {
      for (const exemption of config.exemptions) {
        if (exemption.type === "flat") {
          taxableValue -= exemption.amount;
        }

        if (exemption.type === "percentage") {
          taxableValue *= 1 - exemption.rate;
        }
      }
    }

    if (taxableValue < 0) {
      taxableValue = 0;
    }

    // 3. Total rate
    const totalRate = config.rates.components.reduce(
      (sum, component) => sum + component.rate,
      0
    );

    // 4. Final tax
    const totalTax = taxableValue * totalRate;

    // 5. Effective tax rate (based on input value)
    const effectiveRate =
      inputValue > 0 ? totalTax / inputValue : 0;

    return {
      assessedValue,
      taxableValue,
      totalTax,
      effectiveRate,
    };
  }, [propertyValue, config]);

  const inputLabel =
  config.valuation.method === "assessed"
    ? "Assessed value"
    : config.valuation.method === "marketWithRatio"
    ? "Market value"
    : "Property value";


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Form */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="propertyValue"
            className="block text-sm font-medium text-slate-700"
          >
            {inputLabel}
          </label>
          <input
            id="propertyValue"
            type="number"
            min="0"
            step="any"
            value={propertyValue}
            onChange={(e) =>
              setPropertyValue(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="e.g. 500000"
          />
        </div>
      </div>

      {/* Results */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Estimated property tax
        </h3>

        {!result ? (
          <p className="mt-4 text-slate-600">
            Enter the {inputLabel.toLowerCase()} to see the estimated annual property tax.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-slate-600">Annual property tax</p>
              <p className="text-2xl font-semibold text-slate-900">
                ${result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-600">Effective tax rate</p>
              <p className="text-base font-medium text-slate-900">
                {(result.effectiveRate * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
