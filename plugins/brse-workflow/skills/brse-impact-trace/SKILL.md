---
name: brse-impact-trace
description: Trace existing source code and contracts before answering impact, feasibility, or implementation questions. Use when BrSE work requires evidence across frontend, backend, API/proto/schema, database, batch jobs, permissions, or config before reporting to Japanese stakeholders or assigning offshore work.
---

# BrSE Impact Trace

Use this skill when the answer must be grounded in the current codebase, not inferred from memory or ticket text.

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

For a deeper contract trace checklist, read `references/contract-map.md`.
