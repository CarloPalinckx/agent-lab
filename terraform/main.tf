terraform {
  required_providers {
    newrelic = {
      source  = "newrelic/newrelic"
      version = "~> 3.0"
    }
  }
}

provider "newrelic" {
  account_id = var.new_relic_account_id
  api_key    = var.new_relic_api_key
  region     = var.new_relic_region
}

# Alert policy grouping all agent-lab alerts.
resource "newrelic_alert_policy" "agent_lab" {
  name                = "agent-lab"
  incident_preference = "PER_CONDITION"
}

# Fires when the 4xx error rate exceeds 10 req/min over a 2-minute window.
# This is what the trigger-alert.sh script exercises.
resource "newrelic_nrql_alert_condition" "high_4xx_rate" {
  policy_id = newrelic_alert_policy.agent_lab.id
  name      = "High 4xx error rate"
  type      = "static"
  enabled   = true

  nrql {
    query = "SELECT rate(count(*), 1 minute) FROM Transaction WHERE httpResponseCode >= 400 AND httpResponseCode < 500 AND appName = 'agent-lab-api'"
  }

  critical {
    operator              = "above"
    threshold             = 10
    threshold_duration    = 120
    threshold_occurrences = "ALL"
  }

  fill_option        = "none"
  aggregation_window = 60
  aggregation_method = "event_flow"
  aggregation_delay  = 120
}

# Webhook destination pointing at GitHub's repository_dispatch API.
resource "newrelic_notification_destination" "github" {
  name = "GitHub agent-lab issues"
  type = "WEBHOOK"

  property {
    key   = "url"
    value = "https://api.github.com/repos/${var.github_repo}/dispatches"
  }

  auth_token {
    prefix = "token"
    token  = var.github_token
  }
}

# Notification channel — sends the repository_dispatch payload GitHub expects.
resource "newrelic_notification_channel" "github" {
  name           = "GitHub Issues"
  type           = "WEBHOOK"
  destination_id = newrelic_notification_destination.github.id
  product        = "IINT"

  property {
    key   = "headers"
    value = jsonencode({ "Accept" = "application/vnd.github.v3+json" })
  }

  property {
    key = "payload"
    value = jsonencode({
      event_type = "new-relic-alert"
      client_payload = {
        condition_name = "{{conditionName}}"
        policy_name    = "{{policyName}}"
        details        = "{{details}}"
        severity       = "{{severity}}"
        timestamp      = "{{timestamp}}"
      }
    })
  }
}

# Workflow wires the alert policy to the notification channel.
resource "newrelic_workflow" "github_issues" {
  name                  = "agent-lab → GitHub Issues"
  muting_rules_handling = "NOTIFY_ALL_ISSUES"
  enabled               = true

  issues_filter {
    name = "agent-lab policy"
    type = "FILTER"

    predicate {
      attribute = "labels.policyIds"
      operator  = "EXACTLY_MATCHES"
      values    = [newrelic_alert_policy.agent_lab.id]
    }
  }

  destination {
    channel_id = newrelic_notification_channel.github.id
  }
}
