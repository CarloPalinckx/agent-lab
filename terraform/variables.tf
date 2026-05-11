variable "new_relic_account_id" {
  description = "New Relic account ID"
  type        = number
}

variable "new_relic_api_key" {
  description = "New Relic user API key (starts with NRAK-)"
  type        = string
  sensitive   = true
}

variable "new_relic_region" {
  description = "New Relic region: US or EU"
  type        = string
  default     = "EU"
}

variable "github_token" {
  description = "GitHub personal access token with repo scope (to create issues)"
  type        = string
  sensitive   = true
}

variable "github_repo" {
  description = "GitHub repo in owner/name format"
  type        = string
  default     = "CarloPalinckx/agent-lab"
}
