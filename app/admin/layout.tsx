import type { ReactNode } from 'react'
import { AdminLayoutShell, type AdminViewer } from '@/components/admin-layout-shell'

const viewer: AdminViewer = {
  displayName: 'JRAG Operations',
  roleLabel: 'Operations Manager',
  permissions: ['catalog:write', 'orders:manage', 'pages:publish', 'customers:read'],
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminLayoutShell title="JRAG Admin" viewer={viewer}>
      {children}
    </AdminLayoutShell>
  )
}
