# Execution Plan: PR 6 Canada Rules

## Goal

Add versioned 2026 Canada rule tables for tax-lite estimates, TFSA, RRSP, RRIF, CPP, OAS, and source metadata.

## Scope

In scope:

- Add source-backed 2026 Canada rule tables.
- Add federal and province/territory tax-lite brackets.
- Add TFSA and RRSP annual limits.
- Add RRIF minimum withdrawal factors.
- Add CPP election timing adjustment factors.
- Add OAS deferral and recovery tax assumptions.
- Add source metadata and effective dates for every rule group.
- Add focused unit tests.

Out of scope:

- Full tax return calculation.
- Credits, deductions, surtaxes, dividend/capital-gains treatment, and contribution carry-forward modeling.
- Integrating Canada rules into projection output.

## Acceptance Criteria

- Every financial constant has source metadata and effective dates.
- Province tax-lite tables cover every province/territory in the plan schema.
- TFSA, RRSP, RRIF, CPP, and OAS calculations have unit tests.
- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run format` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.

## Touched Modules

- `app/src/domain/rules/ca/`
- `docs/`

## Decisions

- Use 2026 source tables because the current date is May 2, 2026.
- Keep tax calculation intentionally tax-lite: federal plus provincial bracket estimates, with Quebec federal abatement, but without personal credits, surtaxes, deductions, or benefit interactions.
- Keep source metadata next to constants so later projections can expose assumptions and rule versions.

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
  - Result: Passed. 7 test files and 21 tests passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Ready for PR review.
- Known limitations: These are educational tax-lite assumptions, not complete tax calculations.
