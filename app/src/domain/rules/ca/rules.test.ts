import { describe, expect, it } from 'vitest';

import { provinceSchema } from '../../plan/schema';
import { canadaRules2026 } from './2026';

describe('Canada 2026 rule tables', () => {
  it('has source metadata and effective dates for all rule groups', () => {
    const sources = [
      canadaRules2026.federalTax.source,
      canadaRules2026.registeredAccounts.tfsa.source,
      canadaRules2026.registeredAccounts.rrsp.source,
      canadaRules2026.registeredAccounts.rrif.source,
      canadaRules2026.publicPensions.cpp.source,
      canadaRules2026.publicPensions.oas.source,
      ...Object.values(canadaRules2026.provinceTax).map(
        (table) => table.source,
      ),
    ];

    for (const source of sources) {
      expect(source.title).toBeTruthy();
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.retrievedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.effectiveFrom).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('covers every province and territory in the plan schema', () => {
    expect(Object.keys(canadaRules2026.provinceTax).sort()).toEqual(
      provinceSchema.options.slice().sort(),
    );
  });

  it('contains core 2026 registered account limits and pension amounts', () => {
    expect(canadaRules2026.registeredAccounts.tfsa.annualDollarLimitCents).toBe(
      700000,
    );
    expect(canadaRules2026.registeredAccounts.rrsp.dollarLimitCents).toBe(
      3381000,
    );
    expect(canadaRules2026.publicPensions.cpp.maxMonthlyAt65Cents).toBe(150765);
    expect(canadaRules2026.publicPensions.oas.maxMonthlyAge65To74Cents).toBe(
      74305,
    );
  });
});
