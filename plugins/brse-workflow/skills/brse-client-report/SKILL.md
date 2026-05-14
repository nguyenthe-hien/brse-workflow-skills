---
name: brse-client-report
description: Draft or review Japanese client-facing BrSE reports, daily updates, investigation summaries, risk notes, and answers to customer questions. Use when reporting progress, impact, blockers, QA status, or source-backed findings to Japanese stakeholders.
---

# BrSE Client Report

Use this skill to produce concise Japanese reports that are accurate, customer-facing, and action-oriented.

## Workflow

1. Decide the report type:
   - daily status
   - investigation result
   - impact report
   - QA result
   - customer question reply
   - release risk note
2. Put the conclusion first.
3. State evidence only at the level useful to the customer.
4. Separate:
   - confirmed facts
   - current action
   - remaining risk
   - customer decision/request
5. If the audience is non-technical, explain user/business impact before implementation detail.
6. If the user asks for review, point out unnatural Japanese, timeline ambiguity, and weak evidence.

## Output Shapes

### Investigation / Impact

```markdown
## 結論

## 確認内容

## 影響範囲

## 今後の対応
```

### Daily / Weekly Status

```markdown
## 本日の対応

## 進捗

## 懸念点

## 明日の予定
```

## Rules

- Prefer natural Japanese. Do not translate Vietnamese structure literally.
- `体言止め` is allowed when it matches the existing report style.
- Avoid vague phrases such as "対応中" without scope, owner, or next action.
- Avoid saying "完了想定" when the date or confidence is unclear.
- If source was not checked, do not phrase the result as confirmed.

For Japanese report wording patterns, read `references/japanese-reporting.md`.
