import { describe, expect, it } from 'vitest';

import { projectPlan } from './engine';
import { baselineGoldenProjection } from './fixtures/baseline-golden';
import { baselineProjectionInput } from './fixtures/baseline-input';

describe('projectPlan', () => {
  it('matches the baseline golden yearly projection', () => {
    expect(projectPlan(baselineProjectionInput).years).toEqual(
      baselineGoldenProjection,
    );
  });

  it('is deterministic for the same input', () => {
    expect(projectPlan(baselineProjectionInput)).toEqual(
      projectPlan(baselineProjectionInput),
    );
  });

  it('withdraws from cash, non-registered, TFSA, then RRSP', () => {
    const result = projectPlan({
      ...baselineProjectionInput,
      currentAge: 65,
      retirementAge: 65,
      endAge: 65,
      accounts: [
        {
          id: 'rrsp',
          name: 'RRSP',
          type: 'rrsp',
          balanceCents: 100000,
          annualContributionCents: 0,
          expectedAnnualReturn: 0,
        },
        {
          id: 'tfsa',
          name: 'TFSA',
          type: 'tfsa',
          balanceCents: 100000,
          annualContributionCents: 0,
          expectedAnnualReturn: 0,
        },
        {
          id: 'cash',
          name: 'Cash',
          type: 'cash',
          balanceCents: 100000,
          annualContributionCents: 0,
          expectedAnnualReturn: 0,
        },
      ],
      incomes: [],
      expenses: [
        {
          id: 'expense',
          label: 'Expense',
          startAge: 65,
          endAge: 65,
          annualAmountCents: 250000,
          inflationAdjusted: false,
        },
      ],
    });

    expect(result.years[0].accounts).toMatchObject([
      { id: 'rrsp', withdrawalCents: 50000, endBalanceCents: 50000 },
      { id: 'tfsa', withdrawalCents: 100000, endBalanceCents: 0 },
      { id: 'cash', withdrawalCents: 100000, endBalanceCents: 0 },
    ]);
  });

  it('reports remaining shortfall after all accounts are depleted', () => {
    const result = projectPlan({
      ...baselineProjectionInput,
      currentAge: 65,
      retirementAge: 65,
      endAge: 65,
      accounts: [
        {
          id: 'cash',
          name: 'Cash',
          type: 'cash',
          balanceCents: 100000,
          annualContributionCents: 0,
          expectedAnnualReturn: 0,
        },
      ],
      incomes: [],
      expenses: [
        {
          id: 'expense',
          label: 'Expense',
          startAge: 65,
          endAge: 65,
          annualAmountCents: 150000,
          inflationAdjusted: false,
        },
      ],
    });

    expect(result.years[0]).toMatchObject({
      withdrawalCents: 100000,
      shortfallCents: 50000,
      endingBalanceCents: 0,
    });
  });
});
