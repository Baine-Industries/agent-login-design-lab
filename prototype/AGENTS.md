# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype-specific design decision

This slice adapts the Imrahil Website Redesign paper-editorial system: Inter UI copy, Manrope display headings, IBM Plex Mono annotation labels, warm paper surfaces, low-contrast hairlines, and restrained gold/rust/moss accents. The layout is Vault Space-first with a center Vault Item list and right inspector. Keep the approval rail, live browser, and task workbench out of this slice.

Use recognizable local service brand marks when a Vault Item represents a known company. Cache display assets in `public/logos/` rather than depending on a live logo request at runtime; keep the logo a visual identifier, not a trust or security claim.

Keep the center category row scoped to categories represented in the active Vault Space, plus categories explicitly added by the user. Do not show static empty categories or controls whose interaction is not implemented; search, category add, and item creation should each have one clear job.

The left rail is the top-level Vault Space manager: switch spaces, create spaces with a type-specific icon, and use each space's overflow menu for rename, same-type merge, archive, or permanent delete. Global Settings owns archived-space recovery and theme. Do not show item counts in the left rail. The footer shows the current user and the active space's `Vault Access Live` or `No Vault Access` state.

Keep the center Vault Item list scrollable without visible scrollbar chrome; scrolling is an available behavior, not a persistent visual marker.

The left Vault Space rail is closed for this prototype pass. Reopen that decision before adding new navigation, status, or management controls.
