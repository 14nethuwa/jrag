export interface StoryModeProps {
  imageUrl: string
  imageAlt: string
  headline: string
  subhead: string
  bodyText: string
}

export interface ProofItem {
  label: string
  value: string
  description?: string
}

export interface ProofModeProps {
  headline: string
  items: ProofItem[]
}

export interface RouteCard {
  title: string
  description: string
  ctaText: string
  href: string
}

export interface RouteModeProps {
  headline: string
  cards: RouteCard[]
}

export interface MetricItem {
  value: number
  suffix?: string
  label: string
  description?: string
}

export interface MetricModeProps {
  metrics: MetricItem[]
}

export interface EditorialBlock {
  type: 'paragraph' | 'subhead' | 'image' | 'quote'
  content: string
  alt?: string
}

export interface EditorialModeProps {
  headline: string
  intro: string
  blocks: EditorialBlock[]
}
