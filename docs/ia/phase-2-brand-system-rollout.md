# Phase 2 Brand System Rollout Across Page Families

## Purpose

Translate JRAG's noble + rigorous brand tension into a repeatable page-family system so every high-impact route feels premium and credible at once.

## System Baseline (Current)

- Brand tokens exist in `app/globals.css` (`--jrag-ink`, `--jrag-sand`, `--jrag-orange`, `--jrag-blue`).
- Reusable visual modes exist in `components/modes/` (`story`, `proof`, `route`, `metric`, `editorial`).
- Page-family adoption is partial. `particuliers` and `particuliers/boutique` use mode components, but most public routes still need rollout.

## Rollout Rule

Each important page must include both:

1. a noble moment (image-led, atmospheric, expressive typography)
2. a rigorous moment (proof-led, structured, operational clarity)

Utility and legal pages stay calmer, but still use JRAG typography, spacing, and color discipline.

## Page-Family Matrix

### 1) Brand Router and Journey Entries

- Routes: `/`, `/professionnels`, `/particuliers`
- Required mode sequence: `story -> metric/proof -> route`
- Noble anchor: full-width hero with Quicksand headline + Lato support text
- Rigorous anchor: compact proof block (traceability, capacities, standards)
- Conversion intent: clear split to `Contact Pro` and `Boutique`

### 2) B2B Proof Family

- Routes: `/professionnels/produits`, `/professionnels/savoir-faire`, `/professionnels/certifications`, `/professionnels/secteurs-clients`
- Required mode sequence: `story (short) -> proof (dominant) -> route`
- Noble anchor: one restrained product/process visual to preserve desire
- Rigorous anchor: high-density Roboto Condensed data grids and labels
- Conversion intent: `Contact Pro` must remain primary CTA

### 3) B2C Discovery and Support Family

- Routes: `/particuliers/boutique`, `/particuliers/recettes-conseils`, `/particuliers/livraison`, `/particuliers/fidelite`
- Required mode sequence: `story -> editorial/proof -> route`
- Noble anchor: product desire and food editorial cues
- Rigorous anchor: reassurance blocks (delivery windows, quality handling, service terms)
- Conversion intent: route to shopping and account loyalty actions

### 4) Editorial Brand Family

- Routes: `/a-propos`, `/a-propos/notre-histoire`, `/a-propos/terroir-dakhla`, `/a-propos/engagement-rse`, `/a-propos/presse-medias`, `/ressources`, `/ressources/actualites`, `/ressources/faq`, `/ressources/galerie`
- Required mode sequence: `story -> editorial -> proof (light)`
- Noble anchor: cinematic image and narrative pacing
- Rigorous anchor: factual inserts (origin, process, standards, dates)
- Conversion intent: route to deeper trust pages or contact/shop entry

### 5) Conversion and Utility Family

- Routes: `/contact`, `/professionnels/contact`, `/compte`, `/panier`, `/panier/paiement`
- Required mode sequence: `proof (form clarity) -> route (next step)`
- Noble anchor: minimal (typography polish + spacing + restrained color accents)
- Rigorous anchor: form legibility, status cues, and frictionless completion
- Conversion intent: submit lead, complete checkout, or manage account tasks

### 6) Legal Family

- Routes: `/mentions-legales`, `/confidentialite`, `/cgv-b2b`, `/cgv-b2c`, `/plan-du-site`
- Required mode sequence: none; legal layout template only
- Noble anchor: subtle via spacing rhythm and typography hierarchy
- Rigorous anchor: plain structure, strong contrast, high readability
- Conversion intent: trust support only

## Motion Direction by Mode

- `story`: fade-up text reveal + subtle parallax image shift (smooth, not theatrical)
- `proof`: mostly static; optional line-draw or counter reveal only
- `route`: hover sharpen/reveal on cards, no bounce
- `metric`: count-up on enter with tabular number alignment
- `editorial`: staggered text/image reveal, low amplitude

Guardrails:

- No bouncy easing, no autoplay video dependency, no decorative gimmicks.
- Respect `prefers-reduced-motion` and keep transitions purposeful.

## Acceptance Criteria

- Typography hierarchy is always three-layer (`Quicksand`, `Lato`, `Roboto Condensed`).
- Color use stays within JRAG's four-token palette.
- Important pages visibly contain both noble and rigorous moments.
- Desktop/tablet/mobile spacing follows JRAG rhythm (80/60/40 style downshift).
- Every page has one clear next action matching page intent.

## Execution Order (High to Low)

1. Homepage and journey entry pages (`/`, `/professionnels`, `/particuliers`)
2. B2B proof family (commercial confidence)
3. B2C discovery/support family (desire plus reassurance)
4. Editorial brand family
5. Conversion/utility and legal consistency pass

## QA Checklist for Rollout Reviews

- Is the page role clear within 3 seconds?
- Is there one dominant visual anchor and one dominant conversion action?
- Where is the rigorous proof moment, and is it operationally useful?
- Are spacing and typography still premium on mobile?
- Does motion improve hierarchy without distracting from content?
