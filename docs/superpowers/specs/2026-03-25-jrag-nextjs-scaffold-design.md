# JRAG Next.js Scaffold Design

Date: 2026-03-25
Status: Approved in conversation, pending written-spec review

## Objective

Scaffold the real JRAG application structure using Next.js App Router so the project has a concrete route tree for the approved public IA and admin back office, while intentionally leaving pages visually minimal and content-light.

The goal is structure only:

- real routes,
- real layouts,
- stock placeholder pages,
- no polished design system yet,
- no real content population yet,
- and no early CMS/data complexity.

## Core Decision

Use `Next.js` with the App Router as the foundation for the JRAG site.

This is the best fit because the project needs:

- many nested routes,
- separate public and admin sections,
- shared and section-specific layouts,
- and a clean path for future animations, micro-interactions, and richer UI without restructuring the app.

## Scaffold Constraints

The scaffold should be created directly in the repository root.

Lock these setup choices for consistency:

- `Next.js`
- App Router
- TypeScript
- root-level `app/` directory, not `src/app/`
- no Tailwind for this phase
- standard ESLint setup
- npm as the package manager

## Scope

This scaffold phase includes:

- bootstrapping a Next.js app,
- creating the public and admin route tree,
- creating minimal layouts for route groups,
- and rendering simple placeholder pages for every approved route.

This scaffold phase does not include:

- real content,
- final visual design,
- advanced motion,
- CMS integration,
- backend integration,
- authentication logic,
- e-commerce logic,
- or production admin functionality.

## Architecture

### Framework

- `Next.js`
- App Router
- TypeScript

### Required root files

The scaffold must include the minimum runnable App Router root structure:

- `app/layout.tsx`
- `app/globals.css`

The home route should be implemented at `app/(public)/page.tsx`.

If Next.js requires other generated root files for a clean scaffold, they may be included, but the app must remain minimal.

### Route philosophy

The route tree should mirror the approved IA as directly as possible so implementation stays aligned with the repo docs in `docs/ia/`.

### Separation of concerns

- public routes live in a public route group
- utility and legal routes stay separated from main discovery areas
- admin routes live under `/admin`
- layouts are shared where appropriate, but pages remain individually addressable

## Proposed App Structure

```text
app/
  layout.tsx
  globals.css
  (public)/
    layout.tsx
    page.tsx
    professionnels/
      layout.tsx
      page.tsx
      produits/page.tsx
      savoir-faire/page.tsx
      secteurs-clients/page.tsx
      certifications/page.tsx
      contact/page.tsx
    particuliers/
      layout.tsx
      page.tsx
      boutique/page.tsx
      recettes-conseils/page.tsx
      livraison/page.tsx
      fidelite/page.tsx
    a-propos/
      page.tsx
      notre-histoire/page.tsx
      terroir-dakhla/page.tsx
      engagement-rse/page.tsx
      presse-medias/page.tsx
      carrieres/page.tsx
    ressources/
      page.tsx
      actualites/page.tsx
      galerie/page.tsx
      faq/page.tsx
    contact/page.tsx
    (utilities)/
      compte/page.tsx
      panier/page.tsx
      panier/paiement/page.tsx
    (legal)/
      mentions-legales/page.tsx
      confidentialite/page.tsx
      cgv-b2b/page.tsx
      cgv-b2c/page.tsx
      plan-du-site/page.tsx
  admin/
    layout.tsx
    page.tsx
    pages/page.tsx
    navigation/page.tsx
    produits/page.tsx
    commandes/page.tsx
    clients/page.tsx
    leads-b2b/page.tsx
    recettes-blog/page.tsx
    media/page.tsx
    trust-content/page.tsx
    settings/page.tsx
    users-roles/page.tsx
```

## Layout Design

### Public layout

The shared public layout should provide only a minimal shell:

- simple header area,
- page container,
- simple footer area,
- no custom brand-heavy styling yet.

It should feel intentionally plain so future design work is not constrained by premature decisions.

### Section layouts

Add nested layouts only where they help preserve future structure:

- `professionnels/layout.tsx`
- `particuliers/layout.tsx`
- `admin/layout.tsx`

Utility and legal routes may inherit the shared public layout through `(public)` and do not need their own dedicated layout in this phase unless required by implementation simplicity.

Each can render a minimal local heading or section wrapper, but should remain visually stock.

### Admin layout

The admin layout should clearly feel separate from the public site structurally, but still stay minimal.

It only needs:

- admin shell wrapper,
- simple navigation list,
- page content area.

No dashboard design or operational widgets are needed yet.

## Page Design Rules

Every scaffolded page should be intentionally minimal.

Each page should contain only:

- page title,
- route or section label if useful,
- and a short placeholder sentence.

Avoid adding:

- production copy,
- fake marketing sections,
- polished cards,
- visual identity decisions,
- or placeholder content that implies final design direction.

The scaffold should communicate only: “this route exists and is ready to be filled later.”

## Reusable Scaffold Components

The scaffold may use a very small shared component layer if it reduces repetition.

Recommended minimal components:

- `PagePlaceholder`
- `SectionLayoutShell`
- `AdminLayoutShell`

These should stay generic and structural, not presentational.

If the implementation can remain cleaner without extracting components immediately, it is acceptable to keep the first pass simple.

## Styling Rules

Use stock styling only.

That means:

- default typography or near-default typography,
- basic spacing,
- minimal borders or dividers only if needed,
- no visual identity work yet,
- no animation layer yet.

The scaffold should be easy to replace later without fighting early styling choices.

## Animation Readiness

Even though this phase is not about visuals, the structure should stay compatible with future motion work.

That means:

- clean nested layouts,
- predictable route boundaries,
- consistent page wrappers,
- and no architecture that would block later page transitions or micro-interaction layers.

## Route Mapping

The scaffold must implement the approved canonical route inventory from `docs/ia/routes.md`, including:

- public shared routes,
- B2B routes,
- B2C routes,
- utility routes,
- legal routes,
- and admin routes.

The route scaffold should not invent extra pages beyond those approved in the IA.

### Acceptance route-to-file map

- `/` -> `app/(public)/page.tsx`
- `/professionnels` -> `app/(public)/professionnels/page.tsx`
- `/professionnels/produits` -> `app/(public)/professionnels/produits/page.tsx`
- `/professionnels/savoir-faire` -> `app/(public)/professionnels/savoir-faire/page.tsx`
- `/professionnels/secteurs-clients` -> `app/(public)/professionnels/secteurs-clients/page.tsx`
- `/professionnels/certifications` -> `app/(public)/professionnels/certifications/page.tsx`
- `/professionnels/contact` -> `app/(public)/professionnels/contact/page.tsx`
- `/particuliers` -> `app/(public)/particuliers/page.tsx`
- `/particuliers/boutique` -> `app/(public)/particuliers/boutique/page.tsx`
- `/particuliers/recettes-conseils` -> `app/(public)/particuliers/recettes-conseils/page.tsx`
- `/particuliers/livraison` -> `app/(public)/particuliers/livraison/page.tsx`
- `/particuliers/fidelite` -> `app/(public)/particuliers/fidelite/page.tsx`
- `/compte` -> `app/(public)/(utilities)/compte/page.tsx`
- `/panier` -> `app/(public)/(utilities)/panier/page.tsx`
- `/panier/paiement` -> `app/(public)/(utilities)/panier/paiement/page.tsx`
- `/a-propos` -> `app/(public)/a-propos/page.tsx`
- `/a-propos/notre-histoire` -> `app/(public)/a-propos/notre-histoire/page.tsx`
- `/a-propos/terroir-dakhla` -> `app/(public)/a-propos/terroir-dakhla/page.tsx`
- `/a-propos/engagement-rse` -> `app/(public)/a-propos/engagement-rse/page.tsx`
- `/a-propos/presse-medias` -> `app/(public)/a-propos/presse-medias/page.tsx`
- `/a-propos/carrieres` -> `app/(public)/a-propos/carrieres/page.tsx`
- `/ressources` -> `app/(public)/ressources/page.tsx`
- `/ressources/actualites` -> `app/(public)/ressources/actualites/page.tsx`
- `/ressources/galerie` -> `app/(public)/ressources/galerie/page.tsx`
- `/ressources/faq` -> `app/(public)/ressources/faq/page.tsx`
- `/contact` -> `app/(public)/contact/page.tsx`
- `/mentions-legales` -> `app/(public)/(legal)/mentions-legales/page.tsx`
- `/confidentialite` -> `app/(public)/(legal)/confidentialite/page.tsx`
- `/cgv-b2b` -> `app/(public)/(legal)/cgv-b2b/page.tsx`
- `/cgv-b2c` -> `app/(public)/(legal)/cgv-b2c/page.tsx`
- `/plan-du-site` -> `app/(public)/(legal)/plan-du-site/page.tsx`
- `/admin` -> `app/admin/page.tsx`
- `/admin/pages` -> `app/admin/pages/page.tsx`
- `/admin/navigation` -> `app/admin/navigation/page.tsx`
- `/admin/produits` -> `app/admin/produits/page.tsx`
- `/admin/commandes` -> `app/admin/commandes/page.tsx`
- `/admin/clients` -> `app/admin/clients/page.tsx`
- `/admin/leads-b2b` -> `app/admin/leads-b2b/page.tsx`
- `/admin/recettes-blog` -> `app/admin/recettes-blog/page.tsx`
- `/admin/media` -> `app/admin/media/page.tsx`
- `/admin/trust-content` -> `app/admin/trust-content/page.tsx`
- `/admin/settings` -> `app/admin/settings/page.tsx`
- `/admin/users-roles` -> `app/admin/users-roles/page.tsx`

## Verification

Before calling the scaffold complete, verify:

- Next.js app installs successfully with npm,
- `npm run dev` starts successfully,
- every approved route has a concrete page file,
- public and admin routes render,
- layouts nest correctly,
- and no route is missing from the approved IA inventory.

Recommended verification steps:

- install dependencies
- run `npm run lint` if included by the scaffold
- run `npm run dev`
- verify the route-to-file map against `docs/ia/routes.md`

## Out of Scope

This phase does not implement:

- design polish,
- final navigation behavior,
- responsive UI refinement,
- authentication,
- order flows,
- CMS wiring,
- product data,
- content entry,
- or admin business logic.

Those belong to later phases.
