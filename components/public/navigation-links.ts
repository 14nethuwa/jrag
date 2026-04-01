import navigationSchema from '@/docs/ia/navigation-schema.json'

export type NavLink = {
  href: string
  label: string
}

const hrefByLabel: Record<string, string> = {
  Accueil: '/',
  Professionnels: '/professionnels',
  Particuliers: '/particuliers',
  'A propos': '/a-propos',
  Ressources: '/ressources',
  Contact: '/contact',
  Produits: '/professionnels/produits',
  'Savoir-faire': '/professionnels/savoir-faire',
  'Secteurs / Clients': '/professionnels/secteurs-clients',
  Certifications: '/professionnels/certifications',
  'Contact Pro': '/professionnels/contact',
  Boutique: '/particuliers/boutique',
  'Recettes & Conseils': '/particuliers/recettes-conseils',
  Livraison: '/particuliers/livraison',
  'Programme Fidelite': '/particuliers/fidelite',
  'Mon Compte': '/compte',
  Panier: '/panier',
  Paiement: '/panier/paiement',
}

function mapLabelsToLinks(labels: readonly string[]): NavLink[] {
  return labels.map((label) => {
    const href = hrefByLabel[label]

    if (!href) {
      throw new Error(`Missing navigation href mapping for label: ${label}`)
    }

    return { href, label }
  })
}

export const primaryLinks: NavLink[] = mapLabelsToLinks(navigationSchema.global)

export const professionalLinks: NavLink[] = mapLabelsToLinks(
  navigationSchema.audiences.professionnels.local,
)

export const consumerLinks: NavLink[] = mapLabelsToLinks(navigationSchema.audiences.particuliers.local)

export const utilityLinks: NavLink[] = mapLabelsToLinks(navigationSchema.utilities)
