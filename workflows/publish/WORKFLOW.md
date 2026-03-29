# Publish Pipeline

### Step 1: Draft
- skill: brainstorming
- agent: content-strategist
- gate: auto-pass

### Step 2: Edit
- skill: ui-ux-pro-max
- agent: design-lead
- input: ${step-1.output}
- gate: auto-pass

### Step 3: Approve
- skill: jrag-brand-implementation
- agent: ceo
- input: ${step-2.output}
- gate: human-approval

### Step 4: Publish
- skill: gstack-ship
- agent: frontend-dev
- input: ${step-3.output}
- gate: human-approval

## Rules

- Use this for editorial pages, landing page copy refreshes, and route-level messaging changes
- Final publish stays human-approved even after CEO brand signoff
