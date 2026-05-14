---
name: brse-workflow-chain
description: Guide a BrSE through the full chain from raw customer request to ready-to-assign tickets and customer report — orchestrating clarifier, impact-trace, ticket-breakdown, qa-scenario, and client-report in sequence with explicit handoff context. Use when a BrSE has a new customer request and wants end-to-end guidance instead of invoking each skill manually.
---

# BrSE Workflow Chain

Use this skill as a meta-orchestrator. It does not replace the domain skills — it tells the BrSE which skill to invoke next and what context to carry between steps.

## When To Use

- New customer request just arrived and BrSE does not yet know the shape of work.
- A vague Japanese spec needs to be turned into dev-ready tickets and a customer reply in one session.
- BrSE wants to ensure no step (clarify / impact / split / QA / report) is skipped.

## Chain Stages

```
Stage 1 — Clarify        →  brse-requirement-clarifier
Stage 2 — Trace impact   →  brse-impact-trace
Stage 3 — Structure      →  brse-structured-thinking  (optional, when output is messy)
Stage 4 — Break tickets  →  brse-ticket-breakdown
Stage 5 — Design QA      →  brse-qa-scenario
Stage 6 — Verify report  →  brse-report-reviewer       (when dev reports back)
Stage 7 — Report customer→  brse-client-report
```

Not every chain runs all stages. The skill decides the minimum useful path.

## Workflow

1. Read the customer input and classify it:
   - **New feature request** → Stages 1, 2, 4, 5, 7
   - **Bug investigation request** → Stages 1, 2, 6, 7
   - **Spec change** → Stages 1, 2, 4, 7
   - **Status reply** → Stage 6, 7
2. Confirm classification with the BrSE before chaining (one short question).
3. For each stage, state:
   - Which skill to invoke
   - What input the skill needs from the previous stage
   - What output it must produce to feed the next stage
4. Run stages one at a time. Do not skip ahead even if the next answer feels obvious.
5. At each stage handoff, write a short bridge note: "From Stage X we have A, B, C — Stage Y needs A as input."
6. If a stage uncovers a blocker (missing customer info, missing source access), stop the chain and surface the blocker; do not fabricate input for the next stage.

## Output Shape

```markdown
## Classification

(new feature / bug investigation / spec change / status reply)

## Planned Chain

1. Stage X — skill — purpose
2. ...

## Current Stage Output

(content from the active skill)

## Handoff Note

To next stage: ...
Blockers: ...
```

## Rules

- Do not invoke multiple skills in parallel. The chain is sequential because each output is input to the next.
- Do not collapse two stages into one even when they look similar (clarify vs trace, breakdown vs QA).
- If `brse-structured-thinking` would improve a stage output, invoke it before moving on, not after the chain ends.
- Stop the chain immediately if Stage 1 produces unresolved open questions that block downstream work — do not "best guess" through to Stage 7.
- Use Vietnamese for internal handoff notes; use Japanese only when the artifact is for the customer.

## Example: Bug investigation chain

**Customer input (JP):** 「マイページが表示されない件、状況を教えてください」

```
Classification: Bug investigation

Planned chain:
1. brse-requirement-clarifier  — pin down: which tenant, which screen, since when, reproducible?
2. brse-impact-trace           — trace user profile route + permission + tenant config
3. brse-report-reviewer        — verify dev's investigation report meets 6 criteria
4. brse-client-report          — draft JP reply with conclusion-first structure

Skipped: ticket-breakdown (no implementation yet), qa-scenario (investigation phase)
```

For chain templates by request type, read `references/chains.md`.
