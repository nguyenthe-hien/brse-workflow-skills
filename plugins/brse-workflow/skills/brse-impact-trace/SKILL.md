---
name: brse-impact-trace
description: Use when a BrSE must answer an impact or feasibility question that needs evidence from the actual codebase — frontend route, backend controller, API contract, DB schema, batch job, or tenant config — before reporting to a customer or PM.
---

# BrSE Impact Trace

## Overview

Ground impact and feasibility answers in the actual codebase before reporting to a customer or PM.

**Core principle:** No claim about impact without a file path. Memory and ticket text are not evidence.

## When To Use

- Customer or PM asks "Does change X affect Y?"
- Dev asks whether a proposed change touches shared middleware, permission, or auth.
- BrSE must answer a feasibility question that depends on current architecture, not assumed architecture.
- A spec says one thing and source behavior may say another.

## When NOT To Use

- Question is purely about business policy, not code (use `brse-requirement-clarifier`).
- Customer wants a high-level estimate before any source is available — say so, do not invent.
- The repository is not accessible from this session — declare the limitation, do not guess.

## Workflow

1. Start from the user-facing entry point: URL, screen, menu, button, API, batch command, task ID, or spec section.
2. Find the closest local source first. Prefer repo-local files over remote GitHub unless the user explicitly asks for remote.
3. Trace in this order when applicable:
   - UI route/component
   - state/store/context
   - API client/request
   - backend route/controller/service
   - permission/auth/session logic
   - model/schema/migration/seed/init data
   - batch/job/queue/log side effects
4. Record exact evidence with file paths and line numbers when possible.
5. Separate confirmed facts from likely impact and unverified assumptions.
6. End with a BrSE-facing conclusion: what changes, who is affected, what QA must cover, and what should be reported to the customer.

## Output Shape

```markdown
## Conclusion

## Evidence

## Impact

## QA / Verification Points

## Open Questions
```

## Rules

- Do not answer from ticket wording alone if local source is available.
- Do not list repositories generically; explain the real flow.
- Do not change code unless the user explicitly asks for implementation.
- If source and spec disagree, call out the conflict clearly.
- For auth/login/session impact, explain the redirect chain and distinguish main login from re-login/session-timeout behavior.

## Example

**Question from BrSE (after customer ask):**

> "If we hide the Edit button on UserProfile for `staff` role, does this affect the Edit API or only the FE?"

**Output:**

```markdown
## Conclusion

Hiding the Edit button on the FE alone does NOT close the access path. The Edit API still accepts requests from `staff` if a request is crafted directly. Both FE and BE permission checks must change.

## Evidence

- FE: `src/pages/UserProfile/EditButton.tsx:14` — visibility currently keyed on `user.role !== 'guest'`. No role-specific guard for `staff`.
- API client: `src/api/userProfile.ts:28` — `updateProfile()` is called with the session token, no role check.
- BE controller: `app/controllers/UserProfileController.ts:71` — `update()` method enforces only authentication, not role. `staff` passes.
- Permission middleware: `app/middleware/permission.ts:42` — `staff` is included in the default allow-list for `userProfile.update` action.

## Impact

- Required changes:
  1. FE: add role gate to `EditButton` for `staff`.
  2. BE: remove `staff` from `userProfile.update` allow-list in `permission.ts`.
  3. Regression: any other UI surface that calls `updateProfile()` for `staff` will start failing — search for all callers.
- Affected surfaces: 1 FE component, 1 controller, 1 middleware. No DB or batch impact.

## QA / Verification Points

- `staff` user opens UserProfile → no Edit button visible.
- `staff` user sends crafted PUT to `/api/userProfile` → API returns 403.
- Non-`staff` roles (admin, manager) → Edit still works (regression).

## Open Questions

- Is there any batch job that mutates UserProfile on behalf of `staff`? (search returned no obvious candidates, but customer should confirm operational scripts.)
```

**Why this output:** The FE-only fix is a classic surface-level patch that leaves the data exposure open at the API layer. The trace makes the gap visible by showing both files (FE + BE) and naming the regression risk (other callers of `updateProfile()`).

For a deeper contract trace checklist, read `references/contract-map.md`.
