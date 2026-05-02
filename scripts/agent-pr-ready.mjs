import {existsSync, readdirSync, readFileSync} from 'node:fs';

const activeDir = 'docs/exec-plans/active';
const failures = [];

if (!existsSync(activeDir)) {
  failures.push(`Missing active execution plan directory: ${activeDir}`);
} else {
  const plans = readdirSync(activeDir).filter((file) => file.endsWith('.md'));
  if (plans.length === 0) {
    failures.push('At least one active execution plan is required.');
  }

  for (const plan of plans) {
    const path = `${activeDir}/${plan}`;
    const content = readFileSync(path, 'utf8');
    for (const heading of [
      '## Goal',
      '## Scope',
      '## Acceptance Criteria',
      '## Touched Modules',
      '## Decisions',
      '## Validation Evidence',
      '## Review Feedback',
      '## Completion Status',
    ]) {
      if (!content.includes(heading)) {
        failures.push(`${path} is missing heading: ${heading}`);
      }
    }
  }
}

if (!existsSync('.github/PULL_REQUEST_TEMPLATE.md')) {
  failures.push('Missing pull request template.');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Agent PR readiness passed.');
