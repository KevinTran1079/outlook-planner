import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  FileDown,
  FileUp,
  Gauge,
  LineChart,
  Settings2,
  ShieldCheck,
} from 'lucide-react';

import { Button } from './components/ui/button';

const assumptions = [
  { label: 'Province', value: 'Ontario' },
  { label: 'Retirement age', value: '65' },
  { label: 'Inflation', value: '2.1%' },
  { label: 'Return model', value: 'Balanced' },
];

const milestones = [
  { year: '2026', label: 'Plan starts', amount: '$425K' },
  { year: '2041', label: 'Retirement target', amount: '$1.14M' },
  { year: '2052', label: 'CPP and OAS active', amount: '$910K' },
  { year: '2066', label: 'Late retirement review', amount: '$510K' },
];

export function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="border-b border-border bg-muted/40 px-5 py-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <LineChart className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">Outlook Planner</p>
              <p className="text-xs text-muted-foreground">Local plan</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-1 text-sm">
            {[
              ['Workspace', Gauge],
              ['Accounts', CircleDollarSign],
              ['Timeline', CalendarDays],
              ['Assumptions', Settings2],
            ].map(([label, Icon]) => (
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                href="/"
                key={label as string}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label as string}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex flex-col gap-4 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-normal">
                Retirement workspace
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Individual Canada plan, stored on this device.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <FileUp className="size-4" aria-hidden="true" />
                Import
              </Button>
              <Button>
                <FileDown className="size-4" aria-hidden="true" />
                Export
              </Button>
            </div>
          </header>

          <div className="grid flex-1 gap-6 px-5 py-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <section
                className="grid gap-4 rounded-md border border-border bg-white p-5 md:grid-cols-4"
                aria-labelledby="plan-status-heading"
              >
                <div className="md:col-span-4">
                  <h2
                    id="plan-status-heading"
                    className="text-sm font-semibold"
                  >
                    Plan status
                  </h2>
                </div>
                {assumptions.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </section>

              <section
                className="rounded-md border border-border bg-white p-5"
                aria-labelledby="projection-heading"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 id="projection-heading" className="font-semibold">
                      Projection preview
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Placeholder timeline for PR 2 app wiring.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    No network sync
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {milestones.map((milestone) => (
                    <div
                      className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-md border border-border px-4 py-3"
                      key={milestone.year}
                    >
                      <span className="text-sm font-medium">
                        {milestone.year}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {milestone.label}
                      </span>
                      <span className="text-sm font-semibold">
                        {milestone.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section
                className="rounded-md border border-border bg-white p-5"
                aria-labelledby="quality-heading"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 id="quality-heading" className="font-semibold">
                    Scaffold checks
                  </h2>
                </div>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">TypeScript</dt>
                    <dd className="mt-1 font-medium">Strict mode</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">UI system</dt>
                    <dd className="mt-1 font-medium">Tailwind + shadcn base</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Privacy posture</dt>
                    <dd className="mt-1 font-medium">Local-first</dd>
                  </div>
                </dl>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
