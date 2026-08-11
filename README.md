# agent-login-design-lab

Parallel UI coworking repo for **Agent Login**.

This repo exists so UI/UX work can move independently from the private engine repo (`AdamGeorgesForges/agent-login-harness`) without blocking backend exploration or getting broken by engine churn.

## Why this repo exists

The engine repo is currently focused on the functional harness: local credential vault, approval gate, demo login target, and Playwright-driven login flows. UI design needs a safer lane:

- **UI work happens here** in a dedicated design branch and worktree.
- **`main` is protected** and only updated by pull request.
- **CI gates merges** so `main` stays coherent.
- **The UI attaches through a documented contract**, not direct imports from unstable engine internals.

## Branch model

- `main` — protected integration branch for reviewed, CI-green design artifacts.
- `design/studio` — active branch for exploratory UI work.
- short-lived feature branches — optional off `design/studio` for focused spikes.

## Worktree model

Keep engine and UI open side-by-side:

```bash
# engine track
cd ~/agent-login-harness

# UI track
cd ~/agent-login-design-lab

git worktree add ../worktrees/agent-login-design-studio design/studio
```

Recommended layout:

- `~/agent-login-harness` → functional engine work
- `~/agent-login-design-lab` → protected design repo root
- `~/worktrees/agent-login-design-studio` → active UI implementation worktree

## Initial design direction captured from the concept page

The current UI concept emphasizes:

- **"A way in, without giving everything away."**
- local-only secret handling
- explicit approval for vault reads
- task-led agent narration during sign-in
- a browser/login panel paired with an agent activity panel
- future layering with Agent ID after login/auth is solved

See:

- `AGENTS.md`
- `docs/design/developer-handoff.md` — developer-agent pickup note with build-now callouts and deferred boundaries
- `docs/ui/concept-summary.md`
- `docs/contracts/engine-ui-boundary.md`
- `docs/parallel-ui-workflow.md`

## Rules for contributors

1. Do not couple UI code to engine internals.
2. Treat the engine as a changing dependency behind a stable contract.
3. Use PRs into `main`; no direct pushes to protected `main`.
4. If the engine breaks the contract, update the contract doc first, then the UI.

## Near-term outcome

This repo should let a designer/front-end collaborator iterate safely while the engine repo continues shipping vault/harness functionality on its own cadence.
