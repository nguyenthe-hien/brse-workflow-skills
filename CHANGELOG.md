# Changelog

All notable changes to this plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-05-20

Skills quality uplift to match Anthropic skill-creator and superpowers writing-skills conventions. New meta-skill, mechanical helpers shipped with the three rigid skills, pressure-test scenarios, and an extended `brse-structured-thinking` with First-Principles / Algorithm Thinking. No breaking changes; all 15 skills pass `./scripts/validate-skills.sh` with zero warnings.

### Added
- New meta-skill `brse-skill-author` for bootstrapping and maintaining BrSE skills inside the plugin (includes Rationalization Table, Red Flags, pressure-testing reference).
- `plugins/brse-workflow/template/SKILL.md` canonical template covering every required SKILL.md block (Overview / Core principle, When To Use, When NOT To Use, Inputs, Workflow, Output Shape, Rules, Rationalization Table, Red Flags, Example, Common Mistakes, Anti-Patterns, References).
- `plugins/brse-workflow/template/references/authoring-guide.md` companion guide on description-field hygiene, file layout, bilingual rules, and validation.
- `## Overview` block with **Core principle** sentence for the six core skills: `brse-requirement-clarifier`, `brse-impact-trace`, `brse-ticket-breakdown`, `brse-qa-scenario`, `brse-client-report`, `brse-spec-verify`.
- `## When NOT To Use` section for every skill (15 total), closing common over-trigger paths and linking the right adjacent skill.
- Realistic JP/VN `## Example` block (input → full output → "why this output" note) for the six core skills.
- `## Rationalization Table` and `## Red Flags — STOP` sections for the four rigid process skills: `brse-workflow-chain`, `brse-spec-verify`, `brse-report-reviewer`, `brse-dev-triage`.
- Graphviz decision flowcharts for `brse-workflow-chain` (classification + side-branch routing) and `brse-dev-triage` (4-category gate).
- Node ESM scripts shipped with skills (no transpile, no npm install required):
  - `brse-spec-verify/scripts/check-9-criteria.mjs` — static mechanical pre-check (Complete / Unambiguous / Singular / Verifiable / Traceable).
  - `brse-ticket-breakdown/scripts/breakdown-to-plane.mjs` — YAML breakdown → Plane-ready JSON payload envelope.
  - `brse-spec-transfer/scripts/markdown-skeleton.mjs` — ticket / demo skeleton emitter with source heading + table preservation.
- `tests/scenarios/` directory with pressure scenarios for the four rigid skills (baseline + targeted pressure variants for time, authority, sunk-cost).
- `tests/README.md` describing how to manually run pressure scenarios.
- New framework in `brse-structured-thinking`: **First-Principles / Algorithm Thinking** — for cases where a request, estimate, or process repeats "the usual way" without proving which constraints are real. Includes a scope-reduction example and matching reference entry in `references/frameworks.md`.

### Changed
- `description:` field rewritten for 11 skills to be trigger-first (no workflow summary). Affected: `brse-workflow-chain`, `brse-structured-thinking`, `brse-dev-triage`, `brse-feasibility-challenge`, `brse-intent-reader`, `brse-offshore-sync`, `brse-spec-transfer`, `brse-spec-verify`, `brse-ticket-breakdown`, `brse-report-reviewer`, `brse-client-report`, `brse-impact-trace`, `brse-qa-scenario`, `brse-requirement-clarifier`.
- `scripts/validate-skills.sh` raised description limit from 200 → 500 chars (`MAX_DESC_LEN`); now detects workflow-summary patterns (arrows, "first... then", "stage N", verb chains) as warnings; checks `name` slug format (lowercase + hyphens); recognises both quoted and unquoted descriptions; restricts reference-link regex to in-skill `references/` paths so cross-skill links in prose do not trigger false missing-reference fails.

### Notes
- All 15 skills (14 original + `brse-skill-author`) pass `./scripts/validate-skills.sh` with zero warnings.
- Cross-platform: plugin continues to ship manifests for Claude Code (`.claude-plugin`) and Codex (`.codex-plugin`).

## [0.3.2] - 2026-05-18

### Added
- Clarification of the distinct roles of `brse-report-reviewer` (substance review of others' reports) and `brse-client-report` (BrSE drafts/polishes customer-facing JP).

## [0.3.1] - 2026-05-17

### Added
- `brse-spec-verify` skill (ISO/IEC/IEEE 29148:2018 9-criteria gate before forwarding spec to dev).

## [0.2.1] - 2026-05-15

### Changed
- Plugin metadata bump and packaging fixes.

## [0.2.0] - 2026-05-13

### Added
- Initial public release with 13 skills covering BrSE clarification, impact trace, ticket breakdown, QA scenario, report review, client report, intent reading, structured thinking, feasibility challenge, offshore sync, dev triage, spec transfer, workflow chain.
