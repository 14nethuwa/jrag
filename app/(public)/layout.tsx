import type { ReactNode } from 'react'
import { FullscreenMenu } from '@/components/public/fullscreen-menu'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <FullscreenMenu>{children}</FullscreenMenu>
}
