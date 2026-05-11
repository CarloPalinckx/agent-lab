#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# test-alert-config.sh
#
# Validates that the Mission: Triage Alert issue template and the
# create-issue-on-alert workflow are correctly wired together.
#
# Exit codes:
#   0 — all assertions pass
#   1 — one or more assertions failed
# ---------------------------------------------------------------------------

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
TEMPLATE="$REPO_ROOT/.github/ISSUE_TEMPLATE/mission--triage-alert.md"
WORKFLOW="$REPO_ROOT/.github/workflows/create-issue-on-alert.yml"

PASS=0
FAIL=0

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

pass() { echo "  ✓ $1"; PASS=$((PASS + 1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL + 1)); }

assert_file_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if grep -qF -- "$pattern" "$file"; then
    pass "$label"
  else
    fail "$label (expected to find: $pattern)"
  fi
}

assert_file_not_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if ! grep -qF -- "$pattern" "$file"; then
    pass "$label"
  else
    fail "$label (expected NOT to find: $pattern)"
  fi
}

# ---------------------------------------------------------------------------
# Group 1: issue template structure
# ---------------------------------------------------------------------------

echo ""
echo "── Template: $TEMPLATE"

assert_file_contains "$TEMPLATE" \
  "labels: 'Mission: Triage Alert'" \
  "frontmatter labels set to 'Mission: Triage Alert'"

assert_file_contains "$TEMPLATE" \
  "## Alert Summary" \
  "template has ## Alert Summary section"

assert_file_contains "$TEMPLATE" \
  "## Policy & Condition" \
  "template has ## Policy & Condition section"

assert_file_contains "$TEMPLATE" \
  "## Severity & Timing" \
  "template has ## Severity & Timing section"

assert_file_contains "$TEMPLATE" \
  "## Details" \
  "template has ## Details section"

assert_file_contains "$TEMPLATE" \
  "## Triage Checklist" \
  "template has ## Triage Checklist section"

assert_file_contains "$TEMPLATE" \
  "- [ ]" \
  "template has at least one checklist item"

# Template body must not be empty (stub guard)
assert_file_not_contains "$TEMPLATE" \
  "labels: ''" \
  "frontmatter labels is not empty string"

# ---------------------------------------------------------------------------
# Group 2: workflow body mirrors template sections
# ---------------------------------------------------------------------------

echo ""
echo "── Workflow: $WORKFLOW"

assert_file_contains "$WORKFLOW" \
  "## Alert Summary" \
  "workflow body has ## Alert Summary section"

assert_file_contains "$WORKFLOW" \
  "## Policy & Condition" \
  "workflow body has ## Policy & Condition section"

assert_file_contains "$WORKFLOW" \
  "## Severity & Timing" \
  "workflow body has ## Severity & Timing section"

assert_file_contains "$WORKFLOW" \
  "## Details" \
  "workflow body has ## Details section"

assert_file_contains "$WORKFLOW" \
  "## Triage Checklist" \
  "workflow body has ## Triage Checklist section"

# ---------------------------------------------------------------------------
# Group 3: workflow labels include 'Mission: Triage Alert'
# ---------------------------------------------------------------------------

echo ""
echo "── Workflow labels"

assert_file_contains "$WORKFLOW" \
  "'Mission: Triage Alert'" \
  "workflow labels include 'Mission: Triage Alert'"

# Old generic labels should not be the only ones (the named label must be present)
# This is already covered above; just document intent.

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

echo ""
echo "Results: $PASS passed, $FAIL failed"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
