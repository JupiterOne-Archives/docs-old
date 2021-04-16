# Integration with JupiterOne

## Checkmarx + JupiterOne Integration Benefits

- Visualize Checkmarx scan assessments and findings on projects in the
  JupiterOne graph.
- Visualize Checkmarx teams in the JupiterOne graph.
- Map a Checkmarx team to connected users in JupiterOne.
- Monitor Checkmarx findings within the alerts app.
- Monitor changes to Checkmarx projects using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches teams, assessments, and new findings from
  Checkmarx to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.

## Requirements

- JupiterOne requires the hostname of the Checkmarx instance along with a user's
  username and password. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

The integration connects directly to Checkmarx SAST API.

### In Checkmarx

1. Capture the **Hostname** of the Checkmarx instance. 
2. Create a new service account user or leverage an existing user that has
read access to your Checkmarx account.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Checkmarx** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Checkmarx
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Client Username** of the Checkmarx user to authenticate with.
- Enter the **Client Password** of the Checkmarx user to authenticate with.
- Enter the **Client Hostname** of the Checkmarx instance.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Checkmarx** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE "j1-integration
document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER DOCUMENTATION
FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources  | Entity `_type`           | Entity `_class` |
| ---------- | ------------------------ | --------------- |
| Account    | `checkmarx_account`      | `Account`       |
| Assessment | `checkmarx_scan`         | `Assessment`    |
| Finding    | `checkmarx_finding`      | `Finding`       |
| Project    | `checkmarx_project`      | `Project`       |
| Service    | `checkmarx_dast_scanner` | `Service`       |
| Team       | `checkmarx_team`         | `Team`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`    | Relationship `_class` | Target Entity `_type`    |
| ------------------------ | --------------------- | ------------------------ |
| `checkmarx_account`      | **HAS**               | `checkmarx_dast_scanner` |
| `checkmarx_account`      | **HAS**               | `checkmarx_team`         |
| `checkmarx_dast_scanner` | **PERFORMED**         | `checkmarx_scan`         |
| `checkmarx_project`      | **HAS**               | `checkmarx_scan`         |
| `checkmarx_scan`         | **IDENTIFIED**        | `checkmarx_finding`      |
| `checkmarx_team`         | **HAS**               | `checkmarx_project`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->