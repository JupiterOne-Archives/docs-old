# Integration with JupiterOne

## Azure DevOps + JupiterOne Integration Benefits

- Visualize Azure DevOps projects, teams, and users in the JupiterOne graph.
- Map Azure DevOps users to employees in your JupiterOne account.
- Monitor changes to Azure DevOps users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches projects, teams, and users from Azure DevOps
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- The Azure DevOps + JupiterOne integration uses a read-only personal access
  token to ingest data from the Azure DevOps platform. You must have access to
  generate a personal access token in Azure DevOps
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Azure DevOps

1. [Generate a Personal Access Token (PAT)](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)
2. Grant the following permissions to your PAT:
   - **Project and Team [read]**
   - **Work Items [read]**

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Azure DevOps** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Azure DevOps
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter your account URL (_Example: "https://dev.azure.com/jupiterone"_)
- Enter the **Personal Access Token** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Azure DevOps** integration tile and click it.
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

| Resources            | Entity `_type`           | Entity `_class` |
| -------------------- | ------------------------ | --------------- |
| ADO Project          | `azure_devops_project`   | `Project`       |
| ADO Team             | `azure_devops_team`      | `UserGroup`     |
| ADO User             | `azure_devops_user`      | `User`          |
| ADO WorkItem         | `azure_devops_work_item` | `Record`        |
| Azure Devops Account | `azure_devops_account`   | `Account`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`    |
| ---------------------- | --------------------- | ------------------------ |
| `azure_devops_account` | **HAS**               | `azure_devops_project`   |
| `azure_devops_account` | **HAS**               | `azure_devops_team`      |
| `azure_devops_account` | **HAS**               | `azure_devops_user`      |
| `azure_devops_project` | **HAS**               | `azure_devops_team`      |
| `azure_devops_project` | **HAS**               | `azure_devops_work_item` |
| `azure_devops_team`    | **HAS**               | `azure_devops_user`      |
| `azure_devops_user`    | **ASSIGNED**          | `azure_devops_work_item` |
| `azure_devops_user`    | **CREATED**           | `azure_devops_work_item` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
