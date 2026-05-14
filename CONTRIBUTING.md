# Contributing

## Release Workflow

When shipping updates:

1. Edit skills in `plugins/brse-workflow/skills/`.
2. Bump `version` in **both** plugin manifests and the marketplace catalog:
   - `plugins/brse-workflow/.claude-plugin/plugin.json`
   - `plugins/brse-workflow/.codex-plugin/plugin.json`
   - `.claude-plugin/marketplace.json`
3. Commit, tag, and push:
   ```bash
   git commit -am "v0.2.1 — describe what changed"
   git tag v0.2.1
   git push --tags
   ```
4. Users update via:
   - Claude Code: `/plugin marketplace update`
   - Desktop / Codex: re-run the install symlink script

## Private Fork for Team Customization

If you want a private variant with your team's real product names baked in:

1. Fork this repo into a **private repo** under your GitHub Organization.
2. In the private fork, edit each `SKILL.md` — replace generic placeholders (`UserProfile`, `Screen A`, `existing system`) with your real product terms (`Mypage`, `UI3`, etc.).
3. Team members install from the private fork:
   ```bash
   /plugin marketplace add <your-org>/<private-repo>
   /plugin install brse-workflow@<private-repo>
   ```
4. Pull upstream improvements periodically:
   ```bash
   git remote add upstream https://github.com/nguyenthe-hien/brse-workflow-skills.git
   git fetch upstream
   git merge upstream/main
   ```

Keep generic placeholders in your private fork's merge base — it makes upstream merges cleaner.
