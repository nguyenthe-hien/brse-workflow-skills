# Pressure Testing a BrSE Skill

Companion to `brse-skill-author`. Read after a SKILL.md draft is complete and before merging.

## Why Pressure Testing

A skill that reads well in calm review may collapse under real BrSE conditions: tight deadlines, customer urgency, vague Japanese input, dev waiting for an answer. The purpose of pressure testing is to find the rationalizations Claude will use to skip the skill *before* a real session, then plug them.

This document adapts the superpowers writing-skills methodology to the BrSE domain. The full TDD cycle is RED (baseline failure) → GREEN (skill plugs it) → REFACTOR (close new loopholes).

## Pressure Types Specific to BrSE

| Pressure | Example trigger | What Claude tends to do |
| -------- | --------------- | ----------------------- |
| Time | "Customer needs reply in 30 minutes" | Skip source trace, infer from ticket text |
| Authority | "PM already promised the customer" | Suppress feasibility challenge |
| Politeness | Japanese hedged request "もう少し..." | Treat as soft suggestion, miss real demand |
| Sunk cost | Dev already implemented one direction | Approve spec to match the code, not the customer |
| Exhaustion | 4th meeting summary of the day | Collapse decisions into discussion paragraph |
| Bilingual fatigue | Mixed JP/VN/EN input | Translate verbatim instead of normalizing |
| Customer-trust pressure | "Customer must not see us pushing back" | Soften challenge until the point disappears |

## Baseline Run (RED)

Before adding the new skill to the loaded set, run a session **without** it. Use a realistic BrSE input that the skill should trigger on. Capture:

- What did Claude do?
- Which steps did it skip?
- What rationalization did it produce verbatim if asked "why did you skip X?"
- Did it fabricate content to fill gaps?

Record the verbatim rationalizations. These become rows in the Rationalization Table.

## Skill Run (GREEN)

Add the skill. Run the same input. Verify:

- Did Claude invoke the skill?
- Did it follow every Workflow step?
- Did it produce the Output Shape exactly?
- For rigid skills: did it gate (stop, surface a question) when an input was missing?

If a step was skipped or the gate failed, add an explicit counter to the SKILL.md.

## Refactor

After the GREEN run, apply 2-3 *new* pressures that were not in the baseline:

1. Add a time constraint ("customer needs reply in 30 minutes").
2. Add a credibility hook ("PM has already committed to the customer").
3. Add a sunk-cost hook ("dev already wrote the feature this way").

If Claude finds a new rationalization to skip the skill, add it to the Rationalization Table. Re-run until the skill survives all three layered pressures.

## What Counts as a Pass

A skill passes pressure testing when:

- Claude invokes the skill on the realistic input without being told.
- All Workflow steps are followed in order.
- Gates fire when inputs are missing (the skill stops and asks, not guesses).
- Output Shape matches exactly (sections, headings, bilingual rules).
- Under layered pressure, the skill still holds.

A skill that needs constant nudging during testing has a documentation problem, not a Claude problem. Tighten the SKILL.md.

## Anti-Patterns During Pressure Testing

- **Testing once and declaring success.** One run hides rationalizations that emerge under fatigue or sunk cost.
- **Using a sanitized input.** Real BrSE input has typos, mixed languages, missing scope, and hedging. Test with messy input.
- **Stopping at GREEN.** Refactor pressure runs catch the loopholes the baseline did not surface.
- **Treating warnings as fails.** Validate-skills.sh warnings are informational; they do not replace pressure testing.

## Templates for Realistic Test Inputs

Keep these in `tests/scenarios/<skill-name>/` for repeatable runs:

```
tests/scenarios/<skill>/
  baseline.md         # the realistic input + expected skill invocation
  pressure-time.md    # baseline + time constraint
  pressure-authority.md  # baseline + PM commitment pressure
  pressure-sunk-cost.md  # baseline + existing implementation
```

Each scenario file structure:

```markdown
## Input

(realistic BrSE input — JP customer message, dev report, ticket text)

## Expected Skill

(which skill should trigger, which Workflow step is the load-bearing gate)

## Expected Output Highlights

(what must be present in the output for the test to count as PASS)

## Known Rationalizations to Watch For

(verbatim phrases Claude has used in past baseline runs to skip the skill)
```
