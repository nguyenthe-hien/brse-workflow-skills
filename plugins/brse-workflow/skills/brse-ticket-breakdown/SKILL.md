---
name: brse-ticket-breakdown
description: Break a BrSE requirement into implementation tickets, subtasks, dependencies, estimates, and ownership for offshore development in Plane, Backlog, Jira, or GitHub.
---

# BrSE Ticket Breakdown

Use this skill to turn clarified requirements into work items that developers and QA can execute.

## Workflow

1. Confirm the business goal and delivery deadline if provided.
2. Split by independently verifiable behavior, not by vague technical layer.
3. For each ticket, define:
   - user/business outcome
   - scope
   - affected surfaces
   - implementation notes
   - acceptance criteria
   - QA points
   - dependencies
   - unknowns
4. Check contract alignment across FE, BE, API/schema, DB, batch, and config when relevant.
5. Flag tasks that require source trace, data confirmation, or customer decision.
6. Keep estimates separate from scope if the user did not ask for hours.

## Output Shape

```markdown
## Breakdown Summary

## Tickets

### [Task ID or Proposed Title]

- Goal:
- Scope:
- Affected Surface:
- Dependencies:
- Acceptance Criteria:
- QA:
- Open Questions:

## Delivery Risks
```

## Rules

- Do not create extra architecture or refactor tasks unless required for delivery.
- Do not hide cross-team dependencies inside implementation notes.
- Do not assign a task to QA if the acceptance criteria are still ambiguous.
- For Japanese ticket titles, keep them short and outcome-oriented.

For task sizing and dependency heuristics, read `references/planning.md`.
