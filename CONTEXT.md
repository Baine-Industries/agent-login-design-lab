# Agent Vault domain context

Status: active

## Product vocabulary

- **Agent Vault**: The local source of truth for a person's user-owned vault items, including account credentials, account metadata, and personal or business data needed for approved tasks.
- **Vault Item**: A service or account record in Agent Vault. A Vault Item may contain login fields and typed personal, business, or service-specific fields.
- **Form Observation**: A temporary, agent-collected description of a website field, including its visible label, input type, required state, and stable site field name when available. It is not saved automatically.
- **Agent Mutation**: A structured create, update, archive, restore, or delete operation against Agent Vault records. It is scoped by an Access Grant and produces an Audit Record.
- **Mutation Request**: A human-reviewable proposal for one atomic Agent Mutation. It includes the target Vault Space and record, field-level changes, reason, expiry, and redacted values where needed.
- **Agent Edit Lock**: A renewable, item-level exclusive lock held while an agent is actively mutating a Vault Item. Human editing is disabled while the lock is active; stopping the task releases it safely.
- **Audit Record**: An immutable record of a human or agent change, including actor, task, target, permission scope, reason, affected fields, and restore or correction relationships.
- **Core Info**: Reusable local personal or business information, such as a name, contact detail, or address, that can prefill matching fields in Vault Items. The populated value remains directly editable for the individual item.
- **Reusable Field**: A typed, user-selected value saved for reuse in more than one Vault Item or Vault Space, such as an email address, credit card, or Tax ID. Reuse is an explicit fill action; it does not silently synchronize every destination.
- **Working Value**: A human-editable value in an item or Core Info editor. It remains local to the open editor until the user saves it.
- **Compiled Agent Record**: The validated, read-only snapshot of a Vault Record that Agent ID may receive when an applicable Access Grant is active. Agent ID reads the last compiled snapshot, not uncompiled working values.
- **Compilation**: The validation step performed when a value is saved. It validates field types, machine keys, and any explicitly provided Site Field Labels, then produces a new Compiled Agent Record. The UI exposes one Save action rather than separate draft and compile actions; it never guesses a website's internal field name from a human label.
- **Vault Space**: A named container within Agent Vault for one Personal person or Business entity. A Vault Space owns its own Core Info and Vault Items; users may create multiple spaces for family members, businesses, or other supported ownership contexts.
- **Space Lifecycle**: A Vault Space may be renamed, merged into another Vault Space of the same Space Type, archived for later retrieval under global settings, or permanently deleted together with its records.
- **Site Field Label**: An optional exact field name or mapping used to target the corresponding field on a service's website. It may differ from the human-facing label shown in the Vault UI and is left blank when the exact name is unknown.
- **Access Grant**: A short-lived, scoped authorization issued by Agent Vault and received by Agent ID. Its lifetime may be daily or session-based. An Access Grant authorizes specific field use; it is not a second vault and does not expose raw secrets to the model.
- **Vault Access Status**: The current human-readable state of access for the active Vault Space: `Vault Access Live` when an agent authorization is active, or `No Vault Access` when it is not. This status does not define the issuer, rotation mechanism, or Agent ID transport.
- **Agent ID**: The receiving identity and handoff endpoint for an Access Grant. Agent ID is not the source of truth for vault items.
- **Verification Challenge**: A site-requested one-time step that may pause an agent login. The intended future flow notifies the user through Agent ID and accepts the code for that login only; the code is not saved in a Vault Item or Compiled Agent Record.
- **Space Type**: The ownership type of a Vault Space, initially `Personal` or `Business`; it is not a separate vault or only a list filter.
- **Permission Scope**: The authorization boundary named by an adapter event, such as `vault_read`, `vault_write`, `vault_delete`, or a separately granted batch-write scope. It is distinct from a Vault Space's Space Type.
- **Category**: A searchable user-facing service grouping such as Banking, Housing, Utilities, Taxes, ERP, or a custom category. Categories organize Vault Items without requiring a permanent navigation tree.
- **Vault Record**: A secret-safe machine-readable representation of a Vault Space or Vault Item used by the UI and retrieval surfaces. It carries identity and metadata, not raw secret values.
- **Field Descriptor**: The structured identity and state of a Vault Item field, including its machine key, human label, type, optional Site Field Label, and whether its value was prefilled from Core Info. A descriptor does not contain a secret value.
- **Field Mapping**: An optional deliberate association between a reusable or Core Info field and a service's Site Field Label. Human labels may be friendly; a mapped Site Field Label must preserve the exact website field name needed by the adapter, while an unknown mapping remains blank.
- **Agent-native**: A product boundary that is machine-readable and structured for agent access while remaining understandable and useful in the human UI.
- **Approval rail**: The request-review surface inside Agent Activity. It reviews human-actionable Mutation Requests and Access Grant requests with a concise summary and explicit Approve or Reject actions.
- **Agent Activity**: The global view of pending requests, active tasks, attention states, and completed changes. Pending requests are actionable; completed changes remain immutable. In the desktop companion it appears as a compact menu-bar or system-tray popover; in Agent Vault it is a left-rail destination beside Settings.

## Boundary

Agent Vault owns Vault Spaces, records, Core Info, and controls access. Agent ID receives scoped Access Grants and is the intended notification handoff for future Verification Challenges. Core Info is reusable local vault data owned by a Vault Space, not Agent ID. Human and agent clients use the same record model; the agent-first mutation path uses temporary Form Observations, Mutation Requests, item-level Agent Edit Locks, and immutable Audit Records. The design repo includes a browser-preview OS companion for the shared Agent Activity surface; it does not implement credential rotation, encryption, live browser execution, verification notification, native OS registration, or an Agent ID endpoint.
