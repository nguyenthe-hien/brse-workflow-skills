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

## Side Branches (invoke any time during main chain)

### Dev question arrives during sprint

```
Trigger: developer asks about spec ambiguity, edge case, or source behavior conflict.

1. brse-dev-query-response
   Categorize: answerable / source-trace needed / customer decision / hidden assumption.
   Output: Vietnamese reply to dev + (if needed) Japanese question to customer.

Resume main chain after dev is unblocked.
```

### Meeting / daily sync produces output

```
Trigger: BrSE facilitated or attended a meeting and needs to capture decisions and actions.

1. brse-offshore-sync
   Input: raw meeting notes or transcript.
   Output: bilingual decision log + action items with owner and deadline.

This is a standalone output — does not feed back into the main chain unless actions
create new customer requests (which restart the chain at Stage 0/1).
```

### Customer or PM pushes unrealistic scope / deadline

```
Trigger: customer request exceeds technical capacity, timeline, or contradicts a prior decision.

1. brse-feasibility-challenge
   Input: original customer request + evidence (source trace, estimate, contract clause).
   Output: restated request + diagnosis + alternative proposal + Japanese pushback reply.

Resume main chain using the accepted alternative as the new scope input.
```

### Vague or indirect Japanese input (Stage 0)

```
Trigger: input is very short, hedging ("〜していただけますと幸いです"), or omits key context.

1. brse-intent-reader
   Input: raw JP message.
   Output: hypothesis table with confidence levels and recommended clarification questions.

Feed intent-reader output into Stage 1 (brse-requirement-clarifier) as additional context.
```

---

## Handoff Note Conventions

Each handoff note is one short block:

```
From: <previous skill>
Carried forward: <2-3 bullets of facts confirmed>
Open questions: <items that need customer or dev answer before next stage>
Blockers: <items that stop the chain>
```

If "Blockers" is non-empty, the chain halts and the BrSE escalates rather than continues.
