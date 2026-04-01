# JRAG Data Architecture (MVP -> Scale)

## Scope

This architecture supports:

- dual public journeys (`Professionnels` + `Particuliers`)
- B2C commerce (`Boutique`, cart, checkout, account)
- B2B lead capture and follow-up
- admin back office (`Dashboard` + 11 management areas)

Source IA references:

- `docs/ia/routes.md`
- `docs/ia/admin-architecture.md`

## Decision: Content and Commerce Architecture

### Options considered

1. Static JSON only
   - fast and simple
   - weak for editor workflows, approvals, and frequent updates
2. Headless CMS + separate commerce DB
   - strong editorial tooling
   - more moving parts for MVP and duplicated auth/roles concerns
3. Firebase-first platform (recommended MVP)
   - Firestore for content + commerce data
   - Firebase Auth for accounts and admin identity
   - Cloud Functions for trusted server logic (payments, webhooks, admin workflows)
   - Firebase Storage for media

### Chosen approach

Use **Firebase-first** for MVP with a **hybrid content model**:

- Firestore stores structured content and commerce entities
- long-form editorial (`recipes`, `blog`, `pages`) stays document-based with explicit metadata
- Cloud Functions enforces write boundaries for sensitive flows (orders, admin mutations, payment state)

This gets the team to production quickly while keeping a clear migration path to PostgreSQL/Supabase if reporting complexity outgrows Firestore query patterns.

## Core Data Model

## Shared conventions

- IDs: Firestore document IDs (`string`)
- timestamps: `createdAt`, `updatedAt` as server timestamps
- status fields are enum-like strings
- soft visibility controls where needed (`isActive`, `isPublished`)
- denormalize display snapshots in orders to preserve historical accuracy

## Collections

### 1) `products`

Primary catalog entity for B2B + B2C.

Key fields:

- identity: `name`, `slug` (unique), `description`, `imageUrl`, `imageAlt`
- specs: `origin`, `harvestDate`, `gradeSize`, `salinity`, `temperature`, `shelfLife`
- pricing: `priceB2B`, `priceB2C`, `currencyB2B`, `currencyB2C`
- B2B ops: `minimumOrderQuantity`, `leadTimeInDays`
- trust: `certificationIds[]`, `isActive`
- content links: `recipeIds[]`, `pairingWines[]`

Indexes:

- `slug` unique lookup
- `isActive + updatedAt` for catalog publishing
- `origin + gradeSize` for admin filtering

### 2) `certifications`

Reusable trust records referenced by products and trust modules.

Key fields:

- `name`, `issuer`, `certificateNumber`
- `validFrom`, `validUntil`, `status`
- `assetUrl`, `publicSummary`

Indexes:

- `status + validUntil`

### 3) `orders`

B2C purchase entity.

Key fields:

- ownership: `userId`
- line items snapshot: `items[]` with `productId`, `productName`, `quantity`, `unitPrice`, `subtotal`
- totals: `subtotal`, `shipping`, `tax`, `total`, `currency`
- workflow: `status` (`pending|paid|fulfilled|shipped|delivered|cancelled|refunded`)
- shipping: `shippingAddress`, `shippingMethod`, `trackingNumber`
- payment: `paymentProvider`, `paymentIntentId`, `paymentStatus`
- operations: `riskFlags[]`, `adminNotes`

Indexes:

- `userId + createdAt desc` (account order history)
- `status + createdAt desc` (admin queue)
- `paymentStatus + createdAt desc` (reconciliation)

### 4) `users`

Profile and account settings for Firebase Auth users.

Key fields:

- identity mirror: `authUid`, `email`, `emailVerified`
- profile: `firstName`, `lastName`, `phone`
- preferences: `language`, `marketingOptIn`
- loyalty: `loyaltyPoints`, `loyaltyTier`
- addresses: `addresses[]`, `defaultShippingAddressId`, `defaultBillingAddressId`
- lifecycle: `lastLoginAt`, `createdAt`

Indexes:

- `email` lookup (admin support)
- `loyaltyTier + loyaltyPoints`

### 5) `leads_b2b`

B2B commercial lead pipeline.

Key fields:

- company: `companyName`, `industry`, `website`, `sizeBand`
- contact: `contactName`, `contactEmail`, `contactPhone`, `contactTitle`
- demand: `productsInterested[]`, `estimatedAnnualVolume`, `message`
- CRM state: `status`, `assignedTo`, `lastContactedAt`, `internalNotes`

Indexes:

- `status + createdAt desc`
- `assignedTo + status`

### 6) Content collections

- `pages` (shared/B2B/B2C page bodies and section composition)
- `recipes`
- `blog_posts`
- `faqs`
- `trust_modules` (reassurance blocks, process proof, badges)
- `navigation`

Each uses:

- canonical metadata: `title`, `slug`, `excerpt`, `seo*`
- audience targeting: `audience` (`shared|b2b|b2c`)
- publishing controls: `isPublished`, `publishedAt`
- revision metadata: `version`, `lastEditedBy`, `updatedAt`

Indexes:

- `slug`
- `audience + isPublished + updatedAt`

### 7) Admin and governance collections

- `admin_users` (role and capability map)
- `admin_audit_logs` (immutable action log)
- `settings` (site-level legal/contact/system config)
- `media_assets` (storage metadata and usage mapping)

## Admin Area -> Data Ownership Map

- Dashboard: derived aggregates from `orders`, `users`, `leads_b2b`
- Pages: `pages`
- Navigation: `navigation`
- Produits: `products`, `certifications`
- Commandes: `orders`
- Clients: `users`
- Leads B2B: `leads_b2b`
- Recettes & Blog: `recipes`, `blog_posts`
- Media: `media_assets`
- Trust Content: `trust_modules`, `certifications`
- Settings: `settings`
- Users / Roles: `admin_users`, role claims in Firebase Auth

## Security Model

## Auth and roles

- Firebase Auth for all sign-in (customers and admins)
- admin access gated by custom claims (`role`, capability flags)
- separate admin role model in `admin_users` for policy and audit alignment

## Authorization boundaries

- public read: published content + active product projections only
- customer read/write: own profile and own orders only
- admin read/write: scoped by capability (products, orders, users, leads, content, settings)
- sensitive writes (`order status`, `refund`, `admin role changes`) through Cloud Functions only

## Data protection

- never store raw card data; Stripe token/payment intent references only
- encrypt transport with HTTPS only
- minimize stored PII and support GDPR export/delete flows
- redact PII in logs and analytics payloads

## Abuse controls

- rate limit login, contact, and checkout endpoints
- anti-spam challenge for public lead/contact forms
- idempotency key on checkout creation to prevent duplicate orders
- immutable admin audit log retention minimum 1 year

## Integration Boundaries (Firebase + API)

- client SDK: public reads and constrained self-service writes
- Cloud Functions (server):
  - checkout session creation
  - payment webhook processing
  - order status transitions
  - admin privileged mutations
  - notification fanout (email/SMS)

## Migration Path

### MVP (0-2 months)

- launch collections above with core indexes
- enable B2C orders + Stripe intents
- enable B2B lead capture + admin triage
- deploy baseline rules and audit logs

### Growth (2-6 months)

- add inventory reservations + fulfillment events
- add reporting projections (daily sales, lead funnel snapshots)
- evaluate read models for heavy analytics queries

### Scale trigger

If multi-dimensional reporting, ad hoc analytics, or cross-entity joins become a bottleneck, introduce PostgreSQL/Supabase for BI and operational reporting while keeping Firebase Auth and selected realtime workloads.

## Open Questions for Finalization

- required countries/currencies for launch (affects address and tax modeling)
- refund and cancellation policy granularity by order state
- exact RBAC matrix per admin role in `Users / Roles`
- SLA targets for order and lead notifications
