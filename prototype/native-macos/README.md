# Native macOS companion proof

This is the smallest local AppKit proof for the Agent Activity companion. It
registers a real `NSStatusItem` in the macOS menu bar and opens an AppKit
`NSPopover` using the system `.popover` material. The rows and badge use the
same demo/in-memory state as the browser playground; no backend or security
behavior is connected.

## Run

From this directory:

```sh
swift run
```

The process stays alive while the menu-bar item is visible. Click the checklist
item with the `2` badge to open the companion. Stop it with `Control-C` in the
terminal.

To open the popover automatically for a visual proof, use
`AGENT_VAULT_COMPANION_OPEN=1 swift run`. The `Open Agent Vault` handoff
defaults to the local companion playground at `http://127.0.0.1:4174/`; set
`AGENT_VAULT_COMPANION_URL` when the local server uses another port.

## What this proves

- Real macOS menu-bar registration through AppKit.
- Real anchored popover placement and transient dismissal.
- System-owned material and native status-item placement, matching the
  platform treatment used by other menu-bar companions.

## What this does not prove

- Native production packaging, launch at login, OS badge APIs, live Activity
  transport, Agent Vault focus handoff, or Windows tray registration.
- Access Grant issuance/rotation, Agent ID transport, Verification Challenge
  notifications, browser execution, encryption, or credential storage.
