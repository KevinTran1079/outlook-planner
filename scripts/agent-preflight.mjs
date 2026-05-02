import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'AGENTS.md',
  'docs/ARCHITECTURE.md',
  'docs/PRODUCT_SPEC.md',
  'docs/PR_WORKFLOW.md',
  'docs/QUALITY_TRACKER.md',
  'docs/exec-plans/TEMPLATE.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
];

const requiredAgentRules = [
  'Google TypeScript Style Guide',
  'shadcn/ui',
  'Tailwind CSS',
  'No financial math in React components',
  'schema validation',
  'source metadata and effective dates',
  'deterministic for a fixed seed',
  'execution plan',
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`Missing required file: ${file}`);
  }
}

if (existsSync('AGENTS.md')) {
  const agents = readFileSync('AGENTS.md', 'utf8');
  for (const rule of requiredAgentRules) {
    if (!agents.includes(rule)) {
      failures.push(`AGENTS.md is missing required rule text: ${rule}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Agent preflight passed.');
