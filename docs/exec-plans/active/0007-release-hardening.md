# Execution Plan: PR 8 Release Hardening

## Goal

Harden the project workflow and local-first quality gates before expanding scenario and Monte Carlo features.

## Scope

In scope:

- Close the merged planning workspace checkpoint record.
- Tighten PR readiness checks for active execution-plan hygiene.
- Add an automated no-external-network assertion to the browser smoke test.
- Keep projection timeline bars bounded inside their containers.
- Reuse an existing local dev server for e2e while preserving clean CI startup.
- Update quality tracking for the planning UI and release hardening checkpoint.

Out of scope:

- Scenario comparison.
- Monte Carlo simulation.
- Editable plan forms.
- Persistence wiring in the React workspace.

## Acceptance Criteria

- Exactly one active execution plan is required by `npm run agent:pr-ready`.
- Active execution plans fail readiness checks when template placeholders remain.
- Playwright fails if the workspace attempts non-local network requests.
- Projection timeline balance bars never render above 100% width.
- Local e2e can run while the developer is already viewing the app.
- Quality tracker reflects PR 7 completion and PR 8 release hardening status.
- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run agent:e2e` passes.

## Touched Modules

- `scripts/agent-pr-ready.mjs`
- `app/playwright.config.ts`
- `app/src/domain/plan/`
- `app/src/e2e/`
- `docs/`

## Decisions

- Treat release hardening as a workflow and privacy gate checkpoint, not a product-feature checkpoint.
- Keep browser no-network validation in Playwright because it exercises the real Vite-served app shell and runtime asset loading.
- Derive timeline bar width from the maximum projected balance and clamp the display percentage at 100%.
- Use `reuseExistingServer: !process.env.CI` so local checks do not fight an existing Vite server, but CI still owns server startup.

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
  - Result: Passed. 8 test files and 23 tests passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.
- Command: `npm run agent:e2e`
  - Result: Passed. 1 Playwright test passed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Ready for PR review.
- Known limitations: This checkpoint does not add scenario comparison, Monte Carlo simulation, editable forms, or persistence wiring.
