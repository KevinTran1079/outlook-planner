# Architecture

## Product Shape

Outlook Planner is a local-first, Canada-focused retirement planning app. Version 1 supports individual planning only and is educational, not financial advice.

## Architectural Principles

- Local-first by default: planning data stays in the browser unless the user explicitly imports or exports a file.
- Deterministic financial modeling: projection and simulation results must be reproducible for the same plan, assumptions, rule versions, and seed.
- Versioned rules: Canada-specific financial constants must include source metadata, effective dates, and the assumptions used to translate public rules into app behavior.
- Schema boundaries: imported data, persisted documents, migrations, and public engine inputs must be schema validated.
- UI/domain separation: React components collect inputs and display outputs; financial math lives in domain modules.

## Planned Module Boundaries

- `app/`: Vite React TypeScript application.
- `app/src/components/`: shadcn/ui-based presentation components.
- `app/src/domain/`: deterministic financial planning logic.
- `app/src/domain/rules/ca/`: versioned Canadian rule tables and metadata.
- `app/src/storage/`: IndexedDB persistence, migrations, import, and export.
- `app/src/test/fixtures/`: golden plans and projection outputs.
- `docs/`: durable product, architecture, workflow, and execution-plan records.

These paths are planned boundaries. They will be introduced in later checkpoints.

## Privacy And Network Posture

The app must run without a backend for v1. Tests should fail if core planning flows require network access. Future integrations must be opt-in and documented with data-flow notes before implementation.

## Modeling Guardrails

Financial projections are estimates. The engine must expose assumptions, rule versions, and known limitations near results. Every material modeling shortcut needs a documented decision in the active execution plan or a domain README.
