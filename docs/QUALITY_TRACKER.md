# Quality Tracker

## Current Status

| Area                      | Status      | Evidence                                                       |
| ------------------------- | ----------- | -------------------------------------------------------------- |
| Agent workflow            | Started     | PR 1 added harness docs and validation scripts.                |
| App scaffold              | Started     | PR 2 added app workspace, tooling, CI, and shell.              |
| Domain schemas            | Started     | PR 4 added schemas, migrations, storage, and import/export.    |
| Projection engine         | Started     | PR 5 adds deterministic yearly projection engine and fixtures. |
| Canada rules              | Not started | Planned for PR 5.                                              |
| Scenarios and Monte Carlo | Not started | Planned for PR 6.                                              |
| Planning UI               | Not started | Planned for PR 7.                                              |
| Release hardening         | Not started | Planned for PR 8.                                              |

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
