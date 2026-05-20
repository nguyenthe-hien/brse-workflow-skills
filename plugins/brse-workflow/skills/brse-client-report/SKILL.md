---
name: brse-client-report
description: Use when a BrSE must produce or polish a Japanese customer-facing report and the wording, tone, conclusion-first structure, and business style must be ready for a Japanese stakeholder reviewer.
---

# BrSE Client Report

## Overview

Draft or polish concise Japanese customer-facing reports that are accurate, business-style, and action-oriented.

**Core principle:** Conclusion first. Every sentence must support the conclusion, customer impact, risk, decision needed, or next action — otherwise delete it.

## When To Use

- Daily or weekly status update to a Japanese customer.
- Investigation result, impact report, or risk note for stakeholder review.
- Customer question reply that must be ready for direct forwarding.
- A developer report has been reviewed (`brse-report-reviewer`) and the BrSE must convert it into customer-facing JP.

## When NOT To Use

- Internal team standup notes — use `brse-offshore-sync` instead.
- Developer-to-developer technical writeup — keep working language.
- Report substance is still weak — run `brse-report-reviewer` first; do not polish a bad report into a more convincing bad report.

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

## Example

**Input (developer investigation report in VN):**

> "Em đã check log production từ 9h sáng đến 12h trưa hôm nay. Có khoảng 5 lần lỗi 500 trên endpoint /api/userProfile/update khi role là staff. Em đoán là do middleware chưa được deploy. Em đã rollback và đang theo dõi thêm."

**Output (JP investigation report):**

```markdown
## 結論

本日午前中に発生した `/api/userProfile/update` の500エラー（5件、9:00〜12:00、staffロール）について、原因は権限ミドルウェアの未デプロイと判明しました。13:00にロールバックを実施し、以降同事象は発生しておりません。

## 確認内容

- 対象期間: 2026-05-20 09:00〜12:00 (本番環境)
- 対象エンドポイント: `/api/userProfile/update`
- 発生件数: 5件
- 対象ロール: staff
- ログ: アプリログ `production-api-2026-05-20.log` にて該当時刻のスタックトレースを確認
- 直接原因: 権限ミドルウェアの該当変更が本番未反映の状態でFE側のみ更新されていたため、整合性不一致

## 影響範囲

- 影響を受けたユーザー: staffロールのうち、該当時間帯にUserProfile更新を試行した利用者（5回分のリクエストに相当）
- 他ロール（admin, manager）への影響: なし
- データ整合性への影響: なし（更新前にエラーで停止）

## 今後の対応

- 13:00 ロールバック実施済（FE側を一時的に旧版へ戻し）
- 明日10:00を目処に、FEとBEを同時デプロイする手順で再リリース予定
- 同日中に、FE/BE同時デプロイを必須とする運用手順書を更新
```

**Why this output:** The developer's "em đoán là" became a verified `直接原因` after evidence was added; the vague "đang theo dõi thêm" became concrete actions with timing. AI-like scaffolding ("Em đã check", "Em đoán") was removed. `体言止め` and Japanese business style were applied without inventing facts.

For Japanese report wording patterns, read `references/japanese-reporting.md`.
