# Agent Vault developer handoff

Status: ready for V1 backend implementation from `design/studio`.

This is the developer-agent pickup note for the Agent Vault prototype. The
callouts below are implementation guidance, not a claim that deferred engine,
Agent ID, or OS-companion services already exist.

## Build now

- Implement the domain in [`CONTEXT.md`](../../CONTEXT.md): Vault Spaces,
  Vault Items, Core Info, Reusable Fields, Field Descriptors, Compiled Agent
  Records, Mutation Requests, Agent Edit Locks, and Audit Records.
- Keep human and agent clients on the same record model. The normal agent path
  is task-scoped and permissioned; human editing is the fallback and control
  surface.
- Make create, update, archive, restore, and delete operations explicit and
  auditable. New records require confirmation; permanent deletion requires
  deliberate human confirmation.
- Preserve atomic per-item writes, field-level diffs, provenance, and an
  item-level Agent Edit Lock. A locked item is view-only to humans until the
  task stops or completes.
- Expose the adapter through one of the allowed stable transports in
  [`engine-ui-boundary.md`](../contracts/engine-ui-boundary.md). Keep payloads
  secret-safe and structured.
- Treat Site Field Labels as optional exact mappings. Unknown or dynamic names
  remain blank and unresolved; the system does not infer them from friendly
  labels.
- Use [`os-companion.md`](os-companion.md) for the frontend prototype of the
  macOS menu-bar and Windows tray companion. Keep the native host bridge behind
  the documented adapter boundary.

## Deferred boundary

- Access Grant issuance, daily/session rotation, and Agent ID transport.
- Agent ID notification and response transport for Verification Challenges.
- Browser execution, live-site proof, encryption, credential storage, and
  production security architecture.
- Native menu-bar/tray registration, OS badge delivery, click-away dismissal,
  Agent Vault focus/launch, and live companion event transport. The companion
  UI preview itself is now implemented in the prototype.

These boundaries are defined in [`CONTEXT.md`](../../CONTEXT.md), the
[`engine/UI contract`](../contracts/engine-ui-boundary.md), and the
[`agent-write contract`](../research/agent-write-contract.md). Update those
authoritative files before changing an integration assumption.

## Completion check

The backend handoff is complete when the UI can create and review a Vault Item,
save a validated Compiled Agent Record, submit and resolve a Mutation Request,
hold and release an Agent Edit Lock, and read immutable Audit Records through a
documented adapter without exposing plaintext secrets.
