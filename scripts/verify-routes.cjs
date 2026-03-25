/* eslint-disable @typescript-eslint/no-require-imports */
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
