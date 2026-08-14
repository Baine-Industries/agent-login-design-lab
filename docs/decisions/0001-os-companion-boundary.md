# ADR-0001: Keep the Agent Activity companion at the OS boundary

Status: accepted for the design lane
Date: 2026-08-13

## Decision

Agent Activity will be designed as a compact operating-system companion that
summarizes unresolved work and hands the person back to Agent Vault. It will
not become a second Agent Vault application, a second Activity data model, or
an engine implementation in this repository.

For the current design slice:

- use one shared four-group Activity model across macOS and Windows treatments;
- use demo/in-memory state for visual and interaction proof;
- keep OS chrome outside the Agent Vault window treatment in the browser
  playground;
- retain the smallest native macOS placement proof as feasibility evidence;
- defer production native registration, live transport, focus/launch behavior,
  and all credential/security behavior until their stable contracts exist.

The default future macOS direction is a retained native status item with a
transient anchored popover and custom companion content. A persistent opaque
nonactivating panel remains an explicit alternative, to be chosen only after
the popover-versus-panel proof answers whether the companion must remain open
while the person works elsewhere.

## Context

The companion needs to be discoverable while a person is outside Agent Vault,
but the design repo deliberately does not own the engine, vault storage,
Agent ID transport, or live browser execution. A browser-only card would not
answer the OS-placement question. A full native shell would introduce focus,
dismissal, multi-display, accessibility, packaging, and transport decisions
before the product anatomy is settled.

## Rationale

This boundary gives each proof one job:

| Proof | Question answered | Why it is the smallest useful proof |
| --- | --- | --- |
| Native macOS placement spike | Can the companion register at the real menu bar and open a host surface here? | It exercises the OS boundary without inventing backend behavior. |
| Browser desktop playground | Is the shared Activity surface legible in macOS and Windows host contexts? | It permits fast layout iteration and parity review without native packaging. |
| Agent Vault application | Where do approvals, task detail, editing, records, and recovery happen? | It preserves one source of truth and avoids duplicating workflows. |

The decision follows the project’s Wayfinder loop: start from the outcome,
preserve stable boundaries, make the smallest falsifiable proof, and document
the reason and evidence next to the decision.

## Alternatives considered

### Put Agent Activity inside Agent Vault only

Rejected for this slice. It is easy to build but does not test the user’s
actual OS-level requirement or return-to-review behavior.

### Build a full native macOS and Windows companion now

Deferred. It would conflate visual validation with packaging, live transport,
focus, and platform lifecycle work that the current contracts do not support.

### Use a custom always-on panel as the first macOS implementation

Deferred. It may provide stronger visual differentiation from Liquid Glass,
but its persistence and focus behavior are unresolved product decisions. A
transient native popover is the smaller default proof.

## Consequences

Positive:

- The companion feels OS-level in placement while remaining one Activity
  surface and one Agent Vault handoff.
- The design team can compare native and simulated host treatments before
  committing to a production shell.
- The repo remains attachable through documented contracts rather than engine
  internals.

Costs and risks:

- The browser playground cannot prove native registration, OS badges, live
  events, or focus handoff.
- The native spike is not a production app and must not be described as one.
- The eventual popover/panel choice still needs target-macOS verification,
  accessibility checks, multi-display checks, and a stable Activity transport.

## Affected paths

- `docs/design/os-companion.md` — current rationale, scope, and open decisions.
- `prototype/` — browser proof only; it must keep host chrome separate from the
  Agent Vault window.
- `docs/design/developer-handoff.md` — future native and backend boundaries.
- `CONTEXT.md` — product vocabulary and ownership boundaries.

## Enforcement

There is no mechanical ADR lint for this decision. Agents must read this ADR
before changing the companion and must preserve the four-group model, demo
boundary, and truthful real/simulated/deferred labeling. Review the changed
paths and the route/build/browser evidence at closeout.

## Verification

The current design slice is verified through the committed `/companion` route,
the prototype build/test checks, and the separate macOS placement proof
described in [`os-companion.md`](../design/os-companion.md). This ADR itself is
documentation; it does not claim that live transport, native production
registration, or security behavior exists.

## Revisit trigger

Revisit this decision when a stable Activity transport is documented, when the
native macOS host must ship rather than remain a feasibility spike, when the
Windows host technology is selected, or when persistent cross-application task
monitoring becomes a validated requirement.

## Related documents

- [`CONTEXT.md`](../../CONTEXT.md)
- [`docs/design/os-companion.md`](../design/os-companion.md)
- [`docs/design/developer-handoff.md`](../design/developer-handoff.md)
- [`docs/research/agent-write-contract.md`](../research/agent-write-contract.md)
