---
name: brse-spec-verify
description: Use when a BrSE requirement document is about to be forwarded to dev or transferred to a delivery surface, when a sprint-planning doc is inherited from another BrSE, or when a developer pushes back that a spec is unclear and the BrSE needs an objective check.
---

# BrSE Spec Verify

## Overview

Verify a requirement document against ISO/IEC/IEEE 29148:2018 9-criteria before it is forwarded to developers or transferred to a delivery surface.

**Core principle:** A populated section is not an approved section. Read the body, not the headings. Without the original source, `Correct` cannot be evaluated — mark it Unverified, never assume.

## When To Use

- After `brse-requirement-clarifier` has produced a structured requirement.
- Before `brse-spec-transfer` pushes a document to a delivery surface.
- When reviewing a sprint-planning document inherited from another BrSE.
- When a developer pushes back that a spec is unclear and the BrSE wants an objective check.

## When NOT To Use

- The clarifier has not run yet — verify needs a structured doc, not raw customer input.
- The doc is being authored, not reviewed — write first, verify last.
- The doc is for a one-off internal note that will never go to dev or customer — skip the gate.
- The target is implementation code, not a requirement — code review is a different skill outside this plugin.

## Inputs

The skill needs two things:

1. **Target document** — the requirement to verify (Markdown, paste-in text, or Outline/Plane document via MCP).
2. **Original source** — the customer-facing input the document was derived from (JP spec, email, chat thread, meeting note). Without the original, the `Correct` criterion cannot be evaluated; mark it as `Unverified` and proceed.

## Workflow

1. Identify the target document and the original source. If the original is missing, state this clearly and skip the `Correct` check.
2. Run the document through the **9-Criteria Check** (ISO/IEC/IEEE 29148:2018):
   - **Correct** — every claim in the target document maps back to the original source; no invented facts.
   - **Unambiguous** — each statement admits only one interpretation; no hedging words ("maybe", "should be", "as needed") without a concrete rule.
   - **Complete** — required sections are present and populated: goal, scope, current behavior, expected behavior, acceptance criteria, open questions.
   - **Consistent** — no internal contradictions between sections (e.g., AC contradicting scope).
   - **Singular** — each acceptance criterion expresses one rule; compound criteria are split.
   - **Verifiable** — every acceptance criterion has an observable pass/fail condition QA can check.
   - **Feasible** — the requirement can be implemented in the current system; flag anything that requires undocumented infrastructure or unavailable data.
   - **Traceable** — the document references its source: task ID, customer ticket, screen name, API name, or document URL.
   - **Necessary** — no speculative content, gold-plating, or "nice to have" items the customer did not request.
3. For each failing criterion, write a gap note pointing to the specific section or line.
4. Decide the verdict:
   - **Pass** — safe to forward or transfer.
   - **Needs Fix** — gaps exist; substance must be corrected before forwarding.
   - **Incomplete** — too many gaps or the original source is missing; restart from clarifier stage.
5. For each gap, draft a suggested rewrite that closes it. Keep the rewrite in the same language as the target document.

## Output Shape

```markdown
## Verdict

Pass / Needs Fix / Incomplete

## 9-Criteria Check

| Criterion    | Status | Gap |
| ------------ | ------ | --- |
| Correct      |        |     |
| Unambiguous  |        |     |
| Complete     |        |     |
| Consistent   |        |     |
| Singular     |        |     |
| Verifiable   |        |     |
| Feasible     |        |     |
| Traceable    |        |     |
| Necessary    |        |     |

## Issues Found

(numbered list; each item points to a specific section/line and explains the gap)

## Suggested Rewrite

(per-issue rewrite proposal; keep the original document's language)
```

Status values: `OK`, `Gap`, `Unverified`.

## Rules

- Do not approve a document just because all sections are filled in. A populated section with vague content still fails `Unambiguous` or `Verifiable`.
- Do not invent facts to close a `Correct` gap. If the original source does not contain the information, raise it as an open question instead.
- Do not silently fix the target document. Always surface the gap first and propose a rewrite the BrSE can accept or reject.
- Keep product names, screen names, role labels, version codes, and third-party tool names in their original form regardless of the document's language.
- If the document is for a Japanese customer audience, keep the suggested rewrites in natural Japanese; for offshore developers, keep them in the target document's working language.
- Do not merge this skill's output with the clarifier's output. Verification is a separate artifact.

## Rationalization Table

| Excuse | Reality |
| ------ | ------- |
| "All 9 sections are populated, the doc is fine." | A populated section can still be ambiguous, unverifiable, or contradicted. Read the body. |
| "The original source is missing but I remember what the customer said." | Memory is not a source. Mark `Correct` as Unverified, do not assume. |
| "The hedging word `適切に` is industry-standard, leave it." | `適切に` has no observable pass/fail. `Unambiguous` failure. Replace with a concrete rule. |
| "AC combines two scenarios but devs will understand." | `Singular` exists because devs do not always understand. Split. |
| "Dev pushed back, so the spec must be wrong — let me rewrite it." | Verify the spec against ISO criteria first. Sometimes dev is wrong; sometimes spec is wrong. Evidence decides. |
| "The Pass verdict is faster, let me accept this one." | Pass = forward-safe. A wrong Pass forwards risk to dev and customer. Use Needs Fix when in doubt. |

## Red Flags — STOP

Stop and re-run the criteria check if you notice yourself doing any of these:

- Marking a criterion `OK` while skimming the section heading instead of reading the body.
- Silently rewriting the target document without listing the gap first.
- Closing a `Correct` gap by adding context not present in the original source.
- Producing a verdict of `Pass` when any AC has the words "適切に / 正しく / 必要に応じて / 状況によって" without a concrete rule.
- Filing `Traceable` as `OK` when the document does not link to a ticket / URL / source.
- Choosing the verdict that "looks more constructive" instead of the one the evidence supports.

## Mechanical Pre-Check (optional)

Before running the 9-criteria review by hand, you can run the static checker to clear obvious failures:

```bash
node scripts/check-9-criteria.mjs path/to/spec.md
```

The script flags:
- Missing required sections (`Complete`).
- Forbidden hedging words in JP and EN (`Unambiguous`).
- AC bullets that combine multiple rules (`Singular`).
- AC bullets without an observable predicate (`Verifiable`).
- Missing ticket ID / URL / Source section (`Traceable`).

Mechanical findings narrow the human review; they do not replace it. The semantic criteria — `Correct`, `Feasible`, `Necessary` — still require reading the document against the original source.

## Example

**Input (target document excerpt):**
> ## Acceptance Criteria
> - ユーザー情報が正しく表示されること
> - エラー時は適切にハンドリングすること

**Output verdict:** Needs Fix.

**Gaps:**
- `Unambiguous` — "正しく" and "適切に" have no concrete rule.
- `Verifiable` — QA cannot determine pass/fail without a defined expected value or error path.
- `Singular` — "エラー時" combines multiple error scenarios into one criterion.

**Suggested Rewrite:**
> - ユーザー情報画面に、氏名・メールアドレス・所属が DB の最新値で表示される。
> - API が 401 を返した場合、ログイン画面へリダイレクトする。
> - API が 5xx を返した場合、エラーメッセージ「一時的に表示できません」を表示する。

For the full definitions of the 9 criteria and BrSE-specific anti-patterns, read `references/criteria.md`.
