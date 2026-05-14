---
name: brse-qa-scenario
description: Create or review QA scenarios from BrSE specs, current behavior, source impact, and customer acceptance criteria. Use when preparing Japanese QA sheets, regression checklists, demo cases, or release verification plans.
---

# BrSE QA Scenario

Use this skill to create QA that proves the business requirement, not just the implementation path.

## Workflow

1. Identify the target release, product surface, user role, and environment.
2. Start from acceptance criteria and source impact, then derive cases.
3. Cover:
   - main path
   - permission/role differences
   - existing data vs new data
   - validation and error states
   - regression around adjacent flows
   - client/tenant-specific config
4. For customer-facing Japanese QA wording, write observable checks rather than internal implementation language.
5. Keep evidence fields unchanged unless the user asks to edit evidence.

## Output Shape

```markdown
## QA Scope

## Test Cases

| No | Scenario | Preconditions | Steps | Expected Result | Notes |
| -- | -------- | ------------- | ----- | --------------- | ----- |

## Regression Points

## Data / Environment Needs
```

## Rules

- Do not over-generate every edge case if the user asked for main demo cases.
- Do not use testcase IDs or internal scaffolding in customer-facing demo docs.
- If one QA row depends on a previous row, make that dependency explicit in the scenario.
- If behavior cannot be verified without seed/config data, state the data dependency.

For QA case selection patterns, read `references/qa-patterns.md`.
