export type LoanPurpose =
  | "education"
  | "home_purchase"
  | "home_rent"
  | "business"
  | "vehicle"
  | "medical"
  | "debt_consolidation"
  | "other";

export interface LoanNeedInput {
  purpose: LoanPurpose;
  amount: number;
  hasCollateral: boolean;
}

export type LoanRecommendation = {
  loanType: string;
  subtype?: string;
  reasonKey: string;
};

export function recommendLoanType(input: LoanNeedInput): LoanRecommendation {
  const { purpose, amount, hasCollateral } = input;

  if (purpose === "education") {
    return { loanType: "Education loan", reasonKey: "education_fees" };
  }

  if (purpose === "home_purchase") {
    return amount > 1000000
      ? { loanType: "Home loan", reasonKey: "buy_house_high_amount" }
      : { loanType: "Small home improvement loan", reasonKey: "small_home" };
  }

  if (purpose === "home_rent") {
    return {
      loanType: "Personal loan (Rent deposit)",
      reasonKey: "rent_deposit",
    };
  }

  if (purpose === "business") {
    return hasCollateral
      ? {
          loanType: "Secured business/MSME loan",
          reasonKey: "business_with_collateral",
        }
      : {
          loanType: "Unsecured business loan",
          reasonKey: "business_without_collateral",
        };
  }

  if (purpose === "vehicle") {
    return {
      loanType: "Vehicle / Two-wheeler loan",
      reasonKey: "vehicle_purchase",
    };
  }

  if (purpose === "medical") {
    return amount <= 50000
      ? {
          loanType: "Emergency personal loan",
          reasonKey: "medical_small",
        }
      : {
          loanType: "Medical / Personal loan",
          reasonKey: "medical_large",
        };
  }

  if (purpose === "debt_consolidation") {
    return {
      loanType: "Debt-consolidation loan",
      reasonKey: "debt_consolidation",
    };
  }

  if (amount < 50000) {
    return {
      loanType: "Small personal loan",
      reasonKey: "small_personal",
    };
  }

  return {
    loanType: "Standard personal loan",
    reasonKey: "general_personal",
  };
}
