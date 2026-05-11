## Blue phase — 2026-05-11

### Refactors made
- Workflow `## Alert Summary` body changed from a bare `payload.condition_name` variable to a proper sentence: `The condition **X** fired on policy **Y**.` — gives the section distinct value from the Policy & Condition section below it

### Memories written
- `.agent/memory/github-actions-template-alignment.md` — workflow auto-created issues do not inherit template structure; section headings must be duplicated and a test script enforces alignment
- `.agent/memory/github-labels-must-exist-before-workflow.md` — labels must be pre-created in the repo or `issues.create` silently drops them

### PR
https://github.com/CarloPalinckx/agent-lab/pull/6

---

## Green phase — 2026-05-11

### Persona
DevOps engineer — pure configuration changes to a GitHub Actions workflow and issue template, no application code.

### Files changed
- `.github/ISSUE_TEMPLATE/mission--triage-alert.md` — filled in frontmatter label and added all five body sections with a triage checklist
- `.github/workflows/create-issue-on-alert.yml` — replaced ad-hoc body array with one matching the five template sections; changed labels to `['Mission: Triage Alert']`

### Test run result
```
Results: 14 passed, 0 failed
```

### Notes
- Created `Mission: Triage Alert` label in the repo (`#e11d48`) so the workflow doesn't fail on an unknown label
- Old `alert` / `new-relic` labels removed from the workflow; `Mission: Triage Alert` is the single canonical label
- Manual smoke test via `trigger-alert.sh` still requires a live NR environment — not automated

---

## Red phase — 2026-05-11

### Tests written
- `scripts/test-alert-config.sh` — validates that the issue template and workflow are correctly aligned

### Intent captured
The tests assert that:
1. `.github/ISSUE_TEMPLATE/mission--triage-alert.md` frontmatter sets `labels: 'Mission: Triage Alert'` (not blank) and the body contains all five required sections: `## Alert Summary`, `## Policy & Condition`, `## Severity & Timing`, `## Details`, `## Triage Checklist` with at least one checklist item
2. `.github/workflows/create-issue-on-alert.yml` generates an issue body using those same five section headings
3. The workflow's `labels` array includes `'Mission: Triage Alert'`

### Notes
- All 14 assertions currently fail — template body is empty, labels frontmatter is `''`, workflow uses a different ad-hoc format
- The five section headings are the contract between template and workflow; Green must use exactly these strings
- The workflow uses `github-script` with an inline JS array joined to a string — Green should replace that array with one that inserts the section headings and NR payload fields
- `trigger-alert.sh` is available for a manual smoke test but is not automated here (requires a live NR + network setup)
