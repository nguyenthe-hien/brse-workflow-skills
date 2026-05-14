# Report Completeness Criteria

Detailed criteria by report type. Apply on top of the 6-Criteria Check in SKILL.md.

## Status / Daily Report

- Yesterday's done items map to specific tickets/PRs, not vague themes.
- Today's plan has at most ~3 focused items, not a wishlist.
- Blockers name the owner who must unblock and the date.
- "進捗率" without scope reference is not a real progress claim.

## Investigation / Bug Report

Required elements:

- Reproduction steps or "could not reproduce" with environment detail.
- Trigger condition: data state, user role, timing, config.
- Root cause: confirmed code path or "root cause still unverified, current hypothesis is X."
- Impact range: affected users / clients / data, and explicitly not-affected items.
- Fix proposal or "fix direction unclear because Y."

Anti-pattern: "修正しました" without root cause — flag and ask why the fix works.

## Impact Analysis Report

- Source trace evidence: file paths, line numbers, or commit references.
- Three buckets: confirmed impact, possible impact, confirmed not-affected.
- Cross-surface check: FE / BE / DB / batch / config / permission — even if "not affected," say so explicitly.
- Customer-facing summary separated from internal technical detail.

## QA Result Report

- Test environment, data set, tenant/client config recorded.
- Pass/fail counts mapped to test IDs.
- Failed cases include: expected vs actual, severity, blocker for release or not.
- Regression scope: what areas were re-tested, what were not.

## Feasibility / Spike Report

- Original question restated to confirm understanding.
- Options explored with pros/cons, not just the chosen option.
- Constraint that ruled out alternatives.
- Recommendation with confidence level and remaining unknowns.

## Red Flags Across All Reports

- Words: "多分", "なさそう", "想定", "問題なさそう" without supporting data.
- Numbers without units, dates without timezone, percentages without denominator.
- "対応中" without owner, scope, or next checkpoint.
- "完了" claims that conflict with open tickets or failing tests.
- Mixing past tense (what happened) with future tense (what will happen) in the same bullet.
