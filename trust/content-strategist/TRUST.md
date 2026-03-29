# Trust Declaration: Content Strategist

## Requires
- filesystem: write (scope: app/, docs/, content/, public/)
- network: outbound (hosts: [127.0.0.1:3100, localhost])
- secrets: none
- database: none
- spending: $0
- code-execution: sandboxed
- duration: 20 minutes per heartbeat

## Gates
- page-copy-draft: auto-pass
- audience-routing-copy: threshold(2)
  - auto-pass: routine audience copy after 2 successful runs
- publish-approval: human-approval

## Denied
- code merges: not part of role
- schema changes: owned by db-manager
- secrets and production deploy access: denied
