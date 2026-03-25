import type { ReactNode } from 'react'
import { SectionLayoutShell } from '@/components/section-layout-shell'

export default function ParticuliersLayout({ children }: { children: ReactNode }) {
  return <SectionLayoutShell title="Particuliers">{children}</SectionLayoutShell>
}
