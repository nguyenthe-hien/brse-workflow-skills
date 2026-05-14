---
name: brse-qa-scenario
description: Create or review QA scenarios from BrSE specs and acceptance criteria. Use when preparing Japanese QA sheets, regression checklists, demo cases, or release verification plans.
---

# BrSE QA Scenario

Use this skill to create QA that proves the business requirement, not just the implementation path.

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

For QA case selection patterns, read `references/qa-patterns.md`.
