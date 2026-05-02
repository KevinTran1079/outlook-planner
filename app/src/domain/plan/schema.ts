import { z } from 'zod';

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD date.');

const nonNegativeMoneySchema = z.number().finite().nonnegative();
const percentageSchema = z.number().finite().min(-1).max(1);

export const accountTypeSchema = z.enum([
  'tfsa',
  'rrsp',
  'non_registered',
  'cash',
]);

export const provinceSchema = z.enum([
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
]);

export const planAccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: accountTypeSchema,
  balanceCents: z.number().int().nonnegative(),
  annualContributionCents: z.number().int().nonnegative(),
  expectedAnnualReturn: percentageSchema,
});

export const planAssumptionsSchema = z.object({
  province: provinceSchema,
  currentAge: z.number().int().min(18).max(100),
  retirementAge: z.number().int().min(40).max(100),
  lifeExpectancyAge: z.number().int().min(50).max(120),
  inflationRate: percentageSchema,
});

export const planDocumentV1Schema = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string().min(1),
    name: z.string().min(1),
    createdAt: isoDateSchema,
    updatedAt: isoDateSchema,
    assumptions: planAssumptionsSchema,
    accounts: z.array(planAccountSchema),
  })
  .superRefine((plan, context) => {
    if (plan.assumptions.retirementAge < plan.assumptions.currentAge) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Retirement age must be greater than or equal to current age.',
        path: ['assumptions', 'retirementAge'],
      });
    }

    if (plan.assumptions.lifeExpectancyAge < plan.assumptions.retirementAge) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Life expectancy age must be greater than or equal to retirement age.',
        path: ['assumptions', 'lifeExpectancyAge'],
      });
    }
  });

export type AccountType = z.infer<typeof accountTypeSchema>;
export type Province = z.infer<typeof provinceSchema>;
export type PlanAccount = z.infer<typeof planAccountSchema>;
export type PlanAssumptions = z.infer<typeof planAssumptionsSchema>;
export type PlanDocumentV1 = z.infer<typeof planDocumentV1Schema>;
export type PlanDocument = PlanDocumentV1;

export const currentPlanSchemaVersion = 1;

export function parsePlanDocument(value: unknown): PlanDocument {
  return planDocumentV1Schema.parse(value);
}

export function createDefaultPlan(now = new Date()): PlanDocument {
  const date = now.toISOString().slice(0, 10);

  return {
    schemaVersion: currentPlanSchemaVersion,
    id: 'default-plan',
    name: 'Retirement plan',
    createdAt: date,
    updatedAt: date,
    assumptions: {
      province: 'ON',
      currentAge: 40,
      retirementAge: 65,
      lifeExpectancyAge: 95,
      inflationRate: 0.021,
    },
    accounts: [
      {
        id: 'tfsa',
        name: 'TFSA',
        type: 'tfsa',
        balanceCents: 5000000,
        annualContributionCents: 700000,
        expectedAnnualReturn: 0.045,
      },
    ],
  };
}

export function dollarsToCents(value: number): number {
  return Math.round(nonNegativeMoneySchema.parse(value) * 100);
}
