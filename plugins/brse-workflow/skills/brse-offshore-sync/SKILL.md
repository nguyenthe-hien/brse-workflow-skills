---
name: brse-offshore-sync
description: Prepare bilingual BrSE meeting agendas, minutes, decision logs, action items, and offshore sync notes between Japanese stakeholders and development teams. Use for standups, customer meetings, Q&A整理, design sync, release sync, and handoff notes.
---

# BrSE Offshore Sync

Use this skill to keep distributed teams aligned across language, timezone, role, and context gaps.

## Workflow

1. Classify the sync:
   - customer meeting
   - internal dev sync
   - Q&A triage
   - release readiness
   - issue escalation
   - handoff
2. Extract decisions separately from discussion.
3. Convert vague discussion into action items with owner, due date, source, and expected output.
4. Mark unanswered questions and who must answer them.
5. For bilingual output, write Japanese for customer-facing parts and Vietnamese for internal developer guidance.
6. End with the next checkpoint.

## Output Shape

```markdown
## Purpose

## Decisions

## Action Items

| Owner | Action | Due | Output | Notes |
| ----- | ------ | --- | ------ | ----- |

## Open Questions

## Next Checkpoint
```

## Rules

- Do not hide a decision inside a meeting summary paragraph.
- Do not assign action items without owner or expected output.
- If the meeting revealed a spec conflict, escalate it as a decision needed, not a normal note.
- If translating, keep task IDs, screen names, and code identifiers unchanged.

For meeting and escalation patterns, read `references/sync-patterns.md`.
