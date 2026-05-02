# PR Workflow

## Checkpoint Rules

- One checkpoint equals one branch and one pull request.
- Branch names use `checkpoint/<number>-<short-goal>`.
- Later checkpoints do not start until the prior PR is reviewed and accepted.
- No auto-merge in v1. Human approval is the final merge gate.

## Required Local Validation

Before opening a PR, run:

```sh
npm run agent:preflight
npm run agent:pr-ready
```

Also run the following when UI behavior changed:

```sh
npm run agent:e2e
```

## Pull Request Content

Every PR must include:

- Scope.
- Acceptance criteria.
- Test output summary.
- Screenshots or traces for UI changes.
- Linked execution plan.
- Known limitations.

## Review Loop

1. Review the diff locally before opening the PR.
2. Open the PR with `gh pr create`.
3. Watch GitHub Actions.
4. Read review comments and CI failures.
5. Apply fixes in the same branch.
6. Respond point-by-point to review feedback.
7. Repeat until CI is green and review threads are resolved.
8. Wait for human approval before merge.

## Completion Evidence

Record validation commands, relevant outputs, decisions, and review feedback in the active execution plan before closing a checkpoint.
