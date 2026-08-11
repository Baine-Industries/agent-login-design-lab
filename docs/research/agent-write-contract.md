# Agent-write contract

Status: Wayfinder-resolved design contract; Agent Activity shell prototyped, mutation controls deferred.

## Purpose

Agent Vault is agent-first. Human and agent clients operate on the same Vault Spaces, Vault Items, Core Info, and typed fields. The human UI is the fallback and control surface; the normal agent path is task-scoped, permissioned, observable, and recoverable.

## Durable model

- `Vault Space` owns identity context and records for one person or business.
- `Vault Item` represents one service/account. Multiple accounts at the same service remain separate items.
- `Field Descriptor` represents a durable typed value. New values belong to the current Vault Item by default; promotion to the reusable library is explicit.
- `Form Observation` represents a website field observed during a task. It carries visible label, input type, required state, and a stable Site Field Label when available. It is temporary until approved for persistence.
- Field provenance is retained: `Core Info`, `Reusable Field`, `Human entered`, `Website observed`, or `Agent inferred`.

## Discovery and matching

1. The agent observes the current website form.
2. Agent Vault is queried for Core Info, reusable fields, and existing Vault Items.
3. Unambiguous matches may be filled temporarily.
4. Ambiguous matches pause for user selection; the agent never guesses between people, businesses, accounts, or reusable values.
5. Unknown semantic types are flagged, remain non-reusable until classified, and surface in Agent Activity.
6. A stable observed website field name may be saved as the Site Field Label after approval. Dynamic or uncertain names remain blank.
7. A new Vault Item always produces a Mutation Request before creation. The request may be edited before approval.

## Mutation and permission model

Mutation requests are atomic per Vault Item and include field-level changes, redacted sensitive values, target Vault Space, target site, reason, expiry, and permission scope.

- `vault_read` permits task-scoped reads.
- `vault_write` permits task-scoped create/update operations within its declared space, site, records, fields, and duration.
- `vault_delete` is separate; agent deletion archives by default.
- Permanent deletion requires deliberate human confirmation inside Agent Vault.
- Bulk changes require a separate batch-write permission.
- Requests expire with the task or Access Grant.

## Exclusive editing

An actively mutating Vault Item receives a renewable Agent Edit Lock. The human may view the item but cannot open its editor over the agent. The lock is released when the task completes, fails, expires, or is safely cancelled. Manual stop/cancel must stop the associated task before releasing the lock.

## Desktop companion and Agent Activity

The desktop companion uses the platform-native surface: a macOS menu-bar popover and a Windows system-tray popover. Both share this information architecture:

1. Pending Requests
2. Active Tasks
3. Needs Attention
4. Recent Activity

Pending requests drive the OS badge count. Active tasks show agent, target site, Vault Space, status, elapsed time, locked record, and Stop/Open actions. Needs Attention includes verification pauses, unknown field types, unstable mappings, expired requests, and blocked tasks. Full details open in Agent Vault.

Agent Vault exposes one global `Agent Activity` destination beside Settings. It is a glanceable status and history view containing immutable Audit Records for agent and human changes, task history, provenance, reasons, and restore/correction relationships. Needs-attention rows may deep-link to the affected Vault Item. Approve, reject, stop, and other task actions belong in the desktop companion or a future request-detail surface.

## Human UI boundary

The human edit modal remains a direct record editor with one Save action. Agent actions are represented through Mutation Requests, Agent Edit Locks, Agent Activity, and the desktop companion rather than agent controls embedded inside the form.

## Explicit non-goals

This contract does not implement the Agent ID transport, Access Grant issuer, encryption, browser execution, credential rotation, or production notification delivery.
