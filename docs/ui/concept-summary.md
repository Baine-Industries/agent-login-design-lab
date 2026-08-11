# Agent Login concept summary

Source: local concept page at `http://localhost:4321/products/agent-login`

## Product statement

> A way in, without giving everything away.

Agent Login is presented as an open-source, local credential vault plus browser connector that allows an agent to use approved accounts **without exposing the secrets to the model**.

## Core UX ideas

1. **Local-first secret custody**
   - credentials remain encrypted on device
   - the password is not supposed to enter model prompts

2. **Explicit approval gate**
   - a vault read is surfaced as a deliberate event
   - example copy: `Approved by Agent Login · vault read, this session only`

3. **Task-led flow**
   - the user asks for a real-world task such as an address change
   - the agent narrates what it is doing before requesting credential use

4. **Split-screen interaction model**
   - browser/login panel on one side
   - agent reasoning / activity / approval flow on the other

5. **Forward compatibility with Agent ID**
   - login/auth is the first hurdle
   - identity/profile data disclosure is the next layer

## UI opportunities

- approval drawer / interrupt model
- policy chips (`vault read`, session scope, site scope)
- local activity ledger / audit trail
- safe redaction states when secrets are touched
- attachable shell that can later talk to a real engine adapter
