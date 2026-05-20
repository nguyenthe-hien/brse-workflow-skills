---
name: brse-qa-scenario
description: Use when a BrSE is preparing a Japanese QA sheet, regression checklist, demo case set, or release verification plan from a clarified requirement and acceptance criteria.
---

# BrSE QA Scenario

## Overview

Create QA cases that prove the business requirement, not just the implementation path.

**Core principle:** When the expected behavior is unconfirmed, do not write a test case — write a Japanese confirmation question for the customer. Guessing expected results poisons QA.

## When To Use

- Preparing a regression checklist, demo case set, or release verification plan from a clarified requirement.
- Customer review needs a JP QA sheet before sign-off.
- Source impact (`brse-impact-trace`) has surfaced new paths the prior QA plan did not cover.

## When NOT To Use

- Requirement is not clarified yet — run `brse-requirement-clarifier` first.
- Customer asked only for a demo script, not full QA (use the demo-scoped subset).
- Source behavior is unknown and untraceable — escalate before guessing.

## Workflow

1. Identify the target release, product surface, user role, and environment.
2. Start from acceptance criteria and source impact, then derive cases.
3. For each scenario, check if the expected behavior is **confirmed** or **unconfirmed**:
   - **Confirmed** — write a test case row.
   - **Unconfirmed** (spec silent, ambiguous, or contradicts source) — write a JP confirmation question instead. Do not guess the expected result.
4. Cover:
   - main path
   - permission/role differences
   - existing data vs new data
   - validation and error states
   - regression around adjacent flows
   - client/tenant-specific config
5. For customer-facing Japanese QA wording, write observable checks rather than internal implementation language.
6. When confirmation question needs evidence (screenshot, log, source reference), state the evidence request explicitly.

## Output Shape

```markdown
## QA Scope

## Test Cases

| No | Scenario | Preconditions | Steps | Expected Result | Notes |
| -- | -------- | ------------- | ----- | --------------- | ----- |

## Confirmation Questions (JP)

For each unconfirmed scenario, one block:

【確認】「{feature / button name}」の動作について

シナリオ：
{edge case description in Japanese}

確認事項：
{specific question}

選択肢：
□ {option A}
□ {option B}
□ {option C}

（参考）現行システムの挙動：{source behavior or "不明"}
エビデンス提供のお願い：{screenshot / log / spec section needed — or "不要" if spec is sufficient}

ご回答をお願いします。

## Regression Points

## Data / Environment Needs
```

## Rules

- Do not over-generate every edge case if the user asked for main demo cases.
- Do not use testcase IDs or internal scaffolding in customer-facing demo docs.
- If one QA row depends on a previous row, make that dependency explicit in the scenario.
- If behavior cannot be verified without seed/config data, state the data dependency.
- Never write a test case for an unconfirmed scenario — write a confirmation question instead and wait for customer answer.
- Confirmation questions must offer concrete options (選択肢) so the customer can decide without writing free-form text.
- Always include current system behavior (現行システムの挙動) in confirmation questions — it anchors the customer's decision.
- If confirming via chat (Slack/email) rather than a doc, the same format applies — paste the block as-is.

## Example

**Input (acceptance criteria excerpt):**

- AC1: `staff` user opens UserProfile — Edit button not rendered.
- AC2: `staff` user sends crafted PUT to `/api/userProfile/update` → API returns 403.
- AC3: Other roles unchanged.

Spec is silent on: what `staff` sees when they previously bookmarked the Edit URL `/userProfile/edit` directly.

**Output:**

```markdown
## QA Scope

UserProfile screen and update API, focused on `staff` role enforcement. Regression for admin and manager.

## Test Cases

| No | Scenario | Preconditions | Steps | Expected Result | Notes |
| -- | -------- | ------------- | ----- | --------------- | ----- |
| 1 | staff sees no Edit button | Login as staff | Open UserProfile | Edit button not in DOM | AC1 |
| 2 | staff update API blocked | staff session, valid CSRF | PUT /api/userProfile/update | 403 Forbidden | AC2 |
| 3 | admin Edit unchanged | Login as admin | Open UserProfile, click Edit | Edit form opens | AC3 regression |
| 4 | manager Edit unchanged | Login as manager | Open UserProfile, click Edit | Edit form opens | AC3 regression |

## Confirmation Questions (JP)

【確認】「UserProfile編集画面」へのstaffロール直接アクセスについて

シナリオ：
staffユーザーが過去にブックマークした `/userProfile/edit` URLを直接開いた場合の挙動について、仕様に明記がありません。

確認事項：
直接URLアクセス時の表示動作をご指示ください。

選択肢：
□ A: 同じ画面にリダイレクトし、編集UIを非表示で読み取り専用表示
□ B: UserProfile表示ページへ自動リダイレクト
□ C: 403エラーページを表示

（参考）現行システムの挙動：staffも編集画面に直接アクセスでき、保存時に初めて権限エラー
エビデンス提供のお願い：不要（仕様判断のみ）

ご回答をお願いします。

## Regression Points

- 他ロール（admin, manager）でEdit経由の保存が問題なく動作すること。
- `permission.ts` を共有する隣接画面（TenantSettings, MemberList）でstaffの既存権限が変わらないこと。

## Data / Environment Needs

- staff / admin / manager の3ロールを持つテストテナント1件。
- CSRFトークン取得可能なテスト用セッション。
```

**Why this output:** AC1–AC3 produce 4 confirmed test cases. The Edit-URL direct-access scenario is **spec-silent** — instead of guessing "should be 403," the skill produces a JP confirmation question with three concrete options and the current system behavior, so the customer can pick without writing free-form text.

For QA case selection patterns, read `references/qa-patterns.md`.
