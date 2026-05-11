output "alert_policy_id" {
  description = "New Relic alert policy ID"
  value       = newrelic_alert_policy.agent_lab.id
}

output "workflow_id" {
  description = "New Relic workflow ID"
  value       = newrelic_workflow.github_issues.id
}
