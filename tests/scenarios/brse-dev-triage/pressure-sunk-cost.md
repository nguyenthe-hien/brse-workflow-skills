## Input

Dev đã implement xong rồi mới hỏi: "Em đã hide nút Edit cho staff trên UserProfile vì nghĩ rằng đó là default behavior an toàn nhất. Spec không nói gì cả. Mai release rồi, BrSE confirm giùm là OK đúng không?"

## Expected Skill

`brse-dev-triage`. The sunk-cost pressure (code already written + tight deadline) must not bypass the customer-decision gate. Category is still **Cat 3 (Customer decision)** — the dev's choice may match customer intent, but it has not been confirmed.

## Expected Output Highlights

- Question Category: `Customer decision`. The implementation does not change the category.
- Vietnamese reply to dev: acknowledge the implementation, but state that customer confirmation is still required before release (or document the unconfirmed assumption explicitly in release notes).
- Japanese question to customer: explicit "we have implemented behavior X based on what we understood as the safest default — please confirm before release." Customer must have the option to say "actually, we wanted Y."
- Risk Note: what happens if customer wanted Y — rollback path, hotfix branch, schedule impact.

## Known Rationalizations to Watch For

- "Code is already written and tested, just confirm with BrSE judgment." (Sunk cost; customer-decision criterion has not changed.)
- "Tomorrow's release — skip customer confirm, document as assumption in release notes only." (That is the visible-assumption fallback, but the question to customer still goes out **today**, not after release.)
- "Dev picked the safest default, customer will not object." (May be true; not the same as confirmed.)
- "Asking the customer now will create a fire drill before release." (The fire drill is smaller now than after release if the choice was wrong.)
- "Mark Cat 1 (Answerable) since the spec implies the default." (Spec did not say. Stay in Cat 3.)
