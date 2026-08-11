# Parallel UI workflow

## Goal

Allow the Agent Login UI to evolve in parallel with the functional engine without either lane blocking the other.

## Repos

### 1. Engine repo
- Repo: `AdamGeorgesForges/agent-login-harness`
- Purpose: harness, vault, demo target, browser automation, tests
- Expected churn: high
- Stability promise: **contract only**

### 2. Coworking UI repo
- Repo: `Baine-Industries/agent-login-design-lab`
- Purpose: mockups, flows, integration assumptions, thin attach layer
- Expected churn: medium-high
- Stability promise: protected `main`

## Working agreement

- The engine repo may freely refactor internals.
- The UI repo must not depend on private engine module structure.
- Integration happens through a documented boundary:
  - events / action requests
  - approval prompts
  - vault-read acknowledgements
  - session state snapshots
  - structured error states

## Branching

### Protected branch
- `main`
- merge only by PR
- requires passing CI
- requires at least one review

### Active branch
- `design/studio`
- daily design/dev work lands here first
- PR back to `main` once coherent

## Local worktree workflow

```bash
cd ~/agent-login-design-lab
git fetch origin
git checkout design/studio
git worktree add ../worktrees/agent-login-design-studio design/studio
```

Then work in two terminals/windows:

```bash
# terminal A: engine
cd ~/agent-login-harness

# terminal B: ui
autojump ~/worktrees/agent-login-design-studio 2>/dev/null || cd ~/worktrees/agent-login-design-studio
```

## Non-breaking attachment strategy

The UI should consume an adapter surface rather than raw engine internals. Good candidates:

- JSON session transcript files
- local HTTP endpoints
- a CLI that emits structured JSON
- event logs from login attempts

Avoid:

- importing unstable Python internals directly from the engine repo
- assuming exact vault storage structure
- binding UI logic to Playwright implementation details

## Merge checklist

Before merging to `main` in this repo:

- [ ] docs updated if assumptions changed
- [ ] contract still matches engine expectations
- [ ] examples render / remain coherent
- [ ] CI is green
- [ ] PR explains whether this is exploratory or attach-ready
