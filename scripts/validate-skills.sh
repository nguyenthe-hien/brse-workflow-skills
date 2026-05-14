#!/usr/bin/env bash
# Validate all skill SKILL.md files before packaging or publishing.
# Checks: YAML parse, description length <= 200, no broken references.
# Requires only python3 stdlib (no third-party packages).
#
# Usage:
#   ./scripts/validate-skills.sh          # validate all skills
#   ./scripts/validate-skills.sh <name>   # validate one skill

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/plugins/brse-workflow/skills"
ERRORS=0

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

require_python() {
  if ! command -v python3 &>/dev/null; then
    echo "Error: python3 is required" >&2
    exit 1
  fi
}

validate_one() {
  local name="$1"
  local skill_dir="$SKILLS_DIR/$name"
  local skill_file="$skill_dir/SKILL.md"
  local skill_errors=0

  if [[ ! -d "$skill_dir" ]] || [[ ! -f "$skill_file" ]]; then
    echo -e "${RED}FAIL${NC}: $name — no SKILL.md found"
    ERRORS=$((ERRORS + 1))
    return
  fi

  # 1. Frontmatter parse + description length (stdlib only, no PyYAML)
  local yaml_out
  set +e
  yaml_out=$(python3 - "$skill_file" << 'PYEOF'
import sys, re

path = sys.argv[1]
with open(path) as f:
    content = f.read()

if not content.startswith('---'):
    print("  [FAIL] No YAML frontmatter found")
    sys.exit(1)

parts = content.split('---', 2)
if len(parts) < 3:
    print("  [FAIL] Malformed frontmatter (missing closing ---)")
    sys.exit(1)

fm = parts[1]
errors = 0

# Extract name and description using regex (avoids PyYAML dependency)
name_match = re.search(r'^name:\s*(.+)$', fm, re.MULTILINE)
if not name_match or not name_match.group(1).strip():
    print("  [FAIL] Missing or empty 'name' field")
    errors += 1

# Description may be quoted or unquoted; colon in value requires quotes
desc_match = re.search(r'^description:\s*(.+)$', fm, re.MULTILINE)
if not desc_match:
    print("  [FAIL] Missing 'description' field")
    errors += 1
else:
    raw = desc_match.group(1).strip()
    # Strip surrounding quotes if present
    if (raw.startswith('"') and raw.endswith('"')) or \
       (raw.startswith("'") and raw.endswith("'")):
        desc = raw[1:-1]
    else:
        desc = raw
        # Unquoted value must not contain a bare colon (YAML parse risk)
        if re.search(r':\s', desc):
            print(f"  [FAIL] Unquoted description contains ': ' — quote the value")
            errors += 1

    if len(desc) > 200:
        print(f"  [FAIL] description too long: {len(desc)} chars (max 200)")
        errors += 1
    elif errors == 0:
        print(f"  [OK]   frontmatter valid, description {len(desc)} chars")

sys.exit(errors)
PYEOF
  )
  local yaml_exit=$?
  set -e

  echo "$yaml_out"
  if [[ $yaml_exit -ne 0 ]]; then
    skill_errors=$((skill_errors + yaml_exit))
  fi

  # 2. Check references exist
  while IFS= read -r ref; do
    local ref_path="$skill_dir/$ref"
    if [[ ! -f "$ref_path" ]]; then
      echo "  [FAIL] Missing reference: $ref"
      skill_errors=$((skill_errors + 1))
    else
      echo "  [OK]   Reference exists: $ref"
    fi
  done < <(grep -oE 'references/[^[:space:]`"'"'"']+\.md' "$skill_file" | sort -u || true)

  if [[ $skill_errors -eq 0 ]]; then
    echo -e "${GREEN}PASS${NC}: $name"
  else
    echo -e "${RED}FAIL${NC}: $name ($skill_errors error(s))"
    ERRORS=$((ERRORS + skill_errors))
  fi
}

require_python

if [[ $# -ge 1 ]]; then
  validate_one "$1"
else
  for d in "$SKILLS_DIR"/*/; do
    validate_one "$(basename "$d")"
  done
fi

echo ""
if [[ $ERRORS -eq 0 ]]; then
  echo -e "${GREEN}All checks passed.${NC}"
  exit 0
else
  echo -e "${RED}$ERRORS error(s) found. Fix before packaging.${NC}"
  exit 1
fi
