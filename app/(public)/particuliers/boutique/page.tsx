import { ProofMode, RouteMode, StoryMode } from '@/components/modes'
import type { ProofItem, RouteCard } from '@/components/modes'

const boutiqueCollections: ProofItem[] = [
  {
    label: 'Selection degustation',
    value: '12 pieces, calibrage table',
    description: 'Format ideal pour une decouverte precise et elegante.',
  },
  {
    label: 'Selection reception',
    value: '24 pieces, cadence service',
    description: 'Concue pour les tables d invitees et les moments de celebration.',
  },
  {
    label: 'Selection cave marine',
    value: '36 pieces, reserve fraicheur',
    description: 'Pour amateurs reguliers recherchant disponibilite et constance.',
  },
  {
    label: 'Format premium',
    value: 'Coffret + notice de service',
    description: 'Presentation maison et protocoles simples de mise en table.',
  },
]

const boutiqueActions: RouteCard[] = [
  {
    title: 'Recettes & Conseils',
    description: 'Accompagnements, dressage et accords pour servir juste.',
    ctaText: 'Voir les idees',
    href: '/particuliers/recettes-conseils',
  },
  {
    title: 'Livraison',
    description: 'Verifiez zones, delais et reception de chaine froide.',
    ctaText: 'Lire les details',
    href: '/particuliers/livraison',
  },
  {
    title: 'Programme Fidelite',
    description: 'Cumulez des avantages sur vos selections recurrentes.',
    ctaText: 'Decouvrir le programme',
    href: '/particuliers/fidelite',
  },
]

export default function BoutiquePage() {
  return (
    <>
      <StoryMode
        bodyText="La boutique JRAG est pensee comme un parcours court: choisir le format, verifier la logistique, puis recevoir un produit pret a etre servi avec elegance."
        headline="Boutique"
        imageAlt="Presentation premium de fruits de mer JRAG"
        imageUrl="/videos/scrollytelling-frames/frame-0146.jpg"
        subhead="Decouverte, reassurance, conversion"
      />

      <ProofMode
        headline="Collections disponibles"
        items={boutiqueCollections}
      />

      <RouteMode
        cards={boutiqueActions}
        headline="Completer votre experience"
      />
    </>
  )
}
