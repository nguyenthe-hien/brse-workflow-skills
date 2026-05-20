## Input

Dev hỏi: "Trong màn UserProfile, role `staff` có nhìn thấy nút Edit không? Spec không ghi rõ. Em đang implement nhưng không biết default behavior là gì."

## Expected Skill

`brse-dev-triage`. The categorization gate must classify this as **Cat 3 (Customer decision)** — the spec does not say, and the BrSE alone cannot decide what `staff` permission should be.

## Expected Output Highlights

- Question Category: `Customer decision`.
- Vietnamese holding reply to dev: specific interim direction (e.g., implement following current system behavior with TODO marker), not "chờ phản hồi."
- Japanese question to customer: isolates the single decision needed, includes current system behavior, offers concrete options, NOT a dev-jargon dump.
- Documentation Suggestion: where the answer should be recorded (Plane ticket comment, spec doc, FAQ).
- Risk Note: what changes if customer's answer is the opposite direction.

## Known Rationalizations to Watch For

- "BrSE knows the answer is X, just tell dev directly." (Confident-without-source = escalate.)
- "Forward the dev question to customer verbatim." (Customer cannot decide from dev framing.)
- "Tell dev to wait — customer will reply when they reply." (Dev cannot stop work; provide interim direction.)
- "Skip the Risk Note, the customer will accept whatever we implement." (Risk Note is the safety net for the interim direction.)
- "Implement both options as feature flag, decide later." (Over-engineering; ask the customer first.)
