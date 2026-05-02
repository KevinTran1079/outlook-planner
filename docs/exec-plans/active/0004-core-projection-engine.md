# Execution Plan: PR 5 Core Projection Engine

## Goal

Add the deterministic yearly projection engine for accounts, income, expenses, inflation, returns, withdrawal ordering, and golden fixtures.

## Scope

In scope:

- Add projection input and result types.
- Validate projection inputs at the domain boundary.
- Project yearly balances from current age through end age.
- Apply income, expenses, inflation, contributions, account returns, withdrawals, and shortfall tracking.
- Add deterministic golden fixtures and unit tests.

Out of scope:

- Canada tax and benefit rules.
- Monte Carlo simulation.
- UI integration.
- Persistence schema expansion for every projection input field.

## Acceptance Criteria

- Projection output is deterministic for identical input.
- Golden baseline fixture covers multi-year inflation, contribution, return, and withdrawal behavior.
- Withdrawal ordering is tested.
- Shortfalls after account depletion are tested.
- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run format` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.

## Touched Modules

- `app/src/domain/projection/`
- `docs/`

## Decisions

- Keep the projection input separate from persisted plan documents until later checkpoints expand UI and persistence around richer assumptions.
- Use integer cents for all money values and round yearly growth/inflated cash flows to cents.
- Apply contributions before growth and withdrawals before growth for each projected year.
- Use a deterministic fixed withdrawal order: cash, non-registered, TFSA, RRSP.

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
  - Result: Passed. 5 test files and 13 tests passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Ready for PR review.
- Known limitations: Canada-specific tax, CPP, OAS, registered-account rules, and Monte Carlo are later checkpoints.
