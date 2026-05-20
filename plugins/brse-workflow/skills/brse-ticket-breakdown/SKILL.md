---
name: brse-ticket-breakdown
description: Use when a BrSE has a clarified requirement that must become executable work for offshore developers and QA, and the split into tickets must respect independently verifiable behavior rather than vague technical layers.
---

# BrSE Ticket Breakdown

## Overview

Turn a clarified requirement into work items developers and QA can execute independently.

**Core principle:** Split by independently verifiable behavior, never by technical layer alone (FE/BE/DB is not a breakdown — it is a dependency map).

## When To Use

- A clarified requirement (output of `brse-requirement-clarifier`) is ready to enter a sprint.
- A customer asked for "everything in one ticket" and the work has multiple independent acceptance paths.
- Sprint planning needs ticket-level dependencies and unknowns surfaced before estimation.

## When NOT To Use

- Requirement still has unresolved Open Questions — run clarifier again first.
- Customer asked only for an estimate, not a breakdown — do not over-deliver.
- Work is a single atomic change (one bugfix, one config update).

## Workflow

1. Confirm the business goal and delivery deadline if provided.
2. Split by independently verifiable behavior, not by vague technical layer.
3. For each ticket, define:
   - user/business outcome
   - scope
   - affected surfaces
   - implementation notes
   - acceptance criteria
   - QA points
   - dependencies
   - unknowns
4. Check contract alignment across FE, BE, API/schema, DB, batch, and config when relevant.
5. Flag tasks that require source trace, data confirmation, or customer decision.
6. Keep estimates separate from scope if the user did not ask for hours.

## Output Shape

```markdown
## Breakdown Summary

## Tickets

### [Task ID or Proposed Title]

- Goal:
- Scope:
- Affected Surface:
- Dependencies:
- Acceptance Criteria:
- QA:
- Open Questions:

## Delivery Risks
```

## Rules

- Do not create extra architecture or refactor tasks unless required for delivery.
- Do not hide cross-team dependencies inside implementation notes.
- Do not assign a task to QA if the acceptance criteria are still ambiguous.
- For Japanese ticket titles, keep them short and outcome-oriented.

## Tooling

Once the breakdown is captured in YAML matching the Output Shape, you can convert it to Plane-ready JSON payloads:

```bash
node scripts/breakdown-to-plane.mjs path/to/breakdown.yaml --project PRJ-123
```

The script emits a JSON envelope with one payload per ticket, including a Markdown-formatted description body (Goal / Scope / Affected Surface / AC / QA / Open Questions) and the dependency list as ticket titles. The caller (MCP tool, `curl`, or `gh`-style integration) resolves dependencies to UUIDs after the issues are created.

## Example

**Input (clarified requirement excerpt):**

> Restrict UserProfile screen for `staff` role: hide Edit button, return 403 from update API. Apply to all tenants. Release within current sprint (5 working days remaining).

**Output:**

```markdown
## Breakdown Summary

3 tickets, sequential FE → BE → QA. Total scope tight for 5 working days; flag QA regression risk.

## Tickets

### PRJ-XXX-1: Hide Edit button on UserProfile for `staff` role

- Goal: `staff` user no longer sees the Edit button on UserProfile.
- Scope: FE only (`src/pages/UserProfile/EditButton.tsx`).
- Affected Surface: UserProfile screen, all tenants.
- Dependencies: none (independently shippable behind feature flag).
- Acceptance Criteria:
  - AC1: `staff` user opens UserProfile — Edit button not rendered.
  - AC2: Other roles (admin, manager) — Edit button still rendered.
- QA: 2 cases (staff, admin) × 1 screen. ~0.5 day.
- Open Questions: none.

### PRJ-XXX-2: Reject UserProfile update API for `staff` role

- Goal: API returns 403 when `staff` calls UserProfile update endpoint.
- Scope: BE (`permission.ts`, `UserProfileController.ts`).
- Affected Surface: `/api/userProfile/update` for all tenants.
- Dependencies: must ship together with PRJ-XXX-1 to avoid inconsistent UX (button hidden but API allows).
- Acceptance Criteria:
  - AC1: `staff` sends PUT to update endpoint → 403.
  - AC2: Other roles → unchanged behavior.
- QA: 3 cases (staff, admin, manager). ~0.5 day.
- Open Questions: Does any other caller (batch, mobile app) hit this endpoint as `staff`? — needs ops confirmation.

### PRJ-XXX-3: Regression QA for UserProfile and permission middleware

- Goal: Confirm no other UserProfile flows or permission-gated screens regressed.
- Scope: QA only.
- Affected Surface: UserProfile (all roles), other screens using `permission.ts`.
- Dependencies: blocked by PRJ-XXX-1 and PRJ-XXX-2 merged.
- Acceptance Criteria:
  - AC1: 4 roles × 6 UserProfile flows pass.
  - AC2: Adjacent screens (TenantSettings, MemberList) — staff still has expected access.
- QA: ~1.5 days.
- Open Questions: none.

## Delivery Risks

- 2.5 days of dev + 2.5 days of QA leaves no buffer in a 5-day sprint. Flag to PM.
- PRJ-XXX-2 Open Question about other callers must be answered before merge — otherwise risk of breaking batch jobs.
```

**Why this output:** The breakdown splits by *behavior* (FE button hide / API rejection / regression QA), not by layer. PRJ-XXX-1 and PRJ-XXX-2 must ship together — surfaced as a dependency, not buried in implementation notes. The "5 working days" constraint becomes a Delivery Risk, not a silent assumption.

For task sizing and dependency heuristics, read `references/planning.md`.
