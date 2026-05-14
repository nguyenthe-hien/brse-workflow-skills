---
name: brse-feasibility-challenge
description: Evaluate a customer or PM request for technical, scope, or timeline feasibility, then draft a structured response that challenges the infeasible parts and proposes a superior alternative — in customer-appropriate Japanese with evidence-backed reasoning. Use when a BrSE must push back on an unrealistic ask without damaging the relationship.
---

# BrSE Feasibility Challenge

Use this skill when relaying the customer request as-is would set the project up to fail. The skill structures a respectful pushback with a concrete alternative — not a refusal.

## When To Use

- Customer requests scope that conflicts with current architecture or other commitments.
- Deadline is technically impossible without scope cut.
- Approach has a known failure mode (performance, security, data integrity).
- Request contradicts an existing decision or contract.

## Workflow

1. Restate the customer's request in your own words — verify you understood before challenging.
2. Identify which dimension is infeasible:
   - **Technical** — architecture, dependency, data limitation
   - **Scope** — too much work for the resources
   - **Timeline** — deadline shorter than minimum viable path
   - **Risk** — feasible but unsafe (security, data, compliance)
   - **Conflict** — contradicts a prior decision or contract clause
3. Gather evidence for the infeasibility claim — source trace, prior incident, benchmark, contract clause. Without evidence, do not challenge.
4. Design at least one **alternative proposal** that delivers the customer's underlying goal (not the literal request).
5. Apply Pyramid structure to the customer reply: conclusion → reasoning → evidence → proposal.
6. Use respectful Japanese that names the constraint clearly without blaming the customer.
7. Always include a **fallback if customer insists** — what BrSE will do if the customer overrides the challenge.

## Output Shape

```markdown
## Restated Request

## Infeasibility Diagnosis

- Dimension: technical / scope / timeline / risk / conflict
- Evidence:
- Underlying customer goal:

## Alternative Proposal

- Proposal:
- How it satisfies the underlying goal:
- Trade-offs vs original request:

## Customer Reply (Japanese)

## Fallback If Customer Insists

(what BrSE will do, what risks must be re-confirmed in writing)
```

## Rules

- Never challenge without evidence — challenge requires source, data, or contract reference.
- Never refuse without proposing an alternative. "Cannot be done" alone damages trust.
- Identify the underlying goal, not the literal ask — the customer often does not know the best path.
- Japanese reply must keep the customer's face: use "難しい状況です" not "できません" when appropriate, but do not soften so much that the customer misses the point.
- Always document the fallback path even if you expect customer to accept the alternative.
- Do not stack three alternatives — one strong proposal is more decision-friendly than three weak ones.

## Example

**Customer request (JP):**
> 「来週月曜のリリースに、UserProfile の全権限ロジック刷新を間に合わせてください。」

**Restated request:**
- Refactor all UserProfile permission logic in 4 working days, include in next Monday's release.

**Infeasibility diagnosis:**
- Dimension: timeline + risk.
- Evidence: existing permission spec covers 12 roles × 8 screens; QA regression alone needs ~3 days; permission changes touch shared middleware used by 4 other features (src/permission.ts referenced by 4 controllers).
- Underlying customer goal: fix the recently reported issue where role `staff` sees data they should not.

**Alternative proposal:**
- Scope-cut option: ship a targeted fix for the `staff` role on the affected UserProfile section only (1.5 days dev + 1 day QA). Full permission refactor moves to the following sprint with proper test plan.
- Trade-offs: the unsafe data exposure is closed by Monday; the broader cleanup is delayed by 2 weeks but reduces regression risk.

**Customer reply (JP):**
> 「お世話になっております。UserProfile の権限ロジック刷新の件、ご相談させてください。
>
> 結論として、来週月曜リリースで全権限ロジックの刷新を行うのは品質リスクが高く、難しい状況と判断しております。一方、ご報告いただいた `staff` ロールの情報表示の問題は、来週月曜までに対応可能です。
>
> 提案:
> - 来週月曜リリース: `staff` ロールの該当箇所のみ修正（影響範囲を限定、QA1日確保）
> - 次スプリント: 全権限ロジックの整理・刷新（テスト計画を含む）
>
> ご判断をいただけますでしょうか。」

**Fallback if customer insists:**
- Reduce QA regression scope to the highest-risk paths only and request written acknowledgment of regression risk for the rest.
- Add hotfix-ready branch in case post-release defects appear.

For challenge phrasing and trade-off articulation, read `references/challenge-patterns.md`.
