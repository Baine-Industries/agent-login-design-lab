# AGENTS.md

Agent operating guide for `Baine-Industries/agent-login-design-lab`.

## Repo purpose

This is the **parallel UI coworking repo** for Agent Login.

It exists so UI/UX, flows, mockups, and attach-layer work can move independently from the private engine repo:

- engine repo: `AdamGeorgesForges/agent-login-harness`
- UI coworking repo: `Baine-Industries/agent-login-design-lab`

The engine repo is allowed to change quickly. This repo protects the design lane from backend churn.

## Primary rule

**Do not couple UI work to unstable engine internals.**

Treat the engine as a changing system behind a documented contract. If you need new integration data, update the contract docs first rather than reaching into private modules or storage.

## What this repo is for

Agents working here should prefer:

- UI concepts and flows
- interaction patterns
- approval UX
- attach-layer stubs and adapters
- examples and prototypes
- contract documentation
- repo/process improvements for collaboration

Agents should avoid turning this repo into the engine implementation.

## Source of truth docs

Read these before making changes:

1. `README.md`
2. `docs/parallel-ui-workflow.md`
3. `docs/contracts/engine-ui-boundary.md`
4. `docs/ui/concept-summary.md`

For backend or attach-layer pickup, also read
`docs/design/developer-handoff.md`. It labels the current implementation
callouts and the deferred boundaries without duplicating the domain contracts.

## Branch model

### Protected branch
- `main`
- no direct pushes
- merges only through pull requests
- CI must pass
- review is required

### Working branch
- `design/studio`
- default branch for active design work
- use short-lived feature branches off this branch when helpful

## Worktree model

Expected local layout:

- `~/agent-login-harness` → engine work
- `~/agent-login-design-lab` → protected UI repo root
- `~/worktrees/agent-login-design-studio` → active UI worktree

If asked to work on UI, prefer the design worktree/branch rather than editing `main` directly.

## Collaboration contract with the engine repo

This repo should attach through stable surfaces only. Good interfaces include:

- local HTTP JSON endpoints
- CLI output in structured JSON
- event streams
- file-backed activity/session snapshots

Do **not** depend on:

- engine Python module paths
- Playwright internals
- vault storage internals
- decrypted secrets
- backend implementation details that are not documented in the contract

## Secret handling

Never place plaintext credentials, tokens, passwords, cookies, or decrypted vault material in:

- markdown docs
- examples
- screenshots committed to the repo
- test fixtures
- logs
- PR descriptions

All examples must use fake/demo values only.

## Decision rule for changes

When making a change, first classify it:

### 1. Exploratory UI change
Examples:
- layout
- flow copy
- approval modal behavior
- activity ledger presentation

Safe to do in `design/studio` as long as docs remain coherent.

### 2. Attach-ready contract change
Examples:
- new approval event
- new session-state field
- new adapter transport expectation

Must update:
- `docs/contracts/engine-ui-boundary.md`
- any affected examples/docs
- PR summary describing the engine-side implication

### 3. Engine implementation request
If the request really belongs in `agent-login-harness`, do not fake it here. Either:
- document the needed boundary from this repo, or
- switch to the engine repo and implement it there

## Non-breaking attachment rule

UI work should degrade gracefully when the engine changes.

Prefer:
- mock adapters
- sample payloads
- contract-first components
- explicit empty/loading/error states

Avoid:
- assuming the engine is always available
- assuming every event already exists
- shipping hard dependencies on unstable engine behavior

## Pull request expectations

PRs to `main` should state:

- whether the change is exploratory or attach-ready
- whether the engine/UI contract changed
- what assumptions were introduced or removed
- how the change was validated

## CI expectations

Current CI validates repo integrity and basic guardrails. Do not weaken CI just to make a branch merge.

If CI needs to change, preserve the gating intent:
- `main` stays review-only
- `main` stays CI-gated
- docs/contracts remain present and coherent

## If you are unsure

Use this order:
1. preserve the protected-branch workflow
2. preserve the engine/UI contract boundary
3. avoid secret exposure
4. favor reversible UI-only work over brittle coupling

## Short version

If you only remember five things, remember these:

1. Work in `design/studio`, not directly on `main`
2. `main` is PR-only and CI-gated
3. Never couple to engine internals
4. Update contract docs before attach-layer assumptions
5. Never commit secrets or decrypted credential material
