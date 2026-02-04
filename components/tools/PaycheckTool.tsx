"use client";

import { useMemo, useState } from "react";
import type {
  FilingStatus,
  PaycheckConfig,
  TaxBracket,
} from "@/config/data/paycheck";

/* ======================================================
   TYPES
====================================================== */

type Props = {
  config: PaycheckConfig;
};

type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

const PAY_FREQUENCIES: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

/* ======================================================
   HELPERS
====================================================== */

function calculateProgressiveTax(
  income: number,
  brackets: TaxBracket[]
): number {
  let tax = 0;

  for (const bracket of brackets) {
    if (income <= bracket.from) break;

    const upper =
      bracket.to === null ? income : Math.min(income, bracket.to);
    const taxable = Math.max(0, upper - bracket.from);

    tax += taxable * bracket.rate;
  }

  return tax;
}

/* ======================================================
   COMPONENT
====================================================== */

export default function PaycheckTool({ config }: Props) {
  const [incomeType, setIncomeType] = useState<"salary" | "hourly">("salary");
  const [annualSalary, setAnnualSalary] = useState<number | "">("");
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [filingStatus, setFilingStatus] =
    useState<FilingStatus>("single");
  const [payFrequency, setPayFrequency] =
    useState<PayFrequency>("biweekly");

  const annualIncome = useMemo(() => {
    if (incomeType === "salary")
  return typeof annualSalary === "number" ? annualSalary : 0;
    return (
  (typeof hourlyRate === "number" ? hourlyRate : 0) *
  (hoursPerWeek || 0) *
  52
);
  }, [incomeType, annualSalary, hourlyRate, hoursPerWeek]);

  const result = useMemo(() => {
    if (annualIncome <= 0) return null;

    const frequencyDivider = PAY_FREQUENCIES[payFrequency];

    const taxableFederalIncome = Math.max(
      0,
      annualIncome - config.federal.standardDeduction[filingStatus]
    );

    const federalTax = calculateProgressiveTax(
      taxableFederalIncome,
      config.federal.brackets[filingStatus]
    );

    const incomeTax = config.incomeTaxes.reduce((sum, tax) => {
      return sum + calculateProgressiveTax(
        annualIncome,
        tax.brackets[filingStatus]
      );
    }, 0);
    

    const socialSecurityTax =
      Math.min(
        annualIncome,
        config.fica.socialSecurity.wageBaseLimit
      ) * config.fica.socialSecurity.rate;

    const medicareBase =
      annualIncome * config.fica.medicare.rate;

    const additionalMedicare =
      annualIncome >
      config.fica.medicare.additionalThreshold[filingStatus]
        ? (annualIncome -
            config.fica.medicare.additionalThreshold[filingStatus]) *
          config.fica.medicare.additionalRate
        : 0;

        const totalTaxes =
        federalTax +
        incomeTax +
        socialSecurityTax +
        medicareBase +
        additionalMedicare;
      

    const netAnnual = annualIncome - totalTaxes;

    return {
      grossPerPaycheck: annualIncome / frequencyDivider,
      federalTax: federalTax / frequencyDivider,
      incomeTax: incomeTax / frequencyDivider,
      ficaTax:
        (socialSecurityTax + medicareBase + additionalMedicare) /
        frequencyDivider,
      netPay: netAnnual / frequencyDivider,
      netAnnual,
    };
  }, [annualIncome, filingStatus, payFrequency, config]);

  /* ======================================================
     UI
  ====================================================== */

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* INPUTS */}
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Income type</label>
          <select
            value={incomeType}
            onChange={(e) =>
              setIncomeType(e.target.value as "salary" | "hourly")
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="salary">Annual salary</option>
            <option value="hourly">Hourly wage</option>
          </select>
        </div>

        {incomeType === "salary" ? (
          <div>
            <label className="block font-medium mb-1">
              Annual salary
            </label>
            <input
  type="number"
  inputMode="numeric"
  placeholder="Enter annual salary"
  value={annualSalary}
  onChange={(e) => {
    const value = e.target.value;
    setAnnualSalary(value === "" ? "" : Number(value));
  }}
  className="w-full border rounded-md px-3 py-2"
/>
          </div>
        ) : (
          <>
            <div>
              <label className="block font-medium mb-1">
                Hourly rate
              </label>
              <input
  type="number"
  inputMode="numeric"
  placeholder="Enter hourly rate"
  value={hourlyRate}
  onChange={(e) => {
    const value = e.target.value;
    setHourlyRate(value === "" ? "" : Number(value));
  }}
  className="w-full border rounded-md px-3 py-2"
/>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Hours per week
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) =>
                  setHoursPerWeek(Number(e.target.value))
                }
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </>
        )}

        <div>
          <label className="block font-medium mb-1">
            Filing status
          </label>
          <select
            value={filingStatus}
            onChange={(e) =>
              setFilingStatus(e.target.value as FilingStatus)
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="single">Single</option>
            <option value="married">Married filing jointly</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Pay frequency
          </label>
          <select
            value={payFrequency}
            onChange={(e) =>
              setPayFrequency(e.target.value as PayFrequency)
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="weekly">Weekly (52 paychecks / year)</option>
<option value="biweekly">Bi-weekly (every 2 weeks – 26 paychecks / year)</option>
<option value="semimonthly">Semi-monthly (twice per month – 24 paychecks / year)</option>
<option value="monthly">Monthly (12 paychecks / year)</option>
          </select>
        </div>
      </div>

      {/* RESULTS */}
      <div className="bg-slate-50 rounded-lg p-6 space-y-4">
        {!result ? (
          <p className="text-slate-500">
            Enter your income details to see an estimate.
          </p>
        ) : (
          <>
            <div>
              <p className="text-sm text-slate-500">
                Net pay per paycheck
              </p>
              <p className="text-2xl font-semibold">
                {result.netPay.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>

            <ul className="text-sm space-y-1">
              <li>
                Gross pay:{" "}
                {result.grossPerPaycheck.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </li>
              <li>
                Federal tax:{" "}
                {result.federalTax.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </li>
              <li>
  Income tax:{" "}
  {result.incomeTax.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  })}
</li>

              <li>
                Payroll taxes (FICA):{" "}
                {result.ficaTax.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </li>
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
