# Product Spec

## Scope

Outlook Planner helps individuals in Canada explore retirement readiness with deterministic projections, scenario comparison, and clearly labeled assumptions.

## V1 Assumptions

- Canada-focused.
- Individual-only planning.
- Local-first browser storage.
- Educational-only output.
- No user-facing AI assistant.
- GitHub PRs and GitHub Actions are the review path for development.

## Core User Workflows

1. Create a plan with age, province, retirement timing, and household-independent assumptions.
2. Add registered and non-registered accounts.
3. Add income, expense, contribution, and withdrawal assumptions.
4. Review deterministic yearly projections.
5. Compare scenarios with different assumptions.
6. Run seeded Monte Carlo analysis.
7. Inspect assumptions, rule versions, and source metadata.
8. Export and import a local JSON plan.

## Financial Model Coverage

V1 should cover:

- Inflation-adjusted income and expenses.
- Account returns and contributions.
- Withdrawal ordering.
- TFSA, RRSP, and RRIF behavior.
- CPP election timing adjustment.
- OAS assumptions.
- Province tax-lite estimates.
- Seeded Monte Carlo summaries.

V1 does not provide personalized tax, investment, legal, or financial advice.

## UX Principles

- The first screen is the planning workspace, not a marketing page.
- Show assumptions near results.
- Make import/export explicit and understandable.
- Preserve privacy expectations: no account creation, no server sync, and no hidden network dependency in v1.
