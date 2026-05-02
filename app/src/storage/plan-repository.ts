import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

import { migratePlanDocument } from '../domain/plan/migrations';
import { parsePlanDocument, type PlanDocument } from '../domain/plan/schema';

const databaseName = 'outlook-planner';
const databaseVersion = 1;
const planStoreName = 'plans';

interface OutlookPlannerDatabase extends DBSchema {
  plans: {
    key: string;
    value: PlanDocument;
    indexes: {
      'by-updated-at': string;
    };
  };
}

let databasePromise: Promise<IDBPDatabase<OutlookPlannerDatabase>> | null =
  null;

export async function savePlan(plan: PlanDocument): Promise<void> {
  const parsedPlan = parsePlanDocument(plan);
  const database = await getDatabase();
  await database.put(planStoreName, parsedPlan);
}

export async function loadPlan(id: string): Promise<PlanDocument | null> {
  const database = await getDatabase();
  const plan = await database.get(planStoreName, id);
  return plan === undefined ? null : parsePlanDocument(plan);
}

export async function listPlans(): Promise<PlanDocument[]> {
  const database = await getDatabase();
  const plans = await database.getAllFromIndex(planStoreName, 'by-updated-at');
  return plans.map((plan) => parsePlanDocument(plan));
}

export async function deletePlan(id: string): Promise<void> {
  const database = await getDatabase();
  await database.delete(planStoreName, id);
}

export async function importPlanFromJson(json: string): Promise<PlanDocument> {
  const parsedJson: unknown = JSON.parse(json);
  return migratePlanDocument(parsedJson);
}

export function exportPlanToJson(plan: PlanDocument): string {
  return `${JSON.stringify(parsePlanDocument(plan), null, 2)}\n`;
}

export function resetPlanRepositoryForTests(): void {
  void databasePromise?.then((database) => {
    database.close();
  });
  databasePromise = null;
}

function getDatabase(): Promise<IDBPDatabase<OutlookPlannerDatabase>> {
  databasePromise ??= openDB<OutlookPlannerDatabase>(
    databaseName,
    databaseVersion,
    {
      upgrade(database) {
        if (!database.objectStoreNames.contains(planStoreName)) {
          const store = database.createObjectStore(planStoreName, {
            keyPath: 'id',
          });
          store.createIndex('by-updated-at', 'updatedAt');
        }
      },
    },
  );

  return databasePromise;
}
