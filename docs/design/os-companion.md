# Agent Vault OS companion

Status: desktop host playground and local macOS placement proof complete; production native host integration deferred.

## Wayfinder rationale

### Outcome

Give a person a glanceable, OS-level entry point to Agent Activity without
turning Agent Vault into a second task monitor or coupling this design repo to
unstable engine internals.

### Why this shape

- The companion belongs at the operating-system boundary because its value is
  fast awareness and return-to-review while the person is working elsewhere.
- Agent Vault remains the source of truth for vault records, access control,
  request review, task detail, and editing. The companion summarizes and hands
  off; it does not create a second Activity model.
- The four groups are retained because they map to different human actions:
  Pending Requests are actionable, Active Tasks are observable, Needs
  Attention are unresolved blockers, and Recent Activity is history.
- The macOS and Windows treatments share data meaning but adapt to host chrome.
  This tests the cross-platform information architecture without pretending a
  browser preview is native registration.
- The first proof is intentionally split: the smallest native feasibility
  spike answers “can this sit at the OS boundary here?”, while the browser
  playground answers “is the surface understandable and visually credible?”
  Building live transport or credential behavior before those answers would
  increase coupling without improving the design decision.

### Current decision and proof contract

The accepted boundary decision is [`0001-os-companion-boundary.md`](../decisions/0001-os-companion-boundary.md).
For each companion slice, the builder must be able to point to:

1. the user-facing outcome and the smallest changed surface;
2. the stable contract or in-memory fixture that supplies the visible state;
3. the distinction between real host behavior, simulated behavior, and
   deferred backend behavior;
4. the route/build/browser evidence that establishes the slice; and
5. the next unresolved decision, if the proof does not settle it.

This is the project-local application of the Wayfinder execution standard:
bounded outcome, contract-first change, explicit rationale, truthful evidence,
and a concise closeout. The external company standards are not copied here;
this document carries only the companion-specific decisions future builders
need.

## Current implementation status

- **Visual product proof — complete:** `/companion` renders the shared Activity
  surface with macOS and Windows host treatments and demo/in-memory interactions.
- **Real macOS host proof — complete:** `prototype/native-macos/` builds and
  runs a real AppKit `NSStatusItem` with a native transient popover using the
  system popover material. Its status item and popover have been verified on
  the target machine.
- **Production integration — not started:** no packaged app, launch-at-login,
  live Activity transport, OS badge service, Agent Vault focus/launch bridge,
  or Windows tray host exists yet.

This means the project is beyond a UI-only mockup, but it is not yet a
production companion. The next meaningful decision is the host integration
contract, not more visual polish.

The companion is a compact OS-surface view of Agent Activity. The prototype
keeps the existing in-app preview for regression coverage and adds a separate
`/companion` desktop playground so the surface can be judged outside the Agent
Vault application frame.

## Shared surface

Both platform presentations show the same four groups:

1. Pending Requests — actionable; opens the existing Approve or Reject review.
2. Active Tasks — shows the locked item; opens task detail or stops the task.
3. Needs Attention — opens the affected Vault Item editor at the unresolved
   field.
4. Recent Activity — read-only history.

The badge counts unresolved human actions only: pending requests plus Needs
Attention. Running tasks and saved history do not increase it.

## Platform treatment

- macOS: dark system-material/glass menu-bar popover, matching the native proof
  and the surrounding macOS companion ecosystem.
- Windows: the same dark, compact information hierarchy in a tighter
  tray-popover treatment; platform differences are limited to host chrome and
  corner treatment.
- Both surfaces open the same Agent Vault review and task flows. They do not
  create a second Activity model.

## First host proof

The smallest useful proof is both:

1. The local AppKit proof in `prototype/native-macos/` confirms that a real
   `NSStatusItem` can sit in the macOS menu bar on this machine and display the
   unresolved badge. It is a feasibility proof, not a production shell.
2. The committed browser playground at `/companion` shows the macOS menu bar
   and Windows taskbar/tray as host chrome around the same compact companion.
   The platform switch lives outside the popover because it is a test control,
   not a product control.

Run the visual proof from `prototype/` with `npm run dev`, then inspect
`http://localhost:5173/companion`. The existing Agent Vault preview remains at
`http://localhost:5173/`.

## Boundary

This prototype uses in-memory state and a web preview trigger. The native
proof proves menu-bar placement and a transient system-material popover can be
hosted by AppKit; its rows, badge count, and handoff are simulated. The
committed playground simulates the desktop chrome and Windows tray placement.

A production native shell still needs to provide menu-bar/tray registration,
OS badge state, click-away dismissal, launch/focus of Agent Vault, and a
transport for live Activity events. None of those are implemented backend
behavior. Access Grant issuance/rotation, Agent ID transport, Verification
Challenge notification, browser execution, encryption, credential storage,
and live event transport remain out of scope.

The companion must remain secret-safe: show targets, statuses, scopes, and
redacted summaries; never expose plaintext credentials or verification codes.

## Unresolved decisions

- Whether the production macOS host should use a transient `NSPopover` with a
  custom content view or a deliberately opaque nonactivating `NSPanel`.
- Which native Windows host technology will own tray registration and focus
  handoff.
- Which stable live Activity transport will replace the demo fixture.

These are owner/design decisions, not implementation gaps to silently resolve
inside the browser prototype.
