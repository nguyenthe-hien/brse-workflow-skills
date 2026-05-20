---
name: brse-offshore-sync
description: Use when a BrSE must keep distributed teams aligned across language, timezone, role, and context gaps — before a customer meeting, after a standup, during release readiness, or when handing off context between BrSEs.
---

# BrSE Offshore Sync

Use this skill to keep distributed teams aligned across language, timezone, role, and context gaps.

## When To Use

- Preparing or writing minutes for a customer meeting, internal dev sync, Q&A triage, release readiness, issue escalation, or handoff.
- Translating decisions and action items between Japanese (customer) and Vietnamese/English (offshore dev) without losing precision.
- Handing off context between BrSEs across shift boundaries.

## When NOT To Use

- Producing a customer-facing report — use `brse-client-report`.
- Resolving an open dev question — use `brse-dev-triage`.
- The "meeting" is actually a status request from a single stakeholder — write a report, not minutes.
- No decisions were made and no action items resulted — capture as a note, not as offshore-sync output.

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
