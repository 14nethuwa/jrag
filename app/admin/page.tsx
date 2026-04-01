import Link from 'next/link'
import styles from '@/app/admin/dashboard.module.css'

type AdminModuleCard = {
  href: string
  title: string
  description: string
}

const adminModuleCards: AdminModuleCard[] = [
  {
    href: '/admin/produits',
    title: 'Catalog operations',
    description: 'Control SKUs, visibility, and export formats without breaking storefront consistency.',
  },
  {
    href: '/admin/commandes',
    title: 'Order pipeline',
    description: 'Track payment state, shipping readiness, and cold-chain exceptions in one flow.',
  },
  {
    href: '/admin/clients',
    title: 'Customer records',
    description: 'Monitor account health and support actions for B2B and B2C stakeholders.',
  },
  {
    href: '/admin/pages',
    title: 'Content governance',
    description: 'Publish story, proof, and utility content with role-scoped operational approvals.',
  },
]

export default function ExamplePage() {
  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Admin cockpit</p>
        <h2 className={styles.title}>JRAG operations dashboard</h2>
        <p className={styles.description}>
          Manage product, orders, customers, and editorial publishing from a single back-office shell
          built for premium credibility and operational speed.
        </p>
      </header>

      <ul className={styles.moduleGrid}>
        {adminModuleCards.map((card) => (
          <li key={card.href} className={styles.moduleCard}>
            <Link href={card.href} className={styles.moduleLink}>
              <h3 className={styles.moduleTitle}>{card.title}</h3>
              <p className={styles.moduleText}>{card.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className={styles.hook}>
        Dashboard signals are role-filtered and synchronized across catalog, order, customer, and content
        operations for faster daily triage.
      </p>
    </section>
  )
}
