# Agent-native record and query contract

Type: research
Status: resolved
Blocked by: none

## Question

What minimum structured record, field, category, keyword, and query semantics can the UI design rely on while remaining compatible with the repository's documented engine/UI boundary and future Access Grant handoff?

## Answer

See [Agent-native record and query contract](../../../../docs/research/agent-native-record-query-contract.md). The first UI relies on secret-safe Vault Records, Field Descriptors, and Category Records with stable IDs, typed fields, Site Field Labels, Core Info source/override state, keywords, and cross-space metadata queries. Raw secret values remain outside the adapter payload. `Space Type` (`personal`/`business`) is distinct from future `Permission Scope` values such as `vault_read`. Access Grant handoff is limited to a future opaque identifier and permission-scope reference and is not implemented in this prototype.
