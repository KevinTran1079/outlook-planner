import { describe, expect, it } from 'vitest';

import { createDefaultPlan } from './schema';
import { migratePlanDocument, UnsupportedPlanVersionError } from './migrations';

describe('plan migrations', () => {
  it('accepts the current schema version', () => {
    const plan = createDefaultPlan();

    expect(migratePlanDocument(plan)).toEqual(plan);
  });

  it('rejects unknown schema versions', () => {
    expect(() =>
      migratePlanDocument({
        schemaVersion: 999,
      }),
    ).toThrow(UnsupportedPlanVersionError);
  });
});
