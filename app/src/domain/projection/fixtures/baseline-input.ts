import type { ProjectionInput } from '../types';

export const baselineProjectionInput: ProjectionInput = {
  startYear: 2026,
  currentAge: 64,
  retirementAge: 65,
  endAge: 67,
  inflationRate: 0.02,
  accounts: [
    {
      id: 'cash',
      name: 'Cash reserve',
      type: 'cash',
      balanceCents: 1000000,
      annualContributionCents: 0,
      expectedAnnualReturn: 0.01,
    },
    {
      id: 'tfsa',
      name: 'TFSA',
      type: 'tfsa',
      balanceCents: 5000000,
      annualContributionCents: 500000,
      expectedAnnualReturn: 0.04,
    },
    {
      id: 'rrsp',
      name: 'RRSP',
      type: 'rrsp',
      balanceCents: 8000000,
      annualContributionCents: 800000,
      expectedAnnualReturn: 0.05,
    },
  ],
  incomes: [
    {
      id: 'salary',
      label: 'Salary',
      startAge: 64,
      endAge: 64,
      annualAmountCents: 9000000,
      inflationAdjusted: false,
    },
    {
      id: 'cpp',
      label: 'CPP estimate',
      startAge: 65,
      endAge: 67,
      annualAmountCents: 1200000,
      inflationAdjusted: true,
    },
  ],
  expenses: [
    {
      id: 'living',
      label: 'Living expenses',
      startAge: 64,
      endAge: 67,
      annualAmountCents: 6000000,
      inflationAdjusted: true,
    },
  ],
};
