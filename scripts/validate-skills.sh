#!/usr/bin/env bash
# Validate all skill SKILL.md files before packaging or publishing.
# Checks: YAML parse, description length <= 200, no broken references.
#
# Usage:
#   ./scripts/validate-skills.sh          # validate all skills
#   ./scripts/validate-skills.sh <name>   # validate one skill

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/plugins/brse-workflow/skills"
ERRORS=0

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

require_python() {
  if ! command -v python3 &>/dev/null; then
    echo "Error: python3 is required for YAML validation" >&2
    exit 1
  fi
}

validate_one() {
  local name="$1"
  local skill_dir="$SKILLS_DIR/$name"
  local skill_file="$skill_dir/SKILL.md"
  local skill_errors=0

  if [[ ! -f "$skill_file" ]]; then
    echo -e "${RED}SKIP${NC}: $name — no SKILL.md"
    return
  fi

  # 1. YAML parse + description length
  python3 - "$skill_file" << 'PYEOF'
import sys, yaml

path = sys.argv[1]
with open(path) as f:
    content = f.read()

if not content.startswith('---'):
    print(f"  [FAIL] No YAML frontmatter found")
    sys.exit(1)

parts = content.split('---', 2)
if len(parts) < 3:
    print(f"  [FAIL] Malformed frontmatter (missing closing ---)")
    sys.exit(1)

try:
    data = yaml.safe_load(parts[1])
except yaml.YAMLError as e:
    print(f"  [FAIL] YAML parse error: {e}")
    sys.exit(1)

if not data:
    print(f"  [FAIL] Frontmatter parsed as empty")
    sys.exit(1)

errors = 0
if 'name' not in data or not data['name']:
    print(f"  [FAIL] Missing 'name' field")
    errors += 1

desc = data.get('description', '')
if not desc:
    print(f"  [FAIL] Missing 'description' field")
    errors += 1
elif len(desc) > 200:
    print(f"  [FAIL] description too long: {len(desc)} chars (max 200)")
    errors += 1
else:
    print(f"  [OK]   YAML valid, description {len(desc)} chars")

sys.exit(errors)
PYEOF
  local yaml_exit=$?
  if [[ $yaml_exit -ne 0 ]]; then
    skill_errors=$((skill_errors + yaml_exit))
  fi

  # 2. Check references exist
  if [[ -f "$skill_file" ]]; then
    while IFS= read -r ref; do
      local ref_path="$skill_dir/$ref"
      if [[ ! -f "$ref_path" ]]; then
        echo "  [FAIL] Missing reference: $ref"
        skill_errors=$((skill_errors + 1))
      else
        echo "  [OK]   Reference exists: $ref"
      fi
    done < <(grep -oE 'references/[^[:space:]`"'"'"']+\.md' "$skill_file" | sort -u || true)
  fi

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
