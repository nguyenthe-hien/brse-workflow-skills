# BrSE Skills — Pressure Scenarios

This directory holds **pressure scenarios** used to manually validate that BrSE skills hold up under real working conditions: vague Japanese input, time pressure, customer authority, dev sunk cost, mixed-language fatigue.

The methodology comes from `superpowers:writing-skills` adapted to the BrSE domain. See `plugins/brse-workflow/skills/brse-skill-author/references/pressure-testing.md` for the full guide.

## How to Run

There is no automated runner. Each scenario is a Markdown file describing the input and the expected behavior. To execute:

1. Open a fresh Claude Code session with the `brse-workflow` plugin loaded.
2. Open the scenario file and paste **only the `## Input` block** into Claude.
3. Observe Claude's behavior.
4. Compare against the `## Expected Skill`, `## Expected Output Highlights`, and `## Known Rationalizations` sections.

A scenario **passes** when:
- Claude invokes the expected skill without being told.
- Claude follows the Workflow steps in order.
- Required gates fire (skill stops and asks when an input is missing).
- Output matches the highlighted sections.
- Under layered pressure variants, the skill still holds.

A scenario **fails** when:
- Claude skips the skill or invokes a wrong one.
- Claude fabricates content to bypass a gate.
- Claude follows a rationalization listed in the `## Known Rationalizations` section.

## Directory Layout

```
tests/scenarios/
  brse-<skill>/
    baseline.md             # realistic input, no extra pressure
    pressure-time.md        # baseline + time constraint
    pressure-authority.md   # baseline + PM/customer authority pressure
    pressure-sunk-cost.md   # baseline + existing implementation
```

Not every skill needs all four pressure variants. The rigid process skills (workflow-chain, spec-verify, report-reviewer, dev-triage) should have at least `baseline.md` and one pressure variant.

## When to Add a Scenario

Add a scenario when:
- A real BrSE session revealed Claude skipping a Workflow step.
- A new rationalization was captured during work — bake it into a scenario for regression.
- A skill is edited; add a scenario for the new behavior before merging.

## Scenario File Format

```markdown
## Input

(realistic BrSE input — JP customer message, dev report, ticket text, dev question)

## Expected Skill

(which skill should trigger, which Workflow step is the load-bearing gate)

## Expected Output Highlights

(must-have items in the output for PASS — concrete, not vague)

## Known Rationalizations to Watch For

(verbatim phrases Claude has used to skip the skill in past baselines)
```

Keep input realistic — typos, mixed languages, hedged JP, missing scope are part of the test surface, not bugs in the scenario.
