# Integration with JupiterOne

## Setup

[Create an API Key](https://support.pagerduty.com/docs/generating-api-keys#section-generating-a-general-access-rest-api-key),
then add the generated API key into the PagerDuty Integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Resources | \_type of the Entity | \_class of the Entity |
| --------- | -------------------- | --------------------- |
| Teams     | `pagerduty_team`     | `Team`                |
| User      | `pagerduty_user`     | `User`                |
| Service   | `pagerduty_service`  | `Service`             |

### Relationships

| From             | Edge         | To                  |
| ---------------- | ------------ | ------------------- |
| `pagerduty_team` | **HAS**      | `pagerduty_user`    |
| `pagerduty_team` | **ASSIGNED** | `pagerduty_service` |
| `pagerduty_user` | **ONCALL**   | `pagerduty_service` |
