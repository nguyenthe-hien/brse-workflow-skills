---
name: brse-skill-author
description: Use when adding, editing, or reviewing a BrSE skill in this plugin — the description field needs an objective check, the SKILL.md is missing required blocks, or a new BrSE workflow pattern has appeared more than twice in recent sessions and is worth capturing as a skill.
---

# BrSE Skill Author

## Overview

Bootstrap and maintain skills inside this plugin so that future BrSE sessions can discover and reuse them reliably.

**Core principle:** A skill is a reusable BrSE technique, not a war story about one customer. If the same situation has not appeared at least twice, it does not need a skill yet — capture as a note instead.

## When To Use

- Adding a new skill to `plugins/brse-workflow/skills/`.
- Editing an existing skill's frontmatter, Overview, Rules, or Example block.
- Reviewing a contributed skill before merge.
- A BrSE pattern has repeated across sessions and you want to convert it into a permanent skill.
- The discovery rate of an existing skill is too low — its description or naming needs to be re-audited.

## When NOT To Use

- One-off solutions that will not repeat — capture as a project note instead.
- Customer-specific glossary terms or product knowledge — those belong in the project glossary, not in a generic skill.
- General coding conventions — those belong in repo `AGENTS.md` / `CLAUDE.md`.
- A skill that already exists and just needs a content fix — edit it directly; this skill is for *authoring discipline*, not every minor change.

## Inputs

1. **Intent**: What BrSE situation does the new (or edited) skill address? State it as a triggering condition, not a capability list.
2. **Baseline evidence**: At least one realistic BrSE input (JP customer message, dev report excerpt, ticket text) that would trigger the skill.
3. **Reference template**: `plugins/brse-workflow/template/SKILL.md` and `template/references/authoring-guide.md`.

If the BrSE cannot supply (1) and (2), stop. A skill without a concrete trigger and a real example is not yet a skill — it is an idea.

## Workflow

1. **Check duplicates first.** Read every existing SKILL.md description. If the new intent overlaps an existing skill by more than ~30%, edit the existing one instead of creating a new one.
2. **Pick the right skill type.** One of:
   - *Process* — enforces a sequence of steps (e.g., spec-verify).
   - *Reference* — provides a structured framework or wording library (e.g., structured-thinking, japanese-reporting).
   - *Pattern* — names a recurring decision (e.g., intent-reader).
   - *Orchestrator* — coordinates other skills (workflow-chain).
3. **Draft frontmatter first.** `name` slug (lowercase + hyphen + `brse-` prefix). `description` ≤500 chars, trigger-first, no workflow summary. Run `./scripts/validate-skills.sh <name>` after the file exists.
4. **Fill required blocks.** Use the template's structure exactly:
   - `## Overview` + **Core principle** (one sentence).
   - `## When To Use` (trigger list).
   - `## When NOT To Use` (loophole-closing list, linking adjacent skills).
   - `## Inputs` (only if the skill has required inputs).
   - `## Workflow` (numbered, ≤7 steps; move sub-steps to `references/`).
   - `## Output Shape` (markdown code block showing exact structure).
   - `## Rules` (do / don't with concrete failure modes).
   - `## Example` (one realistic input → full output, plus a "why this output" note).
5. **Add `## Rationalization Table` and `## Red Flags — STOP`** *only* if the skill is rigid (process / orchestrator). Skip for reference / pattern skills.
6. **Move deep content to `references/`** when SKILL.md exceeds ~200 lines or a section has more than 5 sub-items.
7. **Cross-link adjacent skills** by name (e.g., "run `brse-requirement-clarifier` first"). Do not use file paths — names survive moves.
8. **Validate.** Run `./scripts/validate-skills.sh <name>`. Resolve all `[FAIL]`. Warnings are informational but should be reviewed.
9. **Manual pressure check** (see `references/pressure-testing.md`). Imagine Claude under time pressure: would the SKILL.md stop a known rationalization? If not, add to the Rationalization Table.

## Output Shape

When the user asks to author or audit a skill, return:

```markdown
## Skill Decision

(new skill / edit existing / consolidate into existing / not yet a skill — keep as note)

## Frontmatter Proposal

name: ...
description: ...

(why: trigger-first, length, keyword coverage)

## Blocks Drafted

(list of which blocks of the template are filled in, which still need input from the BrSE)

## Open Questions

(input the author must supply before the skill can be merged — e.g., real example, baseline rationalization)

## Validation Result

(output of `./scripts/validate-skills.sh <name>`)
```

## Rules

- Do not author a skill without a real example. Placeholder examples (`<input here>`, `Lorem ipsum`) are forbidden — they degrade the skill's pressure resistance.
- Do not summarize the workflow in the `description` field. The description is for triggering, not capability advertising.
- Do not invent rationalizations for the Rationalization Table — source them from real BrSE sessions or from baseline tests in `tests/scenarios/`.
- Do not duplicate content between SKILL.md and `references/`. Each fact lives in exactly one place; SKILL.md links to references when needed.
- Do not use real customer product names in examples. Use generic placeholders (`UserProfile`, `staff role`, `Tenant A`).
- Do not skip `## When NOT To Use`. The "not when" block prevents over-triggering when the description's keywords match too broadly.
- Do not bypass `./scripts/validate-skills.sh`. A skill that fails validation cannot be merged.

## Rationalization Table

| Excuse | Reality |
| ------ | ------- |
| "This will be a quick edit, no need to follow the template." | Edits drift the skill away from the template every time. Use the template even for one-line fixes. |
| "I do not have a real example yet, I will add it later." | Skills without examples are skipped by Claude under pressure. Get the example before merge. |
| "The new skill overlaps a bit with an existing one, but it is clearer." | Two overlapping skills = neither triggers reliably. Consolidate. |
| "Description is long because the skill does a lot of things." | A long description that lists capabilities is the exact CSO trap. Split the skill or shorten the description. |
| "Rationalization Table is overkill for this skill." | If the skill enforces a sequence or a gate, the table is mandatory. Skip only for reference/pattern skills. |

## Red Flags — STOP

Stop and restart from step 1 if you notice yourself doing any of these:

- Writing the `description` after the body — author description first, body answers to it.
- Copying an Example block from another skill without changing the customer-specific details.
- Skipping validate-skills.sh because "the change is small."
- Filling `## When NOT To Use` with "always use this skill" — that is the wrong section.
- Adding a Rules item that restates the Workflow — Rules forbid loopholes; Workflow lists steps.

## Example

**Input (author intent):**

> "I keep getting customer emails that mix multiple feature requests with no priority. I want a skill that splits a multi-request email into separately-trackable requests with priority hypotheses."

**Output:**

```markdown
## Skill Decision

Edit existing — overlaps `brse-requirement-clarifier`. The clarifier already produces structured output per request; what is missing is *splitting* a multi-request input into multiple clarifier-ready chunks. Recommend extending `brse-requirement-clarifier` Workflow with a Step 0 "Split if multi-request", not a new skill.

## Frontmatter Proposal

No new frontmatter needed.

Proposed clarifier description addition (within current description):
"... or a single message bundles multiple unrelated requests that must be split before clarification."

## Blocks Drafted

- Clarifier Workflow Step 0: detect multi-request indicators (multiple paragraphs each ending with separate request verbs, numbered list of asks, "あわせて" / "ついでに" markers).
- Clarifier Example block: extend with a multi-request input → 2 separate Requirement Summary blocks.

## Open Questions

- Author must supply a real multi-request customer email (with personal details redacted) for the new Example.
- Should the priority hypothesis use intent-reader heuristics (referenced) or a new mini-framework?

## Validation Result

Pending — need real example before re-running `./scripts/validate-skills.sh brse-requirement-clarifier`.
```

**Why this output:** The intent looked like a new skill at first glance but the structural test (`brse-requirement-clarifier` already produces the per-request artifact) showed it is an extension, not a new skill. Authoring discipline catches this before a duplicate skill is merged.

## Common Mistakes

| Mistake | Why it fails | Fix |
| ------- | ------------ | --- |
| Treating `description` as a capability blurb | Claude reads description first; if it summarizes workflow, the body is skipped | Trigger-first, no workflow narration |
| Skipping Example | Skills without examples lose pressure resistance | Use a real BrSE input, not placeholder |
| Duplicating workflow in Rules | Rules and Workflow drift apart over time | Rules forbid; Workflow lists |
| Creating a sibling skill instead of editing | Two skills with similar descriptions both under-trigger | Consolidate into the closest existing skill |

## Anti-Patterns

- **Story-driven skill**: "Last month a customer at Project X said..." — convert to a reusable pattern or do not write a skill.
- **Capability advertising in description**: "Comprehensive multi-step BrSE solution for..." — useless for triggering.
- **Reference dump without SKILL.md content**: dumping 300 lines into `references/` while SKILL.md says "see references" — SKILL.md must stand on its own for the common path.

## References

For pressure-testing a draft skill against Claude rationalization patterns, read `references/pressure-testing.md`.

For the canonical block structure and authoring conventions, see the template at `../../template/SKILL.md` and its companion guide at `../../template/references/authoring-guide.md`.
