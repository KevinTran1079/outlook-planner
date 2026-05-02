import { describe, expect, it } from 'vitest';

import {
  calculateCppElectionFactor,
  calculateOasDeferralFactor,
  calculateRrifMinimumWithdrawalCents,
  calculateRrspContributionLimitCents,
  estimateOasRecoveryTaxCents,
  estimateTaxLite,
  getRrifMinimumWithdrawalFactor,
} from './calculators';

describe('Canada 2026 rules calculators', () => {
  it('estimates federal and provincial tax from versioned tax-lite brackets', () => {
    expect(estimateTaxLite(10000000, 'ON')).toMatchObject({
      federalTaxCents: 1669600,
      provinceTaxCents: 694000,
      totalTaxCents: 2363600,
      rulesVersion: 'CA-2026.1',
    });
    expect(estimateTaxLite(10000000, 'QC')).toMatchObject({
      federalTaxCents: 1394116,
      provinceTaxCents: 1628300,
      totalTaxCents: 3022416,
    });
  });

  it('calculates RRSP room using the 2026 dollar limit and 18 percent earned income rate', () => {
    expect(calculateRrspContributionLimitCents(10000000)).toBe(1800000);
    expect(calculateRrspContributionLimitCents(25000000)).toBe(3381000);
    expect(calculateRrspContributionLimitCents(25000000, 1000000)).toBe(
      2381000,
    );
  });

  it('calculates RRIF minimum withdrawals by age', () => {
    expect(getRrifMinimumWithdrawalFactor(70)).toBeCloseTo(0.05);
    expect(getRrifMinimumWithdrawalFactor(71)).toBe(0.0528);
    expect(getRrifMinimumWithdrawalFactor(95)).toBe(0.2);
    expect(getRrifMinimumWithdrawalFactor(100)).toBe(0.2);
    expect(calculateRrifMinimumWithdrawalCents(10000000, 71)).toBe(528000);
  });

  it('applies CPP election reductions and deferral increases', () => {
    expect(calculateCppElectionFactor(60)).toBeCloseTo(0.64);
    expect(calculateCppElectionFactor(65)).toBe(1);
    expect(calculateCppElectionFactor(70)).toBeCloseTo(1.42);
    expect(calculateCppElectionFactor(72)).toBeCloseTo(1.42);
  });

  it('applies OAS deferral increases and recovery tax', () => {
    expect(calculateOasDeferralFactor(65)).toBe(1);
    expect(calculateOasDeferralFactor(70)).toBeCloseTo(1.36);
    expect(calculateOasDeferralFactor(72)).toBeCloseTo(1.36);
    expect(estimateOasRecoveryTaxCents(10000000, 891660)).toBe(98190);
    expect(estimateOasRecoveryTaxCents(20000000, 891660)).toBe(891660);
  });
});
