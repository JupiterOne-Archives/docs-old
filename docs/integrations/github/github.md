# Integration with JupiterOne

## GitHub + JupiterOne Integration Benefits

- Visualize GitHub users, groups, code repositories, and pull requests in the
  JupiterOne graph.
- Map GitHub users to employees in your JupiterOne account.
- Map GitHub users to development/security trainings.
- Monitor Github software development activities within repositories including
  changes and approvals.
- Monitor changes to GitHub user groups, users, code repositories, and pull
  requests using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches GitHub users, code repositories, and
 pull requests in those repositories to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the JupiterOne GitHub app with read-only permissions 
be installed in your Github account. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

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

### In GitHub

Install the JupiterOne app in GitHub after creating the GitHub configuration
in JupiterOne.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GitHub** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this GitHub
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Select to **Analyze Commit Approval** which enables analysis of individual 
commits' approval status.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GitHub** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| GitHub Entity Resource | \_type : \_class of the Entity |
| ---------------------- | ------------------------------ |
| Account                | `github_account` : `Account`   |
| Team                   | `github_team` : `UserGroup`    |
| Repository             | `github_repo` : `CodeRepo`     |
| User                   | `github_user` : `User`         |
| Pull Request           | `github_pullrequest` : `PR`    |

### Relationships

The following relationships are created/mapped:

#### Basic relationships within the integration instance account/resources

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