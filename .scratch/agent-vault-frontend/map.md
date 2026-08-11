# Agent Vault frontend design map

Status: open

Remote canonical map: [Agent Vault frontend design map](https://github.com/Baine-Industries/agent-login-design-lab/issues/2)

## Destination

Produce a design-ready specification and prototype direction for the first Agent Vault frontend slice: managing modular Vault Items, fields, scopes, categories, and machine-readable metadata. The result will be handed off to implementation on `design/studio`.

## Notes

- Domain: Agent Vault, Vault Item, Access Grant, Agent ID, scope, category, agent-native.
- Required skills: grilling, domain-modeling, product-design, prototype.
- The first prototype is vault management only. Approval rail and live agent execution are later work.
- Agent Vault is the source of truth; Agent ID receives an Access Grant.
- Access Grant is scoped and time-limited: daily or session-based. It authorizes field use without exposing raw secrets to the model.
- GitHub is the shared issue tracker and the remote issue is canonical. Local Markdown mirrors the map for review and offline work.

Remote child tickets:

- [Agent Vault item and field model](https://github.com/Baine-Industries/agent-login-design-lab/issues/3)
- [Agent Vault taxonomy and navigation](https://github.com/Baine-Industries/agent-login-design-lab/issues/4)
- [Agent-native record and query contract](https://github.com/Baine-Industries/agent-login-design-lab/issues/5)
- [Agent Vault management prototype direction](https://github.com/Baine-Industries/agent-login-design-lab/issues/6)

## Decisions so far

<!-- Closed child-ticket decisions are indexed here as the map advances. -->

## Not yet specified

- The canonical Vault Item and typed-field model.
- The information architecture for scopes, default categories, and custom categories.
- The minimum machine-readable record/query surface that keeps the UI agent-native.
- The visual hierarchy and interaction pattern for the vault-management prototype.

## Out of scope

- Implementing the Access Grant issuer, rotation mechanism, or cryptography.
- Building the approval rail or live browser/task workbench in the first slice.
- Defining or implementing an Agent ID schema, endpoint, or remote transport.
- Claiming production security, live-site compatibility, or real credential handling.
