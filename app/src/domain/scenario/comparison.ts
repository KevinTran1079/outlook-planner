import { z } from 'zod';

import { projectPlan } from '../projection/engine';
import {
  projectionInputSchema,
  type ProjectionInput,
  type ProjectionResult,
  type ProjectionYear,
} from '../projection/types';

export const scenarioDefinitionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  projectionInput: projectionInputSchema,
});

export const scenarioComparisonInputSchema = z
  .object({
    baselineScenarioId: z.string().min(1),
    scenarios: z.array(scenarioDefinitionSchema).min(2),
  })
  .superRefine((input, context) => {
    const scenarioIds = new Set<string>();

    input.scenarios.forEach((scenario, index) => {
      if (scenarioIds.has(scenario.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Scenario ids must be unique.',
          path: ['scenarios', index, 'id'],
        });
      }
      scenarioIds.add(scenario.id);
    });

    if (!scenarioIds.has(input.baselineScenarioId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Baseline scenario id must match one scenario.',
        path: ['baselineScenarioId'],
      });
    }
  });

export type ScenarioDefinition = z.infer<typeof scenarioDefinitionSchema>;
export type ScenarioComparisonInput = z.infer<
  typeof scenarioComparisonInputSchema
>;

export type ScenarioTotals = {
  openingBalanceCents: number;
  retirementBalanceCents: number;
  finalBalanceCents: number;
  totalIncomeCents: number;
  totalExpenseCents: number;
  totalContributionCents: number;
  totalWithdrawalCents: number;
  totalShortfallCents: number;
};

export type ScenarioDeltas = {
  retirementBalanceCents: number;
  finalBalanceCents: number;
  totalWithdrawalCents: number;
  totalShortfallCents: number;
};

export type ScenarioComparisonRow = {
  id: string;
  name: string;
  isBaseline: boolean;
  projection: ProjectionResult;
  totals: ScenarioTotals;
  deltaFromBaseline: ScenarioDeltas;
};

export type ScenarioComparisonResult = {
  baselineScenarioId: string;
  scenarios: ScenarioComparisonRow[];
};

export function compareScenarios(value: unknown): ScenarioComparisonResult {
  const input = scenarioComparisonInputSchema.parse(value);
  const projectedScenarios = input.scenarios.map((scenario) => {
    const projection = projectPlan(scenario.projectionInput);
    return {
      id: scenario.id,
      name: scenario.name,
      projection,
      totals: summarizeProjection(scenario.projectionInput, projection),
    };
  });
  const baseline = projectedScenarios.find(
    (scenario) => scenario.id === input.baselineScenarioId,
  );

  if (!baseline) {
    throw new Error('Baseline scenario id must match one scenario.');
  }

  return {
    baselineScenarioId: input.baselineScenarioId,
    scenarios: projectedScenarios.map((scenario) => ({
      ...scenario,
      isBaseline: scenario.id === input.baselineScenarioId,
      deltaFromBaseline: {
        retirementBalanceCents:
          scenario.totals.retirementBalanceCents -
          baseline.totals.retirementBalanceCents,
        finalBalanceCents:
          scenario.totals.finalBalanceCents - baseline.totals.finalBalanceCents,
        totalWithdrawalCents:
          scenario.totals.totalWithdrawalCents -
          baseline.totals.totalWithdrawalCents,
        totalShortfallCents:
          scenario.totals.totalShortfallCents -
          baseline.totals.totalShortfallCents,
      },
    })),
  };
}

function summarizeProjection(
  input: ProjectionInput,
  projection: ProjectionResult,
): ScenarioTotals {
  const finalYear = projection.years[projection.years.length - 1];
  const retirementYear = findYearForAge(projection.years, input.retirementAge);

  return {
    openingBalanceCents: sumOpeningBalances(projection.years[0]),
    retirementBalanceCents: retirementYear.endingBalanceCents,
    finalBalanceCents: finalYear.endingBalanceCents,
    totalIncomeCents: sumYearValues(projection.years, 'incomeCents'),
    totalExpenseCents: sumYearValues(projection.years, 'expenseCents'),
    totalContributionCents: sumYearValues(
      projection.years,
      'contributionCents',
    ),
    totalWithdrawalCents: sumYearValues(projection.years, 'withdrawalCents'),
    totalShortfallCents: sumYearValues(projection.years, 'shortfallCents'),
  };
}

function findYearForAge(years: ProjectionYear[], age: number): ProjectionYear {
  return years.find((year) => year.age === age) ?? years[years.length - 1];
}

function sumOpeningBalances(year: ProjectionYear): number {
  return year.accounts.reduce(
    (total, account) => total + account.startBalanceCents,
    0,
  );
}

function sumYearValues(
  years: ProjectionYear[],
  field: keyof Pick<
    ProjectionYear,
    | 'incomeCents'
    | 'expenseCents'
    | 'contributionCents'
    | 'withdrawalCents'
    | 'shortfallCents'
  >,
): number {
  return years.reduce((total, year) => total + year[field], 0);
}
