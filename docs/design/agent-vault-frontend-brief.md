# Agent Vault frontend design brief

Status: working brief; not an implementation specification

## Destination

Design the first user-facing Agent Vault surface: a modular vault for service/account records that can hold login credentials, personal data, business data, and custom typed fields. The surface must be pleasant for a person to manage and structurally readable by an agent.

## Product model

Agent Vault is the source of truth. A named `Vault Space` represents one Personal person or Business entity, and each space owns its own Core Info and Vault Items. Users can create multiple spaces for family members or businesses/LLCs. A Vault Item represents one service or account inside a space and is organized by a default or custom category and a site/account identity. Each item has fixed login fields plus typed custom fields. Reusable local `Core Info` can populate matching fields across items, with per-item overrides. Custom fields may include an optional Site Field Label when the exact website field name is known; the UI never guesses it from the human label. Agent ID is the receiving identity for a short-lived Access Grant, not a second store of secrets.

## First slice

- Vault index with search, Space Type, category, and site/account filtering.
- Vault Space switcher plus an all-spaces view; results can be grouped by service, person, or business.
- Add and edit Vault Item flow.
- Login fields plus typed personal, business, and service-specific fields.
- Reusable Core Info with explicit per-item overrides.
- Site-facing field labels or mappings for custom fields.
- Custom categories available from the start.
- Seed categories for common Personal and Business services, including ERP for Business spaces; categories remain searchable labels and users can add more.
- Machine-readable field names, categories, and keywords underneath the human UI.
- The agent-native layer exposes secret-safe Vault Records and Field Descriptors with stable IDs, field types, optional Site Field Labels, Core Info source/override state, categories, keywords, and cross-space query metadata; it does not expose raw secret values.
- The editor does not expose an `MFA secret` field. A site verification challenge is handled as a user handoff: Agent Vault pauses, the intended future Agent ID flow notifies the user, and the user supplies a one-time code for that login only. The code is not saved or compiled.
- Redacted or fake data in all examples and prototypes.

## Agent-first mutation frontier

The shared agent-write surface is documented in [the agent-write contract](../research/agent-write-contract.md). It requires Form Observations, Mutation Requests, scoped Access Grants, renewable item-level Agent Edit Locks, provenance, and immutable Agent Activity. The desktop companion is a compact macOS menu-bar or Windows system-tray popover; Agent Vault exposes the full Agent Activity view from the left rail. The Activity request-review, active-task lock, and companion preview paths are now prototyped; native host integration, live engine mutation, and task transport remain deferred.

## Deferred

- Native menu-bar/tray registration, OS badge delivery, and live companion event transport.
- Approval rail and live agent task workbench beyond the prototyped Activity review and task detail paths.
- Access Grant issuance and rotation implementation.
- Browser automation and real-site proof.
- Agent ID schema, endpoint, or transport.
- Verification-challenge notification, one-time-code transport, or site-specific MFA automation.
- Encryption, credential storage, and production security architecture.

## Design test

The prototype should answer whether a person can quickly understand, create, and maintain a Vault Item without the product collapsing into either a generic password manager or an unbounded personal database.

## Visual direction

The Agent Vault prototype inherits the Imrahil Website Redesign paper-editorial system: Inter for UI copy, Manrope for display headings, IBM Plex Mono for annotation and machine-readable labels; warm paper ground `#e9e4d8`; panel `#f2eee3`; ink `#212528`; hairlines `#d3ccbc`; restrained gold `#7d5d28`, rust `#83473d`, and moss `#5f7b53` state accents. Use thin rules, left-keyed grid discipline, quiet rounded controls, and soft framed panels. Avoid dark-by-default AI styling, glows, dense card grids, and decorative gradients.
