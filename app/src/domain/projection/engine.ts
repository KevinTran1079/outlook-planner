import {
  projectionInputSchema,
  type ProjectionInput,
  type ProjectionResult,
} from './types';

const withdrawalOrder: ProjectionInput['accounts'][number]['type'][] = [
  'cash',
  'non_registered',
  'tfsa',
  'rrsp',
];

export function projectPlan(input: ProjectionInput): ProjectionResult {
  const parsedInput = projectionInputSchema.parse(input);
  const accounts = parsedInput.accounts.map((account) => ({ ...account }));
  const years = [];

  for (let age = parsedInput.currentAge; age <= parsedInput.endAge; age += 1) {
    const yearIndex = age - parsedInput.currentAge;
    const year = parsedInput.startYear + yearIndex;
    const incomeCents = cashFlowTotalForAge(
      parsedInput.incomes,
      age,
      yearIndex,
      parsedInput.inflationRate,
    );
    const expenseCents = cashFlowTotalForAge(
      parsedInput.expenses,
      age,
      yearIndex,
      parsedInput.inflationRate,
    );
    const startBalances = new Map(
      accounts.map((account) => [account.id, account.balanceCents]),
    );
    const contributions = new Map<string, number>();
    const withdrawals = new Map<string, number>();
    const growth = new Map<string, number>();

    let availableCashCents = incomeCents - expenseCents;

    if (age < parsedInput.retirementAge && availableCashCents > 0) {
      for (const account of accounts) {
        const contributionCents = Math.min(
          account.annualContributionCents,
          availableCashCents,
        );
        account.balanceCents += contributionCents;
        availableCashCents -= contributionCents;
        contributions.set(account.id, contributionCents);
      }
    }

    let shortfallCents = Math.max(0, -availableCashCents);
    let remainingShortfallCents = shortfallCents;

    for (const accountType of withdrawalOrder) {
      for (const account of accounts.filter(
        (candidate) => candidate.type === accountType,
      )) {
        if (remainingShortfallCents === 0) {
          break;
        }

        const withdrawalCents = Math.min(
          account.balanceCents,
          remainingShortfallCents,
        );
        account.balanceCents -= withdrawalCents;
        remainingShortfallCents -= withdrawalCents;
        withdrawals.set(account.id, withdrawalCents);
      }
    }

    shortfallCents = remainingShortfallCents;

    for (const account of accounts) {
      const growthCents = Math.round(
        account.balanceCents * account.expectedAnnualReturn,
      );
      account.balanceCents = Math.max(0, account.balanceCents + growthCents);
      growth.set(account.id, growthCents);
    }

    const accountSnapshots = accounts.map((account) => ({
      id: account.id,
      name: account.name,
      type: account.type,
      startBalanceCents: startBalances.get(account.id) ?? 0,
      contributionCents: contributions.get(account.id) ?? 0,
      withdrawalCents: withdrawals.get(account.id) ?? 0,
      growthCents: growth.get(account.id) ?? 0,
      endBalanceCents: account.balanceCents,
    }));

    years.push({
      year,
      age,
      incomeCents,
      expenseCents,
      contributionCents: sumValues(contributions),
      withdrawalCents: sumValues(withdrawals),
      shortfallCents,
      endingBalanceCents: accountSnapshots.reduce(
        (total, account) => total + account.endBalanceCents,
        0,
      ),
      accounts: accountSnapshots,
    });
  }

  return {
    input: parsedInput,
    years,
  };
}

function cashFlowTotalForAge(
  cashFlows: ProjectionInput['incomes'],
  age: number,
  yearIndex: number,
  inflationRate: number,
): number {
  return cashFlows.reduce((total, cashFlow) => {
    if (age < cashFlow.startAge || age > cashFlow.endAge) {
      return total;
    }

    const amount = cashFlow.inflationAdjusted
      ? Math.round(
          cashFlow.annualAmountCents * (1 + inflationRate) ** yearIndex,
        )
      : cashFlow.annualAmountCents;
    return total + amount;
  }, 0);
}

function sumValues(values: Map<string, number>): number {
  let total = 0;
  for (const value of values.values()) {
    total += value;
  }
  return total;
}
