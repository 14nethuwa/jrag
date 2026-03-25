import type { ReactNode } from 'react'
import { AdminLayoutShell } from '@/components/admin-layout-shell'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutShell title="JRAG Admin">{children}</AdminLayoutShell>
}
