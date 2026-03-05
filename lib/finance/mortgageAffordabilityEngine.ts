export type AffordabilityInput = {
    annualIncome: number;
    monthlyDebts: number;
    interestRate: number; // decimal (0.06)
    termYears: number;
    dtiCap?: number;      // default 0.43
    housingCap?: number;  // default 0.28
  };
  
  export type AffordabilityResult = {
    maxMonthlyPayment: number;
    maxLoanAmount: number;
  };
  
  export function computeAffordability(
    input: AffordabilityInput
  ): AffordabilityResult {
  
    const {
      annualIncome,
      monthlyDebts,
      interestRate,
      termYears,
      dtiCap = 0.43,
      housingCap = 0.28,
    } = input;
  
    const monthlyIncome = annualIncome / 12;
  
    const housingLimit = monthlyIncome * housingCap;
    const dtiLimit = monthlyIncome * dtiCap - monthlyDebts;
  
    const maxMonthlyPayment = Math.max(
      0,
      Math.min(housingLimit, dtiLimit)
    );
  
    const r = interestRate / 12;
    const n = termYears * 12;
  
    let maxLoanAmount = 0;
  
    if (r > 0) {
      maxLoanAmount =
        maxMonthlyPayment *
        ((1 - Math.pow(1 + r, -n)) / r);
    } else {
      maxLoanAmount = maxMonthlyPayment * n;
    }
  
    return {
      maxMonthlyPayment,
      maxLoanAmount,
    };
  }