# JRAG Company

**Type:** Luxury Seafood Brand — Editorial + E-Commerce  
**Status:** Scaffold + Interactive Prototypes (Homepage built, 50+ pages TODO)  
**Primary Goal:** Ship a dual-audience luxury seafood export website (B2B + B2C)  
**Organization:** Flat (CEO + 4 specialists + DB Manager)  
**Tech Stack:** Next.js 16 + React 19 + TypeScript 5 + GSAP + Three.js + CSS Modules  

---

## Mission

JRAG is a luxury seafood venture rooted in Dakhla, Morocco. We ship an editorial-industrial aesthetic—premium desire paired with operational rigor. Every design and implementation decision must make JRAG feel both more desirable AND more credible.

The website has two distinct journeys:
- **Professionnels (B2B):** Luxury supplier dossier with trust, proof, and operational clarity
- **Particuliers (B2C):** Luxury food editorial with commerce support, desire, and reassurance

---

## Company Structure

### Org Chart

```
JRAG Company
├── ceo (orchestrator)
│   ├─ frontend-dev (implementation)
│   ├─ content-strategist (IA & copy)
│   └─ design-lead (visual system & direction)
└── db-manager (data architecture)
```

### Agents

| Slug | Title | Reports To | Core Skills | Responsibility |
|------|-------|-----------|------------|-----------------|
| **ceo** | CEO / Project Orchestrator | null | paperclip, para-memory-files, brainstorming, jrag-brand-implementation | Brand direction, cross-team coordination, decision-making, JRAG operating brief adherence |
| **frontend-dev** | Frontend Developer | ceo | paperclip, vercel-react-best-practices, requesting-code-review, jrag-page-templates, jrag-animation-patterns | Page implementation, React components, GSAP animations, TypeScript quality, NextJS architecture |
| **content-strategist** | Content & IA Lead | ceo | paperclip, brainstorming, ui-ux-pro-max, jrag-page-templates, jrag-brand-implementation | Information architecture, page copy, audience segmentation, user journey design, content model |
| **design-lead** | Design & Visual System | ceo | paperclip, ui-ux-pro-max, requesting-code-review, jrag-brand-implementation, jrag-animation-patterns | Visual design, typography hierarchy, color/brand system, animation direction, "noble vs rigorous" archetype balance |
| **db-manager** | Database Manager | ceo | paperclip, database-schema-design, security-review, express-firebase-api | E-commerce schema, admin data model, user accounts, product/order management, security audit |

### Agent Ledger

JRAG uses an Agent Ledger layer in-package:

- `trust/` defines per-agent permissions, denials, and approval gates
- `workflows/` defines reusable code review, deploy, and publish pipelines
- `ledger/` provides the repo-visible audit structure for execution, gate, and decision records

---

## Tech Stack

### Core
- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **Runtime:** React 19.2.4
- **Language:** TypeScript 5 (strict mode)
- **Styling:** CSS Modules (no utility framework)

### Animation & 3D
- **Animation:** GSAP 3.14.2 (ScrollTrigger, timeline scrubbing)
- **3D Graphics:** Three.js 0.183.2 (WebGL procedural water)

### Fonts (Google Fonts)
- **Display:** Quicksand (500, 600, 700) — main headlines, signatures
- **Supporting:** Lato (400, 700) — subheads, intros, editorial
- **Body:** Roboto Condensed (400, 500, 700) — body, nav, labels, forms

### Build & Dev
- **Linting:** ESLint 9 (flat config)
- **Package Manager:** npm
- **Build Tool:** Turbopack (automatic with Next.js 16)

### Infrastructure (TBD)
- **Database:** TBD (Next.js + serverless recommended for MVP)
- **CMS:** TBD (static JSON, headless CMS, or database-backed)
- **Auth:** TBD (OAuth for admin, optional for B2C)
- **Payments:** TBD (Stripe or Paypal for B2C checkout)

---

## Project Status

### ✅ Complete
- Next.js App Router scaffold (60+ routes)
- Route structure matching IA (B2B/B2C audience split)
- Layout hierarchy (root → public → audience-specific)
- Component scaffold (animation components, page placeholders)
- Typography system (3 Google Fonts with CSS vars)
- Color system (4 brand colors + CSS vars)
- Dev/build/lint scripts
- **Homepage interactive prototype:**
  - Parallax intro section (7 SVG layers + wave animation)
  - Scrollytelling section (1,746 frame sequence animation)
  - WebGL water renderer (Three.js procedural)
- TypeScript strict mode
- ESLint configuration
- Asset organization (animation frames, parallax images)
- Brand operating brief (AGENTS.md with noble vs rigorous archetypes)

### 🔄 In Progress
- Homepage content refinement (final sections, CTAs, footer)
- Navigation component integration
- B2B landing page design

### ❌ TODO (Priority Order)
1. Visual design for all remaining pages (~50 pages)
2. Component library (hero blocks, proof blocks, CTA blocks, metric blocks, etc.)
3. Navigation implementation
4. Admin dashboard UI + all 12 management areas
5. E-commerce functionality (boutique, cart, checkout, orders)
6. Content data model (decide: static JSON vs headless CMS vs database)
7. Search functionality
8. User accounts (Mon Compte, authentication, orders history)
9. Performance optimization (image optimization, code splitting, caching)
10. Accessibility audit (WCAG 2.1 AA)
11. Mobile responsive refinement
12. SEO optimization
13. Analytics integration
14. Testing (unit, integration, e2e with Playwright)

---

## Brand Operating Brief (TLDR)

**See:** `AGENTS.md` for complete brand brief

### Core Tension
JRAG works when both sides are present:
- Premium desire + Operational rigor
- Editorial storytelling + Industrial clarity

If a design only feels luxurious but not credible, it is wrong.  
If it only feels rigorous but not desirable, it is wrong.

### The Two Archetypes

**The Noble** — Image-led, emotional, atmospheric
- Use for: product beauty, terroir, origin stories, elevated language
- Visual: large confident images, spacious layout, soft premium typography

**The Rigorous** — Proof-led, operational, trustworthy
- Use for: certifications, traceability, logistics, structured proof blocks
- Visual: tight grids, condensed labels, industrial clarity

**Important Pages = Both Archetypes**  
Homepage, landing pages, product pages should include both a noble moment and a rigorous moment.

### Audience Modes

**Professionnels (B2B):** Mood = luxury supplier dossier
- Prioritize: trust, proof, consistency, operational clarity, Contact Pro CTA

**Particuliers (B2C):** Mood = luxury food editorial with commerce
- Prioritize: desire, reassurance, inspiration, product discovery, Boutique CTA

### Visual Rules
- **Should feel:** editorial, cinematic, industrial, luxurious, restrained
- **Should NOT feel:** playful, app-like, generic corporate, beachy, overdecorated
- **Color:** Use Living Orange (#d86d2c) for action/emphasis, Blue (#6ea3bc) for trust
- **Composition:** Prefer large confident sections over crowded layouts
- **Motion:** Smooth, quiet, deliberate. Fade-up and line-draw good. No bouncy/toy-like animation

---

## Workflows

See `.paperclip.yaml` for complete configuration.

### Sprint Process (Think → Plan → Build → Review → Test → Ship → Reflect)

Each agent follows this disciplined process:

1. **Think** — Brainstorm with CEO office hours, challenge premises
2. **Plan** — CEO review → Design review → Eng review
3. **Build** — Frontend-dev, content-strategist, design-lead implement in parallel
4. **Review** — Auto-fix, flag completeness gaps
5. **Test** — QA agent tests in real browser, fixes regressions
6. **Ship** — Stage, commit with atomic messages, push, open PR
7. **Reflect** — Weekly retro per agent, cross-team learnings

### gstack Integration

Optional: Integrate [gstack](https://github.com/garrytan/gstack) for advanced sprint automation.

```bash
# Install gstack once
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# Add to JRAG
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
# Update CLAUDE.md with gstack section (see gstack README)
```

Available gstack skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/review`, `/qa`, `/ship`, `/land-and-deploy`, `/investigate`, and 19 more.

---

## Key Files

- **AGENTS.md** — Agent instructions, brand brief, page intent map
- **agents/{slug}/AGENTS.md** — Per-agent role, skills, responsibilities
- **skills/{slug}/SKILL.md** — Custom skills for JRAG-specific patterns
- **.paperclip.yaml** — Vendor configuration, external agent coordination
- **WORKFLOW.md** — Detailed sprint process and handoff rules
- **LEDGER.md** — Agent Ledger schema for verifiable execution
- **TRUST.md** — Trust permissions and security boundaries
- **docs/ia/\*.md** — Information architecture (source of truth)
- **docs/superpowers/plans/\*.md** — Planning docs from brainstorming
- **docs/superpowers/specs/\*.md** — Design and spec docs

---

## How to Add New Pages

1. **Define in docs/ia/routes.md** — Add route, purpose, audience
2. **Create in AGENTS.md** — Add page intent and archetype (noble vs rigorous)
3. **Design** — Design lead creates mockups, runs through "noble vs rigorous" checklist
4. **Implement** — Frontend dev builds component with reusable page templates
5. **Content** — Content strategist writes copy, validates against page intent
6. **Review** — Design lead + CEO review for brand adherence
7. **Ship** — Frontend dev stages atomic commit, pushes to branch

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Verify routes match IA
node scripts/verify-routes.cjs
```

Visit `http://localhost:3000` → Homepage with interactive parallax & scrollytelling.

---

## Decision Rule (Before Shipping Anything)

Ask these four questions:

1. **Does this make JRAG feel more premium?**
2. **Does this make JRAG feel more credible?**
3. **Does this preserve both desire and proof?**
4. **Does this match the page's actual role?**

If the answer is no to any of these, revise it.

---

## References

- **Brand Brief:** `AGENTS.md` (operating guidelines for all agents)
- **Visual Playbook:** `docs/ia/agent-visual-playbook.md`
- **Page Intent Map:** `docs/ia/agent-page-intent.md`
- **Routes:** `docs/ia/routes.md` (IA source of truth)
- **Implementation Checklist:** `docs/ia/implementation-checklist.md`
- **gstack Docs:** `https://github.com/garrytan/gstack` (advanced sprint automation)

---

**Last Updated:** 2026-03-29  
**Companify Phase:** 6 (Package Write) → 7 (Import & Learn)
