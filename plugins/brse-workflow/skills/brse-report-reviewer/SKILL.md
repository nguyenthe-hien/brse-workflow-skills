---
name: brse-report-reviewer
description: Verify dev reports before BrSE forwards them to Japanese stakeholders. Checks for clear claim, evidence, defined scope, residual risk, and concrete next actions.
---

# BrSE Report Reviewer

Use this skill when reviewing reports authored by developers, QA, or offshore team members before they are forwarded to a Japanese customer or PM. The goal is to catch weak conclusions, missing evidence, scope gaps, and vague next steps so the BrSE never relays unreliable information.

## When To Use

- Dev submits a daily/weekly status report.
- Investigation result for a customer-reported bug.
- Impact analysis from a developer.
- Spike result or feasibility study.
- QA report before release.

## Workflow

1. Identify the report type: status, investigation, impact, QA result, or feasibility.
2. Identify the audience: customer (external), PM, internal lead, or release gate.
3. Run the report through the **6-Criteria Check**:
   - **Claim** — Is there a clear conclusion at the top? Or only a list of work done?
   - **Evidence** — Is each claim backed by source path / log / test result / data, not by guess?
   - **Scope** — Does the report state what was checked AND what was not checked?
   - **Risk** — Is residual risk or unknown clearly listed?
   - **Action** — Are next steps concrete with owner and timing?
   - **MECE** — Are points non-overlapping and gap-free at the level the audience cares about?
4. For each failing criterion, write a specific gap note pointing to the line or section.
5. Decide the verdict:
   - **Ready** — safe to forward as-is.
   - **Needs minor edit** — BrSE can polish wording, but the substance is fine.
   - **Send back to author** — substance is missing; do not forward.
6. If verdict is "Send back," draft a concise Vietnamese/English request to the author listing exactly what to add.

## Output Shape

```markdown
## Verdict

Ready / Needs minor edit / Send back to author

## 6-Criteria Check

| Criterion | Status | Gap |
| --------- | ------ | --- |
| Claim     |        |     |
| Evidence  |        |     |
| Scope     |        |     |
| Risk      |        |     |
| Action    |        |     |
| MECE      |        |     |

## Issues To Fix

## Suggested Rewrite (only if Needs minor edit)

## Request To Author (only if Send back)
```

## Rules

- Do not approve a report just because it is long. Length is not evidence quality.
- Do not silently rewrite weak conclusions into strong ones — flag them and ask the author to confirm.
- Do not pass a report forward if the audience is the customer and any of Claim / Evidence / Scope are failing.
- If the report mixes confirmed facts with assumptions, require them to be visually separated.
- For investigation/bug reports, the claim must answer: "Reproducible? Root cause known? Fix proposed?"
- For impact reports, the claim must answer: "Affected? Not affected? Unknown until X is checked?"

## Example

**Input (dev report excerpt):**
> 「ログを確認しました。今のところ問題なさそうです。引き続き様子を見ます。」

**Output verdict:** Send back to author.
**Gap:** Claim weak ("なさそう"), Evidence missing (which logs, what time range), Scope missing (what was/wasn't checked), Action vague ("様子を見る" has no owner/condition).

**Request to author:**
> 「下記を追記してください:
> 1. 確認したログの対象期間・対象サーバー
> 2. 確認した条件と確認していない条件
> 3. 「問題なさそう」の根拠（エラーゼロ件 / 該当処理が走った形跡なし、など）
> 4. 次の確認タイミングとトリガー」

For deeper completeness criteria by report type, read `references/criteria.md`.
