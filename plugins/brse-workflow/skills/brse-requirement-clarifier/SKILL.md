---
name: brse-requirement-clarifier
description: Clarify Japanese or bilingual requirements into dev-ready scope, assumptions, open questions, and risk notes. Use when a BrSE receives vague specs or stakeholder requests before development.
---

# BrSE Requirement Clarifier

Use this skill to convert ambiguous customer input into an implementation-ready requirement without inventing facts.

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

For stricter BrSE requirement review criteria, read `references/checklist.md`.
