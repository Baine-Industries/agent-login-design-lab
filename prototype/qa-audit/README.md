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

Decision resolved in this pass: the rail owns Vault Space switching and management, global Settings, and the active space's `Vault Access Live` / `No Vault Access` status. Item counts are removed. `Recently viewed` is removed from the first slice. Settings now opens a global surface for theme and archived-space recovery.

Space management is intentionally grouped under a Codex-style overflow menu: Rename, Merge, Archive, and Delete. Merge is limited to the same Space Type so Core Info and ownership boundaries remain coherent. Archive hides a space but keeps it recoverable under Settings; Delete permanently removes the space and its records.

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

## Dark mode follow-up — 2026-08-11

The first dark-mode pass changed surface variables but left inherited text color on the light `body` value, making Settings and page headings nearly unreadable. The shell now sets its dark foreground color explicitly, and light buttons receive a visible dark-theme border. Browser computed-style verification confirms light text on the dark shell, Settings modal, heading, and theme control.

## Viewport layout follow-up — 2026-08-11

The desktop app shell is viewport-bound. The left Vault Space rail and right item inspector remain fixed while only the center `.item-list` owns vertical scrolling. This prevents long record lists from pushing the global navigation or the current-user / Vault Access status out of view.

Verify the invariant in the browser: document scroll height equals the viewport height, `.item-list` has more content than its client height for a long list, and `.sidebar-foot` remains within the viewport.
