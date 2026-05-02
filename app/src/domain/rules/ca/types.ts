import type { Province } from '../../plan/schema';

export type RuleSource = {
  title: string;
  url: string;
  retrievedAt: string;
  effectiveFrom: string;
  effectiveTo?: string;
};

export type TaxBracket = {
  thresholdCents: number;
  rate: number;
  constantCents: number;
};

export type ProvinceTaxTable = {
  province: Province;
  brackets: TaxBracket[];
  source: RuleSource;
};

export type CanadaRules = {
  version: string;
  currency: 'CAD';
  federalTax: {
    brackets: TaxBracket[];
    basicPersonalAmountCents: number;
    source: RuleSource;
  };
  provinceTax: Record<Province, ProvinceTaxTable>;
  registeredAccounts: {
    tfsa: {
      annualDollarLimitCents: number;
      withdrawalRoomRestoredNextYear: boolean;
      source: RuleSource;
    };
    rrsp: {
      dollarLimitCents: number;
      earnedIncomeRate: number;
      source: RuleSource;
    };
    rrif: {
      minimumWithdrawalFactors: Record<number, number>;
      under71FormulaDenominatorAge: number;
      source: RuleSource;
    };
  };
  publicPensions: {
    cpp: {
      standardStartAge: number;
      earliestStartAge: number;
      latestStartAge: number;
      earlyReductionPerMonth: number;
      deferralIncreasePerMonth: number;
      maxMonthlyAt65Cents: number;
      source: RuleSource;
    };
    oas: {
      standardStartAge: number;
      latestStartAge: number;
      deferralIncreasePerMonth: number;
      maxMonthlyAge65To74Cents: number;
      maxMonthlyAge75PlusCents: number;
      recoveryTaxRate: number;
      recoveryThreshold2025IncomeCents: number;
      source: RuleSource;
    };
  };
};
