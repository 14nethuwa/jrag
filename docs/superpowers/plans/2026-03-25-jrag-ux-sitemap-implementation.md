# JRAG UX Sitemap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved JRAG UX sitemap and separate full back-office admin architecture into implementation-ready IA artifacts that design, content, and frontend work can use without ambiguity.

**Architecture:** The repo currently has no application code, so implementation starts with an artifact-first IA package. The approved spec remains the source of truth; this plan creates derived documentation for public navigation, audience journeys, routes, page briefs, admin architecture, QA, and an implementation-facing Mermaid diagram.

**Tech Stack:** Markdown, Mermaid, JSON

---

## File Structure

### Source of truth already approved

- Existing: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md` - approved UX sitemap and admin spec
- Existing: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap.mmd` - approved sitemap diagram

### Files to create

- Create: `docs/ia/navigation-schema.json` - global nav, audience-local nav, footer groups, utilities, admin separation rules
- Create: `docs/ia/routes.md` - route inventory with slugs, audience labels, and route roles
- Create: `docs/ia/page-briefs.md` - purpose, outcome, and must-have content for every public and admin page
- Create: `docs/ia/homepage-structure.md` - exact shared homepage section logic
- Create: `docs/ia/landing-pages.md` - exact `Professionnels` and `Particuliers` landing-page logic
- Create: `docs/ia/admin-architecture.md` - admin areas, scope boundaries, and access rules
- Create: `docs/ia/implementation-checklist.md` - implementation QA checklist for content and frontend teams
- Create: `docs/ia/public-sitemap-derived.mmd` - derived public Mermaid sitemap aligned with the public route inventory
- Create: `docs/ia/admin-sitemap.mmd` - derived admin Mermaid diagram aligned with the admin route inventory

### Files to modify

- None. Do not edit the approved spec artifacts during implementation planning.

## Task 1: Create the navigation schema

**Files:**
- Create: `docs/ia/navigation-schema.json`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing validation checklist**

Required JSON shape:

```json
{
  "global": [],
  "audiences": {
    "professionnels": { "local": [] },
    "particuliers": { "local": [] }
  },
  "utilities": [],
  "checkout": [],
  "admin": {},
  "footer": {}
}
```

Required content:

- global nav must be `Accueil`, `Professionnels`, `Particuliers`, `A propos`, `Ressources`, `Contact`
- `professionnels.local` must be `Produits`, `Savoir-faire`, `Secteurs / Clients`, `Certifications`, `Contact Pro`
- `particuliers.local` must be `Boutique`, `Recettes & Conseils`, `Livraison`, `Programme Fidelite`
- utility nav must be `Mon Compte` and `Panier`
- checkout must treat `Paiement` as checkout-only
- admin must be modeled as separate, protected, and not publicly linked
- footer groups must include all approved shared, audience, utility, and legal links

- [ ] **Step 2: Verify the schema file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/navigation-schema.json').exists())"`
Expected: `False`

- [ ] **Step 3: Write the navigation schema**

Create `docs/ia/navigation-schema.json` with this exact content:

```json
{
  "global": [
    "Accueil",
    "Professionnels",
    "Particuliers",
    "A propos",
    "Ressources",
    "Contact"
  ],
  "audiences": {
    "professionnels": {
      "local": [
        "Produits",
        "Savoir-faire",
        "Secteurs / Clients",
        "Certifications",
        "Contact Pro"
      ]
    },
    "particuliers": {
      "local": [
        "Boutique",
        "Recettes & Conseils",
        "Livraison",
        "Programme Fidelite"
      ]
    }
  },
  "utilities": [
    "Mon Compte",
    "Panier"
  ],
  "checkout": [
    "Paiement"
  ],
  "admin": {
    "entry": "/admin",
    "publicly_linked": false,
    "sections": [
      "Dashboard",
      "Pages",
      "Navigation",
      "Produits",
      "Commandes",
      "Clients",
      "Leads B2B",
      "Recettes & Blog",
      "Media",
      "Trust Content",
      "Settings",
      "Users / Roles"
    ]
  },
  "footer": {
    "Professionnels": [
      "Produits",
      "Savoir-faire",
      "Secteurs / Clients",
      "Certifications",
      "Contact Pro"
    ],
    "Particuliers": [
      "Boutique",
      "Recettes & Conseils",
      "Livraison",
      "Programme Fidelite"
    ],
    "A propos": [
      "Notre histoire",
      "Terroir Dakhla",
      "Engagement RSE",
      "Presse & Medias",
      "Carrieres"
    ],
    "Ressources": [
      "Actualites / Blog",
      "Galerie Photos / Videos",
      "FAQ"
    ],
    "Utilities": [
      "Mon Compte",
      "Panier",
      "Paiement",
      "Mentions legales",
      "Confidentialite",
      "CGV B2B",
      "CGV B2C",
      "Plan du site"
    ]
  }
}
```

- [ ] **Step 4: Validate the JSON parses cleanly**

Run: `python -c "import json, pathlib; json.loads(pathlib.Path('docs/ia/navigation-schema.json').read_text(encoding='utf-8')); print('OK')"`
Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add docs/ia/navigation-schema.json
git commit -m "docs: add JRAG navigation schema"
```

## Task 2: Define implementation-ready routes

**Files:**
- Create: `docs/ia/routes.md`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing route inventory checklist**

Each route entry must include:

- label
- slug
- parent
- audience type (`shared`, `b2b`, `b2c`, `utility`, `legal`, `admin`)
- route role (`page` or `checkout-subflow`)

- [ ] **Step 1b: Lock the landing-page naming rule**

Use this rule everywhere in the derived artifacts:

- `Professionnels` is both the top-level nav label and the canonical B2B landing page.
- `Particuliers` is both the top-level nav label and the canonical B2C landing page.
- The spec labels `Landing Professionnels` and `Landing Particuliers` are treated as descriptive names for those canonical pages, not separate route nodes.

- [ ] **Step 2: Verify the route file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/routes.md').exists())"`
Expected: `False`

- [ ] **Step 3: Write the route inventory**

Create `docs/ia/routes.md` with this exact table:

```md
| Label | Slug | Parent | Audience | Role |
|---|---|---|---|---|
| Accueil | / | root | shared | page |
| Professionnels | /professionnels | Accueil | b2b | page |
| Produits | /professionnels/produits | Professionnels | b2b | page |
| Savoir-faire | /professionnels/savoir-faire | Professionnels | b2b | page |
| Secteurs / Clients | /professionnels/secteurs-clients | Professionnels | b2b | page |
| Certifications | /professionnels/certifications | Professionnels | b2b | page |
| Contact Pro | /professionnels/contact | Professionnels | b2b | page |
| Particuliers | /particuliers | Accueil | b2c | page |
| Boutique | /particuliers/boutique | Particuliers | b2c | page |
| Recettes & Conseils | /particuliers/recettes-conseils | Particuliers | b2c | page |
| Livraison | /particuliers/livraison | Particuliers | b2c | page |
| Programme Fidelite | /particuliers/fidelite | Particuliers | b2c | page |
| Mon Compte | /compte | utility | utility | page |
| Panier | /panier | utility | utility | page |
| Paiement | /panier/paiement | Panier | utility | checkout-subflow |
| Admin Dashboard | /admin | root | admin | page |
| Pages | /admin/pages | Admin Dashboard | admin | page |
| Navigation | /admin/navigation | Admin Dashboard | admin | page |
| Produits | /admin/produits | Admin Dashboard | admin | page |
| Commandes | /admin/commandes | Admin Dashboard | admin | page |
| Clients | /admin/clients | Admin Dashboard | admin | page |
| Leads B2B | /admin/leads-b2b | Admin Dashboard | admin | page |
| Recettes & Blog | /admin/recettes-blog | Admin Dashboard | admin | page |
| Media | /admin/media | Admin Dashboard | admin | page |
| Trust Content | /admin/trust-content | Admin Dashboard | admin | page |
| Settings | /admin/settings | Admin Dashboard | admin | page |
| Users / Roles | /admin/users-roles | Admin Dashboard | admin | page |
| A propos | /a-propos | Accueil | shared | page |
| Notre histoire | /a-propos/notre-histoire | A propos | shared | page |
| Terroir Dakhla | /a-propos/terroir-dakhla | A propos | shared | page |
| Engagement RSE | /a-propos/engagement-rse | A propos | shared | page |
| Presse & Medias | /a-propos/presse-medias | A propos | shared | page |
| Carrieres | /a-propos/carrieres | A propos | shared | page |
| Ressources | /ressources | Accueil | shared | page |
| Actualites / Blog | /ressources/actualites | Ressources | shared | page |
| Galerie Photos / Videos | /ressources/galerie | Ressources | shared | page |
| FAQ | /ressources/faq | Ressources | shared | page |
| Contact | /contact | Accueil | shared | page |
| Mentions legales | /mentions-legales | root | legal | page |
| Confidentialite | /confidentialite | root | legal | page |
| CGV B2B | /cgv-b2b | root | legal | page |
| CGV B2C | /cgv-b2c | root | legal | page |
| Plan du site | /plan-du-site | root | legal | page |
```

- [ ] **Step 4: Verify all approved labels are present**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/routes.md').read_text(encoding='utf-8'); required=['Accueil','Professionnels','Produits','Savoir-faire','Secteurs / Clients','Certifications','Contact Pro','Particuliers','Boutique','Recettes & Conseils','Livraison','Programme Fidelite','Mon Compte','Panier','Paiement','Admin Dashboard','Pages','Navigation','Produits','Commandes','Clients','Leads B2B','Recettes & Blog','Media','Trust Content','Settings','Users / Roles','A propos','Notre histoire','Terroir Dakhla','Engagement RSE','Presse & Medias','Carrieres','Ressources','Actualites / Blog','Galerie Photos / Videos','FAQ','Contact','Mentions legales','Confidentialite','CGV B2B','CGV B2C','Plan du site']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add docs/ia/routes.md
git commit -m "docs: define JRAG route inventory"
```

## Task 3: Write page briefs for every sitemap node

**Files:**
- Create: `docs/ia/page-briefs.md`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing brief checklist**

Every page brief must include:

- page name
- audience
- purpose
- primary outcome
- must-have content

- [ ] **Step 1b: Lock the page-brief naming rule**

Use scoped headings in `docs/ia/page-briefs.md` to avoid duplicate-label ambiguity.

Required heading format:

- `## Produits (B2B)` for the public professional page
- `## Produits (Admin)` for the admin management area
- apply the same rule wherever a public and admin label would otherwise collide

- [ ] **Step 2: Verify the page briefs file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/page-briefs.md').exists())"`
Expected: `False`

- [ ] **Step 3: Write briefs for all public section-entry pages**

Add briefs for `Accueil`, `Professionnels`, `Particuliers`, `A propos`, `Ressources`, and `Contact`.

- [ ] **Step 4: Write briefs for all B2B and B2C child pages**

Add briefs for `Produits`, `Savoir-faire`, `Secteurs / Clients`, `Certifications`, `Contact Pro`, `Boutique`, `Recettes & Conseils`, `Livraison`, `Programme Fidelite`, `Mon Compte`, `Panier`, and `Paiement`.

- [ ] **Step 5: Write briefs for all shared-story, editorial, and legal pages**

Add briefs for `Notre histoire`, `Terroir Dakhla`, `Engagement RSE`, `Presse & Medias`, `Carrieres`, `Actualites / Blog`, `Galerie Photos / Videos`, `FAQ`, `Mentions legales`, `Confidentialite`, `CGV B2B`, `CGV B2C`, and `Plan du site`.

- [ ] **Step 6: Write briefs for all admin pages**

Add briefs for `Admin Dashboard`, `Pages`, `Navigation`, `Produits`, `Commandes`, `Clients`, `Leads B2B`, `Recettes & Blog`, `Media`, `Trust Content`, `Settings`, and `Users / Roles`.

- [ ] **Step 7: Use these exact purpose and outcome expectations**

Write the briefs so they match these approved meanings:

- `Accueil`: purpose `Introduce the brand, build trust, and route users into B2B or B2C.` outcome `Push users into Professionnels or Particuliers.`
- `A propos`: purpose `Present JRAG identity, story, origin, and corporate credibility.` outcome `Deepen brand trust.`
- `Notre histoire`: purpose `Explain the company narrative and legacy.` outcome `Strengthen emotional trust.`
- `Terroir Dakhla`: purpose `Communicate place, origin, and product storytelling.` outcome `Reinforce premium differentiation.`
- `Engagement RSE`: purpose `Demonstrate environmental and social commitments.` outcome `Support reputation and trust.`
- `Presse & Medias`: purpose `Support media credibility and external communications.` outcome `Provide press-ready information.`
- `Carrieres`: purpose `Support recruitment and employer branding.` outcome `Drive applications or interest.`
- `Ressources`: purpose `Group informational and editorial support content.` outcome `Help users discover useful information.`
- `Actualites / Blog`: purpose `Publish updates, news, and editorial content.` outcome `Drive repeat visits and brand freshness.`
- `Galerie Photos / Videos`: purpose `Showcase brand, products, and operational visuals.` outcome `Increase confidence through visuals.`
- `FAQ`: purpose `Answer common questions and reduce support friction.` outcome `Reduce confusion before contact or purchase.`
- `Contact`: purpose `Handle general inquiries and direct users to the right channel.` outcome `Route non-sales questions correctly.`
- `Professionnels`: purpose `Orient professional buyers and move them toward evaluation or contact.` outcome `Push buyers into B2B evaluation flow.`
- `Produits`: purpose `Present the professional product offer and buying relevance.` outcome `Move users deeper into evaluation or toward Contact Pro.`
- `Savoir-faire`: purpose `Show operational expertise, handling, and product quality process.` outcome `Build operational trust.`
- `Secteurs / Clients`: purpose `Prove market fit through target sectors, references, or client types.` outcome `Show commercial relevance.`
- `Certifications`: purpose `Provide formal trust signals for professional evaluation.` outcome `Support buyer validation.`
- `Contact Pro`: purpose `Convert professional interest into lead capture or direct discussion.` outcome `Generate a qualified B2B lead.`
- `Particuliers`: purpose `Orient consumers toward shopping and reassure them on quality and service.` outcome `Push users into boutique or recipe discovery.`
- `Boutique`: purpose `Support product discovery and purchase.` outcome `Drive add-to-cart behavior.`
- `Recettes & Conseils`: purpose `Inspire product usage and support discovery.` outcome `Move users toward products or return visits.`
- `Livraison`: purpose `Answer fulfillment and shipping questions.` outcome `Reduce hesitation before checkout.`
- `Programme Fidelite`: purpose `Explain repeat-purchase benefits.` outcome `Increase account creation or repeat intent.`
- `Mon Compte`: purpose `Manage customer identity, orders, and saved preferences.` outcome `Support account self-service.`
- `Panier`: purpose `Review selected products before checkout.` outcome `Advance users into paiement.`
- `Paiement`: purpose `Complete purchase with minimal friction.` outcome `Finish checkout successfully.`
- `Mentions legales`: purpose `Provide required legal site information.` outcome `Meet compliance needs.`
- `Confidentialite`: purpose `Explain privacy and data handling.` outcome `Meet privacy expectations and compliance.`
- `CGV B2B`: purpose `Present professional sales terms.` outcome `Support legal clarity for B2B users.`
- `CGV B2C`: purpose `Present consumer sales terms.` outcome `Support legal clarity for B2C users.`
- `Plan du site`: purpose `Expose the full site structure.` outcome `Support navigation and indexing clarity.`
- `Admin Dashboard`: purpose `Provide operational overview, key metrics, and shortcuts.` outcome `Let admins access the right workflow quickly.`
- `Pages`: purpose `Manage shared, B2B, and B2C page content.` outcome `Enable CMS updates.`
- `Navigation`: purpose `Manage global, local, and footer navigation.` outcome `Keep site IA editable.`
- `Produits`: purpose `Manage product catalog and product visibility.` outcome `Support catalog operations.`
- `Commandes`: purpose `Manage order state, payment state, and fulfillment.` outcome `Support commerce operations.`
- `Clients`: purpose `Manage customer records and account support.` outcome `Support service operations.`
- `Leads B2B`: purpose `Manage professional inquiries and lead follow-up.` outcome `Support B2B pipeline handling.`
- `Recettes & Blog`: purpose `Manage editorial publishing workflows.` outcome `Support content operations.`
- `Media`: purpose `Manage uploaded assets.` outcome `Support reusable media control.`
- `Trust Content`: purpose `Manage certifications, reassurance blocks, and trust signals.` outcome `Keep trust content current.`
- `Settings`: purpose `Manage site-wide settings, legal content, and contact details.` outcome `Support centralized configuration.`
- `Users / Roles`: purpose `Manage authentication, permissions, and admin access.` outcome `Keep back-office access controlled.`

- [ ] **Step 7a: Use this exact page-brief template for every page**

Use this exact structure for every section in `docs/ia/page-briefs.md`:

```md
## <Page Name> (<Audience>)

- Audience: <Shared | B2B | B2C | Utility | Legal | Admin>
- Purpose: <Exact purpose from the plan>
- Primary outcome: <Exact outcome from the plan>
- Must-have content:
  - <bullet 1>
  - <bullet 2>
  - <bullet 3>
  - <bullet 4>
```

- [ ] **Step 7b: Use these exact must-have content bullets for key pages**

Required must-have content:

- `Accueil`: `brand proposition`, `dual audience CTA`, `trust signals`, `story teaser`
- `Professionnels`: `B2B value proposition`, `route to produits and savoir-faire`, `proof highlights`, `contact-pro CTA`
- `Particuliers`: `consumer value proposition`, `route to boutique`, `delivery reassurance`, `recipe or inspiration entry`
- `Contact Pro`: `lead form`, `business inquiry fields`, `reassurance on response`, `secondary contact method`
- `Boutique`: `product listing or categories`, `filters or discovery aids`, `pricing or purchase cues`, `add-to-cart entry`
- `Panier`: `selected products`, `quantity controls`, `price summary`, `continue-to-paiement CTA`
- `Paiement`: `checkout form`, `payment method step`, `order summary`, `confirmation CTA`
- `Admin Dashboard`: `high-level KPIs`, `recent activity`, `quick links`, `operational alerts`
- `Pages`: `page list`, `edit action`, `publish status`, `content ownership markers`
- `Navigation`: `global nav config`, `local nav config`, `footer config`, `ordering controls`
- `Produits`: `catalog list`, `create/edit controls`, `category assignment`, `visibility controls`
- `Commandes`: `order list`, `payment status`, `fulfillment status`, `order detail access`
- `Clients`: `customer list`, `account detail access`, `order history reference`, `support notes or status`
- `Leads B2B`: `lead list`, `contact details`, `lead status`, `follow-up action`
- `Recettes & Blog`: `entry list`, `editorial status`, `publish controls`, `category or tag controls`
- `Media`: `asset library`, `upload action`, `search/filter tools`, `usage or metadata info`
- `Trust Content`: `certification entries`, `reassurance blocks`, `proof module controls`, `visibility or reuse settings`
- `Settings`: `site-wide settings`, `contact details`, `legal content controls`, `configuration actions`
- `Users / Roles`: `user list`, `role assignments`, `permission controls`, `access management actions`

- [ ] **Step 7c: Use these exact must-have content bullets for the remaining pages**

Required must-have content:

- `A propos`: `brand narrative overview`, `links to story pages`, `trust framing`, `shared-brand context`
- `Notre histoire`: `timeline or origin story`, `founding context`, `brand evolution`, `trust or identity cue`
- `Terroir Dakhla`: `place narrative`, `origin proof`, `environmental context`, `product-story connection`
- `Engagement RSE`: `commitment summary`, `environmental actions`, `social actions`, `proof or reporting cue`
- `Presse & Medias`: `media-ready overview`, `press assets or references`, `contact path`, `credibility markers`
- `Carrieres`: `employer-value message`, `open roles or inquiry path`, `culture or mission`, `application CTA`
- `Ressources`: `resource overview`, `entry points to blog and FAQ`, `gallery access`, `supportive discovery cue`
- `Actualites / Blog`: `article list`, `category or tag structure`, `featured post`, `article CTA`
- `Galerie Photos / Videos`: `media grid`, `category or grouping`, `visual captions or context`, `brand-proof effect`
- `FAQ`: `question groups`, `clear answers`, `contact fallback`, `support reassurance`
- `Contact`: `general inquiry form`, `contact details`, `routing guidance`, `response expectation`
- `Savoir-faire`: `process explanation`, `quality-handling proof`, `traceability cue`, `related CTA`
- `Secteurs / Clients`: `target sectors`, `reference types`, `commercial relevance proof`, `next-step CTA`
- `Certifications`: `certification list`, `proof details`, `relevance explanation`, `trust CTA or contact path`
- `Recettes & Conseils`: `recipe or advice list`, `content categories`, `product links`, `editorial CTA`
- `Livraison`: `delivery zones or terms`, `timing expectations`, `reassurance content`, `support path`
- `Programme Fidelite`: `benefit summary`, `how it works`, `account/signup CTA`, `repeat-purchase incentive`
- `Mon Compte`: `profile access`, `order history`, `saved preferences`, `account actions`
- `Mentions legales`: `legal entity details`, `site ownership`, `required disclosures`, `compliance completeness`
- `Confidentialite`: `data handling summary`, `rights information`, `cookie/privacy details`, `contact path`
- `CGV B2B`: `professional terms sections`, `commercial conditions`, `legal applicability`, `download or read access`
- `CGV B2C`: `consumer terms sections`, `purchase conditions`, `legal applicability`, `download or read access`
- `Plan du site`: `top-level sections`, `subpage links`, `public structure clarity`, `navigation utility`

- [ ] **Step 8: Verify all page briefs are present**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/page-briefs.md').read_text(encoding='utf-8'); required=['## Accueil (Shared)','## Professionnels (B2B)','## Particuliers (B2C)','## A propos (Shared)','## Ressources (Shared)','## Contact (Shared)','## Produits (B2B)','## Savoir-faire (B2B)','## Secteurs / Clients (B2B)','## Certifications (B2B)','## Contact Pro (B2B)','## Boutique (B2C)','## Recettes & Conseils (B2C)','## Livraison (B2C)','## Programme Fidelite (B2C)','## Mon Compte (Utility)','## Panier (Utility)','## Paiement (Utility)','## Admin Dashboard (Admin)','## Pages (Admin)','## Navigation (Admin)','## Produits (Admin)','## Commandes (Admin)','## Clients (Admin)','## Leads B2B (Admin)','## Recettes & Blog (Admin)','## Media (Admin)','## Trust Content (Admin)','## Settings (Admin)','## Users / Roles (Admin)','## Notre histoire (Shared)','## Terroir Dakhla (Shared)','## Engagement RSE (Shared)','## Presse & Medias (Shared)','## Carrieres (Shared)','## Actualites / Blog (Shared)','## Galerie Photos / Videos (Shared)','## FAQ (Shared)','## Mentions legales (Legal)','## Confidentialite (Legal)','## CGV B2B (Legal)','## CGV B2C (Legal)','## Plan du site (Legal)']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 9: Commit**

```bash
git add docs/ia/page-briefs.md
git commit -m "docs: add JRAG page briefs"
```

## Task 4: Define the homepage structure

**Files:**
- Create: `docs/ia/homepage-structure.md`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing homepage checklist**

The homepage document must include these sections in this exact order:

1. `Hero`
2. `Why JRAG`
3. `Featured products / categories`
4. `Terroir / Storytelling`
5. `Choose your path`
6. `Trust signals`
7. `Editorial discovery`
8. `Footer`

- [ ] **Step 2: Verify the homepage file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/homepage-structure.md').exists())"`
Expected: `False`

- [ ] **Step 3: Write the homepage structure**

For each section, include:

- purpose
- target audience impact
- primary CTA or interaction

Use these exact purpose notes:

- `Hero`: establish the brand proposition and present two audience CTAs
- `Why JRAG`: build trust around quality, origin, and expertise
- `Featured products / categories`: create product interest without replacing the full catalog
- `Terroir / Storytelling`: reinforce origin and emotional brand identity
- `Choose your path`: re-offer the B2B/B2C split for undecided users
- `Trust signals`: surface certifications, quality proof, clients, or reassurance
- `Editorial discovery`: expose recipes, blog, or featured content
- `Footer`: expose the full shared architecture and legal links

- [ ] **Step 4: Verify the homepage file includes all approved headings**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/homepage-structure.md').read_text(encoding='utf-8'); required=['Hero','Why JRAG','Featured products / categories','Terroir / Storytelling','Choose your path','Trust signals','Editorial discovery','Footer']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add docs/ia/homepage-structure.md
git commit -m "docs: define JRAG homepage structure"
```

## Task 5: Define the audience landing-page structures

**Files:**
- Create: `docs/ia/landing-pages.md`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing landing-page checklist**

The landing-page document must include:

- one `Professionnels` section list
- one `Particuliers` section list
- purpose, must-have content, and CTA behavior for every section

- [ ] **Step 2: Verify the landing-page file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/landing-pages.md').exists())"`
Expected: `False`

- [ ] **Step 3: Write the `Professionnels` landing-page structure**

Use this exact section order and notes:

- `Hero`: B2B supply proposition for restaurants, hotels, wholesalers, export
- `Offer overview`: product families, formats, offer clarity
- `Savoir-faire`: sourcing, handling, purification, traceability
- `Proof`: certifications, sectors served, references or client types
- `Operational reassurance`: logistics, consistency, quality process
- `Conversion CTA block`: quote request, visit, test product, or direct pro contact

- [ ] **Step 4: Write the `Particuliers` landing-page structure**

Use this exact section order and notes:

- `Hero`: premium seafood proposition for consumers
- `Shop entry`: featured categories and route into boutique
- `Reassurance`: freshness, delivery, payment, service trust
- `Inspiration`: recipes and usage ideas
- `Loyalty / account value`: repeat-purchase and account benefits
- `Conversion CTA block`: shop now, create account, or discover categories

- [ ] **Step 5: Add implementation fields to every section**

For each section in both journeys, include:

- purpose
- must-have content
- CTA behavior

- [ ] **Step 6: Verify both audience journeys include all required headings**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/landing-pages.md').read_text(encoding='utf-8'); required=['## Professionnels','Hero','Offer overview','Savoir-faire','Proof','Operational reassurance','Conversion CTA block','## Particuliers','Shop entry','Reassurance','Inspiration','Loyalty / account value']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 7: Commit**

```bash
git add docs/ia/landing-pages.md
git commit -m "docs: define JRAG audience landing pages"
```

## Task 6: Define the admin architecture

**Files:**
- Create: `docs/ia/admin-architecture.md`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing admin-document checklist**

The admin document must include:

- protected route rule
- separation from public navigation
- full list of approved admin areas
- scope boundaries for content, commerce, leads, media, and settings
- role/access note

- [ ] **Step 2: Verify the admin architecture file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/admin-architecture.md').exists())"`
Expected: `False`

- [ ] **Step 3: Write the admin access and boundary rules**

Include these exact rules:

- admin is available at a protected route such as `/admin`
- admin is not linked in the public header or footer
- admin is not treated as a public audience path
- admin manages shared, B2B, and B2C operations from one place

- [ ] **Step 4: Write the admin area inventory**

Include these exact areas:

- `Dashboard`
- `Pages`
- `Navigation`
- `Produits`
- `Commandes`
- `Clients`
- `Leads B2B`
- `Recettes & Blog`
- `Media`
- `Trust Content`
- `Settings`
- `Users / Roles`

- [ ] **Step 5: Add role and scope notes**

Document that the admin controls:

- CMS content
- navigation
- catalog
- orders
- customers
- B2B leads
- editorial
- media
- trust content
- settings and permissions

- [ ] **Step 6: Verify the admin architecture file includes all approved admin labels**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/admin-architecture.md').read_text(encoding='utf-8'); required=['/admin','Dashboard','Pages','Navigation','Produits','Commandes','Clients','Leads B2B','Recettes & Blog','Media','Trust Content','Settings','Users / Roles']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 7: Commit**

```bash
git add docs/ia/admin-architecture.md
git commit -m "docs: define JRAG admin architecture"
```

## Task 7: Add the implementation QA checklist

**Files:**
- Create: `docs/ia/implementation-checklist.md`
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`

- [ ] **Step 1: Write the failing checklist outline**

The checklist must include these sections:

- `Navigation`
- `Audience Context`
- `Homepage`
- `Landing Pages`
- `Footer`
- `Legal`
- `Admin`

- [ ] **Step 2: Verify the checklist file does not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/implementation-checklist.md').exists())"`
Expected: `False`

- [ ] **Step 3: Write the `Navigation` and `Audience Context` sections**

Use these exact checklist items:

```md
## Navigation
- [ ] Global nav matches approved schema.
- [ ] Audience-local nav appears only in the relevant journey.
- [ ] `Mon Compte` and `Panier` are available as utilities.
- [ ] `Paiement` appears inside checkout flow rather than primary discovery navigation.

## Audience Context
- [ ] Users can always tell whether they are in `Professionnels` or `Particuliers`.
- [ ] Shared pages remain globally accessible.
- [ ] Switching audiences is explicit and easy.
```

- [ ] **Step 4: Write the `Homepage` and `Landing Pages` sections**

Use these exact checklist items:

```md
## Homepage
- [ ] Homepage includes the 8 approved sections in the right order.
- [ ] Homepage clearly routes users to `Professionnels` and `Particuliers`.
- [ ] Homepage does not try to serve both journeys in full.

## Landing Pages
- [ ] `Professionnels` landing follows the approved section order.
- [ ] `Particuliers` landing follows the approved section order.
- [ ] `Contact Pro` is the primary conversion CTA in the B2B journey.
```

- [ ] **Step 5: Write the `Footer`, `Legal`, and `Admin` sections**

Use these exact checklist items:

```md
## Footer
- [ ] Footer exposes `Professionnels`, `Particuliers`, `A propos`, `Ressources`, and utility groups.
- [ ] Footer links do not conflict with header hierarchy.

## Legal
- [ ] `Mentions legales` exists.
- [ ] `Confidentialite` exists.
- [ ] `CGV B2B` exists.
- [ ] `CGV B2C` exists.
- [ ] `Plan du site` exists.

## Admin
- [ ] Admin is reachable through a protected route such as `/admin`.
- [ ] Admin does not appear in public header or footer navigation.
- [ ] Admin includes all approved management areas.
```

- [ ] **Step 6: Verify the checklist includes all approved QA sections**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/implementation-checklist.md').read_text(encoding='utf-8'); required=['## Navigation','## Audience Context','## Homepage','## Landing Pages','## Footer','## Legal','## Admin']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 7: Commit**

```bash
git add docs/ia/implementation-checklist.md
git commit -m "docs: add JRAG IA implementation checklist"
```

## Task 8: Create the derived Mermaid diagrams

**Files:**
- Create: `docs/ia/public-sitemap-derived.mmd`
- Create: `docs/ia/admin-sitemap.mmd`
- Test: `docs/ia/routes.md`

- [ ] **Step 1: Write the failing Mermaid reconciliation checklist**

The public Mermaid file must include every public approved label. The admin Mermaid file must include every admin approved label.

- [ ] **Step 2: Verify the Mermaid files do not exist yet**

Run: `python -c "from pathlib import Path; print(Path('docs/ia/public-sitemap-derived.mmd').exists(), Path('docs/ia/admin-sitemap.mmd').exists())"`
Expected: `False False`

- [ ] **Step 3: Write the public Mermaid diagram**

Create `docs/ia/public-sitemap-derived.mmd` using only public labels:

- `Accueil`
- `Professionnels`, `Produits`, `Savoir-faire`, `Secteurs / Clients`, `Certifications`, `Contact Pro`
- `Particuliers`, `Boutique`, `Recettes & Conseils`, `Livraison`, `Programme Fidelite`, `Mon Compte`, `Panier`, `Paiement`
- `A propos`, `Notre histoire`, `Terroir Dakhla`, `Engagement RSE`, `Presse & Medias`, `Carrieres`
- `Ressources`, `Actualites / Blog`, `Galerie Photos / Videos`, `FAQ`
- `Contact`
- `Mentions legales`, `Confidentialite`, `CGV B2B`, `CGV B2C`, `Plan du site`

- [ ] **Step 4: Write the admin Mermaid diagram**

Create `docs/ia/admin-sitemap.mmd` using only admin labels:

- `Admin Dashboard`
- `Pages`
- `Navigation`
- `Produits`
- `Commandes`
- `Clients`
- `Leads B2B`
- `Recettes & Blog`
- `Media`
- `Trust Content`
- `Settings`
- `Users / Roles`

- [ ] **Step 5: Verify the public Mermaid diagram includes every required public label**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/public-sitemap-derived.mmd').read_text(encoding='utf-8'); required=['Accueil','Professionnels','Produits','Savoir-faire','Secteurs / Clients','Certifications','Contact Pro','Particuliers','Boutique','Recettes & Conseils','Livraison','Programme Fidelite','Mon Compte','Panier','Paiement','A propos','Notre histoire','Terroir Dakhla','Engagement RSE','Presse & Medias','Carrieres','Ressources','Actualites / Blog','Galerie Photos / Videos','FAQ','Contact','Mentions legales','Confidentialite','CGV B2B','CGV B2C','Plan du site']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

 - [ ] **Step 6: Verify the admin Mermaid diagram includes every required admin label**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/admin-sitemap.mmd').read_text(encoding='utf-8'); required=['Admin Dashboard','Pages','Navigation','Produits','Commandes','Clients','Leads B2B','Recettes & Blog','Media','Trust Content','Settings','Users / Roles']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 7: Commit**

```bash
git add docs/ia/public-sitemap-derived.mmd docs/ia/admin-sitemap.mmd
git commit -m "docs: add derived JRAG sitemap diagrams"
```

## Task 9: Final consistency verification

**Files:**
- Test: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`
- Test: `docs/ia/navigation-schema.json`
- Test: `docs/ia/routes.md`
- Test: `docs/ia/page-briefs.md`
- Test: `docs/ia/homepage-structure.md`
- Test: `docs/ia/landing-pages.md`
- Test: `docs/ia/admin-architecture.md`
- Test: `docs/ia/implementation-checklist.md`
- Test: `docs/ia/public-sitemap-derived.mmd`
- Test: `docs/ia/admin-sitemap.mmd`

- [ ] **Step 1: Verify all planned files exist**

Run: `python -c "from pathlib import Path; files=['docs/ia/navigation-schema.json','docs/ia/routes.md','docs/ia/page-briefs.md','docs/ia/homepage-structure.md','docs/ia/landing-pages.md','docs/ia/admin-architecture.md','docs/ia/implementation-checklist.md','docs/ia/public-sitemap-derived.mmd','docs/ia/admin-sitemap.mmd']; missing=[f for f in files if not Path(f).exists()]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 2: Verify JSON still parses**

Run: `python -c "import json, pathlib; json.loads(pathlib.Path('docs/ia/navigation-schema.json').read_text(encoding='utf-8')); print('OK')"`
Expected: `OK`

- [ ] **Step 3: Verify all approved labels are represented across IA artifacts**

Run: `python -c "from pathlib import Path; files=['docs/ia/routes.md','docs/ia/page-briefs.md','docs/ia/homepage-structure.md','docs/ia/landing-pages.md','docs/ia/admin-architecture.md','docs/ia/implementation-checklist.md','docs/ia/public-sitemap-derived.mmd','docs/ia/admin-sitemap.mmd']; text='\n'.join(Path(f).read_text(encoding='utf-8') for f in files); required=['Accueil','Professionnels','Produits (B2B)','Produits (Admin)','Savoir-faire','Secteurs / Clients','Certifications','Contact Pro','Particuliers','Boutique','Recettes & Conseils','Livraison','Programme Fidelite','Mon Compte','Panier','Paiement','Admin Dashboard','Pages','Navigation','Commandes','Clients','Leads B2B','Recettes & Blog','Media','Trust Content','Settings','Users / Roles','A propos','Notre histoire','Terroir Dakhla','Engagement RSE','Presse & Medias','Carrieres','Ressources','Actualites / Blog','Galerie Photos / Videos','FAQ','Contact','Mentions legales','Confidentialite','CGV B2B','CGV B2C','Plan du site']; missing=[x for x in required if x not in text]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 3c: Verify duplicate-label pages are disambiguated in page briefs**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/page-briefs.md').read_text(encoding='utf-8'); required=['## Produits (B2B)','## Produits (Admin)']; missing=[x for x in required if x not in t]; print(missing or 'OK')"`
Expected: `OK`

- [ ] **Step 3b: Verify admin labels do not appear in the public Mermaid diagram except the `/admin` exclusion note if present**

Run: `python -c "from pathlib import Path; t=Path('docs/ia/public-sitemap-derived.mmd').read_text(encoding='utf-8'); forbidden=['Admin Dashboard','Leads B2B','Users / Roles']; found=[x for x in forbidden if x in t]; print(found or 'OK')"`
Expected: `OK`

- [ ] **Step 4: Review all generated artifacts against the approved spec**

Manual check:

- no page moved out of its approved section
- utility pages remain utilities
- shared storytelling remains outside audience silos
- global nav and local nav rules match the spec
- admin remains outside public navigation
- public and admin Mermaid files each match the correct route subset

- [ ] **Step 5: Commit**

```bash
git add docs/ia
git commit -m "docs: finalize JRAG IA implementation package"
```
