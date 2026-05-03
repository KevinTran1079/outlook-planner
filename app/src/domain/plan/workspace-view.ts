import { projectPlan } from '../projection/engine';
import { baselineProjectionInput } from '../projection/fixtures/baseline-input';
import type { ProjectionResult, ProjectionYear } from '../projection/types';
import { canadaRules2026, estimateTaxLite } from '../rules/ca';
import { createDefaultPlan, parsePlanDocument } from './schema';

type DisplayMetric = {
  label: string;
  value: string;
  detail: string;
};

type WorkspaceAccount = {
  id: string;
  name: string;
  typeLabel: string;
  balance: string;
  contribution: string;
  expectedReturn: string;
};

type ProjectionMilestone = {
  year: number;
  age: number;
  label: string;
  endingBalance: string;
  income: string;
  expenses: string;
  withdrawal: string;
  shortfall: string;
  balancePercent: number;
};

type RuleSourceSummary = {
  label: string;
  title: string;
  effective: string;
  retrievedAt: string;
  url: string;
};

export type PlanningWorkspaceView = {
  planName: string;
  updatedAt: string;
  rulesVersion: string;
  assumptions: DisplayMetric[];
  accounts: WorkspaceAccount[];
  projectionSummary: DisplayMetric[];
  milestones: ProjectionMilestone[];
  ruleSources: RuleSourceSummary[];
  validationItems: string[];
  privacyItems: string[];
};

const currencyFormatter = new Intl.NumberFormat('en-CA', {
  currency: 'CAD',
  maximumFractionDigits: 0,
  style: 'currency',
});

const percentFormatter = new Intl.NumberFormat('en-CA', {
  maximumFractionDigits: 1,
  style: 'percent',
});

export function createPlanningWorkspaceView(): PlanningWorkspaceView {
  const plan = parsePlanDocument(createDefaultPlan(new Date('2026-05-02')));
  const projection = projectPlan(baselineProjectionInput);
  const firstYear = projection.years[0];
  const retirementYear = findYearForAge(
    projection,
    baselineProjectionInput.retirementAge,
  );
  const finalYear = projection.years[projection.years.length - 1];
  const maxEndingBalanceCents = Math.max(
    ...projection.years.map((year) => year.endingBalanceCents),
  );
  const taxEstimate = estimateTaxLite(
    firstYear.incomeCents,
    plan.assumptions.province,
  );

  return {
    planName: plan.name,
    updatedAt: plan.updatedAt,
    rulesVersion: canadaRules2026.version,
    assumptions: [
      {
        label: 'Province',
        value: plan.assumptions.province,
        detail: 'Used for tax-lite rule lookup.',
      },
      {
        label: 'Retirement age',
        value: String(plan.assumptions.retirementAge),
        detail: `Current age ${plan.assumptions.currentAge}.`,
      },
      {
        label: 'Life expectancy',
        value: String(plan.assumptions.lifeExpectancyAge),
        detail: 'Projection planning horizon.',
      },
      {
        label: 'Inflation',
        value: percentFormatter.format(plan.assumptions.inflationRate),
        detail: 'Applied by projection inputs.',
      },
    ],
    accounts: baselineProjectionInput.accounts.map((account) => ({
      id: account.id,
      name: account.name,
      typeLabel: account.type.toUpperCase().replace('_', ' '),
      balance: formatCents(account.balanceCents),
      contribution: formatCents(account.annualContributionCents),
      expectedReturn: percentFormatter.format(account.expectedAnnualReturn),
    })),
    projectionSummary: [
      {
        label: 'Opening balance',
        value: formatCents(sumOpeningBalances(projection)),
        detail: `Start year ${baselineProjectionInput.startYear}.`,
      },
      {
        label: 'Retirement balance',
        value: formatCents(retirementYear.endingBalanceCents),
        detail: `Age ${retirementYear.age}.`,
      },
      {
        label: 'Final balance',
        value: formatCents(finalYear.endingBalanceCents),
        detail: `Age ${finalYear.age}.`,
      },
      {
        label: 'Tax-lite estimate',
        value: formatCents(taxEstimate.totalTaxCents),
        detail: `${percentFormatter.format(taxEstimate.marginalRate)} marginal rate.`,
      },
    ],
    milestones: projection.years.map((year) =>
      createMilestone(year, maxEndingBalanceCents),
    ),
    ruleSources: [
      {
        label: 'Federal and Ontario tax',
        title: canadaRules2026.federalTax.source.title,
        effective: formatEffectiveRange(canadaRules2026.federalTax.source),
        retrievedAt: canadaRules2026.federalTax.source.retrievedAt,
        url: canadaRules2026.federalTax.source.url,
      },
      {
        label: 'TFSA limit',
        title: canadaRules2026.registeredAccounts.tfsa.source.title,
        effective: formatEffectiveRange(
          canadaRules2026.registeredAccounts.tfsa.source,
        ),
        retrievedAt: canadaRules2026.registeredAccounts.tfsa.source.retrievedAt,
        url: canadaRules2026.registeredAccounts.tfsa.source.url,
      },
      {
        label: 'CPP timing',
        title: canadaRules2026.publicPensions.cpp.source.title,
        effective: formatEffectiveRange(
          canadaRules2026.publicPensions.cpp.source,
        ),
        retrievedAt: canadaRules2026.publicPensions.cpp.source.retrievedAt,
        url: canadaRules2026.publicPensions.cpp.source.url,
      },
    ],
    validationItems: [
      'Plan document parsed with schema validation.',
      'Projection input parsed before calculation.',
      'Canada rule tables include source metadata.',
    ],
    privacyItems: [
      'No account creation.',
      'No server sync.',
      'Import and export use local JSON files.',
    ],
  };
}

function createMilestone(
  year: ProjectionYear,
  maxEndingBalanceCents: number,
): ProjectionMilestone {
  const balanceRatio =
    maxEndingBalanceCents === 0
      ? 0
      : year.endingBalanceCents / maxEndingBalanceCents;
  const balancePercent =
    year.endingBalanceCents === 0
      ? 0
      : Math.min(100, Math.max(4, Math.round(balanceRatio * 100)));

  return {
    year: year.year,
    age: year.age,
    label:
      year.age < baselineProjectionInput.retirementAge ? 'Working' : 'Retired',
    endingBalance: formatCents(year.endingBalanceCents),
    income: formatCents(year.incomeCents),
    expenses: formatCents(year.expenseCents),
    withdrawal: formatCents(year.withdrawalCents),
    shortfall: formatCents(year.shortfallCents),
    balancePercent,
  };
}

function findYearForAge(
  projection: ProjectionResult,
  age: number,
): ProjectionYear {
  return (
    projection.years.find((year) => year.age === age) ??
    projection.years[projection.years.length - 1]
  );
}

function sumOpeningBalances(projection: ProjectionResult): number {
  return projection.years[0].accounts.reduce(
    (total, account) => total + account.startBalanceCents,
    0,
  );
}

function formatCents(cents: number): string {
  return currencyFormatter.format(cents / 100);
}

function formatEffectiveRange(source: {
  effectiveFrom: string;
  effectiveTo?: string;
}): string {
  return source.effectiveTo
    ? `${source.effectiveFrom} to ${source.effectiveTo}`
    : `From ${source.effectiveFrom}`;
}
