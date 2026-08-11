# Engine ↔ UI boundary

This document defines the **only** surface the UI repo should rely on while the engine repo is still changing rapidly.

## Design principle

The UI attaches to a **stable adapter boundary**. It does **not** import engine internals directly.

## Minimum attach contract

### 1. Session bootstrap
The UI can obtain a session object like:

```json
{
  "session_id": "sess_123",
  "task": "Update my insurance address",
  "target_site": "falador-mutual.gielinor",
  "state": "awaiting_navigation"
}
```

### 2. Approval request
The engine can emit an approval event like:

```json
{
  "type": "approval_required",
  "scope": "vault_read",
  "site": "falador-mutual.gielinor",
  "duration": "session_only",
  "reason": "Need stored credential to complete sign-in"
}
```

### 3. Approval outcome
The UI can send back:

```json
{
  "type": "approval_response",
  "approved": true,
  "scope": "vault_read",
  "duration": "session_only"
}
```

### 4. Activity log frame
The engine can stream or expose entries like:

```json
{
  "ts": "2026-08-11T00:00:00Z",
  "kind": "activity",
  "message": "Opening sign-in page",
  "state": "navigating"
}
```

### 5. Secret-safe redaction rule
No adapter payload should contain plaintext passwords, tokens, or decrypted secret material.

### 6. Deferred verification handoff

The prototype treats a site-requested one-time verification step as a pause-and-notify state, not as a secret field that the user edits in Agent Vault. The UI uses the human-facing label `Verification — User prompt if required`.

The intended future behavior is:

1. the adapter reports that the current login is waiting for a site verification challenge;
2. Agent Vault pauses the login and notifies the user through Agent ID;
3. the user supplies the one-time code for that login;
4. the code is used for the active session only and is not saved in the Vault Item or Compiled Agent Record.

The event names, delivery channel, user authentication, expiry, retry/lockout behavior, and anti-replay handling are not defined here. This prototype does not implement the Agent ID notification or response transport, and it does not claim that Agent Vault can bypass MFA or generate site codes automatically. A TOTP seed, if ever supported by a separate security design, must not be surfaced as a normal human-editable field in this UI.

## Allowed transport choices

Any of these are acceptable:

- local HTTP JSON API
- local websocket event stream
- CLI that emits newline-delimited JSON
- file-backed event log / state snapshots

## Forbidden coupling

The UI repo must not assume:

- Playwright class names or object lifetimes
- vault file format details
- Python module paths inside the engine repo
- direct access to decrypted credentials

## Contract change process

If engine work needs a boundary change:

1. update this contract doc in a PR
2. mention the engine-side reason
3. update UI assumptions after merge

This keeps engine refactors from silently breaking the design lane.
