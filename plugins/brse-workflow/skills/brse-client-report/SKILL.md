---
name: brse-client-report
description: Draft or review Japanese client-facing BrSE reports for progress, investigations, risk notes, and customer answers. Use when reporting to Japanese stakeholders.
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
4. Filter the content by customer value: decision needed, user/business impact, current status, remaining risk, or next action. Remove dev-internal process detail that does not change customer understanding.
5. Separate:
   - confirmed facts
   - current action
   - remaining risk
   - customer decision/request
6. If the audience is non-technical, explain user/business impact before implementation detail.
7. If the source is a developer report in English or Vietnamese, rewrite it into natural Japanese business reporting style. Keep only established product names, code identifiers, task IDs, paths, and visible screen labels unchanged.
8. If the user asks for review, point out unnatural Japanese, timeline ambiguity, weak evidence, excessive length, AI-like wording, and unnecessary dev-internal detail.

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
- Do not use icons, emoji, decorative markers, or casual visual symbols in customer-facing reports.
- Do not forward developer wording as-is. Convert English/Vietnamese dev phrasing into concise Japanese unless it is a fixed product term, code identifier, task ID, URL, or visible UI label.
- Keep the report short enough for a reviewer to scan. If a detail does not support the conclusion, customer impact, risk, decision, or next action, remove it or move it to internal notes.
- Avoid AI-like over-explanation, generic summaries, and "I checked based on..." scaffolding. The report should read like a Japanese BrSE/customer-facing business update.
- Avoid vague phrases such as "対応中" without scope, owner, or next action.
- Avoid saying "完了想定" when the date or confidence is unclear.
- If source was not checked, do not phrase the result as confirmed.

For Japanese report wording patterns, read `references/japanese-reporting.md`.
