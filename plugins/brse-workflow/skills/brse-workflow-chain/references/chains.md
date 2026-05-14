# Chain Templates By Request Type

## New Feature Request

```
1. brse-requirement-clarifier
   Input: customer spec, related screens
   Output: scope, acceptance criteria, open questions

2. brse-impact-trace
   Input: scope + affected surfaces from Stage 1
   Output: confirmed impact, evidence, contract changes

3. (optional) brse-structured-thinking
   When Stage 2 output is wide and unstructured
   Output: MECE-organized impact view

4. brse-ticket-breakdown
   Input: scope + impact
   Output: tickets with dependencies and acceptance criteria

5. brse-qa-scenario
   Input: acceptance criteria + impact
   Output: QA cases including regression points

6. brse-client-report (if customer asked for confirmation)
   Input: scope + impact + tickets
   Output: JP conclusion-first reply
```

## Bug Investigation Request

```
1. brse-requirement-clarifier
   Pin down: tenant, environment, trigger, reproduction.

2. brse-impact-trace
   Trace the failing flow with source evidence.

3. brse-report-reviewer
   Verify dev's investigation report before forwarding.

4. brse-client-report
   Reply with: confirmed / likely / unknown buckets.
```

## Spec Change Mid-Sprint

```
1. brse-requirement-clarifier
   What changes, what stays, why now.

2. brse-impact-trace
   What in-progress work is affected.

3. brse-feasibility-challenge (if scope balloons)
   Challenge or propose alternative.

4. brse-ticket-breakdown
   Re-split affected tickets.

5. brse-client-report
   Report scope and timeline implication.
```

## Status Reply / Customer Question

```
1. brse-report-reviewer
   Verify the underlying dev report.

2. brse-structured-thinking (Pyramid)
   Organize answer with conclusion first.

3. brse-client-report
   Final JP wording.
```

## Handoff Note Conventions

Each handoff note is one short block:

```
From: <previous skill>
Carried forward: <2-3 bullets of facts confirmed>
Open questions: <items that need customer or dev answer before next stage>
Blockers: <items that stop the chain>
```

If "Blockers" is non-empty, the chain halts and the BrSE escalates rather than continues.
