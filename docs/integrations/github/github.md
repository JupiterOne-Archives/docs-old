# GitHub

## Overview

JupiterOne provides a managed integration with GitHub. The integration connects
directly to GitHub APIs to obtain account metadata and analyze resource
relationships. Customers authorize access by creating a GitHub OAuth App in
their account and providing the app credentials to JupiterOne.

## Integration Instance Configuration

Upon creating a new GitHub integration configuration in JupiterOne, the user is
re-directed to GitHub to install the JupiterOne GitHub app.

The integration is using GitHub Apps authentication, which requests permissions
from the org/account installing the app.

Beside the Metadata Permissions always granted, our app is only requesting Read
Only for Repository Metadata and Organization Members at this time.

Github References:

- <https://developer.github.com/apps/building-github-apps/setting-permissions-for-github-apps/>
- <https://developer.github.com/v3/apps/permissions/#metadata-permissions>
- <https://developer.github.com/v3/apps/permissions/#permission-on-contents>

## Entities

The following entity resources are ingested when the integration runs:

| GitHub Entity Resource | \_type : \_class of the Entity |
| ---------------------- | ------------------------------ |
| Account                | `github_account` : `Account`   |
| Team                   | `github_team` : `UserGroup`    |
| Repository             | `github_repo` : `CodeRepo`     |
| User                   | `github_user` : `User`         |
| Pull Request           | `github_pullrequest` : `PR`    |

## Relationships

The following relationships are created/mapped:

### Basic relationships within the integration instance account/resources

| From             | Relationship | To                   |
| ---------------- | ------------ | -------------------- |
| `github_account` | **OWNS**     | `github_repo`        |
| `github_account` | **HAS**      | `github_user`        |
| `github_account` | **HAS**      | `github_team`        |
| `github_team`    | **HAS**      | `github_user`        |
| `github_team`    | **ALLOWS**   | `github_repo`        |
| `github_user`    | **MANAGES**  | `github_account`     |
| `github_user`    | **MANAGES**  | `github_team`        |
| `github_repo`    | **HAS**      | `github_pullrequest` |
| `github_user`    | **OPENED**   | `github_pullrequest` |
| `github_user`    | **REVIEWED** | `github_pullrequest` |
| `github_user`    | **APPROVED** | `github_pullrequest` |
