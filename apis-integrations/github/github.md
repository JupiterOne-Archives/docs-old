# Integration with JupiterOne

## GitHub + JupiterOne Integration Benefits

- Visualize GitHub users, teams, code repositories, pull requests, issues,
  installed GitHub applications, organizational secrets, repo secrets, repo
  environments, and environmental secrets in the JupiterOne graph.
- Map GitHub users to employees in your JupiterOne account.
- Map GitHub users to development/security trainings.
- Monitor Github software development activities within repositories including
  changes, reviews and approvals.
- Monitor changes to GitHub user teams, users, code repositories, and pull
  requests using JupiterOne alerts.
- Monitor installations of GitHub Apps using JupiterOne alerts.
- Monitor and audit outside collaborators on code repositories.

## How it Works

- JupiterOne periodically fetches installed GitHub apps, GitHub users, teams,
  code repositories, issues, and recently created/changed pull requests in those
  repositories to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

!!! note The integration limits ingestion of pull requests during each execution
to 500 of those most recently created/modified since the last execution. This is
an accumulative process so that PRs which have been ingested but are not
changing remain in the graph.

## Requirements

- JupiterOne requires the JupiterOne GitHub app with read-only permissions be
  installed in your Github Organization account.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

Upon creating a new GitHub integration configuration in JupiterOne, the user is
re-directed to GitHub to install the JupiterOne GitHub app.

The integration is using GitHub Apps authentication, which requests permissions
from the Organization installing the app. The app requests the following Read
Only permissions:

- Organization Metadata, Administration, Members, and Secrets
- Repository Metadata, Secrets, Environments, and Issues

All of these permissions are Read Only.

Note that the Secrets API does not reveal the values of Secrets - only their
names and creation dates.

Github References:

- <https://developer.github.com/apps/building-github-apps/setting-permissions-for-github-apps/>
- <https://developer.github.com/v3/apps/permissions/#metadata-permissions>
- <https://developer.github.com/v3/apps/permissions/#permission-on-contents>
- <https://docs.github.com/en/rest/reference/actions#secrets>
- <https://docs.github.com/en/rest/reference/permissions-required-for-github-apps#permission-on-secrets>

### In GitHub

Install the JupiterOne app in GitHub after creating the GitHub configuration in
JupiterOne.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GitHub** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this GitHub account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GitHub** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources           | Entity `_type`       | Entity `_class` |
| ------------------- | -------------------- | --------------- |
| Account             | `github_account`     | `Account`       |
| GitHub Env Secret   | `github_env_secret`  | `Secret`        |
| GitHub Environment  | `github_environment` | `Configuration` |
| GitHub Issue        | `github_issue`       | `Issue`         |
| GitHub Org Secret   | `github_org_secret`  | `Secret`        |
| GitHub Pull Request | `github_pullrequest` | `PR`            |
| GitHub Repo Secret  | `github_repo_secret` | `Secret`        |
| GitHub Team         | `github_team`        | `UserGroup`     |
| Github App          | `github_app`         | `Application`   |
| Github Repo         | `github_repo`        | `CodeRepo`      |
| Github User         | `github_user`        | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `github_account`      | **HAS**               | `github_org_secret`   |
| `github_account`      | **HAS**               | `github_team`         |
| `github_account`      | **HAS**               | `github_user`         |
| `github_account`      | **INSTALLED**         | `github_app`          |
| `github_account`      | **OWNS**              | `github_repo`         |
| `github_env_secret`   | **OVERRIDES**         | `github_org_secret`   |
| `github_env_secret`   | **OVERRIDES**         | `github_repo_secret`  |
| `github_environment`  | **HAS**               | `github_env_secret`   |
| `github_repo`         | **ALLOWS**            | `github_team`         |
| `github_repo`         | **ALLOWS**            | `github_user`         |
| `github_repo`         | **HAS**               | `github_environment`  |
| `github_repo`         | **HAS**               | `github_issue`        |
| `github_repo`         | **HAS**               | `github_pullrequest`  |
| `github_repo`         | **HAS**               | `github_repo_secret`  |
| `github_repo_secret`  | **OVERRIDES**         | `github_org_secret`   |
| `github_repo`         | **USES**              | `github_env_secret`   |
| `github_repo`         | **USES**              | `github_org_secret`   |
| `github_repo`         | **USES**              | `github_repo_secret`  |
| `github_team`         | **HAS**               | `github_user`         |
| `github_user`         | **APPROVED**          | `github_pullrequest`  |
| `github_user`         | **ASSIGNED**          | `github_issue`        |
| `github_user`         | **CREATED**           | `github_issue`        |
| `github_user`         | **MANAGES**           | `github_account`      |
| `github_user`         | **MANAGES**           | `github_team`         |
| `github_user`         | **OPENED**            | `github_pullrequest`  |
| `github_user`         | **REVIEWED**          | `github_pullrequest`  |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->