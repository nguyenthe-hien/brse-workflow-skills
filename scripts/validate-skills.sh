#!/usr/bin/env bash
# Validate all skill SKILL.md files before packaging or publishing.
#
# Checks:
#  - YAML frontmatter parses (regex-based, no PyYAML)
#  - description length ≤ MAX_DESC_LEN (default 500, per agentskills.io guidance)
#  - description does not summarize workflow (forbidden keywords)
#  - description does not contain a bare ': ' if unquoted (YAML parse risk)
#  - referenced files under references/ actually exist
#
# Requires only python3 stdlib.
#
# Usage:
#   ./scripts/validate-skills.sh          # validate all skills
#   ./scripts/validate-skills.sh <name>   # validate one skill
#   MAX_DESC_LEN=1024 ./scripts/validate-skills.sh   # relax description limit

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/plugins/brse-workflow/skills"
MAX_DESC_LEN="${MAX_DESC_LEN:-500}"
ERRORS=0

RED='\033[0;31m'
YELLOW='\033[0;33m'
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

  # 1. Frontmatter parse + description checks (stdlib only)
  local yaml_out
  set +e
  yaml_out=$(MAX_DESC_LEN="$MAX_DESC_LEN" python3 - "$skill_file" << 'PYEOF'
import sys, re, os

path = sys.argv[1]
max_desc = int(os.environ.get("MAX_DESC_LEN", "500"))

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
warnings = 0

# --- name ---
name_match = re.search(r'^name:\s*(.+)$', fm, re.MULTILINE)
if not name_match or not name_match.group(1).strip():
    print("  [FAIL] Missing or empty 'name' field")
    errors += 1
else:
    name_val = name_match.group(1).strip().strip('"').strip("'")
    if not re.fullmatch(r'[a-z0-9-]+', name_val):
        print(f"  [FAIL] name '{name_val}' must use lowercase letters, digits, hyphens only")
        errors += 1

# --- description ---
desc_match = re.search(r'^description:\s*(.+)$', fm, re.MULTILINE)
if not desc_match:
    print("  [FAIL] Missing 'description' field")
    errors += 1
else:
    raw = desc_match.group(1).strip()
    if (raw.startswith('"') and raw.endswith('"')) or \
       (raw.startswith("'") and raw.endswith("'")):
        desc = raw[1:-1]
        quoted = True
    else:
        desc = raw
        quoted = False
        if re.search(r':\s', desc):
            print("  [FAIL] Unquoted description contains ': ' — quote the value")
            errors += 1

    # Length
    if len(desc) > max_desc:
        print(f"  [FAIL] description too long: {len(desc)} chars (max {max_desc})")
        errors += 1

    # Workflow-summary detection (forbidden patterns)
    # These suggest the description is summarizing what the skill DOES
    # instead of when it should trigger.
    # Forbid only patterns that clearly narrate stages or steps.
    # Listing symptoms/surfaces with commas is fine.
    workflow_patterns = [
        (r'\s→\s|\s-->\s|\s=>\s', "arrow — indicates stage sequence"),
        (r'\bfirst\b[^.]*\bthen\b', "'first... then' — workflow narration"),
        (r'\bstage\s+\d', "'stage N' — explicit stage reference"),
        (r'\bsteps?\s*:\s*\d', "'steps: N' — workflow count"),
        (r'\bthen\s+(draft|verify|trace|produce|generate|output|create)\b', "'then <verb>' — sequential verb chain"),
        (r'(clarify|verify|trace|breakdown|qa).{0,40}(then|→|->|,\s*then)\s+(verify|trace|breakdown|qa|report)', "chain of skill verbs"),
    ]
    for pattern, why in workflow_patterns:
        if re.search(pattern, desc, re.IGNORECASE):
            print(f"  [WARN] description may summarize workflow ({why})")
            warnings += 1

    # Must start with a recognizable trigger word (soft check, warn only)
    starts_well = re.match(r'^\s*(Use when|Use to|Use for|Use\s)', desc)
    if not starts_well:
        print("  [WARN] description should start with 'Use when ...' for trigger-style discovery")
        warnings += 1

    if errors == 0:
        marker = "OK" if warnings == 0 else "OK*"
        print(f"  [{marker}]  frontmatter valid, description {len(desc)} chars, {warnings} warning(s)")

sys.exit(errors)
PYEOF
  )
  local yaml_exit=$?
  set -e

  echo "$yaml_out"
  if [[ $yaml_exit -ne 0 ]]; then
    skill_errors=$((skill_errors + yaml_exit))
  fi

  # 2. Check referenced files exist
  while IFS= read -r ref; do
    local ref_path="$skill_dir/$ref"
    if [[ ! -f "$ref_path" ]]; then
      echo "  [FAIL] Missing reference: $ref"
      skill_errors=$((skill_errors + 1))
    else
      echo "  [OK]   Reference exists: $ref"
    fi
  done < <(grep -oE '(^|[[:space:]`"'"'"'(])references/[^[:space:]`"'"'"'),]+\.md' "$skill_file" | sed -E 's/^[[:space:]`"'"'"'(]//' | sort -u || true)

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
  echo -e "${GREEN}All checks passed.${NC} (Warnings are informational; only [FAIL] blocks publishing.)"
  exit 0
else
  echo -e "${RED}$ERRORS error(s) found. Fix before packaging.${NC}"
  exit 1
fi
