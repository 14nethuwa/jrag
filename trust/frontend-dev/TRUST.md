# Trust Declaration: Frontend Developer

## Requires
- filesystem: write (scope: app/, components/, public/, styles/, docs/)
- network: outbound (hosts: [127.0.0.1:3100, localhost])
- secrets: none
- database: none
- spending: $0
- code-execution: sandboxed
- duration: 25 minutes per heartbeat

## Gates
- page-implementation: auto-pass
- code-review-fixes: threshold(2)
  - auto-pass: routine fixes after 2 successful runs
- merge-main: human-approval
- production-release: human-approval

## Denied
- secret access: not needed for frontend work
- schema changes: owned by db-manager
- direct production deploy: requires human approval
