# Edit Vault Item audit

## Scope

Audit of the current `Edit Chase Checking` flow in the Agent Vault prototype. The review covers record metadata, login credentials, custom fields, reusable values, compilation, and the relationship to Core Info.

## Captured flow

1. Open the Chase Checking inspector and choose Edit — the working-draft modal opens while the inspector remains visible behind it.
2. Review the record and sign-in fields — service, account name, category, site, username, password, and the Verification handoff state are grouped without exposing an MFA secret field.
3. Choose a saved field — the picker exposes fields from any Vault Space, including source space and semantic type.
4. Fill the saved field — the destination custom-field row is populated with human label, type, value, and exact website field label.
5. Save — the form offers Save draft and Save & Compile, with Cancel and the X as additional exits.

## Evidence

- [01 — edit overview](./01-edit-overview.png)
- [02 — reusable field selected](./02-reuse-selected.png)
- [03 — reusable field filled](./03-reuse-filled.png)
- User-provided [Core Info reference](../../../../Desktop/Screenshot%202026-08-11%20at%202.45.43%E2%80%AFAM.png)

## Primary finding

The popup should retain the data model but simplify the human task into three sections:

1. Record — service name, account label, category, website.
2. Sign-in — username, password, and a concise Verification note. If the site requests a one-time code, Agent Vault should pause and notify the user through Agent ID; the code is supplied for that login only and is not saved. Password replacement is explicit.
3. Fields — friendly label and value by default; saved-field reuse across Vault Spaces and exact website mapping under a per-field Advanced disclosure.

Core Info remains the place for reusable identity data. The item editor should offer prefill, not duplicate Core Info editing.

`Save draft` preserves human work without changing what the agent can read. `Save & Compile` validates the draft and replaces the last compiled snapshot. This is prototype UI behavior; the Agent ID notification and one-time-code transport are not implemented here.

## Evidence limits

The visual review cannot establish full keyboard focus trapping, focus return, Escape behavior, or persistence of secret values. Those require an interaction/accessibility test after the redesign.
