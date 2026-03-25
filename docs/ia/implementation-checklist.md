## Traceability

- Approved spec: `docs/superpowers/specs/2026-03-25-jrag-ux-sitemap-design.md`
- Implementation plan: `docs/superpowers/plans/2026-03-25-jrag-ux-sitemap-implementation.md`
- Source task: `Task 7: Add the implementation QA checklist`

## Review Metadata

- Reviewer: 
- Review date: 
- Review status: 
- Evidence links/paths: 
- Notes: 

## Navigation
- Use this to verify: compare against the approved global nav, audience-local nav, and utility-nav rules in the spec and plan.
- [ ] Global nav matches approved schema.
- [ ] Audience-local nav appears only in the relevant journey.
- [ ] `Mon Compte` and `Panier` are available as utilities.
- [ ] `Paiement` appears inside checkout flow rather than primary discovery navigation.

## Audience Context
- Use this to verify: confirm shared pages stay globally reachable while audience switching remains explicit in the header.
- Pass/fail cues for `Switching audiences is explicit and easy`: pass if both audience paths are visible as labeled navigation choices and users can switch in one obvious step; fail if switching relies on hidden links, redirects, or ambiguous labels.
- [ ] Users can always tell whether they are in `Professionnels` or `Particuliers`.
- [ ] Shared pages remain globally accessible.
- [ ] Switching audiences is explicit and easy.

## Homepage
- Reference section order: `Hero`, `Why JRAG`, `Featured products / categories`, `Terroir / Storytelling`, `Choose your path`, `Trust signals`, `Editorial discovery`, `Footer`
- Pass/fail cues for `Homepage does not try to serve both journeys in full`: pass if the homepage introduces the brand and routes users into audience journeys; fail if it expands into a full B2B and B2C navigation or content experience on the homepage itself.
- [ ] Homepage includes the 8 approved sections in the right order.
- [ ] Homepage clearly routes users to `Professionnels` and `Particuliers`.
- [ ] Homepage does not try to serve both journeys in full.

## Landing Pages
- Reference journey sections:
- `Professionnels`: `Hero`, `Offer overview`, `Savoir-faire`, `Proof`, `Operational reassurance`, `Conversion CTA block`
- `Particuliers`: `Hero`, `Shop entry`, `Reassurance`, `Inspiration`, `Loyalty / account value`, `Conversion CTA block`
- Pass/fail cues for `Contact Pro` as the primary conversion CTA: pass if the B2B journey consistently points to `Contact Pro` as the clearest next step; fail if another CTA competes with or displaces it as the main conversion action.
- [ ] `Professionnels` landing follows the approved section order.
- [ ] `Particuliers` landing follows the approved section order.
- [ ] `Contact Pro` is the primary conversion CTA in the B2B journey.

## Footer
- Use this to verify: footer groups should support discovery without flattening or conflicting with the header hierarchy.
- Pass/fail cues for `Footer links do not conflict with header hierarchy`: pass if the footer expands on the approved architecture without re-framing utilities or subpages as top-level header peers; fail if the footer introduces conflicting groupings, duplicates the header in a misleading way, or implies a different primary hierarchy.
- [ ] Footer exposes `Professionnels`, `Particuliers`, `A propos`, `Ressources`, and utility groups.
- [ ] Footer links do not conflict with header hierarchy.

## Legal
- Use this to verify: all approved legal pages should be present as distinct public destinations.
- [ ] `Mentions legales` exists.
- [ ] `Confidentialite` exists.
- [ ] `CGV B2B` exists.
- [ ] `CGV B2C` exists.
- [ ] `Plan du site` exists.

## Admin
- Reference approved management areas: `Dashboard`, `Pages`, `Navigation`, `Produits`, `Commandes`, `Clients`, `Leads B2B`, `Recettes & Blog`, `Media`, `Trust Content`, `Settings`, `Users / Roles`
- Pass/fail cues for `Admin includes all approved management areas`: pass if each approved area exists as a discrete admin destination or clearly named module; fail if any approved area is missing, merged without clear naming, or only implied indirectly.
- [ ] Admin is reachable through a protected route such as `/admin`.
- [ ] Admin does not appear in public header or footer navigation.
- [ ] Admin includes all approved management areas.
