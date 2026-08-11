# Agent-native record and query contract

Status: research recommendation for the first Agent Vault frontend slice

## Question

What minimum structured record, field, category, keyword, and query semantics can the UI design rely on while remaining compatible with the repository's documented engine/UI boundary and future Access Grant handoff?

## Evidence

- The UI must attach through a stable adapter boundary rather than engine internals (`docs/contracts/engine-ui-boundary.md:3-7`).
- The documented boundary permits local HTTP JSON, websocket events, CLI NDJSON, or file-backed snapshots (`docs/contracts/engine-ui-boundary.md:63-70`).
- Adapter payloads must not contain plaintext passwords, tokens, or decrypted secret material, and the UI must not depend on vault storage formats or direct decrypted-credential access (`docs/contracts/engine-ui-boundary.md:60-79`).
- Agent Vault is the source of truth. A Vault Space owns Core Info and Vault Items; a Vault Item contains fixed login fields and typed custom fields (`CONTEXT.md:7-16`, `docs/design/agent-vault-frontend-brief.md:9-11`).
- The first UI slice needs search, space switching, grouping by service/person/business, custom categories, and machine-readable field names, categories, and keywords (`docs/design/agent-vault-frontend-brief.md:13-24`).
- Access Grant issuance, Agent ID transport, approval UI, and production secret architecture are deferred (`CONTEXT.md:19-21`, `docs/design/agent-vault-frontend-brief.md:26-32`).

The referenced engine repository is not available in the local workspace, and the configured GitHub identity could not resolve `AdamGeorgesForges/agent-login-harness`. This recommendation therefore relies on the UI repository's documented boundary rather than unverified engine internals.

## Recommendation

Use a secret-safe, read-oriented record shape underneath the UI. The design should assume four concepts:

1. `VaultSpaceRecord`
   - `space_id`
   - `name`
   - `space_type`: `personal` or `business`
   - `keywords`
   - `core_info_field_keys`: the reusable field keys available in this space

2. `VaultItemRecord`
   - `item_id`
   - `space_id`
   - `space_type`: denormalized `personal` or `business` result metadata
   - `service_name`
   - `site`
   - `account_label`
   - `category_ids`
   - `keywords`
   - `field_descriptors`
   - `updated_at`

3. `FieldDescriptor`
   - `field_id`: stable field identity
   - `field_key`: stable machine-readable key
   - `label`: human-facing label
   - `site_field_label`: exact website-facing field name or mapping when known
   - `type`: one of the resolved field types from the item model
   - `sensitivity`: `public`, `private`, or `secret`
   - `source`: `core_info`, `item_value`, or `item_override`
   - `value_state`: `empty`, `set`, or `redacted`

The descriptor may expose field state and metadata, but never a secret value. A future write or Access Grant flow can refer to `space_id`, `item_id`, and `field_key` without returning the underlying credential to the model.

4. `CategoryRecord`
   - `category_id`
   - `label`
   - `space_type_compatibility`: `personal`, `business`, or `both`
   - `origin`: `seeded` or `custom`
   - `keywords`

Seeded and custom categories share the same query shape. The UI should treat categories as searchable labels, not as a fixed navigation hierarchy.

## Query semantics

The minimum query surface should support:

- free-text search across service name, site, account label, non-secret login identifier, category label, keywords, and Site Field Labels;
- exact filters for `space_id`, `space_type`, `category_id`, and `site`;
- optional grouping by `service`, `space`, or `category`;
- stable result identity via `space_id` plus `item_id`;
- a result summary that contains metadata and field descriptors, never secret values.

Search should be cross-space by default in the all-spaces view and space-scoped when a Vault Space is selected. Multiple accounts at one service remain separate results; grouping must not merge them into one record.

## Future handoff boundary

When Access Grants are designed later, the handoff should reference opaque identifiers and a declared permission scope such as `vault_read`, plus `space_id`, `item_id`, `field_keys`, `target_site`, and `duration`. The grant response may report authorization state, but it must not expose raw credential values. This is a forward-compatible design constraint, not part of the first vault-management prototype.

## Unresolved

- Whether the eventual adapter exposes these records through HTTP JSON, CLI NDJSON, or file-backed snapshots; the boundary allows all four transport families.
- Whether `site` is a canonical URL, host, or service identifier; the UI should display a friendly service name and retain a separate machine-facing site identifier.
- Whether non-secret values are returned to the UI directly or only represented by `value_state`; the prototype should use fake data and redaction states until the engine contract explicitly permits more.
