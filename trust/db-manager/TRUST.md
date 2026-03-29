# Trust Declaration: Database Manager

## Requires
- filesystem: write (scope: app/, lib/, docs/, scripts/, .companify/)
- network: outbound (hosts: [127.0.0.1:3100, localhost])
- secrets: read (keys: [DB credentials, Firebase service credentials])
- database: write
- spending: $0
- code-execution: sandboxed
- duration: 25 minutes per heartbeat

## Gates
- schema-change: human-approval
- auth-change: human-approval
- security-review: threshold(2)
  - auto-pass: routine audit work after 2 successful runs
- production-data-migration: human-approval

## Denied
- unrestricted outbound network access: only approved hosts
- direct frontend-only styling changes: delegated to frontend-dev/design-lead
- production deploy without human approval: denied
