import {
  currentPlanSchemaVersion,
  parsePlanDocument,
  type PlanDocument,
} from './schema';

type VersionedPlanLike = {
  schemaVersion?: unknown;
};

export class UnsupportedPlanVersionError extends Error {
  constructor(version: unknown) {
    super(`Unsupported plan schema version: ${String(version)}`);
    this.name = 'UnsupportedPlanVersionError';
  }
}

export function migratePlanDocument(value: unknown): PlanDocument {
  if (!isVersionedPlanLike(value)) {
    throw new UnsupportedPlanVersionError(undefined);
  }

  if (value.schemaVersion === currentPlanSchemaVersion) {
    return parsePlanDocument(value);
  }

  throw new UnsupportedPlanVersionError(value.schemaVersion);
}

function isVersionedPlanLike(value: unknown): value is VersionedPlanLike {
  return (
    typeof value === 'object' && value !== null && 'schemaVersion' in value
  );
}
