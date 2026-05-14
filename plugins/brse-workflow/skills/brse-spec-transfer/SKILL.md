---
name: brse-spec-transfer
description: Transfer, translate, or rewrite specs between Japanese customer documents and development task surfaces while preserving structure, links, task IDs, tables, headings, screenshots, and established product terms. Use for BrSE document transfer between Google Docs, Outline, Plane, Backlog, GitHub issues, or Markdown.
---

# BrSE Spec Transfer

Use this skill when moving or rewriting specification content between planning and delivery surfaces.

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

For Japanese wording and document-surface rules, read `references/style.md`.
