# Agent Vault frontend design brief

Status: working brief; not an implementation specification

## Destination

Design the first user-facing Agent Vault surface: a modular vault for service/account records that can hold login credentials, personal data, business data, and custom typed fields. The surface must be pleasant for a person to manage and structurally readable by an agent.

## Product model

Agent Vault is the source of truth. A named `Vault Space` represents one Personal person or Business entity, and each space owns its own Core Info and Vault Items. Users can create multiple spaces for family members or businesses/LLCs. A Vault Item represents one service or account inside a space and is organized by a default or custom category and a site/account identity. Each item has fixed login fields plus typed custom fields. Reusable local `Core Info` can populate matching fields across items, with per-item overrides. Custom fields retain a Site Field Label so an agent can target the website's actual field name. Agent ID is the receiving identity for a short-lived Access Grant, not a second store of secrets.

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
- The agent-native layer exposes secret-safe Vault Records and Field Descriptors with stable IDs, field types, Site Field Labels, Core Info source/override state, categories, keywords, and cross-space query metadata; it does not expose raw secret values.
- Redacted or fake data in all examples and prototypes.

## Deferred

- Approval rail and live agent task workbench.
- Access Grant issuance and rotation implementation.
- Browser automation and real-site proof.
- Agent ID schema, endpoint, or transport.
- Encryption, credential storage, and production security architecture.

## Design test

The prototype should answer whether a person can quickly understand, create, and maintain a Vault Item without the product collapsing into either a generic password manager or an unbounded personal database.

## Visual direction

The Agent Vault prototype inherits the Imrahil Website Redesign paper-editorial system: Inter for UI copy, Manrope for display headings, IBM Plex Mono for annotation and machine-readable labels; warm paper ground `#e9e4d8`; panel `#f2eee3`; ink `#212528`; hairlines `#d3ccbc`; restrained gold `#7d5d28`, rust `#83473d`, and moss `#5f7b53` state accents. Use thin rules, left-keyed grid discipline, quiet rounded controls, and soft framed panels. Avoid dark-by-default AI styling, glows, dense card grids, and decorative gradients.
