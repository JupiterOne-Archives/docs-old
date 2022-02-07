# Integration with JupiterOne

## Jira + JupiterOne Integration Benefits

- Visualize Jira projects, users, and issues in the JupiterOne graph.
- Map Jira users to employees in your JupiterOne account.
- Monitor Jira issues configured as vulnerabilities or findings within the
  alerts app.
- Monitor changes to Jira users, projects, and issues using JupiterOne alerts.
- Create Jira issues from JupiterOne alerts and monitor progress against those
  issues in JupiterOne.
- Create Jira issues from JupiterOne compliance controls that need attention.

## How it Works

- JupiterOne periodically fetches Jira projects, users, and issues\* to update
  the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.
- Jira issue entities will have additional `_class` values when custom types are
  used in Jira:
  - `Change` (also added when the issue key starts with `PRODCM`)
  - `Finding`
  - `Incident`
  - `Risk`
  - `Vulnerability`

(\*) The integration performs a rolling ingestion of up to 2000 of the most
recently created or updated issues. Already ingested issues that are not
modified will remain in the graph when the integration runs again. Issues are
only deleted along with other entities associated with the integration instance
when the integration instance is deleted.

## Requirements

- JupiterOne requires the hostname for your Jira organization. JupiterOne also
  requires the username/email and an API key for a user having the correct
  permissions granted.
- The integration supports Jira Cloud with Jira API v3 and Jira Data Center with
  Jira API v2. Other setups may work.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

Customers authorize access to JupiterOne by creating a Jira user and providing
the username and password (or [API token][2] when passwords require MFA) to
JupiterOne for HTTP Basic Auth as described in the [Jira Security for Other
Integrations][1] documentation.

### In Jira

#### Configure an User for API Access

**Option 1 - Create a New User**

1. Create a new service account for JupiterOne use or use an existing account.
1. Login to Jira and navigate to _User Management_.
1. Send an invite to the service account.

**Option 2 - Leverage an Existing User**

Before you use an existing user, you should verify a couple of things.

- Make sure the appropriate permissions are configured/can be added to the
  account (see the _Permissions_ section below).
- Make sure you have the ability to login to the user's Jira account.

#### Permissions

- Authorize the user to read groups and users by granting the ["Browse Users"
  global permission][5]. This allows JupiterOne to provide visibility into Jira
  access.
- Authorize browse access to projects configured in JupiterOne. Use [group,
  project, role, and issue security features of Jira][3] to manage the user's
  access. Note that restricting to read-only access will require explicit
  removal of write permissions. Please see the Jira article on [How to Create a
  Read Only User][4].
- Authorize "Create Issues" permissions in projects that serve as JupiterOne
  Alert Rule action targets.

#### Create an API Token

1. Log in to Jira as the JupiterOne user and follow the Jira guide to [create an
   API token][2].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Jira** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
   - Enter the **Account Name** by which you'd like to identify this Jira
     account in JupiterOne. Ingested entities will have this value stored in
     `tag.AccountName` when **Tag with Account Name** is checked.
   - Enter a **Description** that will further assist your team when identifying
     the integration instance.
   - Select a **Polling Interval** that you feel is sufficient for your
     monitoring needs. You may leave this as `DISABLED` and manually execute the
     integration.
   - Enter the **Hostname** of your organization.
   - Enter the **User Email** used to authenticate with Jira.
   - Enter the **User Password** associated with the user email, or the **API
     Key** if the password requires MFA.
   - Enter the **Project Keys** that the integration will retrieve data from.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Jira** integration tile and click it.
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

| Resources    | Entity `_type` | Entity `_class`   |
| ------------ | -------------- | ----------------- |
| Account      | `jira_account` | `Account`         |
| Jira Issue   | `jira_issue`   | `Record`, `Issue` |
| Jira Project | `jira_project` | `Project`         |
| Jira User    | `jira_user`    | `User`            |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `jira_account`        | **HAS**               | `jira_project`        |
| `jira_account`        | **HAS**               | `jira_user`           |
| `jira_project`        | **HAS**               | `jira_issue`          |
| `jira_user`           | **CREATED**           | `jira_issue`          |
| `jira_user`           | **REPORTED**          | `jira_issue`          |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

[1]:
  https://developer.atlassian.com/cloud/jira/platform/security-for-other-integrations/
[2]: https://confluence.atlassian.com/cloud/api-tokens-938839638.html
[3]:
  https://support.atlassian.com/jira-core-cloud/docs/how-do-jira-permissions-work/
[4]:
  https://confluence.atlassian.com/jirakb/jira-cloud-how-to-create-a-read-only-user-779160729.html
[5]:
  https://confluence.atlassian.com/adminjiraserver/managing-global-permissions-938847142.html
