# Agent Vault frontend design brief

Status: working brief; not an implementation specification

## Destination

Design the first user-facing Agent Vault surface: a modular vault for service/account records that can hold login credentials, personal data, business data, and custom typed fields. The surface must be pleasant for a person to manage and structurally readable by an agent.

## Product model

Agent Vault is the source of truth. A Vault Item represents one service or account and is organized by `Personal` or `Business` scope, a default or custom category, and a site/account identity. Each item has fixed login fields plus typed custom fields. Reusable local `Core Info` can populate matching fields across items, with per-item overrides. Custom fields retain a Site Field Label so an agent can target the website's actual field name. Agent ID is the receiving identity for a short-lived Access Grant, not a second store of secrets.

## First slice

- Vault index with search, scope, category, and site/account filtering.
- Add and edit Vault Item flow.
- Login fields plus typed personal, business, and service-specific fields.
- Reusable Core Info with explicit per-item overrides.
- Site-facing field labels or mappings for custom fields.
- Custom categories available from the start.
- Machine-readable field names, categories, and keywords underneath the human UI.
- Redacted or fake data in all examples and prototypes.

## Deferred

- Approval rail and live agent task workbench.
- Access Grant issuance and rotation implementation.
- Browser automation and real-site proof.
- Agent ID schema, endpoint, or transport.
- Encryption, credential storage, and production security architecture.

## Design test

The prototype should answer whether a person can quickly understand, create, and maintain a Vault Item without the product collapsing into either a generic password manager or an unbounded personal database.
