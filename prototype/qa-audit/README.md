# Agent Vault three-pane audit

Date: 2026-08-11

Evidence captured from the local prototype at `http://localhost:4173/`:

- [01-current-three-pane.png](./01-current-three-pane.png) — baseline Adam Personal Vault Space with the left navigation, center item management, and right inspector visible.
- [02-category-configurable.png](./02-category-configurable.png) — center category row after adding a custom `Travel` category; it appears in the active space without changing the list away from `All items`.

## Left rail — Vault Space navigation

Current strengths:

- Personal and Business spaces are grouped and switch the active scope.
- `All spaces` is clear and the active space is visually marked.

KISS findings:

- Add Personal, Add Business, Recently viewed, and Settings are visible controls but do not have working prototype behavior.
- The local-first footer is useful trust context, but it should stay short.

Decision frontier: keep the rail to scope switching plus working creation/settings actions; remove or defer dead controls until each has a real flow.

## Center — Vault Item management

Current strengths:

- Search, item creation, category selection, row selection, and inspector handoff are understandable.
- Categories now show `All items` plus only categories present in the active Vault Space or explicitly added by the user.
- The add-category control opens a minimal form and leaves the user on `All items`, avoiding an empty filtered state.

KISS findings resolved in this pass:

- Removed the non-functional filter button.
- Removed the non-functional sort label and caret.
- Removed the non-functional `⌘ K` hint.
- When a filter returns no records, the stale inspector no longer remains open for an item outside the result set.

Remaining decision: whether row field counts and the external-arrow affordance earn their space after the left and right audits are settled.

## Right rail — Vault Item inspector

Current strengths:

- The selected service, redacted login fields, Core Info inheritance, custom fields, and exact Site Field Labels are visible in one place.
- The logo is a direct brand mark with no surrounding box.

KISS findings:

- Close inspector, Edit fields, More actions, and Add field need either working prototype behavior or removal from the first slice.
- The Core Info callout explains inheritance, but the `Review` action duplicates the Manage Core Info entry point and should be tested before keeping both.

Decision frontier: resolve the smallest useful inspector action set in the right-rail Wayfinder ticket.

## Limits

This is a visual and interaction audit of in-memory prototype behavior. It does not establish production accessibility conformance, keyboard support, persistence, security, or engine integration.
