# JRAG UX Sitemap Design

Date: 2026-03-25
Status: Approved in conversation, pending written-spec review

## Objective

Improve the overall UX of the JRAG website by replacing the current flat, org-chart-like sitemap with a clearer information architecture that supports:

- a shared brand homepage,
- strong audience routing for B2B and B2C,
- persistent audience-specific navigation after entry,
- shared storytelling and trust content outside audience silos,
- a separate full back-office admin system for managing the entire site and commerce layer,
- and cleaner separation between discovery pages and functional utility pages.

## Core Decision

The site uses a hybrid model:

- one shared homepage,
- a clear split into `Professionnels` and `Particuliers`,
- and strong segmentation that remains visible after users enter either audience path.

This keeps the site unified as one brand while reducing navigation ambiguity for both user groups.

The public website and the admin system are separate layers:

- the public site serves visitors,
- the admin dashboard manages content, commerce, leads, and settings.

## UX Principles

### 1. Shared home, segmented journeys

The homepage is the common entry point for all users. It should establish the JRAG brand, communicate product quality and origin, and quickly direct users into the right path.

The homepage should not try to fully serve both B2B and B2C in parallel. It acts as a guided router.

### 2. Persistent audience context

Once users enter `Professionnels` or `Particuliers`, the navigation should continue to reflect that context clearly.

This prevents disorientation and helps users understand which journey they are in.

### 3. Shared storytelling lives outside silos

Brand story pages should not live inside the B2B section. Content such as `Notre histoire` and `Terroir Dakhla` serves both audiences and should stay in shared navigation.

This rule applies to storytelling and corporate identity content, not every trust page. Capability and proof pages such as `Savoir-faire` and `Certifications` can remain B2B-prioritized when their primary purpose is supplier evaluation.

### 4. Discovery and transaction are different

Discovery pages like `Boutique`, `Recettes & Conseils`, `Savoir-faire`, and `Certifications` should be treated differently from utility pages like `Mon Compte`, `Panier`, and `Paiement`.

Functional pages exist in the IA but should not dominate primary discovery navigation.

### 5. Global versus local navigation must be explicit

The site should distinguish between:

- global navigation available everywhere,
- audience-local navigation inside `Professionnels` and `Particuliers`,
- and utility navigation for account and checkout actions.

Users should always know whether they are in a shared brand area or inside an audience-specific journey.

### 6. Admin is operational, not navigational

The admin dashboard is not part of the public website IA. It should be treated as a protected back-office system accessible through a dedicated route such as `/admin`.

It must manage the entire website and commerce operation without appearing in the public navigation, footer, or user-facing audience journeys.

## Recommended Top-Level Navigation

- `Accueil`
- `Professionnels`
- `Particuliers`
- `A propos`
- `Ressources`
- `Contact`

This keeps the header focused while allowing the footer to carry the broader architecture.

## Navigation Rules

### Global header

The global header should expose:

- `Accueil`
- `Professionnels`
- `Particuliers`
- `A propos`
- `Ressources`
- `Contact`
- utility icons or links for `Mon Compte` and `Panier`

### Audience-local navigation

Inside `Professionnels`, local navigation should emphasize:

- `Produits`
- `Savoir-faire`
- `Secteurs / Clients`
- `Certifications`
- `Contact Pro`

Inside `Particuliers`, local navigation should emphasize:

- `Boutique`
- `Recettes & Conseils`
- `Livraison`
- `Programme Fidelite`

### Utility navigation

`Mon Compte`, `Panier`, and `Paiement` are utility destinations.

- `Mon Compte` and `Panier` should be globally reachable through header utilities.
- `Paiement` should primarily appear inside the checkout flow.
- These pages belong to the B2C ecosystem but should not be emphasized as top-level discovery destinations in the main navigation.

## Audience Context Behavior

To preserve audience context after entry:

- users who choose `Professionnels` should continue seeing pro-oriented local links and CTAs,
- users who choose `Particuliers` should continue seeing consumer-oriented local links and CTAs,
- shared pages such as `A propos` and `Ressources` should remain reachable globally without breaking the site-wide structure,
- and switching between `Professionnels` and `Particuliers` should be possible via explicit header links rather than hidden redirects.

Shared pages should feel global, but the header should still make the two audience paths visible so users can re-enter the correct journey easily.

## Admin Architecture

The site should include a separate full back-office admin dashboard.

### Admin access

- The admin lives at a protected route such as `/admin`.
- It is not linked from the public header, footer, or public sitemap navigation.
- It should require authentication and role-based access.

### Admin purpose

The admin is a shared control layer used to manage:

- shared brand content,
- B2B content,
- B2C content,
- commerce operations,
- leads and contacts,
- and global site settings.

### Recommended admin areas

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

### Admin area ownership rules

- `Pages` manages page-body content for shared, B2B, and B2C pages.
- `Navigation` manages global navigation, audience-local navigation, and footer menu structures.
- `Recettes & Blog` manages editorial entries such as recipes, blog posts, and article-style content.
- `Media` manages uploaded visual and file assets used across the site.
- `Trust Content` manages reusable reassurance content such as certifications, delivery reassurance blocks, proof modules, and structured trust components.

### Admin entity boundaries

- `Clients` means customer records and customer-related operational data.
- `Leads B2B` means prospect and inquiry records for professional sales follow-up.
- `Users / Roles` means internal back-office staff accounts and permissions only.

### Admin UX rules

- public users should never browse into admin during normal site use,
- admin should not be treated as a third audience path,
- and one shared back office should manage both audience experiences and all shared content.

## Public Sitemap

### Accueil

- `Accueil`

### Professionnels

- `Landing Professionnels`
- `Produits`
- `Savoir-faire`
- `Secteurs / Clients`
- `Certifications`
- `Contact Pro`

### Particuliers

- `Landing Particuliers`
- `Boutique`
- `Recettes & Conseils`
- `Livraison`
- `Programme Fidelite`
- `Mon Compte`
- `Panier / Paiement`

### A propos

- `Notre histoire`
- `Terroir Dakhla`
- `Engagement RSE`
- `Presse & Medias`
- `Carrieres`

### Ressources

- `Actualites / Blog`
- `Galerie Photos / Videos`
- `FAQ`

### Contact

- `Contact`

### Pages legales

- `Mentions legales`
- `Confidentialite`
- `CGV B2B`
- `CGV B2C`
- `Plan du site`

The admin dashboard is intentionally excluded from the public sitemap because it is not part of the visitor-facing navigation model.

## Homepage Structure

Recommended homepage section order:

1. `Hero` with a clear brand proposition and two strong audience CTAs
2. `Why JRAG` trust/value section
3. `Featured products / categories`
4. `Terroir / Storytelling`
5. `Choose your path` audience routing section
6. `Trust signals`
7. `Editorial discovery`
8. `Footer`

The homepage has three jobs:

- establish trust,
- explain the brand,
- route users to the right audience journey.

It does not expose the admin dashboard as part of the public journey.

## Contact Architecture

The site should use two different contact intents:

- `Contact` is a general brand-level contact page for broad inquiries.
- `Contact Pro` is the dedicated B2B conversion endpoint for quote requests, supply discussions, visits, or product testing.

When the user is in the `Professionnels` journey, `Contact Pro` should be the primary CTA. The top-level `Contact` page remains useful for general inquiries, partnerships, media, or non-sales communication.

Administrative management of contact requests, B2B leads, and general inquiries happens inside the admin dashboard rather than in the public IA.

## Audience Landing Page Logic

### Professionnels landing page

Purpose:

- communicate supply capability,
- build trust with buyers,
- show operational credibility,
- and move users toward `Contact Pro`.

Recommended section order:

1. Hero with B2B supply proposition
2. Offer overview
3. Savoir-faire
4. Proof: certifications, sectors, clients
5. Operational reassurance
6. Conversion CTA block

### Particuliers landing page

Purpose:

- introduce the consumer offer,
- reduce friction around buying,
- build confidence around quality and delivery,
- and route users into shopping or recipe discovery.

Recommended section order:

1. Hero with premium consumer proposition
2. Shop entry
3. Reassurance around freshness, delivery, payment, service
4. Inspiration via recipes and advice
5. Loyalty/account value
6. Conversion CTA block

## Footer Structure

Recommended footer groups:

- `Professionnels`: Produits, Savoir-faire, Secteurs / Clients, Certifications, Contact Pro
- `Particuliers`: Boutique, Recettes & Conseils, Livraison, Programme Fidelite
- `A propos`: Notre histoire, Terroir Dakhla, Engagement RSE, Presse & Medias, Carrieres
- `Ressources`: Actualites / Blog, Galerie, FAQ
- `Utilities`: Mon Compte, Panier, Paiement, Mentions legales, Confidentialite, CGV B2B, CGV B2C, Plan du site

The admin dashboard does not appear in the public footer.

## Page Purposes And Primary Outcomes

### Shared pages

- `Accueil`: introduce the brand, build trust, route users into B2B or B2C.
- `A propos`: present JRAG's identity, story, origin, and corporate credibility.
- `Notre histoire`: explain the company narrative and legacy.
- `Terroir Dakhla`: communicate place, origin, and product storytelling.
- `Engagement RSE`: demonstrate environmental and social commitments.
- `Presse & Medias`: support media credibility and external communications.
- `Carrieres`: support recruitment and employer branding.
- `Ressources`: group informational and editorial support content.
- `Actualites / Blog`: publish updates, news, and editorial content.
- `Galerie Photos / Videos`: showcase brand, products, and operational visuals.
- `FAQ`: answer common questions and reduce support friction.
- `Contact`: handle general inquiries and direct users to the right channel.

### Professionnels pages

- `Landing Professionnels`: orient professional buyers and move them toward evaluation or contact.
- `Produits`: present the professional product offer and buying relevance.
- `Savoir-faire`: show operational expertise, handling, and product quality process.
- `Secteurs / Clients`: prove market fit through target sectors, references, or client types.
- `Certifications`: provide formal trust signals for professional evaluation.
- `Contact Pro`: convert professional interest into lead capture or direct discussion.

### Particuliers pages

- `Landing Particuliers`: orient consumers toward shopping and reassure them on quality and service.
- `Boutique`: support product discovery and purchase.
- `Recettes & Conseils`: inspire product usage and support discovery.
- `Livraison`: answer fulfillment and shipping questions.
- `Programme Fidelite`: explain repeat-purchase benefits.
- `Mon Compte`: manage customer identity, orders, and saved preferences.
- `Panier / Paiement`: complete purchase with minimal friction.

### Admin pages

- `Admin Dashboard`: provide operational overview, key metrics, and quick actions.
- `Pages`: manage shared, B2B, and B2C page content.
- `Navigation`: manage global, local, and footer navigation structures.
- `Produits`: manage catalog, categories, and product visibility.
- `Commandes`: manage order state, payment state, and fulfillment state.
- `Clients`: manage customer records and account-related operations.
- `Leads B2B`: manage professional inquiries and lead follow-up.
- `Recettes & Blog`: manage editorial publishing.
- `Media`: manage uploaded media assets.
- `Trust Content`: manage certifications, reassurance blocks, and trust signals.
- `Settings`: manage site-wide operational settings, legal content, and contact details.
- `Users / Roles`: manage admin authentication, permissions, and access control.

## Content Boundaries

### Shared content

Shared content includes:

- brand story,
- origin and terroir,
- values and commitments,
- editorial and informational resources.

### B2B content

B2B content includes:

- professional offer,
- product evaluation,
- capabilities,
- proof and reassurance,
- lead-generation conversion.

### B2C content

B2C content includes:

- shop discovery,
- buying support,
- recipes and inspiration,
- loyalty,
- account and checkout flow.

### Admin content and operations

Admin scope includes:

- CMS management,
- navigation management,
- catalog management,
- order and customer operations,
- B2B lead management,
- media management,
- trust content updates,
- and role-based settings management.

## Expected UX Improvements

Compared with the current sitemap, this structure should:

- reduce confusion caused by mixed page intent,
- make audience routing clearer from the homepage,
- give storytelling content a stronger shared role,
- remove utility pages from top-level discovery emphasis,
- separate operational management from public browsing,
- and make both B2B and B2C journeys feel intentional rather than incidental.

## Out of Scope

This design does not yet define:

- exact URL structure,
- page templates,
- navigation UI behavior on desktop/mobile,
- content copy,
- admin data model,
- admin permissions matrix,
- or phased implementation sequencing.

Those should be covered in the implementation planning phase.
