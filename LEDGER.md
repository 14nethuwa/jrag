# JRAG Agent Ledger

**Enabled:** Yes ✅  
**Purpose:** Verifiable execution history, trust permissions, workflow gates

## Overview

The Agent Ledger tracks every agent action, decision, and shipped code. It serves as:

1. **Execution History** — What did each agent do? When? Why?
2. **Trust Boundaries** — What's each agent allowed to do?
3. **Workflow Gates** — What decisions need approval before proceeding?
4. **Audit Trail** — Complete record for compliance and learning

---

## Agent Execution Record Template

```yaml
agent: frontend-dev
task: "Implement Professionnels landing page"
status: "shipped"
startDate: 2026-04-01
endDate: 2026-04-05
duration: "4 days"
prLink: "https://github.com/14nethuwa/jrag/pull/42"

decisions:
  - decision: "Use Story template + Proof section"
    context: "Decided via noble vs rigorous archetype"
    approvedBy: ceo
    date: 2026-04-01

  - decision: "Implement parallax hero with orange CTA"
    context: "Design lead direction"
    approvedBy: design-lead
    date: 2026-04-02

output:
  - file: "app/(public)/professionnels/page.tsx"
    linesAdded: 342
    linesRemoved: 0
    
  - file: "components/prof-hero.tsx"
    linesAdded: 127
    linesRemoved: 0

testCoverage:
  - testsAdded: 8
  - testsPassed: 8
  - bugsFound: 0
  - bugsFixed: 0

quality:
  lighthouse: 76
  typeScriptErrors: 0
  lintErrors: 0
  accessibilityIssues: 0

learning:
  - "Parallax performs well on mobile if we limit transform animations"
  - "Story template should include mobile-specific image sizing"
  - "Orange CTA stands out against sand background without extra styling"
```

---

## Trust Permissions Matrix

| Agent | Can Create Pages | Can Modify Styles | Can Change DB Schema | Can Merge to Main | Can Deploy |
|-------|------------------|-------------------|----------------------|-------------------|------------|
| **ceo** | No | No | No | Yes | No |
| **frontend-dev** | Yes | Yes | No | No | No |
| **design-lead** | No | Yes | No | No | No |
| **content-strategist** | No | No | No | No | No |
| **db-manager** | No | No | Yes | No | No |

---

## Workflow Gates

### Gate 1: Brand Archetype Approval

**When:** Any new page or major feature  
**Owner:** CEO  
**Decision:** Noble, Rigorous, or Both?  
**Blocks:** Design + Frontend work until decided

### Gate 2: Design Approval

**When:** Design mockup complete  
**Owner:** Design Lead  
**Decision:** Approve visual direction or request changes  
**Blocks:** Frontend dev starts coding

### Gate 3: Content Approval

**When:** Copy written  
**Owner:** Content Strategist + CEO  
**Decision:** Approve tone, accuracy, audience alignment  
**Blocks:** Shipping the page

### Gate 4: Code Review

**When:** Frontend dev submits PR  
**Owner:** Design Lead (visual) + CEO (brand)  
**Decision:** Approve code quality or request changes  
**Blocks:** Merge to main

### Gate 5: Security Audit (for DB/Auth changes)

**When:** DB manager submits schema or auth changes  
**Owner:** DB Manager (self) + CEO (governance)  
**Decision:** Approve security or request changes  
**Blocks:** Deploy to production

---

## Execution Log (Sample)

```yaml
2026-04-01:
  agent: ceo
  action: "Run /office-hours for Professionnels landing"
  status: completed
  duration: 45min
  output: "Reframed as 'proof of luxury' not just 'facts'"
  decision: "Use Story + Proof template (both archetypes)"
  approvalRequired: false

2026-04-01:
  agent: design-lead
  action: "Create Professionnels mockup"
  status: inProgress
  output: "Figma file: link"
  nextStep: "CEO approval of archetype"

2026-04-02:
  agent: ceo
  action: "Approve design mockup"
  status: approved
  approvalFor: "design-lead to proceed with specs"
  notes: "Good balance of noble (oyster image) + rigorous (specs grid)"

2026-04-02:
  agent: content-strategist
  action: "Write Professionnels landing copy"
  status: inProgress
  tone: "B2B, rigorous"
  nextStep: "CEO + design lead review"

2026-04-03:
  agent: ceo
  action: "Approve content copy"
  status: approved
  notes: "Tone is perfect. Sentence about capacity needs one number fix."
  approvalFor: "frontend-dev to start building"

2026-04-03:
  agent: frontend-dev
  action: "Build Professionnels landing page"
  status: inProgress
  template: "Story + Proof"
  dependencies: ["design-lead specs", "content-strategist copy"]
  
2026-04-05:
  agent: frontend-dev
  action: "Submit PR for Professionnels landing"
  status: reviewNeeded
  prLink: "https://..."
  approvalRequired: ["design-lead (visual)", "ceo (brand)"]

2026-04-05:
  agent: design-lead
  action: "Review Professionnels PR"
  status: approved
  notes: "Hero image sizing looks good. Parallax feels smooth."
  approvalFor: "ceo final brand review"

2026-04-05:
  agent: ceo
  action: "Review Professionnels PR"
  status: approved
  decision: "Ship it"
  approvalFor: "Merge to main"

2026-04-05:
  agent: frontend-dev
  action: "Merge Professionnels PR to main"
  status: completed
  prLink: "https://..."
  
2026-04-05:
  agent: ceo
  action: "Extract learnings"
  status: completed
  learnings:
    - "Story + Proof template works for B2B landing pages"
    - "Parallax animation timing (scrub: 1) felt right"
    - "Orange CTA needs no additional styling against sand"
```

---

## Monthly Ledger Report

**Template:**

```
JRAG Agent Ledger — April 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTION SUMMARY
─────────────────
Total PRs Shipped: 8
Total Pages Implemented: 12
Average Review Time: 4 hours
Gate Approvals: 24/24 (100%)
Rollbacks: 0
Production Incidents: 0

PER-AGENT BREAKDOWN
───────────────────
CEO (Orchestrator)
  - Decisions Made: 8
  - Time in Reviews: 16 hours
  - Approval Blocking Rate: 0%

Frontend Dev
  - PRs Shipped: 8
  - Lines Added: 2,847
  - Test Coverage: 78%
  - Code Review Feedback: 12 items (avg 1.5/PR)

Design Lead
  - Design Reviews: 8
  - Changes Requested: 3 (12.5% revision rate)
  - Visual Consistency: 100%

Content Strategist
  - Pages Written: 12
  - Copy Revisions: 4 (average 0.3/page)
  - Tone Consistency: 100% (B2B + B2C aligned)

Database Manager
  - Schema Changes: 2
  - Security Audits: 2
  - Zero Security Issues: ✅

GATE EFFECTIVENESS
──────────────────
Brand Archetype Gate: Caught 1 design drift (prevented)
Design Approval Gate: 100% catch rate on visual issues
Content Approval Gate: 100% catch rate on tone misalignment
Code Review Gate: Caught 3 bugs before merge (0 production incidents)
Security Gate: 100% compliant

TEAM VELOCITY
─────────────
Pages/Week: 3.0
Average Days per Page: 2.3
Time Blocked by Gates: 12% (acceptable)
On-Time Delivery: 100%

LEARNING EXTRACTION
───────────────────
1. Story + Proof template is efficient for B2B pages
2. Orange CTA needs no additional styling on sand background
3. Parallax scrub: 1 timing feels right (recommended default)
4. B2B copy benefits from second review (caught 1 tone issue)
```

---

## Escalation Path

If a workflow gate is blocked:

1. **First:** Agent documents blockers in PR comment
2. **Second:** Agent tags CEO (escalation owner)
3. **Third:** CEO makes decision or asks for revision
4. **Fourth:** Agent implements feedback or pushes back with data

**Example:**

```
PR Comment:
@ceo This page needs the orange button, but design-lead says it "breaks 
the balance." Can we override? Test data shows orange CTA has 23% higher 
CTR than blue. Is brand consistency more important than conversion?

CEO Response:
Ship it. Brand consistency is a principle, but conversion matters. 
Orange button is on-brand anyway. Mark this as a learning: 
"B2B page CTAs default to orange for conversion."
```

---

## Ledger Files

- **Daily:** Agent adds entries to `.companify/ledger/YYYY-MM-DD.yaml`
- **Weekly:** CEO reviews and summarizes to `.companify/ledger/weekly/YYYY-W{week}.md`
- **Monthly:** CEO publishes monthly report to `docs/superpowers/ledger/`

---

**Enabled:** ✅ Agent Ledger  
**Audit Trail:** Complete  
**Decision Tracking:** All major decisions recorded  
**Learning Extraction:** Weekly summaries feed org memory
