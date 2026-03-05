// lib/finance/mortgageEngineV2.ts

export type PaymentFrequency = "monthly" | "biweekly";

export type RateSegment = {
  startMonth: number; // 1-indexed month
  annualRate: number; // decimal (0.06 = 6%)
};

export type ExtraPayments =
  | { type: "monthly"; amount: number }
  | { type: "biweekly"; amount: number }
  | { type: "oneTime"; month: number; amount: number };

export type InterestOnly = {
  months: number; // number of months interest-only
};

export type Balloon = {
  month: number; // balloon due month (1-indexed month)
};

export type Offset = {
  // simple offset: reduces interest-bearing balance by a constant amount
  // (later you can extend to a schedule list if needed)
  balance: number;
};

export type MortgageInput = {
  principal: number;
  termYears: number;
  paymentFrequency: PaymentFrequency;
  amortizationType: "annuity";

  rateSchedule: RateSegment[];

  loanType?: string;

  extraPayments?: ExtraPayments;
  interestOnly?: InterestOnly;
  balloon?: Balloon;
  offset?: Offset;
};

export type ScheduleRow = {
  month: number;
  annualRate: number;
  paymentTotal: number;
  interest: number;
  principalTotal: number;
  endingBalance: number;
};

export type MortgageResult = {
  monthlyPaymentPIInitial: number; // "initial" payment (for monthly, or monthly-equivalent if biweekly)
  totalInterest: number;
  totalPayment: number;
  payoffMonth: number;
  schedule: ScheduleRow[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function sortRateSchedule(schedule: RateSegment[]) {
  return [...schedule]
    .filter((s) => Number.isFinite(s.startMonth) && Number.isFinite(s.annualRate))
    .map((s) => ({ startMonth: Math.max(1, Math.floor(s.startMonth)), annualRate: Math.max(0, s.annualRate) }))
    .sort((a, b) => a.startMonth - b.startMonth);
}

function rateForMonth(sorted: RateSegment[], month: number): number {
  // assumes sorted by startMonth
  let r = sorted[0]?.annualRate ?? 0;
  for (const seg of sorted) {
    if (seg.startMonth <= month) r = seg.annualRate;
    else break;
  }
  return r;
}

function annuityPayment(principal: number, monthlyRate: number, months: number) {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const x = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * x) / (x - 1);
}

function monthlyRateFromAnnual(annual: number) {
  return annual / 12;
}

function biweeklyRateFromAnnual(annual: number) {
  // simple nominal conversion
  return annual / 26;
}

export function computeMortgage(input: MortgageInput): MortgageResult {
  const principal = Number(input.principal);
  const termMonths = Math.max(1, Math.round(Number(input.termYears) * 12));

  const freq: PaymentFrequency = input.paymentFrequency ?? "monthly";
  const schedule = sortRateSchedule(input.rateSchedule ?? [{ startMonth: 1, annualRate: 0 }]);

  const ioMonthsRaw = Math.max(0, Math.floor(input.interestOnly?.months ?? 0));
const ioMonths = Math.min(ioMonthsRaw, termMonths);
  const balloonMonth = input.balloon?.month != null ? Math.max(1, Math.floor(input.balloon.month)) : null;
  const offsetBalance = Math.max(0, Number(input.offset?.balance ?? 0));


  // We keep output schedule in "months" even if payments are biweekly.
  // For biweekly we simulate 2 payments per month (roughly) to avoid changing UI now.
  const paymentsPerMonth = freq === "biweekly" ? 2 : 1;

  let balance = principal;
  let totalInterest = 0;
  let totalPayment = 0;
  let payoffMonth = 0;

  const rows: ScheduleRow[] = [];

  // initial payment metric
  let monthlyPaymentPIInitial = 0;

  const extra = input.extraPayments;

  const oneTimeExtraByMonth = new Map<number, number>();
  if (extra?.type === "oneTime") {
    oneTimeExtraByMonth.set(Math.max(1, Math.floor(extra.month)), Math.max(0, Number(extra.amount)));
  }

  const perPeriodExtra =
    extra?.type === "monthly"
      ? Math.max(0, Number(extra.amount))
      : extra?.type === "biweekly"
      ? Math.max(0, Number(extra.amount))
      : 0;

  for (let month = 1; month <= termMonths; month++) {
    if (balance <= 0) break;

    if (balloonMonth != null && month === balloonMonth) {
      // balloon due now: pay remaining balance as principal (no further amortization)
      const rAnnual = rateForMonth(schedule, month);
      const rMonthly = monthlyRateFromAnnual(rAnnual);

      // interest for the month on (balance - offset)
      const interestBase = Math.max(0, balance - offsetBalance);
      const interest = interestBase * rMonthly;

      const balloonPay = balance; // principal payoff
      const paymentTotal = interest + balloonPay;

      totalInterest += interest;
      totalPayment += paymentTotal;

      rows.push({
        month,
        annualRate: rAnnual,
        paymentTotal,
        interest,
        principalTotal: balloonPay,
        endingBalance: 0,
      });

      balance = 0;
payoffMonth = month;
break;
    }

    const rAnnual = rateForMonth(schedule, month);
    const rMonthly = monthlyRateFromAnnual(rAnnual);

    let monthInterest = 0;
    let monthPrincipal = 0;
    let monthPayment = 0;

    // determine base P&I payment for this month
    // During IO phase: payment is interest-only (principal unchanged unless extra payments)
    if (month <= ioMonths) {
      // simulate paymentsPerMonth sub-payments
      for (let k = 0; k < paymentsPerMonth; k++) {
        if (balance <= 0) {
  payoffMonth = month;
  break;
}

        const periodRate = freq === "biweekly" ? biweeklyRateFromAnnual(rAnnual) : rMonthly;

        const interestBase = Math.max(0, balance - offsetBalance);
        const interest = interestBase * periodRate;

        let paymentPI = interest; // IO: just interest
        let extraPay = 0;

        if (freq === "monthly" && extra?.type === "monthly") extraPay = perPeriodExtra;
        if (freq === "biweekly" && extra?.type === "biweekly") extraPay = perPeriodExtra;

        // distribute one-time extra at month-level on first sub-payment
        if (k === 0) extraPay += oneTimeExtraByMonth.get(month) ?? 0;

        // ensure extra doesn't overpay
        const principalPay = clamp(extraPay, 0, balance);

        balance -= principalPay;

        monthInterest += interest;
        monthPrincipal += principalPay;
        monthPayment += paymentPI + principalPay;
      }
    } else {
      // amortizing phase: compute an annuity payment based on remaining term
      const remainingMonths = termMonths - month + 1;
      const baseMonthlyPI = annuityPayment(balance, rMonthly, remainingMonths);

      if (month === ioMonths + 1) {
        // initial payment = first amortizing payment for monthly; for biweekly show monthly-equivalent
        monthlyPaymentPIInitial = baseMonthlyPI;
      }
      if (monthlyPaymentPIInitial === 0 && freq === "monthly") {
        // if no IO and monthly, set initial immediately on first month
        monthlyPaymentPIInitial = baseMonthlyPI;
      }

      for (let k = 0; k < paymentsPerMonth; k++) {
        if (balance <= 0) {
  payoffMonth = month;
  break;
}

        const periodRate = freq === "biweekly" ? biweeklyRateFromAnnual(rAnnual) : rMonthly;

        // split monthly PI across two payments if biweekly (rough approximation without UI changes)
        const paymentPI = freq === "biweekly" ? baseMonthlyPI / 2 : baseMonthlyPI;

        const interestBase = Math.max(0, balance - offsetBalance);
        const interest = interestBase * periodRate;

        let principalPay = paymentPI - interest;
        if (principalPay < 0) principalPay = 0;

        let extraPay = 0;
        if (freq === "monthly" && extra?.type === "monthly") extraPay = perPeriodExtra;
        if (freq === "biweekly" && extra?.type === "biweekly") extraPay = perPeriodExtra;

        if (k === 0) extraPay += oneTimeExtraByMonth.get(month) ?? 0;

        const totalPrincipalThisPeriod = clamp(principalPay + extraPay, 0, balance);
        const actualPrincipalPay = clamp(principalPay, 0, totalPrincipalThisPeriod);
        const actualExtraPay = totalPrincipalThisPeriod - actualPrincipalPay;

        const actualPayment = interest + totalPrincipalThisPeriod;

        balance -= totalPrincipalThisPeriod;

        monthInterest += interest;
        monthPrincipal += totalPrincipalThisPeriod;
        monthPayment += actualPayment;

        // if paid off, stop
        if (balance <= 0) break;
      }
    }

    totalInterest += monthInterest;
    totalPayment += monthPayment;

    rows.push({
      month,
      annualRate: rAnnual,
      paymentTotal: monthPayment,
      interest: monthInterest,
      principalTotal: monthPrincipal,
      endingBalance: Math.max(0, balance),
    });
  }

  // If no IO and we never set initial, set it from month 1 payment
  if (monthlyPaymentPIInitial === 0) {
    monthlyPaymentPIInitial = rows[0]?.paymentTotal ?? 0;
  }

  if (payoffMonth === 0 && balance <= 0 && rows.length > 0) {
    payoffMonth = rows[rows.length - 1].month;
  }
  
  if (payoffMonth === 0 && balance > 0) {
    payoffMonth = termMonths;
  }


  return {
    monthlyPaymentPIInitial,
    totalInterest,
    totalPayment,
    payoffMonth,
    schedule: rows,
  };
}