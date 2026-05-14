#!/usr/bin/env bash
# One-shot installer for team members.
# Installs brse-workflow skills for: Claude Code, Claude Desktop, Codex CLI.
#
# Prerequisites:
#   - gh CLI installed and authenticated: `gh auth login`
#   - Member has Read access to the private repo
#
# Usage:
#   ./install-for-team-member.sh <github-org-or-user>/<repo-name>
# Example:
#   ./install-for-team-member.sh my-company/brse-workflow-marketplace

set -euo pipefail

REPO="${1:-}"
if [[ -z "$REPO" ]]; then
  echo "Usage: $0 <owner>/<repo-name>"
  exit 1
fi

SRC_DIR="$HOME/.local/share/brse-workflow-source"
SKILLS_SRC="$SRC_DIR/plugins/brse-workflow/skills"

echo "==> Checking gh auth"
gh auth status >/dev/null 2>&1 || { echo "Run 'gh auth login' first."; exit 1; }

echo "==> Cloning / updating private repo"
if [[ -d "$SRC_DIR/.git" ]]; then
  git -C "$SRC_DIR" pull --ff-only
else
  mkdir -p "$(dirname "$SRC_DIR")"
  gh repo clone "$REPO" "$SRC_DIR"
fi

if [[ ! -d "$SKILLS_SRC" ]]; then
  echo "ERROR: skills folder not found at $SKILLS_SRC"
  exit 1
fi

link_skill() {
  local target_dir="$1"
  local label="$2"
  mkdir -p "$target_dir"
  for skill in "$SKILLS_SRC"/*/; do
    local name
    name="$(basename "$skill")"
    ln -sfn "$skill" "$target_dir/$name"
  done
  echo "  linked $(ls -1 "$target_dir" | wc -l | tr -d ' ') skills into $target_dir ($label)"
}

echo "==> Installing for Claude Code + Claude Desktop"
link_skill "$HOME/.claude/skills" "Claude Code & Desktop"

echo "==> Installing for Codex CLI"
link_skill "$HOME/.agents/skills" "Codex CLI"

echo ""
echo "Done. Restart Claude Desktop and any running Claude Code / Codex sessions."
echo "To update later, just re-run this script (or run 'git -C $SRC_DIR pull')."
