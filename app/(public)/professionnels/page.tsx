import { MetricMode, ProofMode, RouteMode, StoryMode } from '@/components/modes'
import type { MetricItem, ProofItem, RouteCard } from '@/components/modes'

const professionalMetrics: MetricItem[] = [
  {
    value: 15,
    suffix: 'ans',
    label: 'Cadence export',
    description: 'Organisation continue des expeditions B2B multi-secteurs.',
  },
  {
    value: 48,
    suffix: 'h',
    label: 'Depuration maitrisee',
    description: 'Stabilisation produit avant conditionnement professionnel.',
  },
  {
    value: 3,
    label: 'Flux clients cibles',
    description: 'Restauration, hotelerie premium et distribution selective.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Origine Dakhla tracee',
    description: 'Trajectoire documentaire lisible de la lagune au depart quai.',
  },
]

const professionalProof: ProofItem[] = [
  {
    label: 'Positionnement',
    value: 'Maison export premium',
    description: 'Alliance d une expression gastronomique et d une execution industrielle.',
  },
  {
    label: 'Conditionnement',
    value: 'Formats B2B calibres',
    description: 'Lecture simple des volumes et des cadences selon le service cible.',
  },
  {
    label: 'Confiance acheteur',
    value: 'Preuves activables',
    description: 'Produits, savoir-faire, certifications et contact commercial en parcours court.',
  },
  {
    label: 'Engagement reponse',
    value: 'Contact Pro prioritaire',
    description: 'Demande orientee equipe commerciale avec qualification operationnelle.',
  },
]

const professionalRoutes: RouteCard[] = [
  {
    title: 'Contact Pro',
    description: 'Soumettez votre besoin business et ouvrez un echange qualifie rapidement.',
    ctaText: 'Lancer une demande',
    href: '/professionnels/contact',
  },
  {
    title: 'Produits',
    description: 'Explorer familles, formats et pertinence pour vos usages professionnels.',
    ctaText: 'Consulter les produits',
    href: '/professionnels/produits',
  },
  {
    title: 'Savoir-faire',
    description: 'Verifier depuration, handling, controle qualite et regularite d execution.',
    ctaText: 'Voir le process',
    href: '/professionnels/savoir-faire',
  },
]

export default function ProfessionnelsPage() {
  return (
    <>
      <StoryMode
        bodyText="Le parcours Professionnels JRAG transforme une intention d achat en decision claire: preuves operationnelles, lisibilite produit, puis activation directe du canal commercial."
        headline="Professionnels"
        imageAlt="Equipe JRAG preparant des huitres pour expedition professionnelle"
        imageUrl="/videos/scrollytelling-frames/frame-0132.jpg"
        subhead="Desir premium, execution export"
      />

      <MetricMode metrics={professionalMetrics} />

      <ProofMode
        headline="Repere rapide pour acheteurs"
        items={professionalProof}
      />

      <RouteMode
        cards={professionalRoutes}
        headline="Activer votre parcours B2B"
      />
    </>
  )
}
