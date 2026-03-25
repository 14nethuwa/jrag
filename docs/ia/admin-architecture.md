# JRAG Admin Architecture

The JRAG admin is a separate back-office layer for operators, not a public-facing audience journey. It centralizes shared, B2B, and B2C management so teams can maintain content and commerce operations without exposing administrative structure in visitor navigation.

## Access Rules

- admin is available at the protected route `/admin`
- admin is not linked in the public header or footer
- admin is not treated as a public audience path
- admin manages shared, B2B, and B2C operations from one place

## Separation From Public Navigation

The admin sits outside the visitor IA. Public users move through `Accueil`, `Professionnels`, `Particuliers`, shared brand pages, resource pages, utility flows, and legal pages without encountering the admin as a discovery destination, footer link, or alternate journey.

## Approved Admin Areas

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

## Scope Boundaries

- `Pages`: controls CMS content for shared, B2B, and B2C page bodies.
- `Navigation`: controls navigation, including global header links, audience-local menus, and footer structures.
- `Produits`: controls catalog structure, product visibility, and related catalog operations.
- `Commandes`: controls orders, payment-state handling, and fulfillment follow-up.
- `Clients`: controls customers, customer records, and account-support operations.
- `Leads B2B`: controls B2B leads, while general contacts and contact inquiries are also handled in the admin through the same operational layer so brand-level requests can be reviewed, routed, and followed up without introducing a separate admin area.
- `Recettes & Blog`: controls editorial publishing for recipes, blog entries, and related editorial content.
- `Media`: controls media assets used across shared, B2B, and B2C experiences.
- `Trust Content`: controls trust content such as certifications, reassurance blocks, and reusable proof modules.
- `Settings`: controls site-wide configuration, legal content, and contact details.

## Operational Control Summary

The admin controls:

- CMS content
- navigation
- catalog
- orders
- customers
- B2B leads
- general contacts and contact inquiries
- editorial
- media
- trust content
- settings and permissions

## Roles And Access

Access should require authentication and role-based permissions. `Users / Roles` is the single ownership area for admin authentication, roles, and permissions, and it applies to internal back-office staff accounts only. This keeps access control separate from `Settings`, while still allowing operators to be limited to the parts of content, commerce, leads, media, or settings they are responsible for.
