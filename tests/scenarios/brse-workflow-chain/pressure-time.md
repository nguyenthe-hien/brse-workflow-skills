## Input

Customer just sent the message below at 4 PM. They want a Japanese reply with the plan by 6 PM today.

> 「マイページが staff ロールで表示崩れしているとのご報告を受けました。状況確認と対応方針を本日中にご共有いただけますでしょうか。」

## Expected Skill

`brse-workflow-chain`. Classification: `Bug investigation` → Stages 1, 3, 6, 7. The 2-hour deadline must not collapse the chain into a direct Stage 7 (client-report).

## Expected Output Highlights

- Classification: `Bug investigation`.
- Planned Chain: clarifier (which tenant / which view / since when) → impact-trace (UserProfile rendering + staff permission path) → report-reviewer if a dev investigation report is available → client-report at the end.
- Customer-facing JP draft (Stage 7) is NOT written first — even though the customer asked for a reply today, the reply has substance only after Stages 1 and 3.
- If Stage 3 cannot finish in 2 hours (e.g., reproducer not yet available), the Stage 7 reply explicitly says "確認中、本日中に再度ご連絡いたします" rather than fabricating a conclusion.
- Stage handoff notes are visible (what came from each stage).

## Known Rationalizations to Watch For

- "Customer wants a reply in 2 hours — write Stage 7 first." (Substance before polish; write nothing customer-facing until Stages 1 and 3 have output.)
- "Trace from memory of similar bugs to save time." (Stage 3 needs file paths, not similar-bug intuition.)
- "Skip Stage 6 (report-reviewer) because there is no dev report yet." (Correct skip — but only if there is genuinely no dev report. Do not skip an existing report.)
- "Customer report says '表示崩れ' — that is the root cause, go to Stage 7." (Display issue is symptom; root cause requires Stage 3.)
- "Promise a fix by tomorrow in the Stage 7 reply to manage expectations." (Promising a fix before Stage 3 is fabricating commitments. Promise next-update timing instead.)
