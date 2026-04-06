'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { consumerLinks, primaryLinks, professionalLinks, utilityLinks, type NavLink } from './navigation-links'
import styles from './fullscreen-menu.module.css'

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

type AnimatedLinkProps = {
  href: string
  label: string
  isOpen: boolean
  isActive: boolean
  index: number
  onNavigate: () => void
  tone?: 'primary' | 'secondary'
}

function AnimatedLink({
  href,
  label,
  isOpen,
  isActive,
  index,
  onNavigate,
  tone = 'primary',
}: AnimatedLinkProps) {
  const style = { ['--item-index' as string]: index } as CSSProperties

  return (
    <Link
      href={href}
      className={`${styles.menuLink} ${tone === 'secondary' ? styles.menuLinkSecondary : ''}`}
      data-open={isOpen ? 'true' : 'false'}
      data-active={isActive ? 'true' : 'false'}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      style={style}
      tabIndex={isOpen ? 0 : -1}
    >
      <span className={styles.menuLinkLine}>{label}</span>
    </Link>
  )
}

type LinkGroupProps = {
  title: string
  context: string
  links: NavLink[]
  pathname: string
  isOpen: boolean
  startIndex: number
  onNavigate: () => void
}

function LinkGroup({ title, context, links, pathname, isOpen, startIndex, onNavigate }: LinkGroupProps) {
  return (
    <div className={styles.menuGroup}>
      <div className={styles.menuGroupHeader}>
        <p className={styles.menuGroupTitle}>{title}</p>
        <p className={styles.menuGroupContext}>{context}</p>
      </div>
      <div className={styles.menuGroupLinks}>
        {links.map((link, linkIndex) => (
          <AnimatedLink
            key={link.href}
            href={link.href}
            index={startIndex + linkIndex}
            isActive={isActivePath(pathname, link.href)}
            isOpen={isOpen}
            label={link.label}
            onNavigate={onNavigate}
            tone="secondary"
          />
        ))}
      </div>
    </div>
  )
}

export function FullscreenMenu({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isHome = pathname === '/'
  const professionalStartIndex = primaryLinks.length
  const consumerStartIndex = professionalStartIndex + professionalLinks.length
  const utilityStartIndex = consumerStartIndex + consumerLinks.length

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = isOpen ? 'hidden' : previousOverflow || ''

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={styles.shell} data-menu-open={isOpen ? 'true' : 'false'}>
      <header className={styles.menuBar}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandWordmark}>JRAG</span>
          <span className={styles.brandMeta}>Dakhla, Maroc</span>
        </Link>

        <div className={styles.menuBarActions}>
          <Link className={styles.utilityPill} href="/professionnels/contact">
            Contact Pro
          </Link>
          <button
            aria-controls="jrag-fullscreen-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={styles.menuToggle}
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <span className={styles.menuToggleLabel}>
              <span className={styles.menuToggleTrack} data-open={isOpen ? 'true' : 'false'}>
                <span>Menu</span>
                <span>Fermer</span>
              </span>
            </span>
            <span className={styles.hamburger} data-open={isOpen ? 'true' : 'false'}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        aria-hidden={!isOpen}
        className={styles.overlay}
        id="jrag-fullscreen-menu"
      >
        <div className={styles.overlayContent}>
          <div className={styles.mediaColumn}>
            <div className={styles.mediaFrame}>
              <Image
                alt="JRAG oyster detail from the Dakhla lagoon"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 40vw"
                src="/videos/scrollytelling-frames/frame-0128.jpg"
              />
            </div>
            <div className={styles.mediaCaption}>
              <p className={styles.mediaEyebrow}>Maison ostréicole</p>
              <p className={styles.mediaCopy}>
                Pure lagon, depuration precise, export cadence held from Dakhla to the table.
              </p>
            </div>
          </div>

          <div className={styles.contentColumn}>
            <div className={styles.mainContent}>
              <div className={styles.primaryColumn}>
                <p className={styles.menuSectionEyebrow}>Navigation</p>
                <div className={styles.primaryLinks}>
                  {primaryLinks.map((link, index) => (
                    <AnimatedLink
                      key={link.href}
                      href={link.href}
                      index={index}
                      isActive={isActivePath(pathname, link.href)}
                      isOpen={isOpen}
                      label={link.label}
                      onNavigate={() => setIsOpen(false)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.secondaryColumn}>
                <LinkGroup
                  context="B2B journey"
                  isOpen={isOpen}
                  links={professionalLinks}
                  onNavigate={() => setIsOpen(false)}
                  pathname={pathname}
                  startIndex={professionalStartIndex}
                  title="Professionnels"
                />
                <LinkGroup
                  context="B2C journey"
                  isOpen={isOpen}
                  links={consumerLinks}
                  onNavigate={() => setIsOpen(false)}
                  pathname={pathname}
                  startIndex={consumerStartIndex}
                  title="Particuliers"
                />
                <LinkGroup
                  context="Utilities"
                  isOpen={isOpen}
                  links={utilityLinks}
                  onNavigate={() => setIsOpen(false)}
                  pathname={pathname}
                  startIndex={utilityStartIndex}
                  title="Utilitaires"
                />
              </div>
            </div>

            <div className={styles.menuFooter}>
              <div className={styles.footerBlock}>
                <p className={styles.footerLabel}>Origine</p>
                <p className={styles.footerValue}>Dakhla Lagoon, Morocco</p>
              </div>
              <div className={styles.footerBlock}>
                <p className={styles.footerLabel}>Operations</p>
                <p className={styles.footerValue}>Depuration 42-48h, cold chain, export discipline</p>
              </div>
              <div className={styles.footerBlock}>
                <p className={styles.footerLabel}>Contact</p>
                <a className={styles.footerLink} href="mailto:contact@jrag.ma" tabIndex={isOpen ? 0 : -1}>
                  contact@jrag.ma
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageContainer} data-home={isHome ? 'true' : 'false'}>
        <main className={styles.pageContent}>{children}</main>
        <footer className={styles.siteFooter}>
          <p className={styles.siteFooterBrand}>JRAG</p>
          <p className={styles.siteFooterCopy}>
            Luxury seafood venture rooted in Dakhla, pairing editorial desire with export rigor.
          </p>
        </footer>
      </div>
    </div>
  )
}
