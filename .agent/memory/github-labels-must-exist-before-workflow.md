# Labels referenced in workflows must be pre-created in the repo

**Date:** 2026-05-11  
**Issue:** https://github.com/CarloPalinckx/agent-lab/issues/4

## Learning

`github.rest.issues.create` silently ignores labels that don't exist in the
repository — it creates the issue without them rather than erroring. This means
a workflow can appear to work while the label is simply absent from every issue
it creates.

## Applied pattern

After adding a new label to a workflow, create it in the repo immediately:

```bash
gh label create 'Label Name' --color '#hex' --description '...' --repo owner/repo
```

Do this as part of the same PR / task that introduces the label reference.

## Context

Applies to any `issues.create` or `issues.addLabels` call in GitHub Actions.
Also applies to issue templates — the `labels:` frontmatter field has the same
silent-ignore behaviour if the label doesn't exist.
