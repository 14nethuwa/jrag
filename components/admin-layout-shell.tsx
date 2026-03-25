import type { ReactNode } from 'react'
import Link from 'next/link'

type AdminLayoutShellProps = {
  title: string
  children: ReactNode
}

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/navigation', label: 'Navigation' },
  { href: '/admin/produits', label: 'Produits' },
  { href: '/admin/commandes', label: 'Commandes' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/leads-b2b', label: 'Leads B2B' },
  { href: '/admin/recettes-blog', label: 'Recettes & Blog' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/trust-content', label: 'Trust Content' },
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/users-roles', label: 'Users / Roles' },
]

export function AdminLayoutShell({ title, children }: AdminLayoutShellProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside style={{ padding: '1.5rem', borderRight: '1px solid #ddd' }}>
        <p>{title}</p>
        <nav>
          <ul>
            {adminLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  )
}
