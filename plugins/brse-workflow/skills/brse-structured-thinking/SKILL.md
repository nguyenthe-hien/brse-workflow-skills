---
name: brse-structured-thinking
description: Apply MECE, Pyramid Principle, issue trees, and 5W1H to structure BrSE outputs. Use when a deliverable risks gaps or buried key messages, or when a problem needs decomposition before action.
---

# BrSE Structured Thinking

Use this skill to add logical structure to BrSE deliverables. It does not replace the domain skills (clarifier, impact-trace, client-report) — it is invoked when those outputs need a sharper structural pass.

## When To Use

- A report has facts but the conclusion is hard to find.
- A scope definition feels incomplete and you cannot tell what is missing.
- A customer question is broad and needs to be broken into answerable pieces.
- Ticket breakdown overlaps or leaves silent gaps.
- A problem statement is vague: "なんとなくおかしい" or "うまくいかない".

## Frameworks

### 1. Pyramid Principle (Barbara Minto)

Use when: writing a report or answer where the customer should grasp the conclusion in 10 seconds.

Structure:

```
Top: Conclusion (one sentence answering the customer's real question)
 └─ Supporting argument 1 — evidence A, evidence B
 └─ Supporting argument 2 — evidence C, evidence D
 └─ Supporting argument 3 — evidence E
```

Test: Read only the top line — does the customer get the answer? If no, rewrite.

### 2. MECE (Mutually Exclusive, Collectively Exhaustive)

Use when: defining scope, listing affected areas, or splitting tickets.

Apply at the level the audience cares about, not the deepest technical level. Example for impact scope:
- ME: FE / BE / DB / batch / config — these do not overlap
- CE: covers everywhere the change could ripple to

Test: Can a real case fall into two buckets? (Not ME). Can a real case fall into none? (Not CE).

### 3. Issue Tree (Logic Tree)

Use when: a vague problem must be decomposed before investigation.

```
Problem: ログイン後に画面が真っ白
├─ FE side
│  ├─ Render error (JS exception?)
│  ├─ Routing mis-resolve
│  └─ Empty state branch
├─ API side
│  ├─ 401 returned
│  ├─ 500 returned
│  └─ Response shape mismatch
└─ Data side
   ├─ Missing user record
   └─ Tenant config flag off
```

Test: Each leaf is independently checkable. No leaf hides a sub-tree.

### 4. 5W1H Completeness Probe

Use when: a requirement, bug report, or customer message feels under-specified.

- **Who** — actor, role, tenant
- **What** — exact behavior or data
- **When** — trigger, schedule, timing
- **Where** — surface, environment, repository
- **Why** — business reason (often missing)
- **How** — current vs expected mechanism

Missing dimension = open question to raise.

### 5. So What? / Why So?

Use when: testing whether each sentence in a report earns its place.

- **So what?** — What does this mean for the customer / next action?
- **Why so?** — What evidence supports this claim?

If a sentence answers neither, delete or rewrite.

## Workflow

1. Identify which framework fits the current deliverable. Often two combine (Pyramid + MECE for a report; Issue Tree + 5W1H for an investigation).
2. Apply the framework as a transformation pass on the existing draft, not as decoration.
3. Surface what is missing as explicit `Open Question` items rather than guessing.
4. Keep the BrSE domain rules from the source skill (clarifier, impact-trace, etc.) — this skill structures, does not invent content.

## Output Shape

When invoked standalone, return:

```markdown
## Framework Applied

## Structured Output

## Gaps Detected

## Recommended Next Action
```

When chained from another skill, return only the restructured content plus a short note on which framework was applied.

## Rules

- Do not force a framework that does not fit. If the deliverable is already structured, say so and stop.
- MECE applies at one level at a time. Do not mix "FE / BE / login bug" — that mixes layers.
- Pyramid top must be falsifiable. "対応中" is not a conclusion.
- Issue tree branches must be MECE within their parent.
- Open questions detected by 5W1H must name the dimension: "Who is not specified" not "more info needed."

## Example: Applying Pyramid + MECE to an impact report

**Before:**
> Loginを変更しました。たぶん他の画面には影響しないと思います。BatchもDBもいじってないので大丈夫です。UserProfileの権限チェックは一応見ました。

**After (Pyramid top + MECE body):**
```
## 結論
対象範囲はログイン画面のみで、UserProfile・Batch・DBへの影響は確認した範囲では発生していません。

## 影響範囲（FE / BE / DB / Batch）
- FE: ログイン画面のルーティングのみ変更。UserProfileへの遷移は既存ロジックを維持。
- BE: 認証コントローラの分岐追加のみ。UserProfile の権限チェックは未変更（src/permission.ts:42 にて確認）。
- DB: マイグレーション・初期データの変更なし。
- Batch: 影響なし（認証関連バッチは存在しないため）。

## 残課題
UserProfile 表示ロジックのうち、テナント別設定の分岐は未確認。
```

For framework-specific patterns and anti-patterns, read `references/frameworks.md`.
