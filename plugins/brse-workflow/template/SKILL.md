---
name: brse-skill-name
description: Use when [specific triggering symptoms — what the BrSE is facing, not what this skill does]. Keep ≤500 characters, third person, no workflow summary, no "→" / "stage" / "first... then" patterns.
---

# BrSE Skill Name

## Overview

One or two sentences describing the skill's core principle. State the principle, not the procedure.

**Core principle:** [Single rule the skill enforces — the one thing the BrSE must hold onto even under pressure.]

## When To Use

- Concrete triggering situation (BrSE-facing).
- Symptom in stakeholder message or dev report.
- Trigger from another skill (workflow-chain stage).

## When NOT To Use

- Situations that look similar but require a different skill (link the right one).
- Situations where this skill would add noise rather than structure.
- Out-of-domain inputs.

## Inputs

What the skill needs before it runs. List required vs optional inputs. If a required input is missing, the skill must surface that and stop — not fabricate.

1. **[Required input]** — what it is, where it comes from.
2. **[Optional input]** — what changes if present.

## Workflow

1. Step 1 — what to check first.
2. Step 2 — main transformation.
3. Step 3 — verification / gating step.
4. Step 4 — output decision.

Keep steps short. If a step has 4+ sub-steps, move it into `references/`.

## Output Shape

```markdown
## [Section 1]

## [Section 2]

## [Decision / Verdict]
```

Use Japanese headings (`## 結論`, `## 確認内容`) when the output is customer-facing JP.
Use English headings when the output is internal BrSE/dev working artifact.

## Rules

- Do — concrete positive rule that resolves a specific failure mode.
- Don't — concrete negative rule that closes a specific loophole.
- Keep product names, screen names, task IDs, role labels, version codes, and third-party tool names in original form.
- State explicit fallback when an input is missing (do not guess to fill).

## Rationalization Table (only for rigid process skills)

| Excuse | Reality |
| ------ | ------- |
| "I already know what the customer wants, skip clarification." | Knowing ≠ structured. Run the step. |
| "This case is simple enough to skip evidence." | Simple cases hide regressions. Cite source. |
| "Customer will not notice if I shortcut." | Customer's reviewer will. BrSE owns trust. |

Delete this section if the skill is not rule-enforcing (e.g., reference skills, framework skills).

## Red Flags — STOP

Stop and restart from step 1 if you notice yourself doing any of these:

- Drafting customer-facing JP without source trace.
- Marking a criterion `OK` because the section exists, not because the content is correct.
- Skipping a Workflow step because "the answer is obvious."
- Translating dev wording verbatim into JP without conversion to business style.

## Example

**Input:**

> [One realistic input the BrSE would actually receive — JP customer message, dev report excerpt, ticket text.]

**Output:**

```markdown
## [Section 1]
...

## [Decision]
...
```

**Why this output:** [Short note explaining one or two non-obvious choices the skill made.]

## Common Mistakes

| Mistake | Why it fails | Fix |
| ------- | ------------ | --- |
| Approving a populated-but-vague document | Filled sections ≠ verified content | Read body, not headings |
| Translating dev jargon verbatim into JP | Customer reads "internal noise" | Rewrite in business JP |
| Treating inferred intent as confirmed | Fabricates scope | Mark as `Assumption` until customer answers |

## Anti-Patterns

- **Narrative storytelling**: "Last time I had a customer who..." — skills are reusable patterns, not war stories.
- **Multi-stage merged output**: collapsing clarifier output into impact-trace output — keep artifacts separate.
- **Silent translation**: rewriting a customer's message in your own words without flagging it as inference.

## References

For [specific deeper topic — e.g., 9-criteria definitions / Japanese reporting wording / signal patterns], read `references/[file-name].md`.
