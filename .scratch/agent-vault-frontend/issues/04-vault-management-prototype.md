# Agent Vault management prototype direction

Type: prototype
Status: resolved
Blocked by: none

## Question

Which visual hierarchy and interaction pattern best tests the first slice: vault index, add/edit Vault Item, typed fields, scope/category assignment, and future Access Grant metadata, without introducing the approval rail or live agent task UI?

## Answer

The throwaway prototype in [`prototype/`](../../../prototype/) uses a Vault Space-first desktop composition: named Personal/Business spaces on the left, searchable/category-filtered Vault Items in the center, and a selected-item inspector on the right. The inspector makes redacted login fields, reusable Core Info inheritance, exact Site Field Labels, and stable record identity visible without exposing secrets. The add-item, Core Info, and Activity request-review flows work in memory; browser task UI and Access Grant execution remain absent. The prototype inherits the Imrahil paper-editorial system: Inter, Manrope, IBM Plex Mono, warm paper surfaces, hairlines, and restrained gold/rust/moss accents.

See [`prototype/design-qa.md`](../../../prototype/design-qa.md) for the source references, comparison capture, interaction checks, and QA result.
