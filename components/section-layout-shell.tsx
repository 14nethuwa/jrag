import type { ReactNode } from 'react'

type SectionLayoutShellProps = {
  title: string
  children: ReactNode
}

export function SectionLayoutShell({ title, children }: SectionLayoutShellProps) {
  return (
    <section style={{ padding: '2rem' }}>
      <p>{title}</p>
      <div>{children}</div>
    </section>
  )
}
