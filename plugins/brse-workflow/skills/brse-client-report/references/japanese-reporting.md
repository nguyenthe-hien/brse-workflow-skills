# Japanese Reporting Patterns

## Strong Conclusion

- "現時点では、対象機能への影響は確認されていません。"
- "対象範囲は〇〇に限定される見込みです。"
- "追加確認が必要な点は〇〇です。"

## Weak Phrases To Avoid

- "多分問題ありません"
- "一応確認しました"
- "コメントを対応しました"
- "完了想定です" without date or basis

## Better Alternatives

- "確認した範囲では、〇〇は発生していません。"
- "〇〇の条件では再現しないことを確認済みです。"
- "残件は〇〇で、〇月〇日までに確認予定です。"

## Customer-Relevance Filter

Keep only information that helps the customer understand:

- What is the conclusion?
- What user/business impact exists?
- What risk or blocker remains?
- What action is being taken next, by when?
- What decision or confirmation is needed from the customer?

Remove or move to internal notes:

- Dev process detail that does not change the customer decision.
- Long investigation logs, command output, or implementation sequence.
- Repeated evidence for the same conclusion.
- AI-like prefaces such as "Based on the provided information..." or "I used the following source..."

## Japanese Business Style

- Write as a Japanese customer-facing business update, not as a translated dev memo.
- Use concise, conclusion-first wording.
- Avoid icons, emoji, decorative bullets, and casual emphasis.
- Avoid leaving English/Vietnamese developer phrasing in the customer text. Keep only fixed product names, code identifiers, task IDs, URLs, paths, and visible UI labels unchanged.
- Prefer customer-readable terms over raw implementation terms when both are available.

## Customer Question Reply

Answer each customer question separately:

1. Direct answer.
2. Evidence or reason.
3. Remaining action or request, if any.
