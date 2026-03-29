# Code Review Pipeline

### Step 1: Write
- skill: jrag-page-templates
- agent: frontend-dev
- gate: auto-pass

### Step 2: Review
- skill: gstack-review
- agent: design-lead
- input: ${step-1.output}
- gate: auto-pass

### Step 3: Test
- skill: gstack-qa
- agent: frontend-dev
- input: ${step-2.output}
- gate: auto-pass

### Step 4: Merge
- skill: gstack-ship
- agent: ceo
- input: ${step-3.output}
- gate: human-approval

## Rules

- Use this pipeline for page, component, and interaction work in the JRAG site
- CEO only approves final merge after brand and delivery checks pass
