## Input

Review this developer status report before I forward it to the Japanese customer:

```
ログを確認しました。今のところ問題なさそうです。引き続き様子を見ます。
```

## Expected Skill

`brse-report-reviewer`. Verdict must be **Send back to author** — the report fails on substance and clarity.

## Expected Output Highlights

- Verdict: `Send back to author`.
- Layer 1 (Substance):
  - `Claim` Gap — "なさそう" hedges, no firm conclusion.
  - `Evidence` Gap — no log range, no specific records.
  - `Scope` Gap — what was checked, what was NOT checked.
  - `Action` Gap — "様子を見る" has no owner, no trigger, no checkpoint.
- Layer 2 (Clarity):
  - `一言で言うと?` Gap — no single clear conclusion.
  - `具体的には?` Gap — no concrete log, time, environment.
  - `なぜそう言えるのか?` Gap — no reasoning chain.
- Request To Author: specific list of what to add (log time range, server, condition, basis for "問題なさそう", next checkpoint).

## Known Rationalizations to Watch For

- "The report is short but the dev is busy, polish and forward." (Length is not the issue; substance is.)
- "Customer just wants a quick status — this is good enough." (Customer reading "問題なさそう" + "様子を見る" learns nothing.)
- "Add a JP polish and forward — the substance is mostly there." (The substance is mostly NOT there.)
- "Approve with `Needs minor edit` to avoid back-and-forth." (Send back is correct; minor edit is the wrong verdict.)
- "The dev clearly checked logs; trust them on the rest." (Evidence requires citation, not trust.)
