#!/usr/bin/env bash
# Pack each skill folder under plugins/brse-workflow/skills/ into a ZIP
# suitable for uploading to Claude.ai / Cowork (Customize > Skills > Upload).
#
# Usage:
#   ./scripts/pack-skills.sh          # pack all skills
#   ./scripts/pack-skills.sh <name>   # pack one skill by folder name

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/plugins/brse-workflow/skills"
OUT_DIR="$REPO_ROOT/dist/zips"

mkdir -p "$OUT_DIR"

pack_one() {
  local name="$1"
  local src="$SKILLS_DIR/$name"
  if [[ ! -d "$src" ]]; then
    echo "skip: $name (not a directory)"
    return
  fi
  if [[ ! -f "$src/SKILL.md" ]]; then
    echo "skip: $name (no SKILL.md)"
    return
  fi
  local out="$OUT_DIR/$name.zip"
  rm -f "$out"
  (cd "$SKILLS_DIR" && zip -qr "$out" "$name" -x '*.DS_Store')
  echo "packed: $(basename "$out")"
}

if [[ $# -ge 1 ]]; then
  pack_one "$1"
else
  for d in "$SKILLS_DIR"/*/; do
    pack_one "$(basename "$d")"
  done
fi

echo ""
echo "Output: $OUT_DIR"
ls -1 "$OUT_DIR"
