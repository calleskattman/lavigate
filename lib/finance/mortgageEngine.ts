// lib/finance/mortgageEngine.ts

// ============================================================
// TYPES
// ============================================================

export type PaymentFrequency = "monthly";

export type AmortizationType = "annuity" | "straight";

export type LoanType =
  | "conventional"
  | "va"
  | "fha"
  | "usda"
  | "custom";

export type RateScheduleItem = {
  startMonth: number; // 1-indexed
  annualRate: number; // decimal (0.065 = 6.5%)
};

export type ExtraPayment =
  | { type: "monthly"; amount: number; startMonth?: number; endMonth?: number }
  | { type: "oneTime"; amount: number; month: number }
  | { type: "scheduled"; items: { month: number; amount: number }[] };

export type Escrow = {
  monthlyPropertyTax?: number;
  monthlyInsurance?: number;
  monthlyPMI?: number;
};

export type InterestOnly = {
  months: number;
};

export type Balloon = {
  month: number;
};

export type MortgageInput = {
  principal: number;
  termYears: number;
  paymentFrequency: PaymentFrequency;
  amortizationType: AmortizationType;

  rateSchedule: RateScheduleItem[];

  loanType?: LoanType;

  interestOnly?: InterestOnly;
  balloon?: Balloon;
  extraPayments?: ExtraPayment;
  escrow?: Escrow;
};

export type AmortizationRow = {
  month: number;

  annualRate: number;
  monthlyRate: number;

  paymentPI: number;
  paymentEscrow: number;
  paymentExtra: number;
  paymentTotal: number;

  interest: number;
  principal: number;
  principalExtra: number;
  principalTotal: number;

  startingBalance: number;
  endingBalance: number;

  isInterestOnly: boolean;
  isRateChange: boolean;
  isBalloon: boolean;
};

export type MortgageResult = {
  monthlyPaymentPIInitial: number;
  payoffMonth: number;

  totalInterest: number;
  totalPayment: number;
  totalPrincipalPaid: number;
  totalExtraPaid: number;
  totalEscrowPaid: number;

  schedule: AmortizationRow[];

  meta: {
    termMonths: number;
    interestOnlyMonths: number;
    balloonMonth?: number;
    rateChanges: { month: number; annualRate: number }[];
  };
};

// ============================================================
// HELPERS
// ============================================================

const round = (n: number) => Math.round(n * 100) / 100;

const toMonthlyRate = (annualRate: number) => annualRate / 12;

function calcAnnuityPayment(
  balance: number,
  monthlyRate: number,
  remainingMonths: number
): number {
  if (remainingMonths <= 0) return 0;
  if (monthlyRate === 0) return balance / remainingMonths;

  const factor = Math.pow(1 + monthlyRate, remainingMonths);
  return balance * (monthlyRate * factor) / (factor - 1);
}

function calcStraightPrincipal(
  balance: number,
  remainingMonths: number
): number {
  if (remainingMonths <= 0) return 0;
  return balance / remainingMonths;
}

function normalizeRateSchedule(
  rateSchedule: RateScheduleItem[],
  termMonths: number
): RateScheduleItem[] {
  if (!rateSchedule || rateSchedule.length === 0) {
    throw new Error("rateSchedule must contain at least one item.");
  }

  const sorted = [...rateSchedule].sort(
    (a, b) => a.startMonth - b.startMonth
  );

  if (sorted[0].startMonth !== 1) {
    throw new Error("rateSchedule must start at month 1.");
  }

  for (const item of sorted) {
    if (item.startMonth < 1 || item.startMonth > termMonths) {
      throw new Error(`Invalid startMonth ${item.startMonth}`);
    }
  }

  return sorted;
}

function getAnnualRateForMonth(
  month: number,
  schedule: RateScheduleItem[]
): number {
  let current = schedule[0].annualRate;

  for (const item of schedule) {
    if (month >= item.startMonth) {
      current = item.annualRate;
    } else {
      break;
    }
  }

  return current;
}

function isRateChangeMonth(
  month: number,
  schedule: RateScheduleItem[]
): boolean {
  return schedule.some(
    (item) => item.startMonth === month && month !== 1
  );
}

function getExtraForMonth(
  extra: ExtraPayment | undefined,
  month: number
): number {
  if (!extra) return 0;

  if (extra.type === "monthly") {
    const start = extra.startMonth ?? 1;
    const end = extra.endMonth ?? Infinity;
    if (month >= start && month <= end) {
      return extra.amount;
    }
    return 0;
  }

  if (extra.type === "oneTime") {
    return month === extra.month ? extra.amount : 0;
  }

  if (extra.type === "scheduled") {
    return extra.items
      .filter((i) => i.month === month)
      .reduce((sum, i) => sum + i.amount, 0);
  }

  return 0;
}

function getEscrowMonthly(escrow: Escrow | undefined): number {
  if (!escrow) return 0;
  return (
    (escrow.monthlyPropertyTax ?? 0) +
    (escrow.monthlyInsurance ?? 0) +
    (escrow.monthlyPMI ?? 0)
  );
}

// ============================================================
// CORE ENGINE
// ============================================================

export function computeMortgage(
  input: MortgageInput
): MortgageResult {
  const principal = Math.max(0, input.principal);
  const termMonths = Math.floor(input.termYears * 12);
  const interestOnlyMonths = input.interestOnly?.months ?? 0;
  const balloonMonth = input.balloon?.month;

  if (principal <= 0 || termMonths <= 0) {
    return {
      monthlyPaymentPIInitial: 0,
      payoffMonth: 0,
      totalInterest: 0,
      totalPayment: 0,
      totalPrincipalPaid: 0,
      totalExtraPaid: 0,
      totalEscrowPaid: 0,
      schedule: [],
      meta: {
        termMonths,
        interestOnlyMonths,
        balloonMonth,
        rateChanges: [],
      },
    };
  }

  const rateSchedule = normalizeRateSchedule(
    input.rateSchedule,
    termMonths
  );

  const escrowMonthly = getEscrowMonthly(input.escrow);

  let balance = principal;
  let totalInterest = 0;
  let totalPayment = 0;
  let totalPrincipalPaid = 0;
  let totalExtraPaid = 0;
  let totalEscrowPaid = 0;

  const schedule: AmortizationRow[] = [];
  const rateChanges: { month: number; annualRate: number }[] = [];

  let scheduledPaymentPI = 0;
  let monthlyPaymentPIInitial = 0;

  for (let month = 1; month <= termMonths; month++) {
    if (balance <= 0) break;

    const annualRate = getAnnualRateForMonth(
      month,
      rateSchedule
    );
    const monthlyRate = toMonthlyRate(annualRate);

    const isIO = month <= interestOnlyMonths;
    const rateChange = isRateChangeMonth(month, rateSchedule);

    if (rateChange) {
      rateChanges.push({ month, annualRate });
    }

    const remainingMonths = termMonths - month + 1;

    // Recalculate payment trigger
    if (
      month === 1 ||
      rateChange ||
      month === interestOnlyMonths + 1
    ) {
      if (!isIO) {
        if (input.amortizationType === "annuity") {
          scheduledPaymentPI = calcAnnuityPayment(
            balance,
            monthlyRate,
            remainingMonths
          );
        } else {
          const principalPart = calcStraightPrincipal(
            balance,
            remainingMonths
          );
          scheduledPaymentPI =
            principalPart + balance * monthlyRate;
        }

        if (month === 1) {
          monthlyPaymentPIInitial = round(
            scheduledPaymentPI
          );
        }
      }
    }

    const startingBalance = balance;
    const interest = round(balance * monthlyRate);

    let principalPart = 0;
    let paymentPI = 0;

    if (isIO) {
      paymentPI = interest;
    } else {
      paymentPI = scheduledPaymentPI;
      principalPart = paymentPI - interest;
    }

    let extra = getExtraForMonth(
      input.extraPayments,
      month
    );

    // Balloon logic
    let isBalloon = false;
    if (balloonMonth && month === balloonMonth) {
      isBalloon = true;
      principalPart = balance - extra;
    }

    let principalTotal = principalPart + extra;

    if (principalTotal > balance) {
      principalTotal = balance;
      principalPart = balance - extra;
    }

    balance = round(balance - principalTotal);

    const paymentTotal =
      paymentPI + extra + escrowMonthly;

    totalInterest += interest;
    totalPayment += paymentTotal;
    totalPrincipalPaid += principalPart;
    totalExtraPaid += extra;
    totalEscrowPaid += escrowMonthly;

    schedule.push({
      month,
      annualRate,
      monthlyRate,

      paymentPI: round(paymentPI),
      paymentEscrow: round(escrowMonthly),
      paymentExtra: round(extra),
      paymentTotal: round(paymentTotal),

      interest,
      principal: round(principalPart),
      principalExtra: round(extra),
      principalTotal: round(principalTotal),

      startingBalance: round(startingBalance),
      endingBalance: round(balance),

      isInterestOnly: isIO,
      isRateChange: rateChange,
      isBalloon,
    });

    if (isBalloon) {
      balance = 0;
    }
  }

  return {
    monthlyPaymentPIInitial: round(
      monthlyPaymentPIInitial
    ),
    payoffMonth: schedule.length,
    totalInterest: round(totalInterest),
    totalPayment: round(totalPayment),
    totalPrincipalPaid: round(totalPrincipalPaid),
    totalExtraPaid: round(totalExtraPaid),
    totalEscrowPaid: round(totalEscrowPaid),
    schedule,
    meta: {
      termMonths,
      interestOnlyMonths,
      balloonMonth,
      rateChanges,
    },
  };
}

// ============================================================
// AFFORDABILITY SOLVER (binary search)
// ============================================================

export function solvePrincipalForBudget(params: {
  monthlyBudgetTotal: number;
  termYears: number;
  paymentFrequency: PaymentFrequency;
  amortizationType: AmortizationType;
  rateSchedule: RateScheduleItem[];
  interestOnly?: InterestOnly;
  balloon?: Balloon;
  extraPayments?: ExtraPayment;
  escrow?: Escrow;
  tolerance?: number;
  maxIterations?: number;
}): { principal: number; result: MortgageResult } {
  const tolerance = params.tolerance ?? 1;
  const maxIterations = params.maxIterations ?? 50;

  let low = 0;
  let high = 5_000_000; // upper bound guess

  let bestPrincipal = 0;
  let bestResult: MortgageResult | null = null;

  for (let i = 0; i < maxIterations; i++) {
    const mid = (low + high) / 2;

    const result = computeMortgage({
      principal: mid,
      termYears: params.termYears,
      paymentFrequency: params.paymentFrequency,
      amortizationType: params.amortizationType,
      rateSchedule: params.rateSchedule,
      interestOnly: params.interestOnly,
      balloon: params.balloon,
      extraPayments: params.extraPayments,
      escrow: params.escrow,
    });

    const peakPayment = Math.max(
      ...result.schedule.map((r) => r.paymentTotal)
    );

    if (
      Math.abs(peakPayment - params.monthlyBudgetTotal) <
      tolerance
    ) {
      return { principal: mid, result };
    }

    if (peakPayment > params.monthlyBudgetTotal) {
      high = mid;
    } else {
      low = mid;
      bestPrincipal = mid;
      bestResult = result;
    }
  }

  return {
    principal: bestPrincipal,
    result:
      bestResult ??
      computeMortgage({
        principal: bestPrincipal,
        termYears: params.termYears,
        paymentFrequency: params.paymentFrequency,
        amortizationType: params.amortizationType,
        rateSchedule: params.rateSchedule,
      }),
  };
}
