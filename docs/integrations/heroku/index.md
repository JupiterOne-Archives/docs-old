# Integration with JupiterOne

## Setup

Users should configure the integration by providing an API key obtained from
Heroku:
<https://devcenter.heroku.com/articles/platform-api-quickstart#authentication>.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Resources           | \_type of the Entity    | \_class of the Entity |
| ------------------- | ----------------------- | --------------------- |
| Enterprise Accounts | `heroku_account`        | `Account`             |
| Team                | `heroku_team`           | `Team`                |
| User                | `heroku_account_member` | `User`                |
| Application         | `heroku_application`    | `Application`         |
| Addon               | `heroku_addon`          | `Service`             |

### Relationships

| From                 | Edge     | To                      |
| -------------------- | -------- | ----------------------- |
| `heroku_account`     | **HAS**  | `heroku_team`           |
| `heroku_account`     | **HAS**  | `heroku_account_member` |
| `heroku_team`        | **HAS**  | `heroku_account_member` |
| `heroku_team`        | **OWNS** | `heroku_application`    |
| `heroku_application` | **HAS**  | `heroku_addon`          |
