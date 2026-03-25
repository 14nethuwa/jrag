import type { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #ddd' }}>JRAG Public</header>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>{children}</div>
      <footer style={{ padding: '1rem 2rem', borderTop: '1px solid #ddd' }}>JRAG Footer</footer>
    </div>
  )
}
