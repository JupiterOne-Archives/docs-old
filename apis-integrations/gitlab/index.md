# Integration with JupiterOne

## GitLab + JupiterOne Integration Benefits

- Visualize GitLab users, groups, code repositories, and merge requests in the
  JupiterOne graph.
- Map GitLab users to employees in your JupiterOne account.
- Map GitLab users to development/security trainings.
- Monitor GitLab software development activities within repositories including
  changes and approvals.
- Monitor changes to GitLab user groups, users, code repositories, and merge
  requests using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches GitLab users, code repositories, and
 pull requests in those repositories to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires a personal access token configured with read access and the API base URL.
- You must have permission in JupiterOne to install new integrations.

## ## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In GitLab

See GitLab's documentation for 
[Creating a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GitLab** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this GitLab
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Personal Access Token** configured for read access in GitLab.
- Enter the **API Base URL** of your self-managed GitLab instance.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **GitLab** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources     | Entity `_type`         | Entity `_class`       |
| ------------- | ---------------------- | --------------------- |
| Account       | `gitlab_account`       | `Account`             |
| Group         | `gitlab_group`         | `Group`               |
| Merge Request | `gitlab_merge_request` | `CodeReview`, `PR`    |
| Project       | `gitlab_project`       | `CodeRepo`, `Project` |
| User          | `gitlab_user`          | `User`                |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`  |
| --------------------- | --------------------- | ---------------------- |
| `gitlab_account`      | **HAS**               | `gitlab_group`         |
| `gitlab_account`      | **HAS**               | `gitlab_project`       |
| `gitlab_group`        | **HAS**               | `gitlab_group`         |
| `gitlab_group`        | **HAS**               | `gitlab_project`       |
| `gitlab_group`        | **HAS**               | `gitlab_user`          |
| `gitlab_project`      | **HAS**               | `gitlab_merge_request` |
| `gitlab_project`      | **HAS**               | `gitlab_user`          |
| `gitlab_user`         | **APPROVED**          | `gitlab_merge_request` |
| `gitlab_user`         | **OPENED**            | `gitlab_merge_request` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
