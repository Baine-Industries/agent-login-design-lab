# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype-specific design decision

This slice adapts the Imrahil Website Redesign paper-editorial system: Inter UI copy, Manrope display headings, IBM Plex Mono annotation labels, warm paper surfaces, low-contrast hairlines, and restrained gold/rust/moss accents. The layout is Vault Space-first with a center Vault Item list and right inspector. Keep a separate approval rail, live browser, and task workbench out of this slice; request review belongs in Agent Activity.

Use recognizable local service brand marks when a Vault Item represents a known company. Cache display assets in `public/logos/` rather than depending on a live logo request at runtime; keep the logo a visual identifier, not a trust or security claim.

Keep the center category row scoped to categories represented in the active Vault Space, plus categories explicitly added by the user. Do not show static empty categories or controls whose interaction is not implemented; search, category add, and item creation should each have one clear job.

The left rail is the top-level Vault Space manager: switch spaces, create spaces with a type-specific icon, and use each space's overflow menu for rename, same-type merge, archive, or permanent delete. Global Settings owns archived-space recovery and theme. Do not show item counts in the left rail. The footer shows the current user and the active space's `Vault Access Live` or `No Vault Access` state.

Keep the center Vault Item list scrollable without visible scrollbar chrome; scrolling is an available behavior, not a persistent visual marker.

The left Vault Space rail is closed for this prototype pass. Reopen that decision before adding new navigation, status, or management controls.

Agent-native structure is implicit in the product and should not be announced with visible `AGENT-READABLE` labels or machine-syntax badges. Keep the center list human-focused; field counts and relative update times remain open decisions, while any external-link affordance must only appear when it actually opens the service site.

Center pane decisions: the right inspector remains structurally open; selecting a row switches the inspected Vault Item. Rows show only the service identity, descriptor/account context, and category. Record freshness appears in the inspector, not the list. Search covers human-visible metadata and custom-field labels/values, never password or MFA secrets. The default list stays flat, and categories may vary by Personal versus Business Space Type.

The full category seed set is context-sensitive: Personal and Business Vault Spaces receive different category options, while All Spaces exposes the union and custom categories remain scoped to their owning Space. Manage Core Info belongs in the top-left Vault breadcrumb bar beside the active Vault Space.

Core Info is editable per Vault Space. In the future Vault Item editor, matching Core Info values prefill the item fields for faster entry; the user can edit the populated value directly without an inheritance or override control.

Editing is explicit and commit-oriented. Vault Item and Core Info surfaces are read-only by default; an explicit Edit action opens working values. Closing a dirty Vault Item editor requires a discard confirmation. The Vault Item editor has one `Save` action: validate the fields and replace the saved agent-readable snapshot together. There is no separate draft or compile action in that flow. Agent ID reads the saved snapshot, not values that are still open in the editor.

Validation is the safety boundary for agent use. Before saving, validate required values, field types, canonical machine keys, duplicate/conflicting mappings, and any explicitly provided Site Field Labels. Site Field Labels are optional mapping details; never infer one from a human label or require users to guess a website's internal name. Saving should fail with an actionable field-level message rather than silently guessing an ambiguous mapping. The saved record is read-only in the inspector; edits return to working values in the modal.

Reusable custom fields are typed saved values, not hidden inheritance. A user can explicitly choose a previously filled field—such as an email, credit card, phone number, address, or Tax ID—when creating or editing another Vault Item or Vault Space. Keep the human label, semantic type, canonical key, and optional Site Field Label mapping separate. Reusing a field fills the destination's working values; it does not silently update other records. Updating the saved reusable value or applying it across several destinations requires an explicit confirmation with the affected destinations listed.

Reusable fields may be offered across Vault Spaces, but selection is always explicit because a value can belong to a different person, family member, business, or legal entity. Core Info remains owned by its Vault Space; a reusable field is a user-owned library value that can be copied into a destination's working values. Cross-space live synchronization is not part of this slice.

The agent-write frontier is agent-first. Website form fields are temporary Form Observations until a Mutation Request is approved. New Vault Items require confirmation; unambiguous updates may use a task-scoped `vault_write` grant. Unknown field types and unstable mappings surface as attention states and cannot become reusable values until classified. Agent mutations are atomic per Vault Item, carry field-level diffs and provenance, and hold a renewable item-level Agent Edit Lock while active. A locked item is view-only to humans; stopping the task safely releases the lock. `vault_delete` and batch writes are separate scopes.

The desktop companion is a compact macOS menu-bar or Windows system-tray surface with Pending Requests, Active Tasks, Needs Attention, and Recent Activity. Agent Activity is also a global left-rail destination beside Settings. Pending requests open a compact review with Approve or Reject; running tasks open a compact detail with View locked item and Stop task; the companion mirrors the unresolved count and opens the same Agent Vault review. Keep the human edit modal focused on direct record editing; an Agent Edit Lock changes the affected inspector action to View only until the task stops or completes.

The prototype exposes a browser-preview companion from the top bar so both host treatments can be tested before native wrapping. The macOS presentation uses the rounded paper popover; the Windows presentation uses the same four groups with tighter tray geometry. Both are one Activity surface, not a second data model. Native registration, OS badges, live event transport, focus/launch, and click-away dismissal remain host integration work.

The `/companion` route is the host-focused playground: macOS menu-bar and Windows taskbar/tray chrome sit outside a separate Agent Vault window treatment. Platform switching is an external test control; the popover itself does not expose a platform selector. The route remains demo/in-memory and must not be presented as native integration.

Agent Activity is a glanceable inbox and status/history view. Use status labels such as `Pending`, `Running`, `Needs attention`, and `Saved`. A `Needs attention` row may deep-link to the affected Vault Item. A pending request opens a concise review; approve or reject it there. Do not add request editing, raw secrets, or active-task stop controls to the record editor.

Person identity data should be granular enough for real forms: first name, middle name, middle initial, last name, full name, preferred name, prefix, and suffix. Full name and middle initial may be suggested from the component fields, but the stored value and whether it was manually entered remain explicit so multi-part names are not guessed incorrectly.

Vault Space names are limited to 32 characters at creation and rename time. The left rail wraps long names within the Space row instead of allowing text to overflow its container.

The center page heading leads with the active Vault Space name. Do not add decorative section numbering such as `01 / VAULT MANAGEMENT` unless it carries a real navigation or workflow purpose.

Adding a Vault Item requires an owning Vault Space. The add form defaults to the active space, allows choosing any non-archived space, and switches to the created space after submission so the new record is visible.

Global Settings includes three tuned text-size presets: Small preserves the current type scale, Medium is a restrained increase, and Large matches the larger reading scale approved in the prototype. The presets scale the app-wide typography without introducing continuous slider states. The preference is currently in-memory for the prototype; persist it per user or device in the production settings layer.

The closed left and center slice contains no inert inspector actions. Vault Item field editing and custom-field creation belong to the next right-inspector slice. All Spaces shows `No Space Selected` in the footer because Access Status belongs to an active Vault Space.

Record ID remains visible in the inspector footer as a stable pointer for agent-readable records. Access Grant status remains outside the inspector until the access workflow is designed.
