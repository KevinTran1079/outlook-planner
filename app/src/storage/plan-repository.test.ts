import 'fake-indexeddb/auto';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createDefaultPlan } from '../domain/plan/schema';
import {
  deletePlan,
  exportPlanToJson,
  importPlanFromJson,
  listPlans,
  loadPlan,
  resetPlanRepositoryForTests,
  savePlan,
} from './plan-repository';

describe('plan repository', () => {
  beforeEach(() => {
    resetPlanRepositoryForTests();
    indexedDB.deleteDatabase('outlook-planner');
  });

  afterEach(() => {
    resetPlanRepositoryForTests();
    indexedDB.deleteDatabase('outlook-planner');
    vi.restoreAllMocks();
  });

  it('saves, loads, lists, and deletes a validated plan locally', async () => {
    const plan = createDefaultPlan(new Date('2026-05-02T12:00:00.000Z'));

    await savePlan(plan);

    expect(await loadPlan(plan.id)).toEqual(plan);
    expect(await listPlans()).toEqual([plan]);

    await deletePlan(plan.id);

    expect(await loadPlan(plan.id)).toBeNull();
  });

  it('round-trips import and export through schema validation', async () => {
    const plan = createDefaultPlan(new Date('2026-05-02T12:00:00.000Z'));
    const exported = exportPlanToJson(plan);

    expect(await importPlanFromJson(exported)).toEqual(plan);
    expect(() =>
      exportPlanToJson({ ...plan, schemaVersion: 2 } as unknown as typeof plan),
    ).toThrow();
  });

  it('does not call network APIs for local persistence or import/export', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const plan = createDefaultPlan(new Date('2026-05-02T12:00:00.000Z'));

    await savePlan(plan);
    await loadPlan(plan.id);
    await listPlans();
    await importPlanFromJson(exportPlanToJson(plan));

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
