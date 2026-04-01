'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/components/admin-layout-shell.module.css'

type AdminLayoutShellProps = {
  title: string
  children: ReactNode
  viewer: AdminViewer
}

type AdminRoute = {
  href: string
  label: string
  segment: 'core' | 'content' | 'system'
}

type AdminRouteSegment = AdminRoute['segment']

type SegmentMeta = {
  segment: AdminRouteSegment
  label: string
}

type AdminViewer = {
  displayName: string
  roleLabel: string
  permissions: string[]
}

const adminRoutes: AdminRoute[] = [
  { href: '/admin', label: 'Dashboard', segment: 'core' },
  { href: '/admin/produits', label: 'Produits', segment: 'core' },
  { href: '/admin/commandes', label: 'Commandes', segment: 'core' },
  { href: '/admin/clients', label: 'Clients', segment: 'core' },
  { href: '/admin/pages', label: 'Pages', segment: 'content' },
  { href: '/admin/navigation', label: 'Navigation', segment: 'content' },
  { href: '/admin/recettes-blog', label: 'Recettes & Blog', segment: 'content' },
  { href: '/admin/media', label: 'Media', segment: 'content' },
  { href: '/admin/trust-content', label: 'Trust Content', segment: 'content' },
  { href: '/admin/leads-b2b', label: 'Leads B2B', segment: 'system' },
  { href: '/admin/settings', label: 'Settings', segment: 'system' },
  { href: '/admin/users-roles', label: 'Users / Roles', segment: 'system' },
]

const sectionMeta: SegmentMeta[] = [
  { segment: 'core', label: 'Core modules' },
  { segment: 'content', label: 'Content' },
  { segment: 'system', label: 'System' },
]

const mobileBreakpoint = '(max-width: 1024px)'

function isRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isSectionActive(pathname: string, routes: AdminRoute[]): boolean {
  return routes.some((route) => isRouteActive(pathname, route.href))
}

function renderRouteList(pathname: string, routes: AdminRoute[]): ReactNode {
  return (
    <ul className={styles.navList}>
      {routes.map((route) => {
        const active = isRouteActive(pathname, route.href)
        const className = active ? `${styles.link} ${styles.activeLink}` : styles.link
        return (
          <li key={route.href}>
            <Link href={route.href} className={className}>
              {route.label}
              {active ? <span className={styles.badge}>Actif</span> : null}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function AdminLayoutShell({ title, children, viewer }: AdminLayoutShellProps): ReactNode {
  const pathname = usePathname()
  const routesBySection: Record<AdminRouteSegment, AdminRoute[]> = {
    core: adminRoutes.filter((route) => route.segment === 'core'),
    content: adminRoutes.filter((route) => route.segment === 'content'),
    system: adminRoutes.filter((route) => route.segment === 'system'),
  }

  const [isMobileNav, setIsMobileNav] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<AdminRouteSegment, boolean>>({
    core: true,
    content: false,
    system: false,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileBreakpoint)
    const updateMobileState = (): void => setIsMobileNav(mediaQuery.matches)
    updateMobileState()
    mediaQuery.addEventListener('change', updateMobileState)

    return () => mediaQuery.removeEventListener('change', updateMobileState)
  }, [])

  function toggleSection(segment: AdminRouteSegment): void {
    if (!isMobileNav) return
    setExpandedSections((previous) => ({
      ...previous,
      [segment]: !previous[segment],
    }))
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>Luxury operations with export rigor</p>
        </div>

        <section className={styles.viewer}>
          <p className={styles.viewerName}>{viewer.displayName}</p>
          <p className={styles.viewerMeta}>{viewer.roleLabel}</p>
          <p className={styles.viewerMeta}>{viewer.permissions.length} droits actifs</p>
        </section>

        <nav aria-label="Admin main navigation">
          {sectionMeta.map((meta) => {
            const routes = routesBySection[meta.segment]
            const isExpanded = expandedSections[meta.segment] || isSectionActive(pathname, routes)

            return (
              <section key={meta.segment} className={styles.sectionGroup}>
                <button
                  type="button"
                  className={styles.sectionToggle}
                  aria-expanded={isExpanded}
                  onClick={() => toggleSection(meta.segment)}
                >
                  <span className={styles.sectionLabel}>{meta.label}</span>
                  <span className={styles.sectionChevron} aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>
                <div className={isExpanded ? styles.sectionContent : styles.sectionContentCollapsed}>
                  {renderRouteList(pathname, routes)}
                </div>
              </section>
            )
          })}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <p className={styles.topbarText}>Operational cockpit and content governance</p>
          <p className={styles.hook}>Access profile: {viewer.roleLabel}</p>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

export type { AdminViewer }
