# Execution Plan: PR 3 Domain Schemas And Local Storage

## Goal

Add validated plan document schemas, migration entry points, browser-local persistence, JSON import/export, and privacy tests.

## Scope

In scope:

- Define the v1 plan document schema.
- Add migration handling for current and unsupported schema versions.
- Add IndexedDB-backed plan save/load/list/delete operations.
- Add JSON import/export with schema validation.
- Add tests for validation, migrations, persistence, import/export, and no-network behavior.

Out of scope:

- Projection engine.
- Canada rule tables.
- UI wiring for persistence.
- Multi-plan UX.

## Acceptance Criteria

- All imported plan JSON passes schema validation.
- Stored plan documents are validated before write and after read.
- Unsupported schema versions fail clearly.
- Local persistence tests do not call network APIs.
- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.

## Touched Modules

- `app/src/domain/plan/`
- `app/src/storage/`
- `docs/`
- `package.json`
- `package-lock.json`

## Decisions

- Use Zod for runtime schema validation at import, storage, and domain boundaries.
- Store money as integer cents to avoid floating point drift at persistence boundaries.
- Use IndexedDB through the `idb` helper library to keep the storage API small and testable.

## Validation Evidence

- Command: `npm run agent:preflight`
  - Result: Passed. Output: `Agent preflight passed.`
- Command: `npm run agent:pr-ready`
  - Result: Passed. Output: `Agent PR readiness passed.`
- Command: `npm run format`
  - Result: Passed. Output: `All matched files use Prettier code style!`
- Command: `npm run lint`
  - Result: Passed.
- Command: `npm run typecheck`
  - Result: Passed.
- Command: `npm run test`
  - Result: Passed. 4 test files and 9 tests passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Completed and merged in PR 4.
- Known limitations: Persistence is not yet wired into the UI; that starts in a later checkpoint.
