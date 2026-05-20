---
name: brse-requirement-clarifier
description: Use when a BrSE receives a vague Japanese or bilingual stakeholder request that mixes goal, constraint, and example without clear scope, or inherits a partial spec that still has gaps before it can be forwarded to dev.
---

# BrSE Requirement Clarifier

## Overview

Convert ambiguous Japanese or bilingual customer input into an implementation-ready requirement without inventing facts.

**Core principle:** Every uncertainty becomes an `Assumption`, `Open Question`, or `Needs Source Trace` — never a fabricated answer.

## When To Use

- Customer just sent a Japanese or bilingual request that mixes goal, constraint, and example without clear scope.
- A spec inherited from another BrSE has gaps before it can be forwarded to dev.
- Stakeholder message contains assumptions that the offshore team will read differently.
- Before invoking `brse-spec-verify`, `brse-impact-trace`, or `brse-ticket-breakdown` — they all expect a structured requirement as input.

## When NOT To Use

- Input is already a verified, structured spec — go to `brse-spec-verify` or `brse-ticket-breakdown` directly.
- Customer message is purely a status reply (no new request) — use `brse-client-report` instead.
- Question is from a developer about how to implement, not from a customer about what to build — use `brse-dev-triage`.
- Input is so vague it cannot be parsed even literally — escalate to the customer for resubmission; do not invent.

## Workflow

1. Identify the source language and intended audience: customer, PM, developer, QA, or mixed.
2. Preserve product names, route names, task IDs, Japanese labels, table headers, and code identifiers exactly.
3. Extract the real request:
   - goal
   - affected users
   - affected screens/APIs/batches/data
   - current behavior
   - expected behavior
   - out-of-scope items
4. Mark every uncertainty explicitly as `Assumption`, `Open Question`, or `Needs Source Trace`.
5. Convert the requirement into acceptance criteria that QA can verify.
6. If the source is Japanese and the output is for offshore developers, add a concise Vietnamese explanation after the structured requirement.

## Output Shape

Use this default structure unless the user asks for another format:

```markdown
## Source

(original customer input reference: task ID, ticket URL, chat thread, email subject + date, or attached file path. Required for downstream spec-verify Traceable + Correct checks.)

## Requirement Summary

## Scope

## Current Behavior

## Expected Behavior

## Acceptance Criteria

## Open Questions

## Risks / Notes
```

## Rules

- Do not collapse separate business rules into one generic rule.
- Do not translate established system terms, product names, screen names, version codes, role labels, or third-party tool names. Keep them in their original form regardless of the document's target language.
- If the user asks for customer-facing Japanese, write naturally and avoid internal test phrasing.
- If the requirement depends on current code behavior, say that source trace is required before finalizing.

## Example

**Customer input (JP):**

> 「UserProfile画面、staffロールでもう少し制限したほうがいいかもしれません。前回みたいに権限まわりで問題が出ると困るので、よろしくお願いします。」

**Output:**

```markdown
## Source

Customer chat thread, 2026-05-18, attached to Plane ticket PRJ-241.

## Requirement Summary

Tighten access control on UserProfile screen for the `staff` role to prevent the type of permission incident that occurred previously.

## Scope

- Affected surface: UserProfile screen (FE) and its supporting permission API.
- Affected role: `staff`.
- Out-of-scope: other roles, other screens.

## Current Behavior

`Needs Source Trace` — current `staff` access pattern on UserProfile is not documented; source trace required to confirm what is currently visible/editable.

## Expected Behavior

`Open Question` — customer has not specified which fields or actions must be restricted. Two candidate readings:
1. Hide edit actions for `staff` while leaving read access intact.
2. Hide specific sensitive fields (e.g., contract info) entirely.

## Acceptance Criteria

Pending customer clarification on Expected Behavior. Draft criteria after answer:
- AC1: `staff` user opens UserProfile and sees only the fields/actions the customer approves.
- AC2: Other roles' access is unchanged (regression-safe).

## Open Questions

1. Which fields or actions must be restricted for `staff`? (provide a list, or confirm "all edit actions")
2. What was the "前回" incident the customer referenced? (date / ticket ID — needed to avoid repeating the same mistake)
3. Should the restriction apply to all tenants or only specific ones?

## Risks / Notes

- "もう少し制限" is hedged language — likely a real complaint rather than a soft suggestion. Treat as priority.
- Implementing without answering Q1 risks scope mismatch.
```

**Why this output:** The customer's request is operationally important but verbally hedged (`brse-intent-reader` territory). Instead of guessing what "もう少し制限" means, the skill produces explicit open questions and leaves Acceptance Criteria as drafts until the customer answers. The `前回` reference becomes Q2 because it is load-bearing context the BrSE does not have.

For stricter BrSE requirement review criteria, read `references/checklist.md`.
