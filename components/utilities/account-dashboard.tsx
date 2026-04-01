'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './utility-pages.module.css'

type AccountState = 'loading' | 'ready' | 'empty' | 'error'

const profile = {
  name: 'Compte Particulier JRAG',
  email: 'client@jrag.ma',
  city: 'Casablanca',
  loyaltyTier: 'Niveau Reserve',
}

const orders = [
  { reference: 'JR-2026-183', status: 'Expedition planifiee', total: '1 640 MAD' },
  { reference: 'JR-2026-141', status: 'Livree', total: '980 MAD' },
  { reference: 'JR-2026-109', status: 'Livree', total: '1 250 MAD' },
]

const preferences = ['Calibre 2+, lot premium', 'Livraison vendredi matin', 'Alerte retour stock active']

export function AccountDashboard() {
  const [state, setState] = useState<AccountState>('loading')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState('ready')
    }, 650)

    return () => window.clearTimeout(timer)
  }, [])

  const statusLabel = useMemo(() => {
    if (state === 'loading') return 'Sync en cours'
    if (state === 'empty') return 'Nouveau compte'
    if (state === 'error') return 'Service degrade'
    return 'Compte actif'
  }, [state])

  const retry = () => {
    setState('loading')
    window.setTimeout(() => {
      setState('ready')
    }, 650)
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <p className={styles.eyebrow}>Utility Surface - Mon Compte</p>
        <h1 className={styles.title}>Mon Compte</h1>
        <p className={styles.lede}>
          Espace de suivi identite, historique de commandes et preferences de service. Les etats
          vides, indisponibles, et synchronisation sont traites directement dans l interface.
        </p>

        <div className={`${styles.panel} ${styles.heroPanel}`}>
          <div>
            <h2>Gestion du compte client</h2>
            <p className={styles.meta}>Priorite: autonomie, lisibilite, reprise rapide.</p>
          </div>
          <span className={styles.statusTag}>{statusLabel}</span>
        </div>

        <div className={styles.stateActions}>
          <button className={styles.button} type="button" onClick={() => setState('ready')}>
            Compte actif
          </button>
          <button className={styles.ghostButton} type="button" onClick={() => setState('empty')}>
            Aucun historique
          </button>
          <button className={styles.ghostButton} type="button" onClick={() => setState('error')}>
            Incident
          </button>
        </div>

        {state === 'loading' && (
          <div className={styles.loading} role="status" aria-live="polite">
            Synchronisation du profil, des commandes et des preferences en cours.
          </div>
        )}

        {state === 'error' && (
          <div className={styles.error} role="alert">
            La recuperation des donnees a echoue. Verifiez votre connexion, puis relancez la
            synchronisation.
          </div>
        )}

        {state === 'empty' && (
          <div className={`${styles.card} ${styles.notice}`}>
            Aucun historique detecte pour ce compte. Lancez une premiere commande pour activer le
            suivi.
          </div>
        )}

        {state === 'ready' && (
          <>
            <section className={styles.stats}>
              <article className={styles.card}>
                <p className={styles.statLabel}>Identite</p>
                <p className={styles.statValue}>{profile.name}</p>
                <p className={styles.muted}>{profile.email}</p>
                <p className={styles.muted}>{profile.city}</p>
              </article>
              <article className={styles.card}>
                <p className={styles.statLabel}>Programme</p>
                <p className={styles.statValue}>{profile.loyaltyTier}</p>
                <p className={styles.muted}>Avantage: priorite sur lots saisons</p>
              </article>
              <article className={styles.card}>
                <p className={styles.statLabel}>Commandes 90 jours</p>
                <p className={styles.statValue}>{orders.length}</p>
                <p className={styles.muted}>Taux service livre a l heure: 98%</p>
              </article>
            </section>

            <section className={styles.gridTwo}>
              <article className={styles.card}>
                <h3>Historique des commandes</h3>
                <ul className={styles.list}>
                  {orders.map((order) => (
                    <li key={order.reference} className={styles.listItem}>
                      <div>
                        <strong>{order.reference}</strong>
                        <p className={styles.muted}>{order.status}</p>
                      </div>
                      <strong>{order.total}</strong>
                    </li>
                  ))}
                </ul>
              </article>
              <article className={styles.card}>
                <h3>Preferences enregistrees</h3>
                <ul className={styles.list}>
                  {preferences.map((item) => (
                    <li key={item} className={styles.listItem}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          </>
        )}

        <section className={styles.stateActions}>
          <button
            className={styles.ghostButton}
            type="button"
            onClick={retry}
            disabled={state === 'loading'}
          >
            Re-synchroniser
          </button>
          <Link href="/particuliers/boutique" className={styles.linkButton}>
            Commander maintenant
          </Link>
        </section>
      </section>
    </main>
  )
}
