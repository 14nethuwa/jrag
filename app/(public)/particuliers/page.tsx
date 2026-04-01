import { MetricMode, ProofMode, RouteMode, StoryMode } from '@/components/modes'
import type { MetricItem, ProofItem, RouteCard } from '@/components/modes'

const reassuranceMetrics: MetricItem[] = [
  {
    value: 48,
    suffix: 'h',
    label: 'Depuration controlee',
    description: 'Purification en eau de mer filtree avant expedition.',
  },
  {
    value: 24,
    suffix: 'h',
    label: 'Expedition premium',
    description: 'Preparation et remise transporteur en cadence courte.',
  },
  {
    value: 3,
    label: 'Formats boutique',
    description: 'Selections degustation, table et reception.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Traitees a Dakhla',
    description: 'Maitrise complete de l origine au conditionnement.',
  },
]

const confidencePoints: ProofItem[] = [
  {
    label: 'Origine',
    value: 'Lagune de Dakhla, Maroc',
    description: 'Un terroir marin regulier pour une texture fine et iodee.',
  },
  {
    label: 'Fraicheur',
    value: 'Conditionnement froid',
    description: 'Maintenance de la chaine du froid jusqu a la reception client.',
  },
  {
    label: 'Guide de choix',
    value: 'Calibres et usages clairs',
    description: 'Chaque format indique le moment de degustation ideal.',
  },
  {
    label: 'Accompagnement',
    value: 'Recettes et conseils maison',
    description: 'Supports simples pour ouvrir, servir et sublimer le produit.',
  },
]

const consumerRoutes: RouteCard[] = [
  {
    title: 'Boutique',
    description: 'Decouvrez nos formats signatures et composez votre selection.',
    ctaText: 'Entrer en boutique',
    href: '/particuliers/boutique',
  },
  {
    title: 'Recettes & Conseils',
    description: 'Rituels de preparation, accords et gestes pour recevoir.',
    ctaText: 'Lire les conseils',
    href: '/particuliers/recettes-conseils',
  },
  {
    title: 'Livraison',
    description: 'Comprendre la logistique froide, les delais et la reception.',
    ctaText: 'Voir la livraison',
    href: '/particuliers/livraison',
  },
]

export default function ParticuliersPage() {
  return (
    <>
      <StoryMode
        bodyText="JRAG Particuliers relie desir gastronomique et rigueur de traitement. Chaque commande suit un parcours clair, de la lagune a votre table, pour servir avec confiance."
        headline="Particuliers"
        imageAlt="Huitres premium JRAG sur lit de glace"
        imageUrl="/videos/scrollytelling-frames/frame-0108.jpg"
        subhead="Maison marine pour tables exigeantes"
      />

      <MetricMode metrics={reassuranceMetrics} />

      <ProofMode
        headline="Reassurance d achat"
        items={confidencePoints}
      />

      <RouteMode
        cards={consumerRoutes}
        headline="Choisir votre prochaine etape"
      />
    </>
  )
}
