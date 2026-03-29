# Deploy Pipeline

### Step 1: Build
- skill: vercel-react-best-practices
- agent: frontend-dev
- gate: auto-pass
- timeout: 10m

### Step 2: Test
- skill: gstack-qa
- agent: frontend-dev
- input: ${step-1.output}
- gate: auto-pass

### Step 3: Stage
- skill: security-review
- agent: db-manager
- input: ${step-2.output}
- gate: auto-pass

### Step 4: Production
- skill: gstack-ship
- agent: ceo
- input: ${step-3.output}
- gate: human-approval

## Rules

- Production always stays behind a human approval gate
- DB manager validates security-sensitive release surfaces before production
