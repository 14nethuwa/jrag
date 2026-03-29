# JRAG Agent Ledger

This directory is the live package surface for JRAG's Agent Ledger layer.

## Purpose

- record execution history for agent-delivered work
- preserve approval and gate decisions
- keep a lightweight, repo-visible audit trail aligned with Paperclip runs

## Structure

- `executions/` stores execution record templates and shipped-run summaries
- `decisions/` stores durable decision records with approver context
- `gates/` stores gate definitions and gate outcomes for high-stakes actions

## Rules

- every production-impacting action gets a gate record before release
- every completed workflow can emit an execution record
- human approval is required for merge-to-main, deploy, spending, auth, and schema changes
