import { ProofMode, RouteMode, StoryMode } from '@/components/modes'
import type { ProofItem, RouteCard } from '@/components/modes'

const leadFields: ProofItem[] = [
  {
    label: 'Entreprise',
    value: 'Raison sociale et secteur',
    description: 'Contexte commercial pour qualifier le type de collaboration attendu.',
  },
  {
    label: 'Volume vise',
    value: 'Cadence hebdo ou evenementielle',
    description: 'Dimensionnement des formats et de la logistique de livraison.',
  },
  {
    label: 'Zone de service',
    value: 'Ville, pays, destination finale',
    description: 'Verification rapide de la faisabilite et des delais de transport.',
  },
  {
    label: 'Delai de reponse',
    value: 'Retour commercial prioritaire',
    description: 'Engagement d un contact humain avec premiere orientation concrete.',
  },
]

const contactRoutes: RouteCard[] = [
  {
    title: 'Ecrire a l equipe pro',
    description: 'Partagez vos besoins par email pour lancer la qualification commerciale.',
    ctaText: 'contact@jrag.ma',
    href: 'mailto:contact@jrag.ma',
  },
  {
    title: 'Revoir les produits',
    description: 'Preparez votre demande avec les familles et formats les plus adaptes.',
    ctaText: 'Aller aux produits',
    href: '/professionnels/produits',
  },
  {
    title: 'Verifier les standards',
    description: 'Renforcez votre dossier avec les preuves de process et certifications.',
    ctaText: 'Voir les preuves',
    href: '/professionnels/certifications',
  },
]

export default function ContactProPage() {
  return (
    <>
      <StoryMode
        bodyText="Contact Pro est la porte d entree des demandes business JRAG. Vous decrivez votre besoin, nous qualifions le flux et revenons avec une proposition operationnelle lisible."
        headline="Contact Pro"
        imageAlt="Chargement logistique JRAG pour expedition professionnelle"
        imageUrl="/videos/scrollytelling-frames/frame-0162.jpg"
        subhead="Demande qualifiee, reponse claire"
      />

      <ProofMode
        headline="Informations a preparer"
        items={leadFields}
      />

      <RouteMode
        cards={contactRoutes}
        headline="Demarrer votre echange commercial"
      />
    </>
  )
}
