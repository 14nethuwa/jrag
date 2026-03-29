# JRAG Next.js Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a real Next.js App Router application for JRAG with the full approved public and admin route structure, while keeping pages intentionally empty and visually stock.

**Architecture:** The app is created at the repository root with Next.js App Router and TypeScript. The scaffold mirrors the approved IA directly in the route tree, adds minimal shared layouts and placeholder components, and keeps all pages content-light so the structure is ready before design and content work begin.

**Tech Stack:** Next.js, App Router, TypeScript, npm, ESLint, CSS

---

## File Structure

### Existing files to keep aligned with

- Existing: `docs/ia/routes.md` - canonical route inventory
- Existing: `docs/ia/navigation-schema.json` - navigation grouping rules
- Existing: `docs/superpowers/specs/2026-03-25-jrag-nextjs-scaffold-design.md` - scaffold spec

### Files to create

- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `next-env.d.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/(public)/layout.tsx`
- Create: `app/(public)/page.tsx`
- Create: `app/(public)/professionnels/layout.tsx`
- Create: `app/(public)/professionnels/page.tsx`
- Create: `app/(public)/professionnels/produits/page.tsx`
- Create: `app/(public)/professionnels/savoir-faire/page.tsx`
- Create: `app/(public)/professionnels/secteurs-clients/page.tsx`
- Create: `app/(public)/professionnels/certifications/page.tsx`
- Create: `app/(public)/professionnels/contact/page.tsx`
- Create: `app/(public)/particuliers/layout.tsx`
- Create: `app/(public)/particuliers/page.tsx`
- Create: `app/(public)/particuliers/boutique/page.tsx`
- Create: `app/(public)/particuliers/recettes-conseils/page.tsx`
- Create: `app/(public)/particuliers/livraison/page.tsx`
- Create: `app/(public)/particuliers/fidelite/page.tsx`
- Create: `app/(public)/a-propos/page.tsx`
- Create: `app/(public)/a-propos/notre-histoire/page.tsx`
- Create: `app/(public)/a-propos/terroir-dakhla/page.tsx`
- Create: `app/(public)/a-propos/engagement-rse/page.tsx`
- Create: `app/(public)/a-propos/presse-medias/page.tsx`
- Create: `app/(public)/a-propos/carrieres/page.tsx`
- Create: `app/(public)/ressources/page.tsx`
- Create: `app/(public)/ressources/actualites/page.tsx`
- Create: `app/(public)/ressources/galerie/page.tsx`
- Create: `app/(public)/ressources/faq/page.tsx`
- Create: `app/(public)/contact/page.tsx`
- Create: `app/(public)/(utilities)/compte/page.tsx`
- Create: `app/(public)/(utilities)/panier/page.tsx`
- Create: `app/(public)/(utilities)/panier/paiement/page.tsx`
- Create: `app/(public)/(legal)/mentions-legales/page.tsx`
- Create: `app/(public)/(legal)/confidentialite/page.tsx`
- Create: `app/(public)/(legal)/cgv-b2b/page.tsx`
- Create: `app/(public)/(legal)/cgv-b2c/page.tsx`
- Create: `app/(public)/(legal)/plan-du-site/page.tsx`
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `app/admin/pages/page.tsx`
- Create: `app/admin/navigation/page.tsx`
- Create: `app/admin/produits/page.tsx`
- Create: `app/admin/commandes/page.tsx`
- Create: `app/admin/clients/page.tsx`
- Create: `app/admin/leads-b2b/page.tsx`
- Create: `app/admin/recettes-blog/page.tsx`
- Create: `app/admin/media/page.tsx`
- Create: `app/admin/trust-content/page.tsx`
- Create: `app/admin/settings/page.tsx`
- Create: `app/admin/users-roles/page.tsx`
- Create: `components/page-placeholder.tsx`
- Create: `components/section-layout-shell.tsx`
- Create: `components/admin-layout-shell.tsx`
- Create: `scripts/verify-routes.cjs`

### Files to modify

- Modify: `README.md`

## Bootstrap Command

Use this exact command from the repository root:

```bash
npm create next-app@latest . -- --ts --app --eslint --use-npm --no-tailwind --no-src-dir --import-alias "@/*"
```

If the CLI prompts because the directory is not empty, choose the option that continues in the current directory without deleting existing files.

## Shared Placeholder Pattern

Use this exact minimal render pattern for page scaffolds:

```tsx
import { PagePlaceholder } from '@/components/page-placeholder'

export default function ExamplePage() {
  return (
    <PagePlaceholder
      title="Example"
      context="Shared"
      description="Placeholder page for future content."
    />
  )
}
```

## Exact Shared Component Skeletons

Use these exact implementations unless a generated scaffold forces tiny syntax changes.

### `components/page-placeholder.tsx`

```tsx
type PagePlaceholderProps = {
  title: string
  context?: string
  description?: string
}

export function PagePlaceholder({
  title,
  context,
  description = 'Placeholder page for future content.',
}: PagePlaceholderProps) {
  return (
    <main style={{ padding: '2rem' }}>
      {context ? <p>{context}</p> : null}
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  )
}
```

### `components/section-layout-shell.tsx`

```tsx
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
```

### `components/admin-layout-shell.tsx`

```tsx
import type { ReactNode } from 'react'
import Link from 'next/link'

type AdminLayoutShellProps = {
  title: string
  children: ReactNode
}

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/navigation', label: 'Navigation' },
  { href: '/admin/produits', label: 'Produits' },
  { href: '/admin/commandes', label: 'Commandes' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/leads-b2b', label: 'Leads B2B' },
  { href: '/admin/recettes-blog', label: 'Recettes & Blog' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/trust-content', label: 'Trust Content' },
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/users-roles', label: 'Users / Roles' },
]

export function AdminLayoutShell({ title, children }: AdminLayoutShellProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside style={{ padding: '1.5rem', borderRight: '1px solid #ddd' }}>
        <p>{title}</p>
        <nav>
          <ul>
            {adminLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  )
}
```

## Exact Layout Skeletons

### `app/layout.tsx`

```tsx
import './globals.css'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### `app/(public)/layout.tsx`

```tsx
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
```

### `app/admin/layout.tsx`

```tsx
import type { ReactNode } from 'react'
import { AdminLayoutShell } from '@/components/admin-layout-shell'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutShell title="JRAG Admin">{children}</AdminLayoutShell>
}
```

### `app/(public)/professionnels/layout.tsx`

```tsx
import type { ReactNode } from 'react'
import { SectionLayoutShell } from '@/components/section-layout-shell'

export default function ProfessionnelsLayout({ children }: { children: ReactNode }) {
  return <SectionLayoutShell title="Professionnels">{children}</SectionLayoutShell>
}
```

### `app/(public)/particuliers/layout.tsx`

```tsx
import type { ReactNode } from 'react'
import { SectionLayoutShell } from '@/components/section-layout-shell'

export default function ParticuliersLayout({ children }: { children: ReactNode }) {
  return <SectionLayoutShell title="Particuliers">{children}</SectionLayoutShell>
}
```

### `app/globals.css`

```css
html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #111;
  background: #fff;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
```

### `scripts/verify-routes.cjs`

```js
const fs = require('fs')

const required = [
  'app/layout.tsx',
  'app/globals.css',
  'app/(public)/layout.tsx',
  'app/(public)/page.tsx',
  'app/(public)/professionnels/layout.tsx',
  'app/(public)/professionnels/page.tsx',
  'app/(public)/professionnels/produits/page.tsx',
  'app/(public)/professionnels/savoir-faire/page.tsx',
  'app/(public)/professionnels/secteurs-clients/page.tsx',
  'app/(public)/professionnels/certifications/page.tsx',
  'app/(public)/professionnels/contact/page.tsx',
  'app/(public)/particuliers/layout.tsx',
  'app/(public)/particuliers/page.tsx',
  'app/(public)/particuliers/boutique/page.tsx',
  'app/(public)/particuliers/recettes-conseils/page.tsx',
  'app/(public)/particuliers/livraison/page.tsx',
  'app/(public)/particuliers/fidelite/page.tsx',
  'app/(public)/a-propos/page.tsx',
  'app/(public)/a-propos/notre-histoire/page.tsx',
  'app/(public)/a-propos/terroir-dakhla/page.tsx',
  'app/(public)/a-propos/engagement-rse/page.tsx',
  'app/(public)/a-propos/presse-medias/page.tsx',
  'app/(public)/a-propos/carrieres/page.tsx',
  'app/(public)/ressources/page.tsx',
  'app/(public)/ressources/actualites/page.tsx',
  'app/(public)/ressources/galerie/page.tsx',
  'app/(public)/ressources/faq/page.tsx',
  'app/(public)/contact/page.tsx',
  'app/(public)/(utilities)/compte/page.tsx',
  'app/(public)/(utilities)/panier/page.tsx',
  'app/(public)/(utilities)/panier/paiement/page.tsx',
  'app/(public)/(legal)/mentions-legales/page.tsx',
  'app/(public)/(legal)/confidentialite/page.tsx',
  'app/(public)/(legal)/cgv-b2b/page.tsx',
  'app/(public)/(legal)/cgv-b2c/page.tsx',
  'app/(public)/(legal)/plan-du-site/page.tsx',
  'app/admin/layout.tsx',
  'app/admin/page.tsx',
  'app/admin/pages/page.tsx',
  'app/admin/navigation/page.tsx',
  'app/admin/produits/page.tsx',
  'app/admin/commandes/page.tsx',
  'app/admin/clients/page.tsx',
  'app/admin/leads-b2b/page.tsx',
  'app/admin/recettes-blog/page.tsx',
  'app/admin/media/page.tsx',
  'app/admin/trust-content/page.tsx',
  'app/admin/settings/page.tsx',
  'app/admin/users-roles/page.tsx',
]

const missing = required.filter((file) => !fs.existsSync(file))

if (missing.length) {
  console.log(JSON.stringify(missing))
  process.exit(1)
}

console.log('OK')
```

## Exact Page Placeholder Map

Use these exact values for every placeholder page:

- `app/(public)/page.tsx` -> title `Accueil`, context `Shared`
- `app/(public)/a-propos/page.tsx` -> title `A propos`, context `Shared`
- `app/(public)/a-propos/notre-histoire/page.tsx` -> title `Notre histoire`, context `Shared`
- `app/(public)/a-propos/terroir-dakhla/page.tsx` -> title `Terroir Dakhla`, context `Shared`
- `app/(public)/a-propos/engagement-rse/page.tsx` -> title `Engagement RSE`, context `Shared`
- `app/(public)/a-propos/presse-medias/page.tsx` -> title `Presse & Medias`, context `Shared`
- `app/(public)/a-propos/carrieres/page.tsx` -> title `Carrieres`, context `Shared`
- `app/(public)/ressources/page.tsx` -> title `Ressources`, context `Shared`
- `app/(public)/ressources/actualites/page.tsx` -> title `Actualites / Blog`, context `Shared`
- `app/(public)/ressources/galerie/page.tsx` -> title `Galerie Photos / Videos`, context `Shared`
- `app/(public)/ressources/faq/page.tsx` -> title `FAQ`, context `Shared`
- `app/(public)/contact/page.tsx` -> title `Contact`, context `Shared`
- `app/(public)/professionnels/page.tsx` -> title `Professionnels`, context `B2B`
- `app/(public)/professionnels/produits/page.tsx` -> title `Produits`, context `B2B`
- `app/(public)/professionnels/savoir-faire/page.tsx` -> title `Savoir-faire`, context `B2B`
- `app/(public)/professionnels/secteurs-clients/page.tsx` -> title `Secteurs / Clients`, context `B2B`
- `app/(public)/professionnels/certifications/page.tsx` -> title `Certifications`, context `B2B`
- `app/(public)/professionnels/contact/page.tsx` -> title `Contact Pro`, context `B2B`
- `app/(public)/particuliers/page.tsx` -> title `Particuliers`, context `B2C`
- `app/(public)/particuliers/boutique/page.tsx` -> title `Boutique`, context `B2C`
- `app/(public)/particuliers/recettes-conseils/page.tsx` -> title `Recettes & Conseils`, context `B2C`
- `app/(public)/particuliers/livraison/page.tsx` -> title `Livraison`, context `B2C`
- `app/(public)/particuliers/fidelite/page.tsx` -> title `Programme Fidelite`, context `B2C`
- `app/(public)/(utilities)/compte/page.tsx` -> title `Mon Compte`, context `Utility`
- `app/(public)/(utilities)/panier/page.tsx` -> title `Panier`, context `Utility`
- `app/(public)/(utilities)/panier/paiement/page.tsx` -> title `Paiement`, context `Utility`
- `app/(public)/(legal)/mentions-legales/page.tsx` -> title `Mentions legales`, context `Legal`
- `app/(public)/(legal)/confidentialite/page.tsx` -> title `Confidentialite`, context `Legal`
- `app/(public)/(legal)/cgv-b2b/page.tsx` -> title `CGV B2B`, context `Legal`
- `app/(public)/(legal)/cgv-b2c/page.tsx` -> title `CGV B2C`, context `Legal`
- `app/(public)/(legal)/plan-du-site/page.tsx` -> title `Plan du site`, context `Legal`
- `app/admin/page.tsx` -> title `Admin Dashboard`, context `Admin`
- `app/admin/pages/page.tsx` -> title `Pages`, context `Admin`
- `app/admin/navigation/page.tsx` -> title `Navigation`, context `Admin`
- `app/admin/produits/page.tsx` -> title `Produits`, context `Admin`
- `app/admin/commandes/page.tsx` -> title `Commandes`, context `Admin`
- `app/admin/clients/page.tsx` -> title `Clients`, context `Admin`
- `app/admin/leads-b2b/page.tsx` -> title `Leads B2B`, context `Admin`
- `app/admin/recettes-blog/page.tsx` -> title `Recettes & Blog`, context `Admin`
- `app/admin/media/page.tsx` -> title `Media`, context `Admin`
- `app/admin/trust-content/page.tsx` -> title `Trust Content`, context `Admin`
- `app/admin/settings/page.tsx` -> title `Settings`, context `Admin`
- `app/admin/users-roles/page.tsx` -> title `Users / Roles`, context `Admin`

Use the exact `Shared Placeholder Pattern` for every page file, changing only:

- `title`
- `context`

Keep `description="Placeholder page for future content."` unchanged for all scaffolded pages.

## Task 1: Bootstrap the Next.js app at repo root

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `next-env.d.ts`
- Create: generated `app/page.tsx` from Next.js bootstrap, to be deleted in Task 4 after `app/(public)/page.tsx` is created
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Modify: `README.md`

- [ ] **Step 1: Verify the repo does not already contain a Next.js scaffold**

Run: `node -e "const fs=require('fs'); const found=['package.json','app','next.config.ts','eslint.config.mjs'].filter(f=>fs.existsSync(f)); console.log(found.length?JSON.stringify(found):'OK')"`
Expected: `OK`

- [ ] **Step 2: Run the exact Next.js bootstrap command**

Run:

```bash
npm create next-app@latest . -- --ts --app --eslint --use-npm --no-tailwind --no-src-dir --import-alias "@/*"
```

Expected: Next.js scaffold created at repo root.

- [ ] **Step 3: Verify required root scaffold files exist**

Run: `node -e "const fs=require('fs'); const required=['package.json','package-lock.json','tsconfig.json','next.config.ts','eslint.config.mjs','next-env.d.ts','app','app/layout.tsx','app/globals.css']; const missing=required.filter(f=>!fs.existsSync(f)); console.log(missing.length?JSON.stringify(missing):'OK')"`
Expected: `OK`

- [ ] **Step 4: Install dependencies if bootstrap did not already do so**

Run: `npm install`
Expected: dependencies installed successfully

- [ ] **Step 5: Run lint on the fresh scaffold**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 6: Replace the generated `README.md` with a minimal project setup note**

Update `README.md` so it briefly says this repo contains the JRAG Next.js route scaffold and references `docs/ia/` for IA source docs.

- [ ] **Step 7: Leave generated `app/page.tsx` untouched for now**

Do not customize the generated root page in Task 1.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts eslint.config.mjs next-env.d.ts app README.md
git commit -m "chore: bootstrap Next.js app scaffold"
```

## Task 2: Add reusable scaffold components

**Files:**
- Create: `components/page-placeholder.tsx`
- Create: `components/section-layout-shell.tsx`
- Create: `components/admin-layout-shell.tsx`

- [ ] **Step 1: Create `components/page-placeholder.tsx`**

Use the exact skeleton from `Exact Shared Component Skeletons`.

- [ ] **Step 2: Create `components/section-layout-shell.tsx`**

Use the exact skeleton from `Exact Shared Component Skeletons`.

- [ ] **Step 3: Create `components/admin-layout-shell.tsx`**

Use the exact skeleton from `Exact Shared Component Skeletons`.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components
git commit -m "feat: add reusable scaffold shell components"
```

## Task 3: Add root and public layouts

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `app/(public)/layout.tsx`

- [ ] **Step 1: Replace the generated `app/layout.tsx` with a minimal root layout**

Use the exact skeleton from `Exact Layout Skeletons`.

- [ ] **Step 2: Replace `app/globals.css` with stock scaffold styles**

Use the exact CSS skeleton from `Exact Layout Skeletons`.

- [ ] **Step 3: Create `app/(public)/layout.tsx`**

Use the exact skeleton from `Exact Layout Skeletons`.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css app/(public)/layout.tsx
git commit -m "feat: add root and public layouts"
```

## Task 4: Scaffold shared public routes

**Files:**
- Create: `app/(public)/page.tsx`
- Create: `app/(public)/a-propos/page.tsx`
- Create: `app/(public)/a-propos/notre-histoire/page.tsx`
- Create: `app/(public)/a-propos/terroir-dakhla/page.tsx`
- Create: `app/(public)/a-propos/engagement-rse/page.tsx`
- Create: `app/(public)/a-propos/presse-medias/page.tsx`
- Create: `app/(public)/a-propos/carrieres/page.tsx`
- Create: `app/(public)/ressources/page.tsx`
- Create: `app/(public)/ressources/actualites/page.tsx`
- Create: `app/(public)/ressources/galerie/page.tsx`
- Create: `app/(public)/ressources/faq/page.tsx`
- Create: `app/(public)/contact/page.tsx`

- [ ] **Step 1: Create `app/(public)/page.tsx` using title `Accueil` and context `Shared`**
- [ ] **Step 2: Create `app/(public)/a-propos/page.tsx` using title `A propos` and context `Shared`**
- [ ] **Step 3: Create `app/(public)/a-propos/notre-histoire/page.tsx` using title `Notre histoire` and context `Shared`**
- [ ] **Step 4: Create `app/(public)/a-propos/terroir-dakhla/page.tsx` using title `Terroir Dakhla` and context `Shared`**
- [ ] **Step 5: Create `app/(public)/a-propos/engagement-rse/page.tsx` using title `Engagement RSE` and context `Shared`**
- [ ] **Step 6: Create `app/(public)/a-propos/presse-medias/page.tsx` using title `Presse & Medias` and context `Shared`**
- [ ] **Step 7: Create `app/(public)/a-propos/carrieres/page.tsx` using title `Carrieres` and context `Shared`**
- [ ] **Step 8: Create `app/(public)/ressources/page.tsx` using title `Ressources` and context `Shared`**
- [ ] **Step 9: Create `app/(public)/ressources/actualites/page.tsx` using title `Actualites / Blog` and context `Shared`**
- [ ] **Step 10: Create `app/(public)/ressources/galerie/page.tsx` using title `Galerie Photos / Videos` and context `Shared`**
- [ ] **Step 11: Create `app/(public)/ressources/faq/page.tsx` using title `FAQ` and context `Shared`**
- [ ] **Step 12: Create `app/(public)/contact/page.tsx` using title `Contact` and context `Shared`**
- [ ] **Step 13: Delete generated `app/page.tsx` if it still exists**

Run: `node -e "const fs=require('fs'); if(fs.existsSync('app/page.tsx')) fs.unlinkSync('app/page.tsx'); console.log(fs.existsSync('app/page.tsx')?'FAIL':'OK')"`
Expected: `OK`

- [ ] **Step 14: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 15: Commit**

```bash
git add app/(public)/page.tsx app/(public)/a-propos app/(public)/ressources app/(public)/contact
git commit -m "feat: scaffold shared public routes"
```

## Task 5: Scaffold `Professionnels` routes

**Files:**
- Create: `app/(public)/professionnels/layout.tsx`
- Create: `app/(public)/professionnels/page.tsx`
- Create: `app/(public)/professionnels/produits/page.tsx`
- Create: `app/(public)/professionnels/savoir-faire/page.tsx`
- Create: `app/(public)/professionnels/secteurs-clients/page.tsx`
- Create: `app/(public)/professionnels/certifications/page.tsx`
- Create: `app/(public)/professionnels/contact/page.tsx`

- [ ] **Step 1: Create `app/(public)/professionnels/layout.tsx`**

Use the exact skeleton from `Exact Layout Skeletons`.

- [ ] **Step 2: Create `app/(public)/professionnels/page.tsx`**
- [ ] **Step 3: Create `app/(public)/professionnels/produits/page.tsx`**
- [ ] **Step 4: Create `app/(public)/professionnels/savoir-faire/page.tsx`**
- [ ] **Step 5: Create `app/(public)/professionnels/secteurs-clients/page.tsx`**
- [ ] **Step 6: Create `app/(public)/professionnels/certifications/page.tsx`**
- [ ] **Step 7: Create `app/(public)/professionnels/contact/page.tsx`**

Use the exact title/context values from the placeholder map for each page.

- [ ] **Step 8: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add app/(public)/professionnels
git commit -m "feat: scaffold professionnels route section"
```

## Task 6: Scaffold `Particuliers` routes

**Files:**
- Create: `app/(public)/particuliers/layout.tsx`
- Create: `app/(public)/particuliers/page.tsx`
- Create: `app/(public)/particuliers/boutique/page.tsx`
- Create: `app/(public)/particuliers/recettes-conseils/page.tsx`
- Create: `app/(public)/particuliers/livraison/page.tsx`
- Create: `app/(public)/particuliers/fidelite/page.tsx`

- [ ] **Step 1: Create `app/(public)/particuliers/layout.tsx`**

Use the exact skeleton from `Exact Layout Skeletons`.

- [ ] **Step 2: Create `app/(public)/particuliers/page.tsx`**
- [ ] **Step 3: Create `app/(public)/particuliers/boutique/page.tsx`**
- [ ] **Step 4: Create `app/(public)/particuliers/recettes-conseils/page.tsx`**
- [ ] **Step 5: Create `app/(public)/particuliers/livraison/page.tsx`**
- [ ] **Step 6: Create `app/(public)/particuliers/fidelite/page.tsx`**

Use the exact title/context values from the placeholder map for each page.

- [ ] **Step 7: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add app/(public)/particuliers
git commit -m "feat: scaffold particuliers route section"
```

## Task 7: Scaffold utility and legal routes

**Files:**
- Create: `app/(public)/(utilities)/compte/page.tsx`
- Create: `app/(public)/(utilities)/panier/page.tsx`
- Create: `app/(public)/(utilities)/panier/paiement/page.tsx`
- Create: `app/(public)/(legal)/mentions-legales/page.tsx`
- Create: `app/(public)/(legal)/confidentialite/page.tsx`
- Create: `app/(public)/(legal)/cgv-b2b/page.tsx`
- Create: `app/(public)/(legal)/cgv-b2c/page.tsx`
- Create: `app/(public)/(legal)/plan-du-site/page.tsx`

- [ ] **Step 1: Create `app/(public)/(utilities)/compte/page.tsx`**
- [ ] **Step 2: Create `app/(public)/(utilities)/panier/page.tsx`**
- [ ] **Step 3: Create `app/(public)/(utilities)/panier/paiement/page.tsx`**

Use the exact title/context values from the placeholder map for each utility page.

- [ ] **Step 4: Create `app/(public)/(legal)/mentions-legales/page.tsx`**
- [ ] **Step 5: Create `app/(public)/(legal)/confidentialite/page.tsx`**
- [ ] **Step 6: Create `app/(public)/(legal)/cgv-b2b/page.tsx`**
- [ ] **Step 7: Create `app/(public)/(legal)/cgv-b2c/page.tsx`**
- [ ] **Step 8: Create `app/(public)/(legal)/plan-du-site/page.tsx`**

Use the exact title/context values from the placeholder map for each legal page.

- [ ] **Step 9: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add app/(public)/(utilities) app/(public)/(legal)
git commit -m "feat: scaffold utility and legal routes"
```

## Task 8: Scaffold admin routes

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `app/admin/pages/page.tsx`
- Create: `app/admin/navigation/page.tsx`
- Create: `app/admin/produits/page.tsx`
- Create: `app/admin/commandes/page.tsx`
- Create: `app/admin/clients/page.tsx`
- Create: `app/admin/leads-b2b/page.tsx`
- Create: `app/admin/recettes-blog/page.tsx`
- Create: `app/admin/media/page.tsx`
- Create: `app/admin/trust-content/page.tsx`
- Create: `app/admin/settings/page.tsx`
- Create: `app/admin/users-roles/page.tsx`

- [ ] **Step 1: Create `app/admin/layout.tsx`**

Use the exact skeleton from `Exact Layout Skeletons`.

- [ ] **Step 2: Create `app/admin/page.tsx` for `Admin Dashboard`**
- [ ] **Step 3: Create `app/admin/pages/page.tsx`**
- [ ] **Step 4: Create `app/admin/navigation/page.tsx`**
- [ ] **Step 5: Create `app/admin/produits/page.tsx`**
- [ ] **Step 6: Create `app/admin/commandes/page.tsx`**
- [ ] **Step 7: Create `app/admin/clients/page.tsx`**
- [ ] **Step 8: Create `app/admin/leads-b2b/page.tsx`**
- [ ] **Step 9: Create `app/admin/recettes-blog/page.tsx`**
- [ ] **Step 10: Create `app/admin/media/page.tsx`**
- [ ] **Step 11: Create `app/admin/trust-content/page.tsx`**
- [ ] **Step 12: Create `app/admin/settings/page.tsx`**
- [ ] **Step 13: Create `app/admin/users-roles/page.tsx`**

Use the exact title/context values from the placeholder map for each admin page.

- [ ] **Step 14: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 15: Commit**

```bash
git add app/admin
git commit -m "feat: scaffold admin route section"
```

## Task 9: Verify route coverage and app boot

**Files:**
- Test: scaffolded app
- Test: `docs/ia/routes.md`
- Create: `scripts/verify-routes.cjs`

- [ ] **Step 1: Verify every expected route file exists**

Create `scripts/verify-routes.cjs` with the required file list, then run:

```bash
node scripts/verify-routes.cjs
```

Expected: `OK`

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Start the app**

Run: `npm run dev`
Expected: Next.js starts without route build errors

- [ ] **Step 4: Verify one root public route, one nested public section route, and one admin route render**

Use this exact procedure:

1. Start `npm run dev`
2. Open `http://localhost:3000/`
3. Open `http://localhost:3000/professionnels`
4. Open `http://localhost:3000/admin`

Expected:

- `/` loads
- `/professionnels` loads and shows the public shell plus section wrapper
- `/admin` loads and shows the admin shell

- [ ] **Step 5: Verify route inventory alignment**

Run: `node -e "const fs=require('fs'); const routes=fs.readFileSync('docs/ia/routes.md','utf8'); const checks=['/','/professionnels','/professionnels/produits','/professionnels/savoir-faire','/professionnels/secteurs-clients','/professionnels/certifications','/professionnels/contact','/particuliers','/particuliers/boutique','/particuliers/recettes-conseils','/particuliers/livraison','/particuliers/fidelite','/compte','/panier','/panier/paiement','/a-propos','/a-propos/notre-histoire','/a-propos/terroir-dakhla','/a-propos/engagement-rse','/a-propos/presse-medias','/a-propos/carrieres','/ressources','/ressources/actualites','/ressources/galerie','/ressources/faq','/contact','/mentions-legales','/confidentialite','/cgv-b2b','/cgv-b2c','/plan-du-site','/admin','/admin/pages','/admin/navigation','/admin/produits','/admin/commandes','/admin/clients','/admin/leads-b2b','/admin/recettes-blog','/admin/media','/admin/trust-content','/admin/settings','/admin/users-roles']; const missing=checks.filter(x=>!routes.includes(x)); console.log(missing.length?JSON.stringify(missing):'OK')"`
Expected: `OK`

- [ ] **Step 6: Commit**

```bash
git add app components scripts/verify-routes.cjs README.md
git commit -m "feat: add JRAG route-first Next.js scaffold"
```
