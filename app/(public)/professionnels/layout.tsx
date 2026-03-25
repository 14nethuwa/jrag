import type { ReactNode } from 'react'
import { SectionLayoutShell } from '@/components/section-layout-shell'

export default function ProfessionnelsLayout({ children }: { children: ReactNode }) {
  return <SectionLayoutShell title="Professionnels">{children}</SectionLayoutShell>
}
