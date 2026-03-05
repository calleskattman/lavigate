"use client";

import { useMemo, useState } from "react";
import {
  computeMortgage as computeMortgageV1,
  type MortgageInput as MortgageInputV1,
} from "@/lib/finance/mortgageEngine";

import {
  computeMortgage as computeMortgageV2,
  type MortgageInput as MortgageInputV2,
} from "@/lib/finance/mortgageEngineV2";

import {
  computeAffordability,
  type AffordabilityInput
} from "@/lib/finance/mortgageAffordabilityEngine";

import type { MortgageConfig } from "@/config/data/mortgage";

type EngineReturn =
  | ReturnType<typeof computeMortgageV1>
  | ReturnType<typeof computeMortgageV2>;

type Props = {
  config: MortgageConfig;
};

type MortgageResult =
  | null
  | { mode: "single"; result: EngineReturn }
  | {
      mode: "comparison";
      baseline: EngineReturn;
      accelerated: EngineReturn;
      interestSaved: number;
      monthsSaved: number;
    };

export default function MortgageTool({ config }: Props)
 {
    const [principal, setPrincipal] = useState<number | "">(
        config.defaults?.defaultPrincipal ?? ""
      );
      
      const [rate, setRate] = useState<string>(
        config.defaults?.defaultRate != null ? String(config.defaults.defaultRate) : ""
      );      
      
      const [termYears, setTermYears] = useState<number | "">(
        config.defaults?.defaultTermYears ?? ""
      );
      const [extraAmount, setExtraAmount] = useState<number | "">("");

      const [paymentFrequency, setPaymentFrequency] = useState<"monthly" | "biweekly">("monthly");

const [interestOnlyMonths, setInterestOnlyMonths] = useState<number>(
  config.defaults?.defaultInterestOnlyMonths ?? 0
);

const [balloonMonth, setBalloonMonth] = useState<number>(
  config.defaults?.defaultBalloonMonth ?? 0
);

const [offsetBalance, setOffsetBalance] = useState<number>(
  config.defaults?.defaultOffsetBalance ?? 0
);

const [armIntroYears, setArmIntroYears] = useState<number>(
  config.defaults?.defaultARMIntroYears ?? 0
);

const [armIntroRate, setArmIntroRate] = useState<number>(
  config.defaults?.defaultARMIntroRate ?? 0
);

const [armResetRate, setArmResetRate] = useState<number>(
  config.defaults?.defaultARMResetRate ?? 0
);

const [currentBalance, setCurrentBalance] = useState<number | "">("");
const [currentRate, setCurrentRate] = useState<string>("");
const [remainingTermYears, setRemainingTermYears] = useState<number | "">("");

const [cashOutAmount, setCashOutAmount] = useState<number | "">(0);
const [closingCosts, setClosingCosts] = useState<number | "">(0);
const [financeClosingCosts, setFinanceClosingCosts] = useState(false);

const [annualIncome, setAnnualIncome] = useState<number | "">("");
const [monthlyDebts, setMonthlyDebts] = useState<number | "">("");
      
      const loanType = config.loanType ?? "conventional";
      const isCashOutRefi = loanType === "cashout-refinance";
      const isAffordability = loanType === "affordability";
      const features = config.features ?? {};

      const usd = useMemo(() => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }, []);
      
      
      
      
      const result = useMemo((): MortgageResult => {
      
        const rawRateNumber = Number(rate.replace(",", "."));
const rateNumber =
  Number.isFinite(rawRateNumber) && rawRateNumber >= 1
    ? rawRateNumber / 100
    : rawRateNumber;

    if (isAffordability) {

      if (
        typeof annualIncome !== "number" ||
        typeof monthlyDebts !== "number" ||
        typeof termYears !== "number" ||
        rate.trim() === ""
      ) {
        return null;
      }
    
      const rawRate = Number(rate.replace(",", "."));
      const rateDecimal =
        Number.isFinite(rawRate) && rawRate >= 1
          ? rawRate / 100
          : rawRate;
    
      if (!Number.isFinite(rateDecimal) || rateDecimal < 0) {
        return null;
      }
    
      const affordability = computeAffordability({
        annualIncome,
        monthlyDebts,
        interestRate: rateDecimal,
        termYears,
      });
    
      return {
        mode: "single",
        result: {
          monthlyPaymentPIInitial: affordability.maxMonthlyPayment,
          totalInterest: 0,
          totalPayment: affordability.maxLoanAmount,
          payoffMonth: 0,
          schedule: [],
        }
      };
    }

        if (
          typeof principal !== "number" ||
          typeof termYears !== "number" ||
          rate.trim() === "" ||
          principal <= 0 ||
          termYears <= 0 ||
          !Number.isFinite(rateNumber) ||
          rateNumber < 0
        ) {
          return null;
        }
        
        let rateSchedule = [
          {
            startMonth: 1,
            annualRate: rateNumber,
          },
        ];
        
        if (features.enableARM && armIntroYears > 0) {
          const introMonths = armIntroYears * 12;
        
          rateSchedule = [
            {
              startMonth: 1,
              annualRate: armIntroRate > 0 ? armIntroRate : rateNumber,
            },
            {
              startMonth: introMonths + 1,
              annualRate: armResetRate > 0 ? armResetRate : rateNumber,
            },
          ];
        }

        const input = {
          principal: Number(principal),
          termYears: Number(termYears),
          paymentFrequency: features.enableBiweekly ? paymentFrequency : "monthly",
          amortizationType: "annuity",
        
          rateSchedule,
        
          loanType,
        
          interestOnly:
            features.enableInterestOnly && interestOnlyMonths > 0
              ? { months: interestOnlyMonths }
              : undefined,
        
          extraPayments:
            features.enableExtraPayments && extraAmount !== "" && Number(extraAmount) > 0
              ? {
                  type: paymentFrequency === "biweekly" ? "biweekly" : "monthly",
                  amount: Number(extraAmount),
                }
              : undefined,
        
          balloon:
            features.enableBalloon && balloonMonth > 0
              ? { month: balloonMonth }
              : undefined,
        
          offset:
            offsetBalance > 0
              ? { balance: offsetBalance }
              : undefined,
        }; 

      const engineVersion = config.engineVersion ?? "v1";

      const run = (i: any) => {
        if (engineVersion === "v2") {
          return computeMortgageV2(i as MortgageInputV2);
        }
      
        // Strip V2-only fields before calling V1
        const {
          rateSchedule,
          interestOnly,
          balloon,
          offset,
          ...v1SafeInput
        } = i;
      
        return computeMortgageV1(v1SafeInput as MortgageInputV1);
      };
      
      // CASH-OUT REFINANCE MODE
if (isCashOutRefi) {

  if (
    currentBalance === "" ||
    currentRate.trim() === "" ||
    remainingTermYears === "" ||
    rate.trim() === ""
  ) {
    return null;
  }

  const currentRateNumberRaw = Number(currentRate.replace(",", "."));
  const currentRateNumber =
    Number.isFinite(currentRateNumberRaw) && currentRateNumberRaw >= 1
      ? currentRateNumberRaw / 100
      : currentRateNumberRaw;

  if (!Number.isFinite(currentRateNumber) || currentRateNumber < 0) {
    return null;
  }

  const newPrincipal =
    Number(currentBalance) +
    Number(cashOutAmount || 0) +
    (financeClosingCosts ? Number(closingCosts || 0) : 0);

  const currentLoan = run({
    principal: Number(currentBalance),
    termYears: Number(remainingTermYears),
    paymentFrequency: "monthly",
    amortizationType: "annuity",
    rateSchedule: [
      { startMonth: 1, annualRate: currentRateNumber }
    ],
    loanType: "conventional"
  });

  const newLoan = run({
    ...input,
    principal: newPrincipal
  });

  return {
    mode: "single",
    result: newLoan
  };
}

    // SINGLE MODE (Payoff calculator)

    if (!features.enableExtraPayments) {
      return {
        mode: "single",
        result: run({ ...input, extraPayments: undefined }),
      };
    }
    
    const baseline = run({ ...input, extraPayments: undefined });
    
    const accelerated = run({
      ...input,
      extraPayments:
        extraAmount !== "" && Number(extraAmount) > 0
          ? { type: "monthly", amount: Number(extraAmount) }
          : undefined,
    });
    
    return {
      mode: "comparison",
      baseline,
      accelerated,
      interestSaved: baseline.totalInterest - accelerated.totalInterest,
      monthsSaved: baseline.payoffMonth - accelerated.payoffMonth,
    };

// COMPARISON MODE (Early payoff calculator)
}, [
  principal,
  rate,
  termYears,
  loanType,
  features,
  extraAmount,
  paymentFrequency,
  interestOnlyMonths,
  balloonMonth,
  offsetBalance,
  armIntroYears,
  armIntroRate,
  armResetRate,
  currentBalance,
  currentRate,
  remainingTermYears,
  cashOutAmount,
  closingCosts,
  financeClosingCosts,
  annualIncome,
  monthlyDebts,
]);

  return (
    <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-slate-900">
  {config.systemName}
</h2>
      {/* INPUT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {isAffordability && (
  <>
    <div>
      <label className="block text-sm font-medium text-slate-700">
        Annual income
      </label>
      <input
        type="number"
        value={annualIncome}
        onChange={(e) =>
          setAnnualIncome(
            e.target.value === "" ? "" : Number(e.target.value)
          )
        }
        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
        placeholder="e.g. 100000"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700">
        Monthly debt payments
      </label>
      <input
        type="number"
        value={monthlyDebts}
        onChange={(e) =>
          setMonthlyDebts(
            e.target.value === "" ? "" : Number(e.target.value)
          )
        }
        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
        placeholder="e.g. 500"
      />
    </div>
  </>
)}
      {!isAffordability && (
        <div>
          <label htmlFor="mortgage-principal" className="block text-sm font-medium text-slate-700">
            Loan amount
          </label>
          <input
          id="mortgage-principal"
            type="number"
            min="0"
            step="any"
            value={principal}
            onChange={(e) =>
              setPrincipal(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="e.g. 300000"
          />
        </div>
)}

        <div>
          <label htmlFor="mortgage-rate" className="block text-sm font-medium text-slate-700">
            Annual interest rate (e.g. 0.06 for 6%)
          </label>
          <input
          id="mortgage-rate"
  type="text"
  inputMode="decimal"
  autoComplete="off"
  spellCheck={false}
  value={rate}
  onChange={(e) => {

    const raw = e.target.value;

    // allow clearing
    if (raw === "") {
      setRate("");
      return;
    }

    // allow user to type comma or dot, normalize comma -> dot
    const normalized = raw.replace(",", ".");

    // allow temporary states like "0." or "."
    if (normalized === "." || normalized.endsWith(".")) {
      // don't commit a number yet; keep previous numeric value but
      // let user keep typing by NOT blocking input
      // We do that by storing as number only when it parses cleanly.
      // So just return here.
      setRate(raw);
      return;
    }

    const n = Number(normalized);
    if (!Number.isFinite(n)) return;

    setRate(raw);
  }}
  onBlur={() => {
    if (rate.trim() === "") return;
    setRate(rate.replace(",", "."));
  }}  
  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
  placeholder="e.g. 0.06"
/>

        </div>

        <div>
          <label htmlFor="mortgage-term" className="block text-sm font-medium text-slate-700">
            Term (years)
          </label>
          <input
          id="mortgage-term"
            type="number"
            min="1"
            step="1"
            value={termYears}
            onChange={(e) =>
              setTermYears(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="e.g. 30"
          />
        </div>
      </div>

      {features.enableExtraPayments && (
  <div className="mt-6">
    <label
      htmlFor="mortgage-extra"
      className="block text-sm font-medium text-slate-700"
    >
      Monthly extra payment
    </label>
    <input
      id="mortgage-extra"
      type="number"
      min="0"
      step="any"
      value={extraAmount}
      onChange={(e) =>
        setExtraAmount(
          e.target.value === "" ? "" : Number(e.target.value)
        )
      }
      className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
      placeholder="e.g. 200"
    />
  </div>
)}

{features.enableBiweekly && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-slate-700">
      Payment Frequency
    </label>
    <select
      value={paymentFrequency}
      onChange={(e) => setPaymentFrequency(e.target.value as any)}
      className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
    >
      <option value="monthly">Monthly</option>
      <option value="biweekly">Biweekly</option>
    </select>
  </div>
)}

{features.enableInterestOnly && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-slate-700">
      Interest Only (months)
    </label>
    <input
      type="number"
      min="0"
      value={interestOnlyMonths}
      onChange={(e) => setInterestOnlyMonths(Number(e.target.value))}
      className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
    />
  </div>
)}

{features.enableARM && (
  <div className="mt-4 space-y-3">
    <div>
      <label className="block text-sm font-medium text-slate-700">
        ARM Intro Years
      </label>
      <input
        type="number"
        min="0"
        value={armIntroYears}
        onChange={(e) => setArmIntroYears(Number(e.target.value))}
        className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700">
        Intro Rate (decimal)
      </label>
      <input
        type="number"
        step="any"
        value={armIntroRate}
        onChange={(e) => setArmIntroRate(Number(e.target.value))}
        className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700">
        Reset Rate (decimal)
      </label>
      <input
        type="number"
        step="any"
        value={armResetRate}
        onChange={(e) => setArmResetRate(Number(e.target.value))}
        className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
      />
    </div>
  </div>
)}

{features.enableBalloon && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-slate-700">
      Balloon Month
    </label>
    <input
      type="number"
      min="0"
      value={balloonMonth}
      onChange={(e) => setBalloonMonth(Number(e.target.value))}
      className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
    />
  </div>
)}

{features.enableOffset && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-slate-700">
      Offset Balance
    </label>
    <input
      type="number"
      min="0"
      value={offsetBalance}
      onChange={(e) => setOffsetBalance(Number(e.target.value))}
      className="mt-1 block w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2"
    />
  </div>
)}

{isCashOutRefi && (
  <>
    <h3>Current Loan</h3>

    <input
      type="number"
      placeholder="Current Balance"
      value={currentBalance}
      onChange={(e) => setCurrentBalance(Number(e.target.value))}
    />

    <input
      type="number"
      placeholder="Current Rate (%)"
      value={currentRate}
      onChange={(e) => setCurrentRate(e.target.value)}
    />

    <input
      type="number"
      placeholder="Remaining Term (years)"
      value={remainingTermYears}
      onChange={(e) => setRemainingTermYears(Number(e.target.value))}
    />

    <h3>Cash-Out Details</h3>

    <input
      type="number"
      placeholder="Cash-Out Amount"
      value={cashOutAmount}
      onChange={(e) => setCashOutAmount(Number(e.target.value))}
    />

    <input
      type="number"
      placeholder="Closing Costs"
      value={closingCosts}
      onChange={(e) => setClosingCosts(Number(e.target.value))}
    />

    <label>
      <input
        type="checkbox"
        checked={financeClosingCosts}
        onChange={() => setFinanceClosingCosts(!financeClosingCosts)}
      />
      Finance closing costs into new loan
    </label>
  </>
)}


      {/* RESULT SECTION */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Mortgage Result
        </h3>

        {!result ? (
          <p className="text-slate-600">
            Enter loan details to calculate.
          </p>
        ) : (
          result.mode === "single" ? (
            <>
              {isAffordability ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-slate-600">
                      Estimated maximum monthly payment
                    </p>
                    <p className="text-xl font-semibold text-slate-900">
                      {usd.format(result.result.monthlyPaymentPIInitial)}
                    </p>
                  </div>
          
                  <div>
                    <p className="text-sm text-slate-600">
                      Estimated maximum loan amount
                    </p>
                    <p className="text-xl font-semibold text-slate-900">
                      {usd.format(result.result.totalPayment)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-slate-600">Initial monthly P&I</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {usd.format(result.result.monthlyPaymentPIInitial)}
                    </p>
                  </div>
          
                  <div>
                    <p className="text-sm text-slate-600">Total interest</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {usd.format(result.result.totalInterest)}
                    </p>
                  </div>
          
                  <div>
                    <p className="text-sm text-slate-600">Total payment</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {usd.format(result.result.totalPayment)}
                    </p>
                  </div>
          
                  <div>
                    <p className="text-sm text-slate-600">Payoff month</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {result.result.payoffMonth}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-white rounded border">
                  <p className="text-sm text-slate-600">Baseline payoff month</p>
                  <p className="text-lg font-semibold">
                    {result.baseline.payoffMonth}
                  </p>
          
                  <p className="text-sm text-slate-600 mt-2">Baseline total interest</p>
                  <p className="text-lg font-semibold">
                    {usd.format(result.baseline.totalInterest)}
                  </p>
                </div>
          
                <div className="p-4 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-slate-600">Accelerated payoff month</p>
                  <p className="text-lg font-semibold">
                    {result.accelerated.payoffMonth}
                  </p>
          
                  <p className="text-sm text-slate-600 mt-2">Accelerated total interest</p>
                  <p className="text-lg font-semibold">
                    {usd.format(result.accelerated.totalInterest)}
                  </p>
                </div>
              </div>
          
              <div className="p-4 bg-green-100 rounded border border-green-300">
                <p className="text-sm text-slate-700">Months saved</p>
                <p className="text-xl font-bold text-green-700">
                  {result.monthsSaved}
                </p>
          
                <p className="text-sm text-slate-700 mt-2">Interest saved</p>
                <p className="text-xl font-bold text-green-700">
                  {usd.format(result.interestSaved)}
                </p>
              </div>
            </>
          )
        )}
      </div>
      {result && !isAffordability && (
  <div className="mt-10">
    <h4 className="text-md font-semibold text-slate-900 mb-3">
      Amortization Schedule
    </h4>

    <div className="max-h-96 overflow-auto border border-slate-200 rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 sticky top-0">
          <tr>
            <th className="px-2 py-1 text-left">Month</th>
            <th className="px-2 py-1 text-right">Rate</th>
            <th className="px-2 py-1 text-right">Payment</th>
            <th className="px-2 py-1 text-right">Interest</th>
            <th className="px-2 py-1 text-right">Principal</th>
            <th className="px-2 py-1 text-right">Balance</th>
          </tr>
        </thead>

        <tbody>
          {(result.mode === "single"
            ? result.result.schedule
            : result.accelerated.schedule
          ).map((row) => (
            <tr key={row.month} className="border-t border-slate-200">
              <td className="px-2 py-1">{row.month}</td>

              <td className="px-2 py-1 text-right">
                {(row.annualRate * 100).toFixed(2)}%
              </td>

              <td className="px-2 py-1 text-right">
                {usd.format(row.paymentTotal)}
              </td>

              <td className="px-2 py-1 text-right">
                {usd.format(row.interest)}
              </td>

              <td className="px-2 py-1 text-right">
                {usd.format(row.principalTotal)}
              </td>

              <td className="px-2 py-1 text-right">
                {usd.format(row.endingBalance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
    </div>
  );
}
