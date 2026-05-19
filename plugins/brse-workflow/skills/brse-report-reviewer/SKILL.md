---
name: brse-report-reviewer
description: Review the substance of developer reports before BrSE forwards them. Use for daily/weekly, investigation, impact, and QA reports needing evidence, scope, risk, and next-action checks.
---

# BrSE Report Reviewer

Use this skill for substance review of reports authored by developers, AI engineers, QA, or offshore team members before they are forwarded to a Japanese customer or PM. The goal is to catch weak conclusions, missing evidence, scope gaps, vague next steps, and unclear writing so the BrSE never relays unreliable or hard-to-read information.

## When To Use

- Dev or AI engineer submits a daily/weekly status report.
- Investigation result for a customer-reported bug.
- Impact analysis from a developer.
- Spike result or feasibility study.
- QA report before release.
- AI engineer report covering work across multiple environments (branches, worktrees, sandboxes).

## Workflow

1. Identify the report type: status, investigation, impact, QA result, or feasibility.
2. Identify the audience: customer (external), PM, internal lead, or release gate.
3. Identify the author: human engineer or AI engineer. AI engineer reports trigger the additional Environment Check.
4. Run the report through the **2-Layer Check**:

### Layer 1 — Substance (6-Criteria)

- **Claim** — Is there a clear conclusion at the top? Or only a list of work done?
- **Evidence** — Is each claim backed by source path / log / test result / data, not by guess?
- **Scope** — Does the report state what was checked AND what was not checked?
- **Risk** — Is residual risk or unknown clearly listed?
- **Action** — Are next steps concrete with owner and timing?
- **MECE** — Are points non-overlapping and gap-free at the level the audience cares about?

### Layer 2 — Clarity for JP Readers (5-Question, 具体↔抽象)

Based on the concrete-abstract thinking framework — Japanese readers expect writers to move deliberately between the abstract conclusion and the concrete evidence. Apply each question to the whole report:

- **一言で言うと?** (In one sentence?) — Is there a single, clear conclusion at the top that captures the whole report?
- **具体的には?** (How specifically?) — Are abstract statements backed by concrete details: file path, log excerpt, timestamp, environment, version, exact value?
- **なぜそう言えるのか?** (Why can you say that?) — Does each conclusion show the reasoning chain, not just an assertion?
- **そもそも** (Fundamentally?) — Does the report stay aligned with the original task purpose, or has it drifted to peripheral work?
- **理想は?** (What is the ideal?) — Is the expected/ideal state described, so the gap between current and ideal is visible?

### Environment Check (AI engineer only)

When the author is an AI engineer or the work spans multiple environments, also check:

- **Environment declared** — Does the report state which branch, worktree, sandbox, or sub-agent context produced each result?
- **Reproducible** — Can a human re-run the same steps in the same environment and observe the same result?
- **Provenance of evidence** — Are logs and outputs real captures, not summaries the AI generated from memory?

5. For each failing item, write a specific gap note pointing to the line or section.
6. Decide the verdict:
   - **Ready** — safe to forward as-is.
   - **Needs minor edit** — BrSE can polish wording, but the substance is fine.
   - **Send back to author** — substance or clarity is missing; do not forward.
7. If verdict is "Send back," draft a concise Vietnamese/English/Japanese request to the author listing exactly what to add. Group the request into two parts: (a) substance gaps, (b) clarity / unclear information that needs to be raised.

## Output Shape

```markdown
## Verdict

Ready / Needs minor edit / Send back to author

## Layer 1 — Substance (6-Criteria)

| Criterion | Status | Gap |
| --------- | ------ | --- |
| Claim     |        |     |
| Evidence  |        |     |
| Scope     |        |     |
| Risk      |        |     |
| Action    |        |     |
| MECE      |        |     |

## Layer 2 — Clarity (5-Question, 具体↔抽象)

| Question                | Status | Gap |
| ----------------------- | ------ | --- |
| 一言で言うと?            |        |     |
| 具体的には?              |        |     |
| なぜそう言えるのか?      |        |     |
| そもそも                 |        |     |
| 理想は?                  |        |     |

## Environment Check (only if AI engineer / multi-environment)

| Check                    | Status | Note |
| ------------------------ | ------ | ---- |
| Environment declared     |        |      |
| Reproducible             |        |      |
| Provenance of evidence   |        |      |

## Issues To Fix

(numbered list pointing to specific section/line)

## Questions To Raise To Author

(information that is unclear or missing — the engineer must answer before the report can move forward)

## Suggested Rewrite (only if Needs minor edit)

## Request To Author (only if Send back)
```

Status values: `OK`, `Gap`, `Unverified`, `N/A`.

## Rules

- Do not approve a report just because it is long. Length is not evidence quality.
- Do not approve a report just because all sections are filled in. Populated sections with vague writing still fail Layer 2.
- Do not silently rewrite weak conclusions into strong ones — flag them and ask the author to confirm.
- Do not pass a report forward if the audience is the customer and any of Claim / Evidence / Scope is failing, or if 一言で言うと / 具体的には is failing.
- If the report mixes confirmed facts with assumptions, require them to be visually separated.
- For investigation/bug reports, the claim must answer: "Reproducible? Root cause known? Fix proposed?"
- For impact reports, the claim must answer: "Affected? Not affected? Unknown until X is checked?"
- For AI engineer reports, do not accept evidence that cannot be traced to a real log, file, or command output. AI-summarized evidence without source is a `Gap` under `Evidence` and `Provenance of evidence`.
- Use Japanese phrasing in the "Request To Author" section when the author works in a Japanese-language context; otherwise use the author's working language.

## Example 1 — Vague status report

**Input (dev report excerpt):**
> 「ログを確認しました。今のところ問題なさそうです。引き続き様子を見ます。」

**Output verdict:** Send back to author.

**Gaps:**
- Substance: `Claim` weak ("なさそう"), `Evidence` missing (which logs, what time range), `Scope` missing (what was/wasn't checked), `Action` vague ("様子を見る" has no owner/condition).
- Clarity: `一言で言うと?` Gap (no single conclusion), `具体的には?` Gap (no concrete log/time/env), `なぜそう言えるのか?` Gap (no reasoning).

**Request To Author:**
> 「下記を追記してください:
> 1. 確認したログの対象期間・対象サーバー
> 2. 確認した条件と確認していない条件
> 3. 「問題なさそう」の根拠（エラーゼロ件 / 該当処理が走った形跡なし、など）
> 4. 次の確認タイミングとトリガー」

## Example 2 — AI engineer multi-environment report

**Input (excerpt):**
> 「3つの環境でテストを実施し、すべて成功しました。」

**Output verdict:** Send back to author.

**Gaps:**
- Substance: `Evidence` missing (no log/output), `Scope` missing (which test suites).
- Clarity: `具体的には?` Gap (no environment names, no test counts).
- Environment Check: `Environment declared` Gap (3つの環境が不明), `Provenance of evidence` Gap (実際のログがない).

**Questions To Raise To Author:**
- 3つの環境とは具体的にどれですか？（branch名 / worktree / sandbox ID）
- テスト実行コマンドと出力ログを添付してください。
- 同じ環境で再実行した場合、同じ結果が再現できますか？

For deeper completeness criteria by report type and red flags by writing pattern, read `references/criteria.md`.
