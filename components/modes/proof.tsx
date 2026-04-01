import styles from './proof.module.css'
import type { ReactNode } from 'react'
import type { ProofModeProps } from './types'

export function ProofMode({ headline, items }: ProofModeProps): ReactNode {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.headline}>{headline}</h2>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={`${item.label}-${item.value}`} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <strong className={styles.value}>{item.value}</strong>
              {item.description && <p className={styles.description}>{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
