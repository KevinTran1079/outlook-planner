import { describe, expect, it } from 'vitest';

import { createDefaultPlan, dollarsToCents, parsePlanDocument } from './schema';

describe('plan schema', () => {
  it('parses a valid v1 plan document', () => {
    const plan = createDefaultPlan(new Date('2026-05-02T12:00:00.000Z'));

    expect(parsePlanDocument(plan)).toEqual(plan);
  });

  it('rejects retirement ages before the current age', () => {
    const plan = createDefaultPlan();

    expect(() =>
      parsePlanDocument({
        ...plan,
        assumptions: {
          ...plan.assumptions,
          currentAge: 70,
          retirementAge: 65,
        },
      }),
    ).toThrow(/Retirement age/);
  });

  it('stores money as non-negative integer cents', () => {
    const plan = createDefaultPlan();

    expect(() =>
      parsePlanDocument({
        ...plan,
        accounts: [
          {
            ...plan.accounts[0],
            balanceCents: 10.5,
          },
        ],
      }),
    ).toThrow();
    expect(dollarsToCents(12.34)).toBe(1234);
  });
});
