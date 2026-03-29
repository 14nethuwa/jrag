# Trust Declaration: CEO

## Requires
- filesystem: read (scope: project root)
- network: outbound (hosts: [127.0.0.1:3100])
- secrets: none
- database: none
- spending: $0
- code-execution: denied
- duration: 15 minutes per heartbeat

## Gates
- brand-direction: human-approval
- workflow-approval: human-approval
- merge-release-handoff: threshold(3)
  - auto-pass: routine release handoff after 3 successful runs

## Denied
- direct code changes: implementation belongs to specialists
- direct database mutations: delegated to db-manager
- production deploy execution: requires human approval and specialist handoff
