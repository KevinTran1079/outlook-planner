# Agent Operating Rules

This repository is a local-first Canadian retirement planner. Keep this file short and update deeper guidance in `docs/`.

## Required Rules

- TypeScript must follow the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).
- React UI must prefer shadcn/ui components and use Tailwind CSS for styling.
- Frontend work must use the frontend skill and avoid generic LLM design language.
- No financial math in React components.
- All user/imported data must pass schema validation.
- All financial constants require source metadata and effective dates.
- Projection code must be deterministic for a fixed seed.
- Every non-trivial task needs an execution plan in `docs/exec-plans/active/`.

## Reference Docs

- Architecture: `docs/ARCHITECTURE.md`
- Product scope: `docs/PRODUCT_SPEC.md`
- PR workflow: `docs/PR_WORKFLOW.md`
- Execution plan template: `docs/exec-plans/TEMPLATE.md`
- Quality tracker: `docs/QUALITY_TRACKER.md`
