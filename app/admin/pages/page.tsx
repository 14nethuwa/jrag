import { coreModules } from '@/components/admin/core-module-data'
import { ModulePageShell } from '@/components/admin/module-page-shell'

export default function ExamplePage() {
  return <ModulePageShell {...coreModules.pages} />
}
