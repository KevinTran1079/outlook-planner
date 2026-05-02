import { z } from 'zod';

import { accountTypeSchema } from '../plan/schema';

export const projectionAccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: accountTypeSchema,
  balanceCents: z.number().int().nonnegative(),
  annualContributionCents: z.number().int().nonnegative(),
  expectedAnnualReturn: z.number().finite().min(-1).max(1),
});

export const annualCashFlowSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  startAge: z.number().int().min(0).max(130),
  endAge: z.number().int().min(0).max(130),
  annualAmountCents: z.number().int().nonnegative(),
  inflationAdjusted: z.boolean(),
});

export const projectionInputSchema = z
  .object({
    startYear: z.number().int().min(1900).max(2200),
    currentAge: z.number().int().min(0).max(130),
    retirementAge: z.number().int().min(0).max(130),
    endAge: z.number().int().min(0).max(130),
    inflationRate: z.number().finite().min(-1).max(1),
    accounts: z.array(projectionAccountSchema).min(1),
    incomes: z.array(annualCashFlowSchema),
    expenses: z.array(annualCashFlowSchema),
  })
  .superRefine((input, context) => {
    if (input.retirementAge < input.currentAge) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Retirement age must be greater than or equal to current age.',
        path: ['retirementAge'],
      });
    }

    if (input.endAge < input.currentAge) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End age must be greater than or equal to current age.',
        path: ['endAge'],
      });
    }

    for (const [index, cashFlow] of [
      ...input.incomes,
      ...input.expenses,
    ].entries()) {
      if (cashFlow.endAge < cashFlow.startAge) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Cash flow end age must be greater than or equal to start age.',
          path: ['cashFlows', index, 'endAge'],
        });
      }
    }
  });

export type ProjectionAccount = z.infer<typeof projectionAccountSchema>;
export type AnnualCashFlow = z.infer<typeof annualCashFlowSchema>;
export type ProjectionInput = z.infer<typeof projectionInputSchema>;

export type AccountProjectionSnapshot = {
  id: string;
  name: string;
  type: ProjectionAccount['type'];
  startBalanceCents: number;
  contributionCents: number;
  withdrawalCents: number;
  growthCents: number;
  endBalanceCents: number;
};

export type ProjectionYear = {
  year: number;
  age: number;
  incomeCents: number;
  expenseCents: number;
  contributionCents: number;
  withdrawalCents: number;
  shortfallCents: number;
  endingBalanceCents: number;
  accounts: AccountProjectionSnapshot[];
};

export type ProjectionResult = {
  input: ProjectionInput;
  years: ProjectionYear[];
};
