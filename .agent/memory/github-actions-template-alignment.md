# GitHub Actions workflow must mirror issue template sections

**Date:** 2026-05-11  
**Issue:** https://github.com/CarloPalinckx/agent-lab/issues/4

## Learning

When a GitHub Actions workflow auto-creates issues, the body it generates is
completely independent of any `.github/ISSUE_TEMPLATE/` file. GitHub issue
templates are advisory for humans in the UI — the API ignores them. If you want
auto-created issues to look like the template, you must duplicate the section
headings in the workflow script manually.

## Applied pattern

Define the section headings as a shared contract. Write a shell test
(`scripts/test-alert-config.sh`) that asserts both files contain the same
headings. This prevents them drifting apart silently.

## Context

Applies whenever a workflow creates issues programmatically and there is a
corresponding human-facing template. Does not apply if auto-created issues are
intentionally formatted differently from the template.
