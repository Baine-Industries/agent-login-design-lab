# Agent Vault frontend design map

Status: open

Remote canonical map: [Agent Vault frontend design map](https://github.com/Baine-Industries/agent-login-design-lab/issues/2)

## Destination

Produce a design-ready specification and prototype direction for the first Agent Vault frontend slice: managing modular Vault Items, fields, scopes, categories, and machine-readable metadata. The result will be handed off to implementation on `design/studio`.

## Notes

- Domain: Agent Vault, Vault Space, Vault Item, Core Info, Access Grant, Agent ID, Space Type, Permission Scope, category, agent-native.
- Required skills: grilling, domain-modeling, product-design, prototype.
- The first management slice is vault management. Activity request-review, task-detail, and OS companion proofs are follow-on design-lane surfaces; live agent execution remains later work.
- Agent Vault is the source of truth; Agent ID receives an Access Grant.
- Access Grant is scoped and time-limited: daily or session-based. It authorizes field use without exposing raw secrets to the model.
- GitHub is the shared issue tracker and the remote issue is canonical. Local Markdown mirrors the map for review and offline work.

Remote child tickets:

- [Agent Vault item and field model](https://github.com/Baine-Industries/agent-login-design-lab/issues/3)
- [Agent Vault taxonomy and navigation](https://github.com/Baine-Industries/agent-login-design-lab/issues/4)
- [Agent-native record and query contract](https://github.com/Baine-Industries/agent-login-design-lab/issues/5)
- [Agent Vault management prototype direction](https://github.com/Baine-Industries/agent-login-design-lab/issues/6)

## Decisions so far

- [Agent Vault item and field model](https://github.com/Baine-Industries/agent-login-design-lab/issues/3) — one service/account per Vault Item, reusable Core Info with per-item overrides, typed custom fields, and optional Site Field Labels for exact website targeting when the exact website name is known.
- [Agent Vault taxonomy and navigation](https://github.com/Baine-Industries/agent-login-design-lab/issues/4) — named Personal or Business Vault Spaces own Core Info and items; all-spaces search, space switching, service/person/business grouping, seeded/custom categories, and ERP for Business.
- [Agent-native record and query contract](https://github.com/Baine-Industries/agent-login-design-lab/issues/5) — the UI relies on secret-safe Vault Records, Field Descriptors, Category Records, and cross-space metadata queries; raw secret values remain outside the adapter payload.
- [Agent Vault management prototype direction](https://github.com/Baine-Industries/agent-login-design-lab/issues/6) — Vault Space-first layout with a searchable center list and right inspector that exposes Core Info values, redacted login fields, and optional exact Site Field Labels; interactions stay in memory, with concise request review in Agent Activity and live browser execution deferred.
- [Agent Vault right rail: Vault Item inspector audit](https://github.com/Baine-Industries/agent-login-design-lab/issues/7) — keep the inspector open and read-only by default; show service identity, redacted sign-in fields, Verification status, Core Info values, custom fields, freshness, and stable Record ID. Editing opens a separate save modal.
- The design-lane implementation also includes the global Agent Activity request-review and task-detail proofs, plus the separate OS companion proof. These remain demo/in-memory surfaces and do not change the engine/UI boundary.
- [Agent Activity OS companion boundary](../../docs/decisions/0001-os-companion-boundary.md) — keep the companion at the macOS menu-bar or Windows system-tray boundary, share the four-group Activity model, and hand off approvals, task detail, editing, and recovery to Agent Vault.

### Edit and verification decisions

- The Vault Item editor is organized into `Record`, `Sign-in`, and `Fields` so a human can maintain an item without seeing the underlying machine model by default. Its header and single Save footer stay visible while the form body scrolls.
- `MFA secret` is not a human-editable Agent Vault field. It usually means a hidden TOTP seed, and Agent Vault cannot universally bypass a site's MFA challenge.
- Verification is runtime behavior, not an item-editing field. The inspector may show the concise status `Verification — User prompt if required`; if a site pauses for a one-time code, the intended flow is for Agent Vault to pause and notify the user through Agent ID. The user supplies the code for that login, and the code is not saved in the Vault Item or Compiled Agent Record.
- `Save` validates the record and replaces the saved Compiled Agent Record available to Agent ID. The prototype keeps working values local to the open modal and does not claim that the Agent ID notification or verification transport exists.
- Password replacement is explicit. Saved values are not silently exposed or overwritten while editing.
- Reusable fields can be selected across Vault Spaces and copied into the destination draft. An optional exact website field name remains a per-field detail.
- Website mapping is opt-in. The editor leaves the Site Field Label blank unless the user explicitly knows the exact website field name; it never creates a suggestion from the human label.

## Not yet specified

- The adapter event and response for a site verification challenge: delivery channel, user authentication, expiry, retry/lockout behavior, and anti-replay handling.
- Whether any future site-specific authenticator integration is allowed; no TOTP seed storage or automatic MFA generation is part of this prototype.

## Agent-write Wayfinder decisions

- The agent is the primary mutation client; the human editor remains the fallback and control surface.
- Website forms are temporary Form Observations, not Vault Items. Unmatched values stay temporary until a Mutation Request is approved.
- New Vault Item creation always requires a Mutation Request. Existing unambiguous updates may proceed under a scoped `vault_write` grant.
- Ambiguous matches pause for user selection. The agent never guesses across Vault Spaces, people, businesses, accounts, or reusable values.
- Agent mutations are atomic per Vault Item, previewed with field-level diffs and redacted sensitive values, and expire with the task or Access Grant.
- Agent Edit Locks are renewable and item-level. Human editing is disabled while an agent mutates the item; stopping the task safely releases the lock.
- `vault_delete` is separate from `vault_write`; agent deletion archives by default, while permanent deletion requires human confirmation. Batch changes require a separate batch scope.
- Field provenance is retained. Unknown semantic types and unstable mappings are flagged in Agent Activity and the desktop companion.
- Agent Activity is a global left-rail destination beside Settings. It is the human action inbox and status/history view: pending requests open concise Approve or Reject reviews, running tasks open Stop/View locked item details, needs-attention rows deep-link to the affected Vault Item, and saved rows remain history. The macOS menu-bar and Windows system-tray companion mirrors the unresolved count and opens the same Agent Vault review surface.


## Out of scope

- Implementing the Access Grant issuer, rotation mechanism, or cryptography.
- Building live browser/task execution or a production companion host in the design slice.
- Defining or implementing an Agent ID schema, endpoint, or remote transport.
- Implementing the verification-challenge notification or one-time-code handoff.
- Claiming production security, live-site compatibility, or real credential handling.

## Convergence note

The later UI and interaction refinements on `design/studio` are an
exploratory implementation pass against these resolved Wayfinder decisions,
not a replacement for them. The final baseline is the Vault Space-first
three-pane Agent Vault surface with an adjustable desktop layout, a global
Activity destination, and a separate OS companion proof. The next work should
return to the documented engine/UI contracts and unresolved host/transport
decisions rather than extend the browser prototype into a backend.
