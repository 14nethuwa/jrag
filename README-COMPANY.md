# JRAG Company Roster

**Status:** Companified ✅ — 5-agent flat org with 3 custom skills + Agent Ledger layer  
**Type:** Luxury Seafood Export + E-Commerce  
**Sprint Cadence:** Think → Plan → Build → Review → Test → Ship → Reflect

---

## Org Chart

```
JRAG Company
│
├── 👑 CEO / Project Orchestrator (orchestrator, brand guard)
│   │
│   ├── 🎨 Design Lead (visual system, noble vs rigorous)
│   │   └── Skills: ui-ux-pro-max, jrag-brand-implementation, jrag-animation-patterns
│   │
│   ├── 💻 Frontend Developer (page implementation, animations)
│   │   └── Skills: vercel-react-best-practices, jrag-page-templates, jrag-animation-patterns
│   │
│   ├── ✍️ Content Strategist (IA, copy, voice)
│   │   └── Skills: brainstorming, ui-ux-pro-max, jrag-page-templates, jrag-brand-implementation
│   │
│   └── 🗄️ Database Manager (data architecture, security)
│       └── Skills: database-schema-design, security-review, express-firebase-api
```

---

## Agent Roster

| Agent | Role | Focus | Key Responsibility |
|-------|------|-------|-------------------|
| **ceo** | CEO / Project Orchestrator | Brand direction, cross-team coordination | Ensure "noble vs rigorous" balance on every page |
| **design-lead** | Design & Visual System | Visual design, typography, animation | Own typography hierarchy, color system, archetype application |
| **frontend-dev** | Frontend Developer | Page implementation, React, animations | Build pages with GSAP, TypeScript quality, reusable components |
| **content-strategist** | Content & IA Lead | Information architecture, copy, audience | Write copy that sounds like JRAG, define page intent |
| **db-manager** | Database Manager | Data architecture, e-commerce, security | Design schema for products/orders/users, implement auth |

---

## Core Skills

### Tier 1: Local Skills (Installed)

✅ **paperclip** — Every agent has core heartbeat skill  
✅ **para-memory-files** — CEO only, stores org learnings  
✅ **brainstorming** — CEO + content-strategist, reframe problems  
✅ **vercel-react-best-practices** — Frontend-dev, React optimization  
✅ **requesting-code-review** — Frontend-dev + design-lead, verify work  
✅ **ui-ux-pro-max** — Design-lead + content-strategist, design system  
✅ **database-schema-design** — DB-manager, schema design  
✅ **security-review** — DB-manager, audit security  
✅ **express-firebase-api** — DB-manager, API/backend  

### Tier 3: Custom Skills (JRAG-Specific)

🔨 **jrag-brand-implementation** — Apply noble vs rigorous archetype  
🔨 **jrag-page-templates** — 5 reusable page layouts  
🔨 **jrag-animation-patterns** — Approved GSAP patterns, performance tuned

### Agent Ledger Layer

✅ `trust/{agent}/TRUST.md` — per-agent permissions and gates  
✅ `workflows/*/WORKFLOW.md` — reusable approval pipelines  
✅ `ledger/` — execution, decision, and gate record structure

---

## Quick Start

### Install Dependencies
```bash
npm install
npm run build
```

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` → Homepage with parallax + scrollytelling interactive prototypes.

### Run Linting
```bash
npm run lint
```

### Verify Routes Match IA
```bash
node scripts/verify-routes.cjs
```

---

## Project Status

### ✅ Complete (Scaffold Phase)

- Next.js 16 App Router (60+ routes)
- Route structure (B2B/B2C split)
- Layout hierarchy
- Typography system (Quicksand/Lato/Roboto Condensed)
- Color system (4 brand colors)
- Homepage interactive prototype (parallax + scrollytelling + WebGL)
- Brand operating brief (AGENTS.md)
- Company package (COMPANY.md, 5 agent briefs, 3 custom skills)

### 🔄 In Progress

- Homepage final polish (sections, footer)
- Navigation implementation
- B2B landing design

### ❌ TODO (60+ Pages + E-Commerce)

1. Visual design for all remaining pages
2. Component library (hero, proof, route, metric, editorial templates)
3. Navigation component
4. Admin dashboard UI (12 areas)
5. E-commerce (boutique, cart, checkout, orders)
6. Content data model (JSON vs CMS vs database)
7. User accounts + Mon Compte
8. Search + filtering
9. Performance optimization
10. Accessibility audit
11. Testing (unit, integration, e2e)
12. Analytics integration

---

## How This Company Runs

### Sprint Process (7 Phases)

Each page/feature follows this process:

1. **Think** — CEO + content-strategist reframe the problem with `/office-hours`
2. **Plan** — CEO reviews design, eng reviews plan, design reviews specs
3. **Build** — Frontend-dev + design-lead + content-strategist work in parallel
4. **Review** — Auto-fix issues, flag completeness gaps
5. **Test** — QA in real browser (when QA agent joins)
6. **Ship** — Stage, commit, push, open PR
7. **Reflect** — CEO extracts learnings, updates org memory with para-memory-files

**Expected velocity:** 2-3 pages per week (once design + content pipeline is warm)

### Daily Standup

Team syncs briefly on Slack:
- What I shipped today
- What I'm blocked on
- What I need from others

### Weekly Retro (Friday)

CEO runs 30-minute retro:
- What went well this week?
- What slowed us down?
- What's our shipping velocity?
- Any process improvements?

Learnings stored in `docs/superpowers/planning/` for future reference.

---

## Key Files & Locations

| File | Purpose |
|------|---------|
| **COMPANY.md** | Company mission, structure, tech stack, status |
| **agents/{slug}/AGENTS.md** | Per-agent role, responsibilities, workflows |
| **skills/{slug}/SKILL.md** | Custom skills (brand, templates, animations) |
| **.paperclip.yaml** | Vendor config, sprint phases, handoff rules |
| **AGENTS.md** | Brand operating brief (fast reference) |
| **docs/ia/*** | Information architecture (source of truth) |
| **docs/superpowers/plans/*** | Planning docs from brainstorming |
| **docs/superpowers/specs/*** | Design & spec docs |

---

## Decision Rule (Before Shipping Anything)

Ask these 4 questions:

1. **Does this make JRAG feel more premium?**
2. **Does this make JRAG feel more credible?**
3. **Does this preserve both desire and proof?**
4. **Does this match the page's actual role?**

If the answer is no to any of these → revise it.

---

## Integration with gstack (Optional)

For advanced sprint automation, optionally install [gstack](https://github.com/garrytan/gstack):

```bash
# Install once globally
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# Optional: Add to this project
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
```

Available skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/review`, `/qa`, `/ship`, `/investigate`, and 19+ more.

---

## Next Steps

### Phase 7: Import & Learn

```bash
# Stage all company files
git add COMPANY.md agents/ skills/ .paperclip.yaml

# Commit with atomic message
git commit -m "feat: companify JRAG with 5-agent org + 3 custom skills

- CEO orchestrator + 4 specialists (frontend-dev, design-lead, content-strategist, db-manager)
- 3 custom skills: jrag-brand-implementation, jrag-page-templates, jrag-animation-patterns
- Agent Ledger enabled for verifiable execution
- Integrated with gstack sprint automation (optional)
"

# Push to feature branch
git push -u origin feature/companify-jrag

# Create pull request
gh pr create --title "Companify JRAG with agent org structure" --body "..."
```

### Phase 8: Begin Execution

Once PR is merged:

1. **CEO runs first `/office-hours`** on "build Professionnels landing page"
2. **Design lead creates mockup** for 3-section Professionnels layout
3. **Content strategist writes copy** (rigorous tone, B2B language)
4. **Frontend dev builds page** using `jrag-page-templates` + `jrag-animation-patterns`
5. **Team ships** within 1 week

Expected: 2-3 pages per week shipping with this rhythm.

---

## Support & Questions

- **Brand questions?** Read `AGENTS.md` (fast operating brief)
- **Agent role unclear?** Read `agents/{slug}/AGENTS.md` (role-specific brief)
- **How to design a page?** Use `jrag-brand-implementation` + `jrag-page-templates` skills
- **How to animate?** Use `jrag-animation-patterns` skill
- **Need advanced sprint features?** Install gstack (optional)

---

**Companified:** 2026-03-29 by OpenCode  
**Org Type:** Flat (CEO + 4 specialists) with mandatory DB manager  
**Tech:** Next.js 16, React 19, TypeScript 5, GSAP, Three.js  
**Brand:** Luxury seafood, editorial-industrial, premium + credible  
**Target Velocity:** 2-3 pages/week once pipeline warm

Let's ship JRAG. 🚀
