import type { Province } from '../../plan/schema';
import { canadaRules2026 } from './2026';
import type { CanadaRules, TaxBracket } from './types';

export type TaxLiteEstimate = {
  federalTaxCents: number;
  provinceTaxCents: number;
  totalTaxCents: number;
  marginalRate: number;
  rulesVersion: string;
};

export function estimateTaxLite(
  taxableIncomeCents: number,
  province: Province,
  rules: CanadaRules = canadaRules2026,
): TaxLiteEstimate {
  const federalBeforeAbatement = calculateBracketTaxCents(
    taxableIncomeCents,
    rules.federalTax.brackets,
  );
  const federalTaxCents =
    province === 'QC'
      ? Math.round(federalBeforeAbatement * (1 - 0.165))
      : federalBeforeAbatement;
  const provinceTaxCents = calculateBracketTaxCents(
    taxableIncomeCents,
    rules.provinceTax[province].brackets,
  );
  const federalRate =
    findBracket(taxableIncomeCents, rules.federalTax.brackets).rate *
    (province === 'QC' ? 1 - 0.165 : 1);
  const provinceRate = findBracket(
    taxableIncomeCents,
    rules.provinceTax[province].brackets,
  ).rate;

  return {
    federalTaxCents,
    provinceTaxCents,
    totalTaxCents: federalTaxCents + provinceTaxCents,
    marginalRate: federalRate + provinceRate,
    rulesVersion: rules.version,
  };
}

export function calculateBracketTaxCents(
  taxableIncomeCents: number,
  brackets: TaxBracket[],
): number {
  if (taxableIncomeCents <= 0) {
    return 0;
  }

  const bracket = findBracket(taxableIncomeCents, brackets);
  return Math.max(
    0,
    Math.round(taxableIncomeCents * bracket.rate - bracket.constantCents),
  );
}

export function calculateRrspContributionLimitCents(
  previousYearEarnedIncomeCents: number,
  pensionAdjustmentCents = 0,
  rules: CanadaRules = canadaRules2026,
): number {
  const grossLimit = Math.min(
    Math.round(
      previousYearEarnedIncomeCents *
        rules.registeredAccounts.rrsp.earnedIncomeRate,
    ),
    rules.registeredAccounts.rrsp.dollarLimitCents,
  );

  return Math.max(0, grossLimit - pensionAdjustmentCents);
}

export function getRrifMinimumWithdrawalFactor(
  ageAtStartOfYear: number,
  rules: CanadaRules = canadaRules2026,
): number {
  if (ageAtStartOfYear < 71) {
    return (
      1 /
      (rules.registeredAccounts.rrif.under71FormulaDenominatorAge -
        ageAtStartOfYear)
    );
  }

  if (ageAtStartOfYear >= 95) {
    return rules.registeredAccounts.rrif.minimumWithdrawalFactors[95];
  }

  return rules.registeredAccounts.rrif.minimumWithdrawalFactors[
    ageAtStartOfYear
  ];
}

export function calculateRrifMinimumWithdrawalCents(
  openingBalanceCents: number,
  ageAtStartOfYear: number,
  rules: CanadaRules = canadaRules2026,
): number {
  return Math.round(
    openingBalanceCents *
      getRrifMinimumWithdrawalFactor(ageAtStartOfYear, rules),
  );
}

export function calculateCppElectionFactor(
  startAgeYears: number,
  startAgeMonths = 0,
  rules: CanadaRules = canadaRules2026,
): number {
  const startMonths = startAgeYears * 12 + startAgeMonths;
  const standardMonths = rules.publicPensions.cpp.standardStartAge * 12;
  const earliestMonths = rules.publicPensions.cpp.earliestStartAge * 12;
  const latestMonths = rules.publicPensions.cpp.latestStartAge * 12;
  const clampedMonths = Math.min(
    latestMonths,
    Math.max(earliestMonths, startMonths),
  );

  if (clampedMonths < standardMonths) {
    return (
      1 -
      (standardMonths - clampedMonths) *
        rules.publicPensions.cpp.earlyReductionPerMonth
    );
  }

  return (
    1 +
    (clampedMonths - standardMonths) *
      rules.publicPensions.cpp.deferralIncreasePerMonth
  );
}

export function calculateOasDeferralFactor(
  startAgeYears: number,
  startAgeMonths = 0,
  rules: CanadaRules = canadaRules2026,
): number {
  const startMonths = startAgeYears * 12 + startAgeMonths;
  const standardMonths = rules.publicPensions.oas.standardStartAge * 12;
  const latestMonths = rules.publicPensions.oas.latestStartAge * 12;
  const clampedMonths = Math.min(
    latestMonths,
    Math.max(standardMonths, startMonths),
  );

  return (
    1 +
    (clampedMonths - standardMonths) *
      rules.publicPensions.oas.deferralIncreasePerMonth
  );
}

export function estimateOasRecoveryTaxCents(
  netIncomeCents: number,
  annualOasCents: number,
  rules: CanadaRules = canadaRules2026,
): number {
  const excessIncomeCents = Math.max(
    0,
    netIncomeCents - rules.publicPensions.oas.recoveryThreshold2025IncomeCents,
  );

  return Math.min(
    annualOasCents,
    Math.round(excessIncomeCents * rules.publicPensions.oas.recoveryTaxRate),
  );
}

function findBracket(
  taxableIncomeCents: number,
  brackets: TaxBracket[],
): TaxBracket {
  return brackets.reduce((selected, candidate) =>
    candidate.thresholdCents <= taxableIncomeCents ? candidate : selected,
  );
}
