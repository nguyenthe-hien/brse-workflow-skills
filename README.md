# BrSE Workflow Skills

A cross-platform collection of 13 skills for Bridge SE work between Japanese stakeholders and offshore development teams — distributed as a single Claude Code plugin (`brse-workflow`) but also installable on Claude Desktop, Cowork web, and Codex CLI.

Works with **all four official Claude surfaces** plus **OpenAI Codex CLI**, because skill files (`SKILL.md`) follow the shared [agentskills.io](https://agentskills.io) standard.

| Surface | Install method | Auto-sync? |
|---|---|---|
| Claude Code (CLI) | `/plugin marketplace add` or `~/.claude/skills/` | Shared with Desktop |
| Claude Desktop (macOS / Windows) | Drop skill folders into `~/.claude/skills/` | Shared with Code |
| Claude.ai / Cowork (web) | Upload per-skill ZIP via `Customize > Skills` | No — manual upload |
| Claude API | Upload via API or include in agent SDK | No — separate from web |
| OpenAI Codex CLI | Symlink/copy into `~/.agents/skills/` | Independent |

> **Important Claude.ai limitation:** Custom skills do **not** sync across surfaces. Uploading to Cowork web does not appear in Desktop, and vice versa. You must install separately on each surface you use.

---

## Install

### Claude Code

**Option A — From GitHub (recommended once published):**

```text
/plugin marketplace add <github-owner>/<repo-name>
/plugin install brse-workflow@brse-workflow-skills
```

**Option B — From a local clone:**

```text
/plugin marketplace add /path/to/brse-workflow-skills
/plugin install brse-workflow@brse-workflow-skills
```

**Option C — Dev mode (no install):**

```bash
claude --plugin-dir /path/to/brse-workflow-skills/plugins/brse-workflow
```

After editing skill files, run `/reload-plugins`.

### Claude Desktop (macOS / Windows / Linux)

Claude Desktop reads from the same `~/.claude/skills/` folder as Claude Code. Install once, available on both.

**Option A — Symlink (recommended; updates with `git pull`):**

```bash
git clone https://github.com/<owner>/<repo>.git ~/brse-workflow-source
mkdir -p ~/.claude/skills
ln -s ~/brse-workflow-source/plugins/brse-workflow/skills/* ~/.claude/skills/
```

Restart Claude Desktop. Skills auto-load — Claude matches them by their `description` field.

**Option B — Copy (frozen snapshot):**

```bash
mkdir -p ~/.claude/skills
cp -r /path/to/brse-workflow-skills/plugins/brse-workflow/skills/* ~/.claude/skills/
```

**Windows path:** `%USERPROFILE%\.claude\skills\`

> **Requirement:** Enable **Code execution** in Claude Desktop settings before skills can run.

### Claude.ai / Cowork (web)

Cowork **only supports per-skill ZIP uploads** via the UI — no GitHub install, no folder upload. This repo includes a helper script that packs each skill into a ready-to-upload ZIP.

**Step 1 — Generate the ZIPs:**

```bash
./scripts/pack-skills.sh           # pack all 13 skills
./scripts/pack-skills.sh brse-report-reviewer   # or pack one
```

Output: `dist/zips/<skill-name>.zip`

**Step 2 — Upload each ZIP to Cowork:**

1. Open Claude.ai in a browser.
2. Go to **Settings → Customize → Skills**.
3. Click **+ → Create skill → Upload a skill**.
4. Drag in one ZIP file from `dist/zips/`.
5. Toggle the skill **On**.
6. Repeat for each ZIP you want available.

> **Plan availability:** Free, Pro, Max, Team, Enterprise (with **Code execution enabled**).
> **Team/Enterprise admin distribution:** owners can provision skills org-wide via Organization Settings instead of every member uploading individually.

### Codex CLI

Codex loads skills from `.agents/skills/`, `~/.agents/skills/`, or `/etc/codex/skills/`. Two ways to install:

**Option A — User-level (all projects):**

```bash
git clone https://github.com/<owner>/<repo>.git ~/brse-workflow-source
mkdir -p ~/.agents/skills
ln -s ~/brse-workflow-source/plugins/brse-workflow/skills/* ~/.agents/skills/
```

Restart Codex. Skills are auto-detected by `name`/`description` in each `SKILL.md`.

**Option B — Project-level (one repo only):**

```bash
mkdir -p <your-project>/.agents/skills
cp -r /path/to/brse-workflow-skills/plugins/brse-workflow/skills/* <your-project>/.agents/skills/
```

**Option C — Codex plugin marketplace** *(when this repo is published as a Codex marketplace)*:

```bash
codex plugin marketplace add <github-owner>/<repo-name>
codex plugin install brse-workflow
```

---

## Skills

### Tier 1 — Communication Bridge

- `brse-requirement-clarifier` — clarify vague Japanese specs into dev-ready requirements
- `brse-impact-trace` — trace source code before answering impact questions
- `brse-spec-transfer` — move specs between Google Docs, Outline, Plane, Backlog, Markdown
- `brse-ticket-breakdown` — break requirements into Plane/Backlog tickets
- `brse-qa-scenario` — derive QA cases from acceptance criteria
- `brse-client-report` — draft Japanese client-facing reports
- `brse-offshore-sync` — bilingual meeting minutes and action item logs

### Tier 2 — Analytical Bridge

- `brse-report-reviewer` — verify dev reports against 6-criteria check before forwarding
- `brse-structured-thinking` — MECE, Pyramid, Logic Tree, 5W1H, So-What/Why-So
- `brse-workflow-chain` — orchestrate full chain from raw request to delivery
- `brse-dev-query-response` — categorize dev questions and answer / trace / escalate

### Tier 3 — Strategic Bridge

- `brse-intent-reader` — surface unstated Japanese expectations and cultural subtext
- `brse-feasibility-challenge` — push back on infeasible requests with evidence + alternative

---

## Invocation

**Claude Code:**

```text
/brse-workflow:brse-requirement-clarifier
```

Or let Claude auto-trigger by matching the skill's `description` against your prompt.

**Claude Desktop / Cowork (web):**

Skills auto-trigger by description match — just describe your task naturally (e.g. *"Help me clarify this Japanese spec"* will pull `brse-requirement-clarifier`). Type `/` in Cowork to list available skills.

**Codex CLI:**

Skills are auto-loaded by Codex when prompt context matches the skill `description`. No slash command needed; you can also reference a skill by name in your prompt.

---

## Repository Layout

```
.claude-plugin/marketplace.json              # Claude Code marketplace catalog
plugins/brse-workflow/
  .claude-plugin/plugin.json                 # Claude Code plugin manifest
  .codex-plugin/plugin.json                  # Codex plugin manifest
  skills/<skill-name>/SKILL.md               # Skill definition (used by all surfaces)
  skills/<skill-name>/references/*.md        # Deeper guidance loaded on demand
scripts/pack-skills.sh                       # Generate per-skill ZIPs for Cowork upload
dist/zips/                                   # Output of pack-skills.sh (gitignored)
```

The `SKILL.md` files are **identical across Claude Code, Desktop, Cowork web, API, and Codex** — only the plugin manifest folders and the delivery format (folder vs. ZIP) differ per surface.

---

## License

MIT
