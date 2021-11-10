# Integration with JupiterOne

## Sonarqube + JupiterOne Integration Benefits

- Visualize Sonarqube projects, users, and projects in the JupiterOne graph.
- Map Sonarqube users to employees in your JupiterOne account.
- Monitor changes to Sonarqube users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches projects, teams, and users from Sonarqube to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires an API token. You need permission to create a user in
  Sonarqube that will be used to obtain the API token. The token should have the
  `Administer System` permission to allow the ability to pull extra user
  metadata. More information on this can be found in the sonarqube api
  documentation of your instance
  (`<your-instance-url>/web_api/api/users/search`).
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Sonarqube

1. [Generate an API token](https://docs.sonarqube.org/latest/user-guide/user-token/)

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Sonarqube** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Sonarqube
  instance in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Sonarqube base url** generated for use by JupiterOne.
- Enter the **Sonarqube API token** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: List specific actions that must be taken to uninstall the integration.
Many of the following steps will be reusable; take care to be sure they remain
accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Sonarqube** integration tile and click it.
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

| Resources | Entity `_type`         | Entity `_class` |
| --------- | ---------------------- | --------------- |
| Project   | `sonarqube_project`    | `Project`       |
| User      | `sonarqube_user`       | `User`          |
| UserGroup | `sonarqube_user_group` | `UserGroup`     |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type` |
| ---------------------- | --------------------- | --------------------- |
| `sonarqube_user_group` | **HAS**               | `sonarqube_user`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->