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

Resolved after the center audit: field counts and relative update times were removed from list rows, freshness moved to the inspector, and the external-arrow affordance was removed until it can open the service website.

## Center pane audit — 2026-08-11

Audit scope: the center Vault Item management pane only. Evidence was captured from the live prototype at the default Adam Vault Space state.

User goal: find a service or account quickly, narrow the list when needed, and select the correct Vault Item for inspection.

### Evidence and flow

1. [Baseline list](./04-center-pane-baseline.jpg) — Healthy. The pane has one primary add action, one search field, a scoped category row, and a direct list of recognizable services.
2. [Search for Chase](./05-center-pane-search-crop.jpg) — Healthy. Search returns one matching record, updates the record count, and keeps the selected Chase inspector coherent.
3. [ERP category](./06-center-pane-erp-crop.jpg) — Healthy. The active tab is clear and the list reduces to the three ERP records in the active Vault Space.
4. [No records](./07-center-pane-empty-crop.jpg) — Healthy. The empty state explains what to try next and the stale inspector closes when there is no matching record.
5. [Add category](./08-center-add-category-crop.jpg) — Healthy with a discoverability caveat. The plus control opens a focused form, and adding `Travel` makes the category available without switching the current list away from `All items`.

### Notable risks

- The category add control is icon-only. Its accessible label is present, but the visible affordance depends on the user understanding that the plus creates a category rather than filtering or adding a Vault Item.
- Search is currently exact substring matching across service, account, category, site, and custom-field labels. It is a good prototype behavior, but it is not yet the future semantic/RAG query contract.

### Recommended center decisions

- Keep the current three primary interactions: search, category filtering, and row selection.
- Keep `Add Vault Item` as the single primary creation action and `Manage Core Info` as the space-level secondary action.
- Keep record freshness in the inspector and only introduce an external-link action when it opens the service website.
- Preserve the no-results behavior and the dynamic category list.

Accessibility evidence is limited to the captured DOM and visible states. Keyboard traversal, focus order, zoom resilience, and assistive-technology announcements still need a separate check.

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
