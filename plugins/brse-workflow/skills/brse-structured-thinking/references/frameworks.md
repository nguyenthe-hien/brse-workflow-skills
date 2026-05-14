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
