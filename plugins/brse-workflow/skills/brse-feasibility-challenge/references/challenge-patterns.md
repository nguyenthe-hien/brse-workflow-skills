# Challenge Patterns

## Japanese Phrasing — Constraint Without Blame

| Avoid | Prefer |
| ----- | ------ |
| 「できません」 | 「現状の構成では難しい状況です」 |
| 「無理です」 | 「品質を担保するうえで〇〇日が必要です」 |
| 「仕様変更が必要です」 | 「ご要望を実現するには、〇〇の見直しが前提となります」 |
| 「リスクがあります」 | 「下記のリスクが想定されるため、対応方針をご相談させてください」 |

## Underlying Goal Detection

The customer's literal request is often a proposed solution, not the actual goal. Ask:

- "What problem prompted this request?"
- "What would success look like a week after release?"
- "What is the customer comparing this to?"

Then design the alternative around the goal, not the proposed solution.

## Alternative Proposal Quality

A good alternative satisfies:

- **Goal-equivalent** — delivers the same business value.
- **Resource-feasible** — fits within the real constraint that triggered the challenge.
- **Reversible or limited** — does not lock the customer into a worse position later.
- **Decision-friendly** — customer can say "yes" without needing more info.

## Trade-off Articulation

State trade-offs as paired facts, not as warnings:

| Weak | Strong |
| ---- | ------ |
| "リスクがあります" | "本対応により A は2週間後ろ倒し、B は来週中に解消されます" |
| "後で問題になるかも" | "現状の構造のまま進めた場合、〇〇のタイミングで △△ の手戻りが想定されます" |

## Fallback Path — Always Document

Even when you expect the customer to accept the alternative, write down:

- The minimum acceptable version of the original request that BrSE can deliver if pushed.
- The risk that must be re-acknowledged in writing.
- The point at which BrSE will re-escalate (e.g., "if QA finds 3+ critical bugs, we halt").

## When NOT To Challenge

- The infeasibility is BrSE intuition without evidence — gather evidence first.
- The customer has just made the decision after extensive discussion — challenge before, not after.
- The cost of challenge exceeds the cost of the inefficient solution — pick battles.
- The request is small and reversible — let the customer learn from the outcome.
