# Jira

## Overview

JupiterOne provides a managed integration with Jira. The integration connects
directly to Jira APIs to obtain project information and issues.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Customers authorize access to JupiterOne by creating a Jira user and providing
the username and password (or [API token][2] when passwords require MFA) to
JupiterOne for HTTP Basic Auth as described in the [Jira Security for Other
Integrations][1] documentation.

1. Create a Jira user for exclusive use by JupiterOne.
1. Authorize the user to read groups and users by granting the ["Browse Users"
   global permission][5]. This allows JupiterOne to provide visibility into Jira
   access.
1. Authorize browse access to projects configured in JupiterOne. Use [group,
   project, role, and issue security features of Jira][3] to manage the user's
   access. Note that retricting to read-only access will require explicit
   removal of write permissions. Please see the Jira article on [How to Create a
   Read Only User][4].
1. Authorize "Create Issues" permissions in projects that serve as JupiterOne
   Alert Rule action targets.
1. Log in to Jira as the JupiterOne user and [create an API token][2].

## Entities

The following entity resources are ingested when the integration runs:

| Jira Resource | \_type of the Entity | \_class of the Entity |
| ------------- | -------------------- | --------------------- |
| Account       | `jira_account`       | `Account`             |
| Project       | `jira_project`       | `Project`             |
| User          | `jira_user`          | `User`                |
| Issue \*      | `jira_issue`         | `Record`              |

(\*) The integration ingests issues up to a year prior to the date of execution.
Issues ingested are kept as records, such that issues older than a year that
were previously ingested will remain in the graph when the integration runs
again. Issues are deleted only when the integration instance is deleted, along
with other entities associated with the integration instance.

## Relationships

The following relationships are created/mapped:

| From           | Type         | To             |
| -------------- | ------------ | -------------- |
| `jira_account` | **HAS**      | `jira_project` |
| `jira_project` | **HAS**      | `jira_issue`   |
| `jira_user`    | **CREATED**  | `jira_issue`   |
| `jira_user`    | **REPORTED** | `jira_issue`   |

[1]:
  https://developer.atlassian.com/cloud/jira/platform/security-for-other-integrations/
[2]: https://confluence.atlassian.com/cloud/api-tokens-938839638.html
[3]:
  https://support.atlassian.com/jira-core-cloud/docs/how-do-jira-permissions-work/
[4]:
  https://confluence.atlassian.com/jirakb/jira-cloud-how-to-create-a-read-only-user-779160729.html
[5]:
  https://confluence.atlassian.com/adminjiraserver/managing-global-permissions-938847142.html

## Pro Tips

In Jira, if you create custom issue types and use one of the following, the
integration will parse and translate them to the corresponding entity class:

- `Change` (this also maps when the issue key starts with `PRODCM`)
- `Finding`
- `Incident`
- `Risk`
- `Vulnerability`
