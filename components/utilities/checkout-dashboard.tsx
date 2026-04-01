'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './utility-pages.module.css'

type CheckoutState = 'form' | 'processing' | 'success' | 'error'

type CheckoutForm = {
  fullName: string
  email: string
  city: string
  paymentMethod: 'card' | 'cash-on-delivery'
  cardNumber: string
}

const orderLines = [
  { id: 'l1', label: 'Selection degustation x2', amount: 820 },
  { id: 'l2', label: 'Selection reception x1', amount: 690 },
  { id: 'l3', label: 'Livraison froide', amount: 120 },
]

const money = new Intl.NumberFormat('fr-MA', {
  style: 'currency',
  currency: 'MAD',
  maximumFractionDigits: 0,
})

const initialForm: CheckoutForm = {
  fullName: '',
  email: '',
  city: '',
  paymentMethod: 'card',
  cardNumber: '',
}

export function CheckoutDashboard() {
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [state, setState] = useState<CheckoutState>('form')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const totalAmount = useMemo(
    () => orderLines.reduce((sum, line) => sum + line.amount, 0),
    []
  )

  const isCardPayment = form.paymentMethod === 'card'

  const updateField = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }))
  }

  const validate = (): string | null => {
    if (!form.fullName.trim()) return 'Le nom complet est requis.'
    if (!form.email.trim() || !form.email.includes('@')) return 'Un email valide est requis.'
    if (!form.city.trim()) return 'La ville de livraison est requise.'
    if (isCardPayment && form.cardNumber.replace(/\s+/g, '').length < 12) {
      return 'Le numero de carte doit contenir au moins 12 chiffres.'
    }
    return null
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationError = validate()

    if (validationError) {
      setState('error')
      setErrorMessage(validationError)
      return
    }

    setState('processing')
    setErrorMessage('')

    window.setTimeout(() => {
      const normalizedCard = form.cardNumber.replace(/\s+/g, '')
      if (isCardPayment && normalizedCard.endsWith('0000')) {
        setState('error')
        setErrorMessage('Paiement refuse par la banque emettrice. Essayez une autre carte.')
        return
      }

      setState('success')
    }, 900)
  }

  const reset = () => {
    setForm(initialForm)
    setErrorMessage('')
    setState('form')
  }

  const statusLabel =
    state === 'processing' ? 'Autorisation en cours' : state === 'success' ? 'Commande validee' : 'Pret a payer'

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <p className={styles.eyebrow}>Utility Surface - Paiement</p>
        <h1 className={styles.title}>Paiement</h1>
        <p className={styles.lede}>
          Etape finale du checkout avec validation explicite, retour d erreur comprehensible et
          confirmation immediate de commande.
        </p>

        <div className={`${styles.panel} ${styles.heroPanel}`}>
          <div>
            <h2>Validation securisee de commande</h2>
            <p className={styles.meta}>Formulaire compact, resume visible, sortie claire apres action.</p>
          </div>
          <span className={styles.statusTag}>{statusLabel}</span>
        </div>

        {state === 'error' ? (
          <div className={styles.error} role="alert">
            {errorMessage}
          </div>
        ) : null}

        {state === 'processing' ? (
          <div className={styles.loading} role="status" aria-live="polite">
            Verification du paiement et generation du recapitulatif de commande.
          </div>
        ) : null}

        {state === 'success' ? (
          <section className={`${styles.card} ${styles.success}`}>
            <h2>Commande confirmee</h2>
            <p>
              Reference: JR-PAY-2031. Confirmation envoyee par email avec suivi de preparation et
              fenetre de livraison.
            </p>
            <div className={styles.stateActions}>
              <button type="button" className={styles.ghostButton} onClick={reset}>
                Nouvelle commande
              </button>
              <Link href="/compte" className={styles.linkButton}>
                Voir mon compte
              </Link>
            </div>
          </section>
        ) : null}

        {state !== 'success' ? (
          <section className={styles.gridTwo}>
            <form className={`${styles.card} ${styles.form}`} onSubmit={onSubmit} noValidate>
              <h3>Coordonnees de livraison</h3>
              <div className={styles.field}>
                <label htmlFor="fullName">Nom complet</label>
                <input
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="city">Ville</label>
                <input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(event) => updateField('city', event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="paymentMethod">Mode de paiement</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={(event) =>
                    updateField(
                      'paymentMethod',
                      event.target.value === 'cash-on-delivery' ? 'cash-on-delivery' : 'card'
                    )
                  }
                >
                  <option value="card">Carte bancaire</option>
                  <option value="cash-on-delivery">Paiement a la livraison</option>
                </select>
              </div>

              {isCardPayment ? (
                <div className={styles.field}>
                  <label htmlFor="cardNumber">Numero de carte</label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={(event) => updateField('cardNumber', event.target.value)}
                  />
                </div>
              ) : null}

              <div className={styles.stateActions}>
                <button type="submit" className={styles.button} disabled={state === 'processing'}>
                  Confirmer la commande
                </button>
                <button type="button" className={styles.ghostButton} onClick={reset}>
                  Reinitialiser
                </button>
              </div>
            </form>

            <aside className={styles.card}>
              <h3>Resume de commande</h3>
              <ul className={styles.list}>
                {orderLines.map((line) => (
                  <li key={line.id} className={styles.listItem}>
                    <span>{line.label}</span>
                    <strong>{money.format(line.amount)}</strong>
                  </li>
                ))}
                <li className={styles.listItem}>
                  <span>Total</span>
                  <strong>{money.format(totalAmount)}</strong>
                </li>
              </ul>
              <p className={styles.meta}>Astuce test erreur: carte se terminant par 0000.</p>
            </aside>
          </section>
        ) : null}
      </section>
    </main>
  )
}
