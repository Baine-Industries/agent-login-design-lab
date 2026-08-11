# Right Inspector Audit

## Audit scope

Current Agent Vault right-side inspector for a selected Vault Item, including the record-switch interaction.

## User goal

Let a person understand one Vault Item at a glance, then move into a deliberate editing flow without adding controls that do not work yet.

## Captured steps

1. `01-selected-item-inspector.png` — Chase Checking selected. The inspector exposes Login, Core Info, Custom Fields, and `UPDATED 2h ago`.
2. `02-switched-item.png` — State Farm Insurance selected from the center list. The inspector switches to the new item and updates the category and freshness metadata.

## Strengths

- The panel remains open while the inspected record changes.
- Login, reusable Core Info, and custom fields are distinct sections.
- Inherited Core Info values are visibly differentiated from item-specific values.
- Record freshness is kept in the inspector rather than repeated in the center list.
- The current panel is intentionally read-only after the left and center slice cleanup.

## UX risks

- There is no functional path yet to edit a Vault Item, add a custom field, or override a Core Info value at the item level.
- The custom field site labels are useful for mapping but may be too technical for the default human reading view.
- There is no service-site action yet. An external action should only appear when it opens the stored site URL.
- Login values are redacted, but reveal, copy, and Access Grant behavior are not yet defined for the editor slice.

## Accessibility and evidence limits

- The DOM confirms the section structure and record-switch behavior, but keyboard-only traversal, screen-reader announcements, copy/reveal semantics, and error recovery still need implementation testing.
- The in-app browser screenshot backend tiled the captured frame, so pixel-level conclusions are limited to the live panel structure and visible hierarchy rather than the saved full-frame screenshots.

## Recommendations for the next inspector slice

1. Keep the default inspector read-only and add one working `Edit item` entry point when the editor exists.
2. Use a dedicated edit mode for service identity, login fields, site URL, and custom fields.
3. Treat Core Info as direct autofill: prefill matching fields in the item editor, then let the user edit those values normally.
4. Treat Site Field Label as the exact field name expected by the website. Show it as a secondary mapping detail in the item editor; keep the human-facing field label primary.
5. Add `Open website` only for records with a valid site URL.
6. Keep the stable Record ID visible for agent targeting, but keep Access Grant status out of this inspector until the access workflow is designed.
