import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './route.module.css'
import type { RouteModeProps } from './types'

export function RouteMode({ headline, cards }: RouteModeProps): ReactNode {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.headline}>{headline}</h2>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.href} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <Link href={card.href} className={styles.cta}>
                {card.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
