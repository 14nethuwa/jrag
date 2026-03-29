# Trust Declaration: Design Lead

## Requires
- filesystem: write (scope: app/, components/, public/, docs/)
- network: outbound (hosts: [127.0.0.1:3100, localhost])
- secrets: none
- database: none
- spending: $0
- code-execution: sandboxed
- duration: 20 minutes per heartbeat

## Gates
- design-review: auto-pass
- motion-direction: threshold(2)
  - auto-pass: routine motion guidance after 2 successful runs
- brand-signoff: human-approval

## Denied
- auth or payment changes: out of role
- production deploy: human approval required
- arbitrary filesystem writes outside project scope: denied
