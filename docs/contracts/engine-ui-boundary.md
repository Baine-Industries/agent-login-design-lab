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
