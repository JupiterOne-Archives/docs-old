# Jira

## Overview

JupiterOne provides a managed integration with Jira. The integration connects
directly to Jira APIs to obtain project information and issues.

## Integration Instance Configuration

The integration is triggered by an event containing the information for a
specific integration instance.

Customers authorize access by creating a Jira user and providing the username
and password to JupiterOne for HTTP Basic Auth as described in the [Jira
Security for Other Integrations][1] documentation.

## Entities

The following entity resources are ingested when the integration runs:

| Jira Resource | \_type of the Entity | \_class of the Entity |
| ------------- | -------------------- | --------------------- |
| Account       | `jira_account`       | `Account`             |
| Project       | `jira_project`       | `Project`             |
| User          | `jira_user`          | `User`                |
| Issue         | `jira_issue`         | `Record`              |

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
