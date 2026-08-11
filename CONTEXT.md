# Agent Vault domain context

Status: active

## Product vocabulary

- **Agent Vault**: The local source of truth for a person's user-owned vault items, including account credentials, account metadata, and personal or business data needed for approved tasks.
- **Vault Item**: A service or account record in Agent Vault. A Vault Item may contain login fields and typed personal, business, or service-specific fields.
- **Core Info**: Reusable local personal or business information, such as a name, contact detail, or address, that can prefill matching fields in Vault Items. The populated value remains directly editable for the individual item.
- **Vault Space**: A named container within Agent Vault for one Personal person or Business entity. A Vault Space owns its own Core Info and Vault Items; users may create multiple spaces for family members, businesses, or other supported ownership contexts.
- **Space Lifecycle**: A Vault Space may be renamed, merged into another Vault Space of the same Space Type, archived for later retrieval under global settings, or permanently deleted together with its records.
- **Site Field Label**: The field name or mapping used to target the corresponding field on a service's website. It may differ from the human-facing label shown in the Vault UI.
- **Access Grant**: A short-lived, scoped authorization issued by Agent Vault and received by Agent ID. Its lifetime may be daily or session-based. An Access Grant authorizes specific field use; it is not a second vault and does not expose raw secrets to the model.
- **Vault Access Status**: The current human-readable state of access for the active Vault Space: `Vault Access Live` when an agent authorization is active, or `No Vault Access` when it is not. This status does not define the issuer, rotation mechanism, or Agent ID transport.
- **Agent ID**: The receiving identity and handoff endpoint for an Access Grant. Agent ID is not the source of truth for vault items.
- **Space Type**: The ownership type of a Vault Space, initially `Personal` or `Business`; it is not a separate vault or only a list filter.
- **Permission Scope**: The authorization boundary named by an adapter event, such as `vault_read`. It is distinct from a Vault Space's Space Type.
- **Category**: A searchable user-facing service grouping such as Banking, Housing, Utilities, Taxes, ERP, or a custom category. Categories organize Vault Items without requiring a permanent navigation tree.
- **Vault Record**: A secret-safe machine-readable representation of a Vault Space or Vault Item used by the UI and retrieval surfaces. It carries identity and metadata, not raw secret values.
- **Field Descriptor**: The structured identity and state of a Vault Item field, including its machine key, human label, type, Site Field Label, and whether its value was prefilled from Core Info. A descriptor does not contain a secret value.
- **Agent-native**: A product boundary that is machine-readable and structured for agent access while remaining understandable and useful in the human UI.
- **Approval rail**: A future UI surface for reviewing and approving Access Grant requests. It is outside the first vault-management prototype.

## Boundary

Agent Vault owns Vault Spaces, records, Core Info, and controls access. Agent ID receives scoped Access Grants. Core Info is reusable local vault data owned by a Vault Space, not Agent ID. The first frontend slice designs the vault-management experience; it does not implement credential rotation, encryption, live browser execution, approval workflows, or an Agent ID endpoint.
