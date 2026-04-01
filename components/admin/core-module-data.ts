import type { ModuleMetric, ModuleRecord } from '@/components/admin/module-page-shell'

type CoreModuleConfig = {
  eyebrow: string
  title: string
  description: string
  metrics: ModuleMetric[]
  records: ModuleRecord[]
  integrationHook: string
}

const pagesModule: CoreModuleConfig = {
  eyebrow: 'Content command center',
  title: 'Pages',
  description:
    'Manage narrative and proof blocks across B2B, B2C, and shared journeys with publication discipline.',
  metrics: [
    { label: 'Published sections', value: '48' },
    { label: 'Draft revisions', value: '12' },
    { label: 'Pending QA', value: '4' },
  ],
  records: [
    { name: 'Professionnels / Produits', status: 'Review', owner: 'Content Lead', updatedAt: '2h ago' },
    { name: 'Particuliers / Boutique', status: 'Published', owner: 'B2C Ops', updatedAt: '5h ago' },
    { name: 'A propos / Notre histoire', status: 'Draft', owner: 'Brand Team', updatedAt: 'Today' },
  ],
  integrationHook:
    'Editorial workflow is synchronized with role approvals, so publishing and proof updates stay audit-ready.',
}

const produitsModule: CoreModuleConfig = {
  eyebrow: 'Catalog operations',
  title: 'Produits',
  description:
    'Control product visibility, export formats, and proof badges without breaking audience-specific routing.',
  metrics: [
    { label: 'Active SKUs', value: '36' },
    { label: 'Hidden SKUs', value: '7' },
    { label: 'Price sync errors', value: '1' },
  ],
  records: [
    { name: 'Huîtres Royale 24', status: 'Published', owner: 'Catalog Ops', updatedAt: '30m ago' },
    { name: 'Palourdes Premium', status: 'Draft', owner: 'Catalog Ops', updatedAt: 'Today' },
    { name: 'Batch readiness labels', status: 'Review', owner: 'QA Team', updatedAt: 'Yesterday' },
  ],
  integrationHook:
    'Catalog actions are permission-scoped and synchronized with stock updates to protect storefront consistency.',
}

const commandesModule: CoreModuleConfig = {
  eyebrow: 'Order flow control',
  title: 'Commandes',
  description:
    'Track payment state, fulfillment windows, and exception handling for premium cold-chain delivery.',
  metrics: [
    { label: 'Open orders', value: '29' },
    { label: 'Awaiting payment', value: '6' },
    { label: 'Fulfillment alerts', value: '2' },
  ],
  records: [
    { name: 'ORD-2026-1018', status: 'Packed', owner: 'Fulfillment', updatedAt: '9m ago' },
    { name: 'ORD-2026-1016', status: 'Payment hold', owner: 'Finance', updatedAt: '42m ago' },
    { name: 'ORD-2026-1012', status: 'Shipped', owner: 'Logistics', updatedAt: 'Today' },
  ],
  integrationHook:
    'Order timeline is aligned with payment and logistics signals, giving operators one reliable fulfillment view.',
}

const clientsModule: CoreModuleConfig = {
  eyebrow: 'Customer operations',
  title: 'Clients',
  description:
    'Maintain customer records, account health, and service follow-up while preserving buyer trust signals.',
  metrics: [
    { label: 'Total customers', value: '1,284' },
    { label: 'VIP accounts', value: '96' },
    { label: 'Support escalations', value: '3' },
  ],
  records: [
    { name: 'Meridian Imports', status: 'Active', owner: 'B2B Success', updatedAt: '13m ago' },
    { name: 'Maison Du Gout', status: 'Onboarding', owner: 'Sales Ops', updatedAt: '1h ago' },
    { name: 'Retail tier updates', status: 'Review', owner: 'CRM Admin', updatedAt: 'Today' },
  ],
  integrationHook:
    'Customer records stay in sync with support workflows while visibility remains restricted to authorized roles.',
}

const coreModules = {
  pages: pagesModule,
  produits: produitsModule,
  commandes: commandesModule,
  clients: clientsModule,
}

export type { CoreModuleConfig }
export { coreModules }
