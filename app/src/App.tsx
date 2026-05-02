import {
  BadgeCheck,
  CircleDollarSign,
  Database,
  FileDown,
  FileUp,
  Gauge,
  Landmark,
  LineChart,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';

import { Button } from './components/ui/button';
import { createPlanningWorkspaceView } from './domain/plan/workspace-view';

const workspace = createPlanningWorkspaceView();

const navigationItems = [
  ['Workspace', Gauge],
  ['Accounts', CircleDollarSign],
  ['Projection', LineChart],
  ['Rules', ReceiptText],
] as const;

export function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-white px-5 py-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <LineChart className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">Outlook Planner</p>
              <p className="text-xs text-muted-foreground">Local workspace</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-1 text-sm" aria-label="Workspace">
            {navigationItems.map(([label, Icon]) => (
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                href={`#${label.toLowerCase()}`}
                key={label}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>

          <section
            className="mt-8 border-t border-border pt-5"
            aria-labelledby="privacy-heading"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <LockKeyhole className="size-4 text-primary" aria-hidden="true" />
              <h2 id="privacy-heading">Privacy posture</h2>
            </div>
            <ul className="mt-3 grid gap-2 text-xs text-muted-foreground">
              {workspace.privacyItems.map((item) => (
                <li className="flex gap-2" key={item}>
                  <ShieldCheck className="mt-0.5 size-3.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex flex-col gap-4 border-b border-border bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {workspace.planName} - updated {workspace.updatedAt}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal">
                Retirement workspace
              </h1>
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

          <div className="grid flex-1 gap-6 px-5 py-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <section
                className="grid gap-4 md:grid-cols-4"
                id="workspace"
                aria-labelledby="assumptions-heading"
              >
                <div className="md:col-span-4">
                  <h2
                    id="assumptions-heading"
                    className="text-sm font-semibold"
                  >
                    Assumptions
                  </h2>
                </div>
                {workspace.assumptions.map((item) => (
                  <article
                    className="rounded-md border border-border bg-white p-4"
                    key={item.label}
                  >
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xl font-semibold">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </section>

              <section
                className="rounded-md border border-border bg-white p-5"
                id="projection"
                aria-labelledby="projection-heading"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 id="projection-heading" className="font-semibold">
                      Projection
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Deterministic baseline from validated projection input.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <Database className="size-3.5" aria-hidden="true" />
                    {workspace.rulesVersion}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  {workspace.projectionSummary.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold">{item.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  {workspace.milestones.map((milestone) => (
                    <article
                      className="grid gap-3 rounded-md border border-border px-4 py-3 md:grid-cols-[76px_1fr_112px]"
                      key={milestone.year}
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {milestone.year}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Age {milestone.age}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">
                            {milestone.label}
                          </p>
                          <p className="text-sm font-semibold">
                            {milestone.endingBalance}
                          </p>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${milestone.balancePercent}%` }}
                          />
                        </div>
                        <dl className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-4">
                          <div>
                            <dt>Income</dt>
                            <dd className="font-medium text-foreground">
                              {milestone.income}
                            </dd>
                          </div>
                          <div>
                            <dt>Expenses</dt>
                            <dd className="font-medium text-foreground">
                              {milestone.expenses}
                            </dd>
                          </div>
                          <div>
                            <dt>Withdrawal</dt>
                            <dd className="font-medium text-foreground">
                              {milestone.withdrawal}
                            </dd>
                          </div>
                          <div>
                            <dt>Shortfall</dt>
                            <dd className="font-medium text-foreground">
                              {milestone.shortfall}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div className="flex items-start justify-end">
                        <BadgeCheck
                          className="size-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                className="rounded-md border border-border bg-white p-5"
                id="accounts"
                aria-labelledby="accounts-heading"
              >
                <h2 id="accounts-heading" className="font-semibold">
                  Accounts
                </h2>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="text-xs uppercase text-muted-foreground">
                      <tr className="border-b border-border">
                        <th className="py-2 font-medium">Account</th>
                        <th className="py-2 font-medium">Type</th>
                        <th className="py-2 font-medium">Balance</th>
                        <th className="py-2 font-medium">Contribution</th>
                        <th className="py-2 font-medium">Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workspace.accounts.map((account) => (
                        <tr className="border-b border-border" key={account.id}>
                          <td className="py-3 font-medium">{account.name}</td>
                          <td className="py-3 text-muted-foreground">
                            {account.typeLabel}
                          </td>
                          <td className="py-3">{account.balance}</td>
                          <td className="py-3">{account.contribution}</td>
                          <td className="py-3">{account.expectedReturn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section
                className="rounded-md border border-border bg-white p-5"
                aria-labelledby="validation-heading"
              >
                <div className="flex items-center gap-2">
                  <BadgeCheck
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 id="validation-heading" className="font-semibold">
                    Validation
                  </h2>
                </div>
                <ul className="mt-5 grid gap-3 text-sm">
                  {workspace.validationItems.map((item) => (
                    <li className="flex gap-2" key={item}>
                      <BadgeCheck
                        className="mt-0.5 size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                className="rounded-md border border-border bg-white p-5"
                id="rules"
                aria-labelledby="rules-heading"
              >
                <div className="flex items-center gap-2">
                  <Landmark
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 id="rules-heading" className="font-semibold">
                    Canada rules
                  </h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Source metadata displayed with effective dates.
                </p>
                <div className="mt-5 grid gap-4">
                  {workspace.ruleSources.map((source) => (
                    <article
                      className="border-t border-border pt-4"
                      key={source.label}
                    >
                      <p className="text-sm font-semibold">{source.label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {source.title}
                      </p>
                      <dl className="mt-3 grid gap-2 text-xs">
                        <div>
                          <dt className="text-muted-foreground">Effective</dt>
                          <dd>{source.effective}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Retrieved</dt>
                          <dd>{source.retrievedAt}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
