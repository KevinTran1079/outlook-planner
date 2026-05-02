# Execution Plan: PR 7 Planning Workspace UI

## Goal

Build a deterministic planning workspace UI as the first screen of the app, using existing plan, projection, storage, and Canada rules modules.

## Scope

In scope:

- Replace the placeholder shell with a usable planning workspace surface.
- Show assumptions, accounts, projection timeline, source metadata, validation state, privacy posture, and import/export controls.
- Keep financial math and projection derivation outside React components.
- Add focused unit and Playwright coverage for the workspace.

Out of scope:

- Scenario comparison and Monte Carlo simulation.
- Full persistence wiring beyond visible import/export controls.
- Editable forms and complete tax planning workflows.

## Acceptance Criteria

- First screen is the planning workspace, not a landing page.
- React components display domain-derived data without implementing financial math.
- Canada rules version and source metadata are visible near projection context.
- Import/export, validation, and local-first status are visible.
- React unit tests cover major UI regions.
- Playwright confirms workspace load and no console errors.
- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run agent:e2e` passes.

## Touched Modules

- `app/src/App.tsx`
- `app/src/App.test.tsx`
- `app/src/domain/plan/`
- `app/src/e2e/`
- `docs/`

## Decisions

- Skip ahead to planning UI before scenarios and Monte Carlo because the user requested frontend work next.
- Use checkpoint branch `checkpoint/7-planning-workspace-ui` to preserve the original checkpoint identity, while noting the sequence change here.
- Use a deterministic fixture-backed workspace model for this UI slice so the interface can be tested before persistence and editing are wired in.

## Validation Evidence

- Command: `npm run agent:preflight`
  - Result: Passed. Output: `Agent preflight passed.`
- Command: `npm run agent:pr-ready`
  - Result: Passed. Output: `Agent PR readiness passed.`
- Command: `npm run format`
  - Result: Passed after applying Prettier formatting.
- Command: `npm run lint`
  - Result: Passed.
- Command: `npm run typecheck`
  - Result: Passed.
- Command: `npm run test`
  - Result: Passed. 7 test files and 22 tests passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.
- Command: `npm run agent:e2e`
  - Result: Passed. 1 Playwright test passed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Ready for PR review.
- Known limitations: Scenario comparison, Monte Carlo, editable plan inputs, and persistence wiring are deferred.
