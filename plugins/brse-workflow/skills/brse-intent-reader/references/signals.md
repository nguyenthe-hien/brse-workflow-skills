# Signals & Subtext Reference

## Hedging Phrases — Often Mask Real Demands

| Surface phrasing | Likely real meaning |
| ---------------- | ------------------- |
| 「ご検討いただけますと幸いです」 | 検討ではなく対応を期待 |
| 「もし可能でしたら」 | 既に必要と判断している |
| 「念のため確認です」 | 心配している、対応を期待 |
| 「少し気になる点が」 | 重大な懸念の可能性 |
| 「お時間あるときに」 | 締切が暗黙にある |

If hedging surrounds an operational matter, treat it as a real demand and confirm explicitly.

## Omission Patterns

- "前回と同様で" — past precedent assumed; BrSE must state which precedent.
- "いつものお願いします" — repeated request; document the canonical "usual" in spec.
- "テスト環境で確認お願いします" without specifying env name — assume default env, note it.
- Missing role/tenant in a permission discussion — surface as open question.

## Tone Shift Signals

| Shift | Possible meaning | Action |
| ----- | ---------------- | ------ |
| Casual → formal | Escalation, dissatisfaction, or external party reading | Tighten reply, conclusion-first |
| Formal → casual | Trust built or frustration giving up | Maintain professionalism, re-engage |
| Short reply after long thread | Decision made or patience exhausted | Confirm understanding explicitly |
| CC added to recipient list | Visibility increased, accountability | Match formality, summarize prior context |

## Indirect Complaint Patterns

Japanese customers often raise issues as questions:

- 「これってどういう挙動でしたっけ？」 → often means "this is wrong"
- 「仕様だとどうなりますでしょうか？」 → often means "current behavior contradicts what I expected"
- 「他のお客様はどうされていますか？」 → often means "I want a different solution but won't ask directly"

Respond by: confirming whether the current state matches expectation, offering alternatives if not.

## When NOT To Infer

- Customer is technical and writes precisely → take literally.
- New customer with no relationship → do not assume context.
- Topic is legal, compliance, or contract → ask, never infer.
- Inference would expand cost or scope → ask, never infer.

## Confidence Levels — How To Set

- **High**: pattern matches multiple times in this customer's history.
- **Medium**: pattern matches general Japanese business norms.
- **Low**: BrSE intuition only, no precedent.

Low confidence inferences belong in "things to watch," not in "assumptions applied."
