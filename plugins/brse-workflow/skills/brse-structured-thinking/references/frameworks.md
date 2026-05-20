# Framework Reference

## Pyramid Principle — Detail

Each layer answers a question raised by the layer above.

```
"対象機能への影響は限定的です"
 └─ Why? "FEとBEの一部にとどまるため"
     └─ Why? "ルーティング変更はログイン画面のみで、UserProfile側のAPI契約は不変"
```

**When the customer asks "why":** answer should come from the next layer down.
**When the customer asks "so what":** answer should come from the next layer up.

A pyramid is broken if:
- The top is a list, not a single answer.
- A child does not actually support the parent.
- Two siblings overlap (violates MECE within the layer).

## MECE — Common Splits For BrSE

Use these as starting templates, then verify ME and CE:

- **Surface:** FE / BE / DB / Batch / Config / Permission
- **Lifecycle:** Create / Read / Update / Delete / Approve / Cancel
- **Audience:** Customer / PM / Dev / QA / Ops
- **Time:** Past confirmed / Current state / Future risk
- **Certainty:** Confirmed / Likely / Unknown until checked
- **Client:** Demo client / Existing prod tenants / New tenants

**Avoid** mixing layers like "FE / BE / Performance" — performance is cross-cutting.

## Issue Tree — Quality Rules

- Each level uses one decomposition axis only.
- Sibling branches must be MECE.
- Leaves must be independently verifiable (one person, one source, one check).
- Stop decomposing when the leaf becomes a concrete action.

Anti-pattern: a tree where one branch is "その他" — that means MECE failed.

## 5W1H Probe — Dimension Bank

For BrSE-specific dimensions, in addition to standard 5W1H:

- **Which client / tenant** — multi-tenant systems behave differently per client.
- **Which environment** — local / dev / staging / UAT / prod.
- **Which release** — current sprint / hotfix / next release.
- **Which permission level** — admin / general / readonly.
- **Which data state** — empty / existing / migrated / corrupted.

A missing dimension on any of these is an explicit open question, not "more info needed."

## So What? / Why So? — Editing Pass

Print the draft. For each sentence, ask both questions out loud:

| Sentence | So what? | Why so? |
| -------- | -------- | ------- |
| "ログを確認しました" | (no answer) | (no answer) → **delete or expand** |
| "対象期間2024-05-01〜05-07のerrorログを確認し、該当処理のエラーは0件でした" | 影響範囲を限定できる | アクセスログとエラーログの両方を確認 → **keep** |

If half the draft fails the test, the structure is wrong — rebuild with Pyramid before editing line by line.

## First-Principles / Algorithm Thinking — BrSE Use

This is for inherited assumptions, not for every decision. Use it when a request sounds expensive because it bundles past patterns into the current problem.

### First-Principles Breakdown

Separate the problem into four buckets:

| Bucket | Question | BrSE examples |
| ------ | -------- | ------------- |
| Fundamental fact | What is confirmed true? | Current code path, table schema, API contract, existing permission rule |
| Hard constraint | What cannot be changed in this scope? | Release date, customer decision, legal rule, shared interface |
| Assumption | What is being treated as true without proof? | "Same as old screen", "QA needs all patterns", "approval is always required" |
| Derivation | What follows from facts and constraints? | Minimum scope, safest rollout, required confirmation question |

If a point is neither a fact nor a hard constraint, label it as an assumption before using it in the conclusion.

### BrSE Algorithm Order

Apply this order for scope, workflow, or solution cleanup:

1. **Question the requirement** — attach each requirement to a real actor, business outcome, or source.
2. **Delete** — remove anything that does not protect the outcome.
3. **Simplify** — make the remaining behavior smaller, clearer, and testable.
4. **Accelerate** — only then reduce cycle time or delivery steps.
5. **Automate** — automate last, after the manual process is proven necessary.

Common failure: automating a copied process before proving the copied process belongs in the current scope.

### Limits Test

Push the request to extremes to expose hidden structure:

- If this had to ship tomorrow, what is the irreducible behavior?
- If this had to support 100 tenants, which manual step breaks first?
- If the dataset were empty or huge, which branch changes?
- If every screen copied this workflow, would the product become easier or harder to operate?

### Perfect-State Target

Ask what the ideal state would look like if current implementation habits did not exist. Then compare that target with the actual constraints.

Use this to avoid polishing a bad workflow. The output should be a practical next step, not a fantasy design:

- Ideal state: user gets the necessary result with no duplicate input.
- Current constraint: legacy API requires one intermediate status.
- Practical proposal: keep the intermediate status internally, but do not expose it as a user action.

### Risk Honesty

End first-principles analysis with a falsifiability check:

- Where might this analysis be wrong?
- Which missing fact would change the recommendation?
- What source must be traced before calling the proposal safe?
