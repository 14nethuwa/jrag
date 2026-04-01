'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './utility-pages.module.css'

type CartItem = {
  id: string
  name: string
  format: string
  unitPrice: number
  quantity: number
}

const initialItems: CartItem[] = [
  {
    id: 'degustation',
    name: 'Selection degustation',
    format: '12 pieces, calibre table',
    unitPrice: 410,
    quantity: 2,
  },
  {
    id: 'reception',
    name: 'Selection reception',
    format: '24 pieces, cadence service',
    unitPrice: 690,
    quantity: 1,
  },
]

const currencyFormatter = new Intl.NumberFormat('fr-MA', {
  style: 'currency',
  currency: 'MAD',
  maximumFractionDigits: 0,
})

export function CartDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [items, setItems] = useState<CartItem[]>(initialItems)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 550)

    return () => window.clearTimeout(timer)
  }, [])

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [items]
  )
  const shipping = subtotal > 0 ? 120 : 0
  const total = subtotal + shipping

  const changeQuantity = (id: string, delta: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== id) return item
          const nextQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: nextQuantity }
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const restoreCart = () => {
    setItems(initialItems)
  }

  const statusLabel = isLoading ? 'Lecture panier' : items.length > 0 ? 'Pret au paiement' : 'Panier vide'

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <p className={styles.eyebrow}>Utility Surface - Panier</p>
        <h1 className={styles.title}>Panier</h1>
        <p className={styles.lede}>
          Verification des lots selectionnes, ajustement de quantites, et projection immediate du
          total avant passage au paiement.
        </p>

        <div className={`${styles.panel} ${styles.heroPanel}`}>
          <div>
            <h2>Revue des selections</h2>
            <p className={styles.meta}>Controles tactiles et clavier, resume prix toujours visible.</p>
          </div>
          <span className={styles.statusTag}>{statusLabel}</span>
        </div>

        {isLoading ? (
          <div className={styles.loading} role="status" aria-live="polite">
            Chargement des lignes de commande en cours.
          </div>
        ) : null}

        {!isLoading && items.length === 0 ? (
          <>
            <div className={`${styles.card} ${styles.notice}`}>
              Votre panier est vide. Retournez vers la boutique pour composer votre prochaine
              selection.
            </div>
            <section className={styles.stateActions}>
              <button className={styles.ghostButton} type="button" onClick={restoreCart}>
                Restaurer un exemple
              </button>
              <Link href="/particuliers/boutique" className={styles.linkButton}>
                Retour boutique
              </Link>
            </section>
          </>
        ) : null}

        {!isLoading && items.length > 0 ? (
          <section className={styles.gridTwo}>
            <article className={styles.card}>
              <h3>Produits selectionnes</h3>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item.id} className={styles.listItem}>
                    <div>
                      <strong>{item.name}</strong>
                      <p className={styles.muted}>{item.format}</p>
                      <p className={styles.muted}>{currencyFormatter.format(item.unitPrice)} / lot</p>
                    </div>
                    <div>
                      <div className={styles.controls}>
                        <button
                          type="button"
                          className={styles.controlButton}
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label={`Diminuer quantite ${item.name}`}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.controlButton}
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label={`Augmenter quantite ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.ghostButton}
                        onClick={() => removeItem(item.id)}
                      >
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <aside className={styles.card}>
              <h3>Resume tarifaire</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span>Sous-total</span>
                  <strong>{currencyFormatter.format(subtotal)}</strong>
                </li>
                <li className={styles.listItem}>
                  <span>Livraison froide</span>
                  <strong>{currencyFormatter.format(shipping)}</strong>
                </li>
                <li className={styles.listItem}>
                  <span>Total</span>
                  <strong>{currencyFormatter.format(total)}</strong>
                </li>
              </ul>
              <section className={styles.stateActions}>
                <Link href="/panier/paiement" className={styles.linkButton}>
                  Continuer vers paiement
                </Link>
              </section>
            </aside>
          </section>
        ) : null}
      </section>
    </main>
  )
}
