import type { ReactNode } from 'react'
import styles from '@/components/admin/module-page-shell.module.css'

type ModuleMetric = {
  label: string
  value: string
}

type ModuleRecord = {
  name: string
  status: string
  owner: string
  updatedAt: string
}

type ModulePageShellProps = {
  eyebrow: string
  title: string
  description: string
  metrics: ModuleMetric[]
  records: ModuleRecord[]
  integrationHook: string
}

export function ModulePageShell({
  eyebrow,
  title,
  description,
  metrics,
  records,
  integrationHook,
}: ModulePageShellProps): ReactNode {
  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </header>

      <section className={styles.metrics} aria-label={`${title} metrics`}>
        {metrics.map((metric) => (
          <article key={metric.label} className={styles.metric}>
            <p className={styles.metricValue}>{metric.value}</p>
            <p className={styles.metricLabel}>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Record</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.name}>
                <td>{record.name}</td>
                <td>
                  <span className={styles.status}>{record.status}</span>
                </td>
                <td>{record.owner}</td>
                <td>{record.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className={styles.hook}>{integrationHook}</p>
    </section>
  )
}

export type { ModuleMetric, ModuleRecord }
