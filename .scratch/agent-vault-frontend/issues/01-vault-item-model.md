# Agent Vault item and field model

Type: grilling
Status: resolved
Blocked by: none

## Question

What is the smallest coherent Vault Item model that supports one service/account record with login fields, personal data, business data, service-specific fields, and custom typed fields without turning the first UI into an unbounded database builder?

## Answer

- One Vault Item represents one service/account combination; multiple accounts at one service are separate items.
- Each item has fixed core fields plus typed custom fields: `text`, `secret`, `email`, `phone`, `URL`, `number`, `date`, and `multiline`.
- Reusable local Core Info auto-populates matching fields and can be overridden per item.
- Custom fields retain a Site Field Label or mapping so the agent can target the site's actual field name.
