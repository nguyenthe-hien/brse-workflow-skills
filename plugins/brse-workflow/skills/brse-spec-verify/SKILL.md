---
name: brse-spec-verify
description: Verify a requirement document against ISO/IEC/IEEE 29148 9-criteria (correct, unambiguous, complete, consistent, singular, verifiable, feasible, traceable, necessary) before handing to dev.
---

# BrSE Spec Verify

Use this skill to verify a requirement document is complete, unambiguous, and faithful to the original customer intent before it is forwarded to developers or transferred to Outline/Plane/Backlog.

## When To Use

- After `brse-requirement-clarifier` has produced a structured requirement.
- Before `brse-spec-transfer` pushes a document to a delivery surface.
- When reviewing a sprint-planning document inherited from another BrSE.
- When a developer pushes back that a spec is unclear and the BrSE wants an objective check.

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
