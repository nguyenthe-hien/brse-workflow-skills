# BrSE Skill Authoring Guide

Companion to `template/SKILL.md`. Read when creating or editing a skill.

## Description Field

The `description` field is the **primary discovery channel** — Claude reads only the frontmatter when deciding which skill to load. Treat it as a search query.

**Format rules:**
- Third person, present tense.
- Start with "Use when..." — focus on triggering conditions, not capabilities.
- ≤500 characters (current validate-skills.sh enforces ≤200).
- Single line. No newlines inside the value.

**Do NOT include:**
- Workflow steps ("clarify → verify → trace").
- Output sections list ("produces Verdict + 9-Criteria + Issues").
- Skill chain references ("after clarifier, before transfer").
- Generic claims ("comprehensive", "industry-standard").

**Why:** if the description summarizes the workflow, Claude will follow the description verbatim instead of reading the SKILL.md body. The body becomes dead documentation.

**Examples:**

```yaml
# ❌ Workflow summary
description: Verify spec via 9-criteria check, draft rewrites, decide Pass/Needs Fix/Incomplete.

# ❌ Capability list
description: Provides verification, gap detection, and rewrite suggestions for BrSE specs.

# ✅ Triggering conditions
description: Use when a BrSE requirement document is about to be forwarded to dev or transferred to Outline/Plane/Backlog, and the BrSE needs an objective check against ISO/IEC/IEEE 29148.
```

## Overview / Core Principle

State the rule the skill enforces in **one sentence**. Not the procedure.

```markdown
## Overview

One or two sentences describing what this skill is.

**Core principle:** Do not approve a populated section; approve only verified content.
```

If you cannot name the principle in one sentence, the skill is doing two things — split it.

## When To Use vs When NOT To Use

Both sections are mandatory. "When NOT to use" is the loophole-closer:
- Lists adjacent skills that look similar.
- Forbids invocation under specific conditions.
- Prevents Claude from over-triggering when the description is broad.

## Rationalization Table (rigid skills only)

Include only for **process-enforcing** skills (workflow-chain, spec-verify, report-reviewer, dev-triage). Skip for reference / framework / pattern skills.

The table forbids specific rationalizations Claude tends to invent under pressure. Each row:

- **Excuse**: verbatim phrasing Claude would produce when skipping the rule.
- **Reality**: rebuttal that names why the shortcut fails.

Source the excuses from real baseline runs (Claude without the skill). Do not invent excuses — that produces unrealistic counters.

## Red Flags — STOP

A short list of observable behaviors that mean "you're about to violate the skill." Phrased as triggers the skill itself can spot.

## Example Block

One excellent example beats three mediocre ones.

- Input: a realistic JP customer message or dev report excerpt.
- Output: the actual SKILL output (full structure, not summary).
- Note: one or two sentences explaining a non-obvious choice the skill made.

Do not use:
- Placeholder text (`Lorem ipsum`, `[insert here]`).
- Multi-language reduplication (one example in the relevant language is enough).
- Real product names — use generic placeholders (`Screen A`, `UserProfile`, `staff role`).

## References Folder

When SKILL.md exceeds ~150 lines, move long-form content into `references/`:

- Deep criteria definitions.
- Anti-pattern catalogs.
- Wording libraries (JP business phrases, escalation templates).
- Decision flowcharts in Graphviz / Mermaid.

SKILL.md must link explicitly: `For [topic], read references/[file].md`.

## Naming Convention

- Slug: lowercase, hyphenated, `brse-` prefix.
- Verb-first when possible: `brse-clarify-requirement` > `brse-requirement-clarification`.
- Avoid abbreviations not used in the BrSE domain.

## File Layout

```
skills/
  <skill-slug>/
    SKILL.md                # required, ≤200 lines target
    references/             # optional
      <topic>.md            # deeper guidance
    scripts/                # optional (Node/TS preferred per repo standard)
      <tool>.ts
    assets/                 # optional (templates, JP phrase libraries)
```

## Bilingual Rules (BrSE-specific)

- Customer-facing artifacts: Japanese, business style.
- Internal BrSE/dev artifacts: Vietnamese or English working language.
- Glossary terms (product names, screen labels, role names, task IDs, version codes, third-party tool names): unchanged in any direction.
- When in doubt about a term, the BrSE's project glossary is the source of truth.

## Validation

Before committing a new or edited skill, run:

```bash
./scripts/validate-skills.sh <skill-slug>
```

This checks frontmatter, description length, and reference existence. It does not check skill quality — that requires the pressure scenarios in `tests/scenarios/`.
