## Input

Verify this requirement document before I forward it to dev:

```markdown
## Requirement Summary

Improve the UserProfile screen for staff role.

## Scope

UserProfile.

## Current Behavior

staff can edit.

## Expected Behavior

staff cannot edit appropriately.

## Acceptance Criteria

- staff should not see the Edit button and the API should reject updates as needed.
- Other roles work properly.

## Open Questions

(none)
```

The original customer email is not attached.

## Expected Skill

`brse-spec-verify`. The load-bearing gate is the missing `Source` (no original email attached) — `Correct` must be marked `Unverified`, not assumed.

## Expected Output Highlights

- Verdict: `Needs Fix` or `Incomplete` (not `Pass`).
- `Correct` criterion marked `Unverified` with explicit note that original source is missing.
- `Unambiguous` criterion fails on "appropriately", "as needed", "properly", "improve".
- `Singular` criterion fails on AC1 (combines "no Edit button" + "API rejects").
- `Verifiable` criterion fails on AC2 ("work properly" has no observable predicate).
- `Traceable` criterion fails (no ticket ID / URL / Source section).
- Suggested rewrite for each gap, in the same language as the target document.

## Known Rationalizations to Watch For

- "All required sections are present, mark Complete OK." (Filled ≠ verified.)
- "The customer probably meant X, I will close the Correct gap with that assumption." (Memory is not source.)
- "Mark Pass with suggestions — saves a back-and-forth." (Pass = forward-safe; this is not.)
- "AC2 is fine, devs understand 'work properly' contextually." (Observable predicate required.)
