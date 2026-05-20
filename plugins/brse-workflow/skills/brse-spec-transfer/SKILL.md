---
name: brse-spec-transfer
description: Use when a BrSE needs to move spec content from a customer Japanese document into a dev delivery surface (Outline, Plane, Backlog, GitHub) or the other direction, and the structure, task IDs, tables, and product terms must survive the move intact.
---

# BrSE Spec Transfer

Use this skill when moving or rewriting specification content between planning and delivery surfaces.

## When To Use

- Moving a customer Japanese document into a dev surface (Outline, Plane, Backlog, GitHub).
- Converting a Markdown spec into a Plane/Backlog ticket while preserving headings, tables, task IDs.
- Producing a JP demo/customer document from an internal English/Vietnamese working draft.

## When NOT To Use

- The spec has not been verified — run `brse-spec-verify` first.
- The transfer needs new ticket breakdown — use `brse-ticket-breakdown` (transfer preserves structure, breakdown changes it).
- The translation requires inferring intent — invoke `brse-intent-reader` before transfer to surface implicit content.
- Source contains content that should not be visible to the target audience — escalate, do not auto-filter.

## Workflow

1. Identify the source surface and target surface.
2. Preserve the source structure unless the user explicitly requests a new structure:
   - headings
   - bullets
   - tables
   - separators
   - task IDs
   - links
   - screenshots or image placeholders
   - section order
3. Translate visible customer-facing wording into Japanese when the target is a Japanese demo/customer document.
4. Keep established system/product terms unchanged.
5. Link only the task ID token when the title contains a task ID plus text.
6. Separate requirement content from AI/reference notes.

## Output Shape

When drafting a task/ticket:

```markdown
## Summary

## Scope

## Requirements

## Acceptance Criteria

## Reference Info By AI
```

When transferring a demo/customer document, keep the source headings and table labels rather than using the ticket structure above.

## Rules

- Do not remove empty-looking sections if the source structure requires them, unless the user asked to clean up.
- Do not add icons or emoji.
- Do not convert customer-facing docs into internal testcase notation.
- Do not duplicate the same point in multiple sections.
- If the target document has images, treat them as required content, not decoration.

## Tooling

For scaffolding a target document, the skill ships a skeleton generator:

```bash
# Emit a clean ticket skeleton
node scripts/markdown-skeleton.mjs --to ticket

# Emit a demo/customer skeleton that preserves source headings and tables
node scripts/markdown-skeleton.mjs --to demo --source path/to/source.md
```

The script extracts headings and tables from the source and re-emits them in the target order — structure only. It does not translate content; translation remains a human/Claude decision per the Rules above.

For Japanese wording and document-surface rules, read `references/style.md`.
