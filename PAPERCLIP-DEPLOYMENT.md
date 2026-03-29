# JRAG Paperclip Deployment

**Date:** 2026-03-29  
**Status:** ✅ LIVE  
**Instance:** http://127.0.0.1:3100  

## Company Registration

JRAG company successfully created and registered with Paperclip control plane.

- **Company ID:** `2a9fa0a3-3c38-46b4-8c60-e40d04e76b81`
- **Issue Prefix:** `JRA`
- **Repository:** https://github.com/14nethuwa/jrag
- **Status:** Active

## Agent Roster (5 Agents)

All agents registered with proper reporting hierarchy. Each agent has full access to their instructions via `agents/{slug}/AGENTS.md`.

| Agent | ID | Title | Reports To | Status |
|-------|----|----|-----------|--------|
| **CEO** | `6ec4b725-5f2d-4513-8b6b-6cdde4d82a7a` | CEO / Project Orchestrator | — | ✅ Live |
| **Frontend Developer** | `2753a432-e6e1-48a7-ac5b-c3d5255ce18d` | Frontend Developer | CEO | ✅ Live |
| **Design Lead** | `9b7f7f81-dabc-4c08-8e54-84ae44f528e1` | Design & Visual System | CEO | ✅ Live |
| **Content Strategist** | `e17700f9-26da-42c2-8a94-bd6ee756baf8` | Content & IA Lead | CEO | ✅ Live |
| **Database Manager** | `82ab3437-c41c-435a-b101-c7f5fc2a54b3` | Database Manager | CEO | ✅ Live |

## Agent Instructions

Each agent loads its instructions from the repository:

- **CEO:** `agents/ceo/AGENTS.md`
- **Frontend Developer:** `agents/frontend-dev/AGENTS.md`
- **Design Lead:** `agents/design-lead/AGENTS.md`
- **Content Strategist:** `agents/content-strategist/AGENTS.md`
- **Database Manager:** `agents/db-manager/AGENTS.md`

Instructions include:
- Role and responsibilities
- Core skills and competencies
- Decision-making authority
- Handoff protocols
- JRAG brand operating brief

## Agent Communication & Hierarchy

### Reporting Chain
```
CEO (root)
├── Frontend Developer
├── Design Lead
├── Content Strategist
└── Database Manager
```

### Workflow Phases (from .paperclip.yaml)

1. **Think** — CEO + brainstorming team reframe problem
2. **Plan** — CEO review → Design review → Eng review
3. **Build** — Frontend + Content + Design work in parallel
4. **Review** — Code review, auto-fix flagged issues
5. **Test** — QA in real browser
6. **Ship** — Stage, commit, push, open PR
7. **Reflect** — Extract learnings, update org memory

## Skills Deployed

### All Agents Get
- `paperclip` — Heartbeat procedure, issue management, org communication

### Tier-1 Local Skills (from ~/.claude/skills/)
- `para-memory-files` → CEO (org memory, weekly synthesis)
- `brainstorming` → CEO, content-strategist
- `vercel-react-best-practices` → frontend-dev
- `requesting-code-review` → frontend-dev, design-lead
- `ui-ux-pro-max` → design-lead, content-strategist
- `database-schema-design` → db-manager
- `security-review` → db-manager
- `express-firebase-api` → db-manager

### Tier-3 Custom Skills (from this repo)
- `jrag-brand-implementation` → CEO, design-lead, content-strategist
- `jrag-page-templates` → frontend-dev, design-lead
- `jrag-animation-patterns` → frontend-dev, design-lead

## How to Delegate Work

### From OpenCode CLI
Agents are now accessible via Paperclip CLI and OpenCode CLI:

```bash
# Create a task for CEO
paperclipai issue create \
  --company-id 2a9fa0a3-3c38-46b4-8c60-e40d04e76b81 \
  --title "Build Professionnels landing page" \
  --description "Design and implement luxury B2B landing page" \
  --assignee-agent-id 6ec4b725-5f2d-4513-8b6b-6cdde4d82a7a

# Trigger CEO heartbeat
paperclipai heartbeat run --agent-id 6ec4b725-5f2d-4513-8b6b-6cdde4d82a7a
```

### From Paperclip Web UI
Visit: http://127.0.0.1:3100/JRA

- Create issues and assign to agents
- Monitor agent status in real-time
- View issue comments and status updates
- Check run logs and execution history

## Workflow Rules

See `.paperclip.yaml` for complete workflow configuration:

### Code Standards
- TypeScript strict mode required
- No `any` types
- GSAP animations must clean up (`ctx.revert()`)
- CSS Modules only (no Tailwind)
- Three fonts: Quicksand, Lato, Roboto Condensed
- Four colors: Ink, Sand, Orange, Blue

### Archetype Balance
- Every important page must balance "noble" + "rigorous"
- B2B copy uses "professionnels" language
- B2C copy uses "particuliers" language
- Never mix archetypes within a section

### Audience Separation
- B2B and B2C are separate journeys
- Shared pages accessible from both
- Navigation makes audience mode clear
- CTAs align to audience (Contact Pro vs Shop)

### Review Gates
- CEO reviews all brand/strategy decisions
- Design lead reviews all visual decisions
- Frontend dev reviews all code decisions
- Database manager reviews all data decisions

## Agent Ledger (Optional)

Agent Ledger integration can be enabled for:
- Verifiable execution history
- Trust permissions between agents
- Workflow gates enforcement
- Audit trail for board reviews

**Status:** Not yet configured (pending board request)

## Next Steps

1. **Enable Heartbeat Runs**
   - Set `runtimeConfig.heartbeat.enabled = true` for each agent
   - Configure wake triggers (daily standups, issue mentions, sprint phases)

2. **First Test Execution**
   - Create sample issue: "Build Professionnels landing page mockup"
   - Assign to CEO
   - Trigger heartbeat and observe workflow

3. **Skill Verification**
   - Confirm all 9 skills load correctly in agent heartbeats
   - Test skill invocation from agent instructions

4. **Scale Implementation**
   - Start delegating 60+ page implementations
   - Measure delivery velocity
   - Refine handoff protocols based on runs

## Support

For issues with agent access or Paperclip integration:

1. Check Paperclip instance: `curl http://127.0.0.1:3100/api/health`
2. View agent logs: `paperclipai agent get <agent-id>`
3. Run diagnostics: `paperclipai doctor`
4. Check company status: `paperclipai company get 2a9fa0a3-3c38-46b4-8c60-e40d04e76b81`

---

**Created:** 2026-03-29  
**Deployed By:** OpenCode Companify Agent  
**Last Updated:** 2026-03-29
