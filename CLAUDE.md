# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A **cross-platform** Claude Code plugin packaging 13 skills under one plugin name: `brse-workflow`. The plugin ships only skills (no hooks, MCP servers, or pre-approved tool permissions). Skills are designed for Vietnamese Bridge SE (BrSE) work bridging Japanese stakeholders and offshore development teams.

> The repo uses Claude Code's plugin-distribution format (a `marketplace.json` catalog file plus a `plugin.json` manifest). That's the technical naming Anthropic chose for the install mechanism — the repo itself is just a skills collection, not a commercial marketplace.

Skills follow the [agentskills.io](https://agentskills.io) standard so the **same `SKILL.md` files** load in both **Claude Code** and **OpenAI Codex CLI**. Only the plugin manifest folder differs per host.

## Installing / Loading

Register the marketplace and install the plugin from inside Claude Code:

```text
/plugin marketplace add /Users/hien.nguyen/brse-workflow-skills
/plugin install brse-workflow@brse-workflow-skills
```

During development, bypass installation and load directly:

```bash
claude --plugin-dir /Users/hien.nguyen/brse-workflow-skills/plugins/brse-workflow
```

After editing skill files, reload without restarting:

```text
/reload-plugins
```

## Plugin Structure

```
.claude-plugin/marketplace.json          # Claude Code marketplace catalog
plugins/brse-workflow/
  .claude-plugin/plugin.json             # Claude Code plugin manifest
  .codex-plugin/plugin.json              # Codex plugin manifest (same schema)
  skills/<skill-name>/SKILL.md           # Shared skill definition (both platforms)
  skills/<skill-name>/references/*.md    # Deeper guidance loaded on demand
```

Each `SKILL.md` starts with YAML frontmatter (`name`, `description`) followed by the skill body. The `description` field is what both Claude Code and Codex use for skill matching.

**Codex skill discovery paths** (in scan order): repo-local `.agents/skills/`, then `~/.agents/skills/`, then `/etc/codex/skills/`. Users typically symlink or copy `plugins/brse-workflow/skills/*` into one of those locations.

## Skills in This Plugin

Skills are organized by BrSE competency tier (communication → analytical → strategic).

**Tier 1 — Communication Bridge**

| Skill | Purpose |
|---|---|
| `brse-requirement-clarifier` | Convert vague Japanese/bilingual specs into dev-ready requirements |
| `brse-impact-trace` | Trace source code before answering impact or feasibility questions |
| `brse-spec-transfer` | Move/translate specs between Google Docs, Outline, Plane, Backlog, Markdown |
| `brse-ticket-breakdown` | Break requirements into Plane/Backlog tickets with acceptance criteria |
| `brse-qa-scenario` | Create QA cases from acceptance criteria and source impact |
| `brse-client-report` | Draft Japanese client-facing reports, status updates, and investigation summaries |
| `brse-offshore-sync` | Prepare bilingual meeting agendas, minutes, and action item logs |

**Tier 2 — Analytical Bridge**

| Skill | Purpose |
|---|---|
| `brse-report-reviewer` | Verify dev reports against 6-criteria check before forwarding to customer |
| `brse-structured-thinking` | Apply MECE, Pyramid, Logic Tree, 5W1H, So-What/Why-So |
| `brse-workflow-chain` | Orchestrate clarifier → impact-trace → breakdown → QA → report as one chain |
| `brse-dev-triage` | Categorize dev questions and decide: answer / trace / escalate to customer |

**Tier 3 — Strategic Bridge**

| Skill | Purpose |
|---|---|
| `brse-intent-reader` | Surface unstated Japanese expectations and cultural subtext |
| `brse-feasibility-challenge` | Push back on infeasible requests with evidence + alternative proposal |

## Authoring Conventions

- Skill output structures use Markdown headings defined inside `SKILL.md`.
- Japanese output sections use Japanese headings (e.g., `## 結論`, `## 確認内容`).
- Bilingual output: Japanese for customer-facing sections, Vietnamese for internal developer guidance.
- Established product terms, screen names, version codes, role labels, and third-party tool names must never be translated or altered. Keep them in their original form regardless of target language.
- Public-repo skills must stay project-agnostic: use generic placeholders (`UserProfile`, `Screen A`, `existing system`) in examples, not real product names. Real product names belong in private forks only.
- Reference files under `references/` extend rules; skills instruct Claude to read them when deeper guidance is needed.

## Manifest Files

- `.claude-plugin/marketplace.json`: lists all plugins in this marketplace (Claude Code). Update `version` and `plugins[]` here when adding a new plugin.
- `.claude-plugin/plugin.json`: plugin manifest for Claude Code.
- `.codex-plugin/plugin.json`: plugin manifest for Codex. Both manifests share `name`, `version`, `description`, and `skills` fields — keep them in sync when bumping versions.

## Publishing Workflow

The marketplace is designed to be hosted on GitHub:

1. Push repo to GitHub (`gh repo create <owner>/<repo> --public --source=. --push`).
2. Users add the marketplace via `/plugin marketplace add <owner>/<repo>` (Claude Code) or `codex plugin marketplace add <owner>/<repo>` (Codex).
3. When releasing, bump version in **both** `plugin.json` files plus `marketplace.json`, then tag and push.
4. Users update via `/plugin marketplace update` or `codex plugin marketplace update`.

See `README.md` for the user-facing install/publish instructions.
