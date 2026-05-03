# Quality Tracker

## Current Status

| Area                      | Status    | Evidence                                                        |
| ------------------------- | --------- | --------------------------------------------------------------- |
| Agent workflow            | Started   | PR 1 added harness docs and validation scripts.                 |
| App scaffold              | Started   | PR 2 added app workspace, tooling, CI, and shell.               |
| Domain schemas            | Started   | PR 4 added schemas, migrations, storage, and import/export.     |
| Projection engine         | Started   | PR 5 added deterministic yearly projection engine and fixtures. |
| Canada rules              | Started   | PR 6 added versioned 2026 Canada rule tables and tests.         |
| Scenarios and Monte Carlo | Started   | PR 9 adds deterministic scenario comparison core.               |
| Planning UI               | Completed | PR 7 merged the deterministic planning workspace UI.            |
| Release hardening         | Completed | PR 8 merged readiness and local-first browser checks.           |

## Quality Gates

- Typecheck.
- Lint.
- Unit tests.
- Build.
- Playwright when UI behavior changes.
- Docs structure validation.
- Agent workflow conformance.
- Privacy and no-network checks.

Gates are introduced as the relevant project surface exists.
