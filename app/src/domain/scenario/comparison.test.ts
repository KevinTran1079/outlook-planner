import { describe, expect, it } from 'vitest';

import { projectPlan } from '../projection/engine';
import { baselineProjectionInput } from '../projection/fixtures/baseline-input';
import type { ProjectionInput } from '../projection/types';
import { compareScenarios } from './comparison';

describe('compareScenarios', () => {
  it('compares scenarios against the selected baseline', () => {
    const lowerExpenseInput = createLowerExpenseInput();

    const result = compareScenarios({
      baselineScenarioId: 'baseline',
      scenarios: [
        {
          id: 'baseline',
          name: 'Baseline',
          projectionInput: baselineProjectionInput,
        },
        {
          id: 'lower-expenses',
          name: 'Lower expenses',
          projectionInput: lowerExpenseInput,
        },
      ],
    });

    const baseline = result.scenarios[0];
    const lowerExpenses = result.scenarios[1];
    const expectedLowerExpenseProjection = projectPlan(lowerExpenseInput);
    const expectedLowerExpenseFinalBalance =
      expectedLowerExpenseProjection.years[
        expectedLowerExpenseProjection.years.length - 1
      ].endingBalanceCents;

    expect(result.baselineScenarioId).toBe('baseline');
    expect(result.scenarios.map((scenario) => scenario.id)).toEqual([
      'baseline',
      'lower-expenses',
    ]);
    expect(baseline).toMatchObject({
      isBaseline: true,
      totals: {
        openingBalanceCents: 14000000,
        retirementBalanceCents: 11609360,
        finalBalanceCents: 1945035,
        totalShortfallCents: 0,
      },
      deltaFromBaseline: {
        retirementBalanceCents: 0,
        finalBalanceCents: 0,
        totalWithdrawalCents: 0,
        totalShortfallCents: 0,
      },
    });
    expect(lowerExpenses.isBaseline).toBe(false);
    expect(lowerExpenses.totals.finalBalanceCents).toBe(
      expectedLowerExpenseFinalBalance,
    );
    expect(lowerExpenses.totals.finalBalanceCents).toBeGreaterThan(
      baseline.totals.finalBalanceCents,
    );
    expect(lowerExpenses.deltaFromBaseline.finalBalanceCents).toBe(
      lowerExpenses.totals.finalBalanceCents -
        baseline.totals.finalBalanceCents,
    );
    expect(lowerExpenses.totals.totalExpenseCents).toBeLessThan(
      baseline.totals.totalExpenseCents,
    );
  });

  it('is deterministic for the same comparison input', () => {
    const input = {
      baselineScenarioId: 'baseline',
      scenarios: [
        {
          id: 'baseline',
          name: 'Baseline',
          projectionInput: baselineProjectionInput,
        },
        {
          id: 'lower-expenses',
          name: 'Lower expenses',
          projectionInput: createLowerExpenseInput(),
        },
      ],
    };

    expect(compareScenarios(input)).toEqual(compareScenarios(input));
  });

  it('requires the baseline scenario id to exist', () => {
    expect(() =>
      compareScenarios({
        baselineScenarioId: 'missing',
        scenarios: [
          {
            id: 'baseline',
            name: 'Baseline',
            projectionInput: baselineProjectionInput,
          },
          {
            id: 'lower-expenses',
            name: 'Lower expenses',
            projectionInput: createLowerExpenseInput(),
          },
        ],
      }),
    ).toThrow(/Baseline scenario id must match one scenario/);
  });

  it('rejects duplicate scenario ids', () => {
    expect(() =>
      compareScenarios({
        baselineScenarioId: 'baseline',
        scenarios: [
          {
            id: 'baseline',
            name: 'Baseline',
            projectionInput: baselineProjectionInput,
          },
          {
            id: 'baseline',
            name: 'Duplicate baseline',
            projectionInput: createLowerExpenseInput(),
          },
        ],
      }),
    ).toThrow(/Scenario ids must be unique/);
  });

  it('rejects invalid scenario projection input', () => {
    expect(() =>
      compareScenarios({
        baselineScenarioId: 'baseline',
        scenarios: [
          {
            id: 'baseline',
            name: 'Baseline',
            projectionInput: baselineProjectionInput,
          },
          {
            id: 'invalid',
            name: 'Invalid',
            projectionInput: {
              ...baselineProjectionInput,
              retirementAge: 60,
            },
          },
        ],
      }),
    ).toThrow(/Retirement age must be greater than or equal to current age/);
  });
});

function createLowerExpenseInput(): ProjectionInput {
  return {
    ...baselineProjectionInput,
    expenses: baselineProjectionInput.expenses.map((expense) => ({
      ...expense,
      annualAmountCents: expense.annualAmountCents - 1000000,
    })),
  };
}
