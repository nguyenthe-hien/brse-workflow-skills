# Requirement Quality Criteria

Detailed criteria based on ISO/IEC/IEEE 29148:2018 (the international standard for requirements engineering, successor to IEEE 830). Each criterion below includes the standard definition, what to check in a BrSE context, and anti-patterns that signal a gap.

## 1. Correct

**Definition:** The requirement accurately represents the need from which it was transformed.

**Check:** Every claim in the target document traces back to a statement in the original customer source. The BrSE has not added inferred facts, removed nuance, or shifted the goal.

**Anti-patterns:**
- Target document contains a constraint the customer never mentioned.
- A polite Japanese hedge ("〜していただけると助かります") was upgraded to a hard requirement, or vice versa.
- Numbers, dates, or quantities differ between source and target.
- Customer asked about Screen A, the document is written for Screen B.

## 2. Unambiguous

**Definition:** The requirement is stated such that it can be interpreted in only one way.

**Check:** Each sentence admits one interpretation. Vague modifiers are replaced with concrete rules.

**Anti-patterns:**
- "適切に", "正しく", "必要に応じて", "可能な限り" without a defined rule.
- "improve", "optimize", "user-friendly" without measurable target.
- Two readers would reasonably disagree on what passes.

## 3. Complete

**Definition:** The requirement contains all information necessary to define the capability.

**Check:** Required sections are present and populated: goal, scope, current behavior, expected behavior, acceptance criteria, open questions. Edge cases relevant to the scope are addressed.

**Anti-patterns:**
- "Current behavior" section is empty or only repeats the goal.
- Acceptance criteria cover the happy path but not error/empty/permission cases.
- Out-of-scope items are not listed when the request is broad.

## 4. Consistent

**Definition:** The requirement does not conflict with other requirements.

**Check:** Sections do not contradict each other. Terminology is used consistently throughout.

**Anti-patterns:**
- Scope says "admin only" but AC includes a behavior for general users.
- A field is required in one section and optional in another.
- The same entity is referred to by two different names (e.g., "user", "member", "account") without clarification.

## 5. Singular

**Definition:** The requirement states a single capability.

**Check:** Each acceptance criterion expresses one observable rule. Compound criteria joined by "and"/"or" are split.

**Anti-patterns:**
- "On submit, validate the form and save to DB and send a notification."
- "Error handling is appropriate for all error cases."
- One bullet describing both desktop and mobile behavior when they differ.

## 6. Verifiable

**Definition:** The realization of the requirement by the system can be verified by inspection, analysis, demonstration, or test.

**Check:** Every acceptance criterion has an observable pass/fail condition that QA can execute without asking the BrSE.

**Anti-patterns:**
- "The system should be fast." (no threshold)
- "Users feel satisfied with the new flow." (not observable)
- Pass condition depends on undefined data state.

## 7. Feasible

**Definition:** The requirement can be realized within constraints (cost, schedule, technical, legal) with acceptable risk.

**Check:** The requirement does not depend on infrastructure, data, or permissions the system does not currently have. If it does, that dependency is called out as an open question.

**Anti-patterns:**
- Requires a third-party API that the team has not contracted for.
- Requires data that is not collected or stored anywhere in the system.
- Conflicts with a known platform limit (rate, payload size, retention) without acknowledging it.

## 8. Traceable

**Definition:** The requirement is uniquely identified and can be traced upward to a source and downward to design/test.

**Check:** The document references its origin: task ID, customer ticket number, email/chat thread, screen name, API name, or document URL. Each requirement can be cited individually.

**Anti-patterns:**
- "Per the customer's request" without naming the source.
- No task ID, no screen identifier, no link to the meeting note or thread.
- A bullet that cannot be cited in isolation because it refers to "the above".

## 9. Necessary

**Definition:** The requirement defines a capability the stakeholder actually needs; removing it would create a deficiency.

**Check:** No speculative content, gold-plating, or "nice to have" items the customer did not ask for. The BrSE has not added their own design preferences as requirements.

**Anti-patterns:**
- Acceptance criterion describing an animation or visual polish the customer never mentioned.
- A retry/cache/logging behavior added by the BrSE without confirmation.
- "While we're at it, also do X" items mixed into the original scope.

## Cross-Document Red Flags

These signals usually indicate multiple criteria are failing at once:

- Source is JP but target is dev-language and key product terms have been translated. Established product terms must stay in their original form.
- "TBD" or "後で確認" left in the document without an explicit Open Question entry.
- Acceptance criteria reuse the same vague verb ("handle", "manage", "process") across multiple bullets.
- Document is long but does not separate confirmed facts from BrSE assumptions.

## Verdict Decision Guide

- **Pass:** All 9 criteria are `OK`, or `Unverified` only for `Correct` because the original source was not provided and the BrSE accepts that risk.
- **Needs Fix:** 1–3 criteria are `Gap` and the gaps are localized; the document's overall structure is sound.
- **Incomplete:** 4 or more criteria are `Gap`, or `Complete`/`Correct` is `Gap`. Restart from `brse-requirement-clarifier` instead of patching.
