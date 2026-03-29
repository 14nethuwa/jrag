# JRAG Whole-Site Visual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved JRAG whole-site visual spec into an implemented Next.js public website foundation with agent-friendly docs, reusable design primitives, and redesigned key public routes.

**Architecture:** Keep the existing App Router scaffold and replace placeholder-first presentation with a reusable public design system. Build the work in layers: first docs and test tooling, then root tokens and layout primitives, then shared public components, then page-by-page composition for homepage, B2B, B2C, shared brand pages, and utility/legal pages.

**Tech Stack:** Next.js App Router, TypeScript, React 19, CSS modules or scoped component CSS, Jest or Vitest with Testing Library, ESLint

---

## File Structure Map

### Existing files to modify

- `package.json` - add test scripts and frontend test dependencies
- `app/layout.tsx` - load root fonts and global body classes
- `app/globals.css` - define global tokens, surfaces, typography roles, resets, and motion primitives
- `app/(public)/layout.tsx` - replace placeholder shell with real public chrome
- `app/(public)/page.tsx` - implement homepage composition
- `app/(public)/professionnels/layout.tsx` - add B2B local navigation shell
- `app/(public)/professionnels/page.tsx` - implement B2B landing page
- `app/(public)/particuliers/layout.tsx` - add B2C local navigation shell
- `app/(public)/particuliers/page.tsx` - implement B2C landing page
- `app/(public)/a-propos/page.tsx` - implement shared brand landing page
- `app/(public)/contact/page.tsx` - implement shared contact page
- `components/page-placeholder.tsx` - either retire or reduce usage after real pages exist
- `components/section-layout-shell.tsx` - replace or retire once real section primitives exist

### New docs to create for agent guidance

- `docs/ia/agent-design-playbook.md` - short operational design rules for agents building JRAG pages
- `docs/ia/agent-page-recipes.md` - page-type recipes by route family using the approved visual spec
- `docs/ia/agent-content-mapping.md` - map each public route to tone, section pattern, and required noble/rigorous moments

### New app and component files likely needed

- `components/public/public-header.tsx`
- `components/public/public-footer.tsx`
- `components/public/public-shell.tsx`
- `components/public/audience-nav.tsx`
- `components/public/section-frame.tsx`
- `components/public/hero-split.tsx`
- `components/public/route-card.tsx`
- `components/public/proof-strip.tsx`
- `components/public/metric-block.tsx`
- `components/public/editorial-feature.tsx`
- `components/public/contact-panel.tsx`
- `components/public/page-hero.tsx`
- `components/public/page-intro.tsx`
- `components/public/story-card.tsx`
- `components/public/proof-card.tsx`
- `components/public/public-shell.module.css`
- `components/public/sections.module.css`
- `components/public/cards.module.css`
- `components/public/forms.module.css`

### New tests likely needed

- `tests/public-shell.test.tsx`
- `tests/public-components.test.tsx`
- `tests/homepage.test.tsx`
- `tests/professionnels-page.test.tsx`
- `tests/particuliers-page.test.tsx`
- `tests/a-propos-page.test.tsx`
- `tests/contact-page.test.tsx`
- `tests/utility-pages.test.tsx`
- `tests/subpage-templates.test.tsx`
- `tests/agent-docs.test.ts`

## Task 1: Add test infrastructure before design implementation

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts` or `jest.config.ts`
- Create: `tests/setup.ts`
- Test: `tests/smoke.test.tsx`

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/(public)/page'

test('homepage scaffold renders a heading', () => {
  render(<HomePage />)
  expect(screen.getByRole('heading', { name: /accueil/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/smoke.test.tsx`
Expected: FAIL because no test runner is configured yet.

- [ ] **Step 3: Add the minimal test toolchain**

Install only what is required to run React component tests in this repo.

- [ ] **Step 4: Run the smoke test again**

Run: `npm test -- tests/smoke.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json vitest.config.ts tests/setup.ts tests/smoke.test.tsx
git commit -m "test: add frontend component test setup"
```

## Task 2: Write agent-facing design docs from the approved spec

**Files:**
- Create: `docs/ia/agent-design-playbook.md`
- Create: `docs/ia/agent-page-recipes.md`
- Create: `docs/ia/agent-content-mapping.md`
- Reference: `docs/superpowers/specs/2026-03-25-jrag-whole-site-visual-design.md`
- Reference: `docs/ia/homepage-structure.md`
- Reference: `docs/ia/landing-pages.md`
- Reference: `docs/ia/page-briefs.md`

- [ ] **Step 1: Write the docs-first acceptance test**

Create `tests/agent-docs.test.ts` and assert that the new docs exist and explicitly include:

- `Quicksand`, `Lato`, and `Roboto Condensed`
- homepage guidance
- B2B and B2C page guidance
- contact, utility, and legal page guidance
- noble and rigorous moments

- [ ] **Step 2: Run the docs test to verify it fails**

Run: `npm test -- tests/agent-docs.test.ts`
Expected: FAIL because the docs do not exist yet.

- [ ] **Step 3: Write the minimal docs**

The docs must clearly tell future agents:

- which font role to use where
- how homepage, B2B, B2C, story, contact, utility, and legal pages differ
- how to preserve noble and rigorous moments by page type
- what shared components and section variants are allowed

- [ ] **Step 4: Run the docs test again**

Run: `npm test -- tests/agent-docs.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add docs/ia/agent-design-playbook.md docs/ia/agent-page-recipes.md docs/ia/agent-content-mapping.md tests/agent-docs.test.ts
git commit -m "docs: add agent guidance for JRAG visual system"
```

## Task 3: Establish root design tokens, fonts, and semantic roles

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Test: `tests/public-shell.test.tsx`

- [ ] **Step 1: Write the failing root typography test**

Test for root layout output that includes the three approved font roles and semantic class application.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/public-shell.test.tsx -t "loads JRAG font roles"`
Expected: FAIL because the root layout still uses the scaffold defaults.

- [ ] **Step 3: Implement minimal root font and token setup**

Add:

- `Quicksand`, `Lato`, and `Roboto Condensed` loading
- semantic role variables such as `--font-display`, `--font-support`, `--font-body`
- surface, spacing, motion, and text-role tokens needed by shared components

- [ ] **Step 4: Run the targeted root test**

Run: `npm test -- tests/public-shell.test.tsx -t "loads JRAG font roles"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tests/public-shell.test.tsx
git commit -m "feat: add JRAG root design tokens and fonts"
```

## Task 4: Replace the public scaffold shell with real site chrome

**Files:**
- Modify: `app/(public)/layout.tsx`
- Create: `components/public/public-header.tsx`
- Create: `components/public/public-footer.tsx`
- Create: `components/public/public-shell.tsx`
- Create: `components/public/public-shell.module.css`
- Test: `tests/public-shell.test.tsx`

- [ ] **Step 1: Write the failing public shell test**

Test for:

- global header links
- utility links
- footer groups
- and visible audience switching

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/public-shell.test.tsx -t "renders public chrome"`
Expected: FAIL because the placeholder layout does not contain the real chrome.

- [ ] **Step 3: Implement the minimal public shell**

Build a shared shell that establishes:

- slim editorial header
- audience-visible navigation
- grouped footer
- container rhythm that pages can reuse

- [ ] **Step 4: Run the targeted shell test**

Run: `npm test -- tests/public-shell.test.tsx -t "renders public chrome"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/layout.tsx components/public/public-header.tsx components/public/public-footer.tsx components/public/public-shell.tsx components/public/public-shell.module.css tests/public-shell.test.tsx
git commit -m "feat: add JRAG public site shell"
```

## Task 5: Build reusable section and card primitives

**Files:**
- Create: `components/public/section-frame.tsx`
- Create: `components/public/hero-split.tsx`
- Create: `components/public/route-card.tsx`
- Create: `components/public/proof-strip.tsx`
- Create: `components/public/metric-block.tsx`
- Create: `components/public/editorial-feature.tsx`
- Create: `components/public/story-card.tsx`
- Create: `components/public/proof-card.tsx`
- Create: `components/public/sections.module.css`
- Create: `components/public/cards.module.css`
- Test: `tests/public-components.test.tsx`

- [ ] **Step 1: Write failing tests for reusable variants**

Create `tests/public-components.test.tsx` and add one focused test per reusable variant that verifies role, semantic heading, and key text structure.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- tests/public-components.test.tsx`
Expected: FAIL because the reusable components do not exist.

- [ ] **Step 3: Implement the minimal reusable components**

Ensure the primitives encode the spec's differences between story, proof, route, metric, and editorial components.

- [ ] **Step 4: Run the component tests again**

Run: `npm test -- tests/public-components.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/public/section-frame.tsx components/public/hero-split.tsx components/public/route-card.tsx components/public/proof-strip.tsx components/public/metric-block.tsx components/public/editorial-feature.tsx components/public/story-card.tsx components/public/proof-card.tsx components/public/sections.module.css components/public/cards.module.css tests/public-components.test.tsx
git commit -m "feat: add JRAG public section primitives"
```

## Task 6: Implement the homepage as the brand router

**Files:**
- Modify: `app/(public)/page.tsx`
- Reuse: `components/public/*`
- Test: `tests/homepage.test.tsx`
- Reference: `docs/ia/homepage-structure.md`

- [ ] **Step 1: Write the failing homepage structure test**

Test for the approved homepage sections in order:

- Hero
- Why JRAG
- Featured products / categories
- Terroir / Storytelling
- Choose your path
- Trust signals
- Editorial discovery

Also assert:

- both `Professionnels` and `Particuliers` are visible as primary routes
- at least one noble cue exists in the hero or terroir area
- at least one rigorous cue exists in the trust or proof area

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/homepage.test.tsx`
Expected: FAIL because the page is still a placeholder.

- [ ] **Step 3: Implement the minimal homepage composition**

The page must:

- feel cinematic and decisive
- route clearly into `Professionnels` and `Particuliers`
- balance noble atmosphere with rigorous proof

- [ ] **Step 4: Run the homepage test again**

Run: `npm test -- tests/homepage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/page.tsx tests/homepage.test.tsx
git commit -m "feat: implement JRAG homepage router"
```

## Task 7: Implement the B2B landing and local shell

**Files:**
- Modify: `app/(public)/professionnels/layout.tsx`
- Modify: `app/(public)/professionnels/page.tsx`
- Create: `components/public/audience-nav.tsx`
- Test: `tests/professionnels-page.test.tsx`
- Reference: `docs/ia/landing-pages.md`

- [ ] **Step 1: Write the failing B2B landing test**

Test for the approved `Professionnels` section order:

- Hero
- Offer overview
- Savoir-faire
- Proof
- Operational reassurance
- Conversion CTA block

Also assert:

- `Contact Pro` is the clearest primary conversion action
- the page includes at least one rigorous proof block and one noble product or place cue

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/professionnels-page.test.tsx`
Expected: FAIL because the B2B landing is still a placeholder.

- [ ] **Step 3: Implement the minimal B2B landing**

The page must feel like a luxury supplier dossier and include stronger proof density than B2C.

- [ ] **Step 4: Run the B2B test again**

Run: `npm test -- tests/professionnels-page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/professionnels/layout.tsx app/(public)/professionnels/page.tsx components/public/audience-nav.tsx tests/professionnels-page.test.tsx
git commit -m "feat: implement JRAG B2B landing"
```

## Task 8: Implement the B2C landing and local shell

**Files:**
- Modify: `app/(public)/particuliers/layout.tsx`
- Modify: `app/(public)/particuliers/page.tsx`
- Test: `tests/particuliers-page.test.tsx`
- Reference: `docs/ia/landing-pages.md`

- [ ] **Step 1: Write the failing B2C landing test**

Test for the approved `Particuliers` section order:

- Hero
- Shop entry
- Reassurance
- Inspiration
- Loyalty / account value
- Conversion CTA block

Also assert:

- `Boutique` is the clearest primary conversion action
- the page includes at least one noble visual/story cue and one reassurance cue

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/particuliers-page.test.tsx`
Expected: FAIL because the B2C landing is still a placeholder.

- [ ] **Step 3: Implement the minimal B2C landing**

The page must feel like luxury food editorial with commerce support and lighter composition than B2B.

- [ ] **Step 4: Run the B2C test again**

Run: `npm test -- tests/particuliers-page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/particuliers/layout.tsx app/(public)/particuliers/page.tsx tests/particuliers-page.test.tsx
git commit -m "feat: implement JRAG B2C landing"
```

## Task 9: Implement the shared `A propos` landing page

**Files:**
- Modify: `app/(public)/a-propos/page.tsx`
- Create: `components/public/page-hero.tsx`
- Create: `components/public/page-intro.tsx`
- Test: `tests/a-propos-page.test.tsx`

- [ ] **Step 1: Write the failing `A propos` test**

Assert that `A propos` includes:

- a shared brand gateway heading
- routes to story pages
- corporate credibility cues
- one editorial/noble moment and one rigorous credibility cue

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/a-propos-page.test.tsx`
Expected: FAIL because the page is still a placeholder.

- [ ] **Step 3: Implement the minimal `A propos` page**

The page should lean editorial and act as the gateway to `Notre histoire`, `Terroir Dakhla`, `Engagement RSE`, `Presse & Medias`, and `Carrieres`.

- [ ] **Step 4: Run the `A propos` test again**

Run: `npm test -- tests/a-propos-page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/a-propos/page.tsx components/public/page-hero.tsx components/public/page-intro.tsx tests/a-propos-page.test.tsx
git commit -m "feat: implement JRAG shared brand landing"
```

## Task 10: Implement the shared contact page

**Files:**
- Modify: `app/(public)/contact/page.tsx`
- Create: `components/public/contact-panel.tsx`
- Create: `components/public/forms.module.css`
- Test: `tests/contact-page.test.tsx`

- [ ] **Step 1: Write the failing contact-page test**

Assert that the contact page includes:

- a premium heading block
- routing guidance by inquiry type
- contact details
- response expectation copy
- one nearby trust or proof cue

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/contact-page.test.tsx`
Expected: FAIL because the page is still a placeholder.

- [ ] **Step 3: Implement the minimal contact page**

Retain premium framing while keeping the form and support content operationally clear.

- [ ] **Step 4: Run the contact-page test again**

Run: `npm test -- tests/contact-page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/contact/page.tsx components/public/contact-panel.tsx components/public/forms.module.css tests/contact-page.test.tsx
git commit -m "feat: implement JRAG contact page"
```

## Task 11: Implement story and proof subpages

**Files:**
- Modify: `app/(public)/a-propos/notre-histoire/page.tsx`
- Modify: `app/(public)/a-propos/terroir-dakhla/page.tsx`
- Modify: `app/(public)/a-propos/engagement-rse/page.tsx`
- Modify: `app/(public)/a-propos/presse-medias/page.tsx`
- Modify: `app/(public)/a-propos/carrieres/page.tsx`
- Test: `tests/subpage-templates.test.tsx`

- [ ] **Step 1: Write failing tests for the story/proof subpages**

Assert that each page has a real heading, route-specific supporting copy, and no raw placeholder text.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- tests/subpage-templates.test.tsx -t "story and proof subpages"`
Expected: FAIL because these pages still use placeholders.

- [ ] **Step 3: Implement the minimal branded subpages**

Each page should follow its route brief:

- `Notre histoire` -> narrative / legacy
- `Terroir Dakhla` -> place / origin / environment
- `Engagement RSE` -> environmental and social commitments
- `Presse & Medias` -> media-ready credibility
- `Carrieres` -> recruitment and culture

- [ ] **Step 4: Run the tests again**

Run: `npm test -- tests/subpage-templates.test.tsx -t "story and proof subpages"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/a-propos/notre-histoire/page.tsx app/(public)/a-propos/terroir-dakhla/page.tsx app/(public)/a-propos/engagement-rse/page.tsx app/(public)/a-propos/presse-medias/page.tsx app/(public)/a-propos/carrieres/page.tsx tests/subpage-templates.test.tsx
git commit -m "feat: implement JRAG about subpages"
```

## Task 12: Implement B2B subpages

**Files:**
- Modify: `app/(public)/professionnels/produits/page.tsx`
- Modify: `app/(public)/professionnels/savoir-faire/page.tsx`
- Modify: `app/(public)/professionnels/secteurs-clients/page.tsx`
- Modify: `app/(public)/professionnels/certifications/page.tsx`
- Modify: `app/(public)/professionnels/contact/page.tsx`
- Test: `tests/subpage-templates.test.tsx`

- [ ] **Step 1: Write failing tests for the B2B subpages**

Assert that each route includes its brief-specific heading, one proof-oriented block, and no raw placeholder copy.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- tests/subpage-templates.test.tsx -t "b2b subpages"`
Expected: FAIL because these pages still use placeholders.

- [ ] **Step 3: Implement the minimal B2B subpages**

Map each page directly to `docs/ia/page-briefs.md`:

- `Produits` -> product families, formats, quality notes, next-step CTA
- `Savoir-faire` -> process, handling proof, traceability, related CTA
- `Secteurs / Clients` -> sectors served, reference types, commercial relevance
- `Certifications` -> certification list, proof details, relevance explanation
- `Contact Pro` -> lead form, inquiry fields, response reassurance, secondary contact path

- [ ] **Step 4: Run the tests again**

Run: `npm test -- tests/subpage-templates.test.tsx -t "b2b subpages"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/professionnels/produits/page.tsx app/(public)/professionnels/savoir-faire/page.tsx app/(public)/professionnels/secteurs-clients/page.tsx app/(public)/professionnels/certifications/page.tsx app/(public)/professionnels/contact/page.tsx tests/subpage-templates.test.tsx
git commit -m "feat: implement JRAG B2B subpages"
```

## Task 13: Implement B2C and resources subpages

**Files:**
- Modify: `app/(public)/particuliers/boutique/page.tsx`
- Modify: `app/(public)/particuliers/recettes-conseils/page.tsx`
- Modify: `app/(public)/particuliers/livraison/page.tsx`
- Modify: `app/(public)/particuliers/fidelite/page.tsx`
- Modify: `app/(public)/ressources/page.tsx`
- Modify: `app/(public)/ressources/actualites/page.tsx`
- Modify: `app/(public)/ressources/faq/page.tsx`
- Modify: `app/(public)/ressources/galerie/page.tsx`
- Test: `tests/subpage-templates.test.tsx`

- [ ] **Step 1: Write failing tests for the B2C and resource subpages**

Assert that each route includes route-specific structure, appropriate CTA emphasis, and no raw placeholder text.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- tests/subpage-templates.test.tsx -t "b2c and resource subpages"`
Expected: FAIL because these pages still use placeholders.

- [ ] **Step 3: Implement the minimal B2C and resource subpages**

Map directly to `docs/ia/page-briefs.md`:

- `Boutique` -> listing or category entry, discovery aids, purchase cue
- `Recettes & Conseils` -> recipe/advice list feel, editorial CTA, product links
- `Livraison` -> delivery terms, timing expectations, reassurance, support path
- `Programme Fidelite` -> benefits, how it works, signup CTA
- `Ressources` and children -> editorial/help/gallery grouping and discovery

- [ ] **Step 4: Run the tests again**

Run: `npm test -- tests/subpage-templates.test.tsx -t "b2c and resource subpages"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/particuliers/boutique/page.tsx app/(public)/particuliers/recettes-conseils/page.tsx app/(public)/particuliers/livraison/page.tsx app/(public)/particuliers/fidelite/page.tsx app/(public)/ressources/page.tsx app/(public)/ressources/actualites/page.tsx app/(public)/ressources/faq/page.tsx app/(public)/ressources/galerie/page.tsx tests/subpage-templates.test.tsx
git commit -m "feat: implement JRAG B2C and resource subpages"
```

## Task 14: Restyle utility pages to fit the system lightly

**Files:**
- Modify: `app/(public)/(utilities)/compte/page.tsx`
- Modify: `app/(public)/(utilities)/panier/page.tsx`
- Modify: `app/(public)/(utilities)/panier/paiement/page.tsx`
- Test: `tests/utility-pages.test.tsx`

- [ ] **Step 1: Write failing tests for utility pages**

Assert that each page has a branded heading, functional structure, and no raw placeholder text.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- tests/utility-pages.test.tsx -t "utility pages"`
Expected: FAIL because the pages still render placeholder scaffolds.

- [ ] **Step 3: Implement the minimal branded utility wrappers**

Do not over-design these pages; keep them clear, structured, and visibly part of the JRAG system.

- [ ] **Step 4: Run the utility-page tests again**

Run: `npm test -- tests/utility-pages.test.tsx -t "utility pages"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/(utilities)/compte/page.tsx app/(public)/(utilities)/panier/page.tsx app/(public)/(utilities)/panier/paiement/page.tsx tests/utility-pages.test.tsx
git commit -m "feat: align JRAG utility pages with design system"
```

## Task 15: Restyle legal pages to fit the system lightly

**Files:**
- Modify: `app/(public)/(legal)/mentions-legales/page.tsx`
- Modify: `app/(public)/(legal)/confidentialite/page.tsx`
- Modify: `app/(public)/(legal)/cgv-b2b/page.tsx`
- Modify: `app/(public)/(legal)/cgv-b2c/page.tsx`
- Modify: `app/(public)/(legal)/plan-du-site/page.tsx`
- Test: `tests/utility-pages.test.tsx`

- [ ] **Step 1: Write failing tests for legal pages**

Assert that each legal page has a consistent branded heading, restrained layout, and no raw placeholder text.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- tests/utility-pages.test.tsx -t "legal pages"`
Expected: FAIL because the pages still render placeholder scaffolds.

- [ ] **Step 3: Implement the minimal branded legal wrappers**

Keep these pages calm and readable; use type, spacing, and shell consistency to keep them in-family.

- [ ] **Step 4: Run the legal-page tests again**

Run: `npm test -- tests/utility-pages.test.tsx -t "legal pages"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/(public)/(legal)/mentions-legales/page.tsx app/(public)/(legal)/confidentialite/page.tsx app/(public)/(legal)/cgv-b2b/page.tsx app/(public)/(legal)/cgv-b2c/page.tsx app/(public)/(legal)/plan-du-site/page.tsx tests/utility-pages.test.tsx
git commit -m "feat: align JRAG legal pages with design system"
```

## Task 16: Update the PRD to match the approved whole-site direction

**Files:**
- Modify: `JRAG_PRD.md`
- Reference: `docs/superpowers/specs/2026-03-25-jrag-whole-site-visual-design.md`
- Test: `tests/prd-alignment.test.ts`

- [ ] **Step 1: Write the failing PRD alignment test**

Assert that the PRD no longer hard-locks `Montserrat + Playfair Display` and instead documents `Quicksand`, `Lato`, and `Roboto Condensed` with the approved role hierarchy.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/prd-alignment.test.ts`
Expected: FAIL because the PRD still reflects the older typography direction.

- [ ] **Step 3: Update the PRD minimally but clearly**

Revise the typography and any conflicting visual-rules sections without rewriting unrelated brand guidance.

- [ ] **Step 4: Run the PRD alignment test again**

Run: `npm test -- tests/prd-alignment.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add JRAG_PRD.md tests/prd-alignment.test.ts
git commit -m "docs: align PRD with JRAG approved visual direction"
```

## Task 17: Verification and cleanup

**Files:**
- Modify: any touched files as needed
- Reference: `docs/ia/implementation-checklist.md`

- [ ] **Step 1: Run targeted tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Update verification checklist evidence**

Record what passed in `docs/ia/implementation-checklist.md` or a sibling verification note.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: verify JRAG whole-site visual rollout"
```

## Notes for Execution

- Prefer `@superpowers/subagent-driven-development` for implementation because the tasks are naturally separable by page family.
- Follow TDD strictly: test first, verify failure, implement minimal code, verify success.
- Do not redesign the admin area during this plan; admin should stay structurally separate unless a later spec expands it.
- If a page family proves too broad during execution, split it into a follow-up micro-plan rather than growing one task uncontrolled.
