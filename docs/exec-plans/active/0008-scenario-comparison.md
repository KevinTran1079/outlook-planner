# Execution Plan: PR 9 Scenario Comparison Core

## Goal

Add deterministic scenario comparison domain logic so the app can compare validated projection assumptions before Monte Carlo work starts.

## Scope

In scope:

- Add schema-validated scenario comparison inputs.
- Project each scenario through the existing deterministic projection engine.
- Return per-scenario totals and deltas against a selected baseline scenario.
- Add focused unit tests for validation, determinism, ordering, and delta calculations.
- Update quality tracking for PR 8 completion and PR 9 scenario comparison.

Out of scope:

- Monte Carlo simulation.
- React scenario UI.
- Scenario persistence and editable scenario forms.
- New financial modeling rules beyond the existing projection engine.

## Acceptance Criteria

- Scenario comparison rejects invalid scenario inputs through schema validation.
- Scenario comparison requires a baseline scenario id that exists in the scenario list.
- Result ordering is deterministic and follows input ordering.
- Baseline deltas are zero and non-baseline deltas are computed against baseline totals.
- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run test` passes.
- `npm run build` passes.

## Touched Modules

- `app/src/domain/scenario/`
- `docs/`

## Decisions

- Keep scenario comparison domain-only in this checkpoint so React remains display-only and Monte Carlo can build on a stable comparison result shape.
- Require complete projection inputs per scenario instead of partial patch objects to keep schema validation explicit at the boundary.
- Use cents and integer totals in the domain result to avoid formatting or UI concerns in financial logic.

## Validation Evidence

- Command: `npm run agent:preflight`
  - Result: Passed. Output: `Agent preflight passed.`
- Command: `npm run agent:pr-ready`
  - Result: Passed. Output: `Agent PR readiness passed.`
- Command: `npm run format`
  - Result: Passed. Prettier check reported all matched files use Prettier code style.
- Command: `npm run lint`
  - Result: Passed.
- Command: `npm run typecheck`
  - Result: Passed.
- Command: `npm run test`
  - Result: Passed. 9 test files and 28 tests passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.
- Command: `npm run agent:e2e`
  - Result: Passed. 1 Playwright test passed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Ready for PR review.
- Known limitations: Monte Carlo simulation, React scenario UI, scenario persistence, and editable scenario forms are deferred.
