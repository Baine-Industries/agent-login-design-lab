# Agent Vault domain context

Status: active

## Product vocabulary

- **Agent Vault**: The local source of truth for a person's user-owned vault items, including account credentials, account metadata, and personal or business data needed for approved tasks.
- **Vault Item**: A service or account record in Agent Vault. A Vault Item may contain login fields and typed personal, business, or service-specific fields.
- **Access Grant**: A short-lived, scoped authorization issued by Agent Vault and received by Agent ID. Its lifetime may be daily or session-based. An Access Grant authorizes specific field use; it is not a second vault and does not expose raw secrets to the model.
- **Agent ID**: The receiving identity and handoff endpoint for an Access Grant. Agent ID is not the source of truth for vault items.
- **Scope**: The ownership context assigned to a Vault Item, initially `Personal` or `Business`.
- **Category**: A user-facing service grouping such as Banking, Housing, Utilities, Taxes, or a custom category.
- **Agent-native**: A product boundary that is machine-readable and structured for agent access while remaining understandable and useful in the human UI.
- **Approval rail**: A future UI surface for reviewing and approving Access Grant requests. It is outside the first vault-management prototype.

## Boundary

Agent Vault owns records and controls access. Agent ID receives scoped Access Grants. The first frontend slice designs the vault-management experience; it does not implement credential rotation, encryption, live browser execution, approval workflows, or an Agent ID endpoint.
