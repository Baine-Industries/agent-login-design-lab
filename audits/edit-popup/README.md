# Edit Vault Item audit

## Scope

Audit of the current `Edit Chase Checking` flow in the Agent Vault prototype. The review covers record metadata, login credentials, custom fields, reusable values, saving, and the relationship to Core Info.

## Captured flow

1. Open the Chase Checking inspector and choose Edit — the working-values modal opens while the inspector remains visible behind it.
2. Review the record and sign-in fields — service, account name, category, site, username, and password are grouped without exposing an MFA secret field or runtime verification card.
3. Choose a saved field — the picker exposes fields from any Vault Space, including source space and semantic type.
4. Fill the saved field — the destination custom-field row is populated with human label, type, value, and an exact website field label when one is known.
5. Save — the form keeps the header and single Save footer visible while the body scrolls; the X is the only discard exit.

## Evidence

- [01 — edit overview](./01-edit-overview.png)
- [02 — reusable field selected](./02-reuse-selected.png)
- [03 — reusable field filled](./03-reuse-filled.png)
- [04 — redesigned edit modal](./04-redesigned-edit.png)
- [05 — simplified verification and mapping](./05-simplified-edit.png)
- User-provided [Core Info reference](../../../../Desktop/Screenshot%202026-08-11%20at%202.45.43%E2%80%AFAM.png)

## Primary finding

The popup should retain the data model but simplify the human task into three sections:

1. Record — service name, account label, category, website.
2. Sign-in — username and password only, with explicit replace-secret behavior. Verification belongs to runtime access handling, not this record editor.
3. Fields — friendly label and value by default; saved-field reuse across Vault Spaces and an optional exact website field label under a per-field disclosure. The mapping stays blank unless the user provides it; it is never inferred from the human label.

Core Info remains the place for reusable identity data. The item editor should offer prefill, not duplicate Core Info editing.

`Save` validates the working values and replaces the saved snapshot. This is prototype UI behavior; the Agent ID notification and one-time-code transport are not implemented here.

## Evidence limits

The visual review cannot establish full keyboard focus trapping, focus return, Escape behavior, or persistence of secret values. Those require an interaction/accessibility test after the redesign.
