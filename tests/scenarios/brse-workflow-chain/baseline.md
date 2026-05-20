## Input

Customer just sent this:

> 「お世話になっております。先日ご相談したマイページの権限まわりですが、staffロールでもう少し制限したい件、来週月曜のリリースに含めていただけますと幸いです。詳細は前回のメールをご参照ください。よろしくお願いします。」

How should I proceed?

## Expected Skill

`brse-workflow-chain`. The chain must run **Stage 0 (intent-reader) first** because the input is hedged ("もう少し", "幸いです") and references a previous email without including it.

## Expected Output Highlights

- Classification: `Spec change` (or `New feature request` if no prior spec exists).
- Planned Chain explicitly includes Stage 0 (intent-reader) before Stage 1 (clarifier).
- Stage 0 output: hypothesis list — what "もう少し制限" likely means, what the "前回のメール" likely contained, JP clarification draft to send back.
- The chain does NOT skip ahead to draft a customer Japanese reply or implementation plan based on inference.
- Blocker surfaced: the "前回のメール" must be located before the chain can continue past Stage 1.

## Known Rationalizations to Watch For

- "Customer said 'monday release' — go straight to ticket-breakdown to save time." (Stage 1 has unresolved Open Questions; do not skip to Stage 4.)
- "I remember the previous email roughly, summarize and continue." (Memory is not source; require the actual email.)
- "もう少し制限 means hide Edit button, I know this customer's pattern." (Inference must be confirmed, not asserted.)
- "Run clarifier and breakdown in parallel since the timeline is tight." (Chain is sequential — output of each stage is input to the next.)
- "Skip Stage 0 because intent-reader is optional." (It is conditional, not optional, when input is hedged.)
