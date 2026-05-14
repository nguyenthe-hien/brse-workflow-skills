# Planning Heuristics

## Good Ticket Boundaries

- One user-visible behavior or one backend contract change.
- Independently reviewable and testable.
- Clear owner and affected repository.
- Clear rollback or non-impact statement for risky changes.

## Split When

- FE and BE can be delivered independently.
- DB migration/data patch has separate risk.
- QA setup or data creation is non-trivial.
- Customer decision blocks only part of the work.

## Do Not Split When

- A tiny UI label and its API field are meaningless alone.
- The work would create artificial handoffs.
- The split only mirrors file structure and not delivery value.
