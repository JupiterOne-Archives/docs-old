# Integration with JupiterOne

## Feroot + JupiterOne Integration Benefits

- Visualize Feroot users, groups, project folders, projects, alerts, and 
domains in the JupiterOne graph.
- Map Feroot users to employees in your JupiterOne account.
- Monitor changes to Feroot users and groups using JupiterOne alerts.
- Monitor changes to Feroot project folders and projects using JupiterOne alerts.
- Monitor Feroot findings within the alerts app.

## How it Works

- JupiterOne periodically fetches users, groups, and other security testing 
resources from Feroot to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or leverage
 existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage 
existing alerts.

## Requirements

- JupiterOne requires a Feroot API Key to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Feroot

To create an account in Feroot just sign up on
[feroot.com](https://www.feroot.com). To get access to the API Key management
functionality the `PRO` plan subscription is required. You can start a free
trial of `PRO` plan by clicking on `Start PRO trial` link in your account.

To create an API key go to `Settings` -> `Account` -> `Developer` and click
`Create new API key`. Select `Admin Read-only` role for the new key. The new
item will be added to `List of API keys` table. Click on `Reveal API key` and
copy the key to use in the integration.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Feroot** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Feroot
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** generated from your Feroot account, configured with an
admin read-only role.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Feroot** integration tile and click it.
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

| Resources         | Entity `_type`             | Entity `_class` |
| ----------------- | -------------------------- | --------------- |
| Alert             | `feroot_alert`             | `Finding`       |
| Inspector Project | `feroot_project`           | `Project`       |
| PageGuard Project | `feroot_pageguard_project` | `Project`       |
| Project Folder    | `feroot_project_folder`    | `Group`         |
| Target Domain     | `web_app_domain`           | `Application`   |
| User              | `feroot_user`              | `User`          |
| User Group        | `feroot_user_group`        | `UserGroup`     |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`   | Relationship `_class` | Target Entity `_type`      |
| ----------------------- | --------------------- | -------------------------- |
| `feroot_project`        | **CONTAINS**          | `feroot_pageguard_project` |
| `feroot_project_folder` | **HAS**               | `feroot_project`           |
| `feroot_project`        | **GENERATED**         | `feroot_alert`             |
| `feroot_project`        | **MONITORS**          | `web_app_domain`           |
| `feroot_user_group`     | **HAS**               | `feroot_project_folder`    |
| `feroot_user_group`     | **HAS**               | `feroot_user`              |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->