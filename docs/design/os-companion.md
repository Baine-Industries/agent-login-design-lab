# Agent Vault OS companion

Status: frontend prototype complete; native host integration deferred.

The companion is a compact OS-surface view of Agent Activity. The prototype
opens it from the Agent Vault top bar so the interaction can be tested before
the app is wrapped in a macOS menu-bar or Windows system-tray host.

## Shared surface

Both platform presentations show the same four groups:

1. Pending Requests — actionable; opens the existing Approve or Reject review.
2. Active Tasks — shows the locked item; opens task detail or stops the task.
3. Needs Attention — opens the affected Vault Item editor at the unresolved
   field.
4. Recent Activity — read-only history.

The badge counts unresolved human actions only: pending requests plus Needs
Attention. Running tasks and saved history do not increase it.

## Platform treatment

- macOS: rounded menu-bar popover with the paper/editorial Agent Vault style.
- Windows: same information hierarchy in a tighter tray-popover treatment;
  platform differences are limited to host chrome and corner treatment.
- Both surfaces open the same Agent Vault review and task flows. They do not
  create a second Activity model.

## Boundary

This prototype uses in-memory state and a web preview trigger. A native shell
still needs to provide menu-bar/tray registration, OS badge state, click-away
dismissal, launch/focus of Agent Vault, and a transport for live Activity
events. Those are integration tasks, not implemented backend behavior.

The companion must remain secret-safe: show targets, statuses, scopes, and
redacted summaries; never expose plaintext credentials or verification codes.
