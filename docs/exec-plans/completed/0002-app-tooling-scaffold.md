# Execution Plan: PR 2 App And Tooling Scaffold

## Goal

Add the Vite React TypeScript app scaffold, styling foundation, validation tooling, CI workflow, and basic app shell.

## Scope

In scope:

- Add npm workspace for `app`.
- Add Vite, React, TypeScript, Tailwind CSS, and shadcn/ui-style component foundation.
- Add ESLint, Prettier, Vitest, Playwright, and GitHub Actions.
- Add a basic local-first planning workspace shell.
- Update agent validation scripts to run real app checks.

Out of scope:

- Domain schemas and persistence.
- Financial projection engine.
- Canada rule tables.
- Scenario and Monte Carlo behavior.

## Acceptance Criteria

- `npm run agent:preflight` passes.
- `npm run agent:pr-ready` passes.
- `npm run agent:e2e` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.
- CI workflow covers the same core checks.

## Touched Modules

- `package.json`
- `app/`
- `.github/workflows/`
- `scripts/`
- `docs/`

## Decisions

- Keep the first app shell static so PR 2 validates tooling and layout without introducing financial math or persistence early.
- Use a committed shadcn/ui-style `Button` component as the initial component-system anchor.
- Added durable frontend direction requiring the frontend skill, concrete product UI language, and optional GPT Image references before larger UI buildouts.

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
  - Result: Passed. 1 test passed.
- Command: `npm run build`
  - Result: Passed. Vite production build completed.
- Command: `npm run agent:e2e`
  - Result: Passed. 1 Chromium test passed.

## Review Feedback

- Pending PR review.

## Completion Status

- Status: Completed and merged in PR 2, with frontend guidance follow-up merged in PR 3.
- Known limitations: App shell is static; data modeling starts in checkpoint 3.
