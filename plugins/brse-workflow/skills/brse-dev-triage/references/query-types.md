# Dev Query Types

## Type 1 — Answerable From Spec/Ticket

Signs: question is already covered in spec but dev missed it.

Action: point to the exact spec section. Do not just repeat — quote and add 1-line interpretation.

Phrasing: "Spec mục 3.2 đã có. Trích: '...'. Nghĩa là ..."

## Type 2 — Answerable From Source Trace

Signs: question is about current behavior, not future design.

Action: trace source first, reply with file:line evidence.

Phrasing: "Hiện tại code làm thế này: `src/x.ts:42`. Em implement theo logic này nhé."

## Type 3 — Customer Decision

Signs: question requires a business choice, design preference, or scope confirmation.

Action: escalate. Do not invent the decision.

Phrasing to dev: "Đây là quyết định business, anh confirm với khách. Trong lúc chờ, làm theo [tạm thời]. Ngày trả lời dự kiến: ..."

Phrasing to customer (JP): isolate the decision, show current vs proposed, request explicit choice.

## Type 4 — Hidden Assumption

Signs: dev question reveals a requirement that was never written.

Action: clarify with customer AND update the spec/ticket so the gap does not recur.

Phrasing: "Đây là requirement chưa được ghi lại — sau khi khách trả lời, em sẽ bổ sung vào spec doc."

## Escalation Quality Bar

A good customer escalation has:

- One decision per message, not a checklist of five.
- Current behavior stated for context.
- Default behavior proposed (so customer can just say "OK").
- Deadline or impact note: "本件、明日中にご回答いただけますと、〇〇に間に合います。"

## Anti-patterns

- "確認お願いします" without saying what to confirm.
- Asking the customer to choose between two options without explaining trade-offs.
- Blocking the dev when a safe interim direction exists.
- Answering a Type 3 question from BrSE intuition — even if intuition is correct, it sets a bad precedent.
