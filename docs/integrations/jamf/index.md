# Integration with JupiterOne

## Jamf + JupiterOne Integration Benefits

- Visualize Jamf admins, users, groups, devices, and configuration profiles
in the JupiterOne graph.
- Map Jamf users to employees in your JupiterOne account.
- Monitor changes to Jamf admins, users, and groups using JupiterOne alerts.
- Monitor changes to Jamf devices and configuration profiles using JupiterOne 
alerts.

## How it Works

- JupiterOne periodically fetches users, groups, and other endpoint management
resources from Jamf to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or leverage
 existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage 
existing alerts.

## Requirements

- JupiterOne requires a Jamf hostname to interact with the API. JupiterOne also
requires a user's username and password used to authenticate with Jamf.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Jamf

Jamf provides [detailed instructions on creating credentials][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Jamf** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Jamf
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Hostname** of your Jamf organization.
- Enter the **Username** used to authenticate with Jamf.
- Enter the **Password** associated with the username.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Jamf** integration tile and click it.
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

| Resources                   | Entity `_type`                   | Entity `_class`  |
| --------------------------- | -------------------------------- | ---------------- |
| Account                     | `jamf_account`                   | `Account`        |
| Admin                       | `jamf_user`                      | `User`           |
| Computer                    | `user_endpoint`                  | `Host`, `Device` |
| Group                       | `jamf_group`                     | `UserGroup`      |
| Mobile Device               | `mobile_device`                  | `Device`         |
| User                        | `device_user`                    | `User`           |
| macOS Configuration Profile | `jamf_osx_configuration_profile` | `Configuration`  |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`            |
| --------------------- | --------------------- | -------------------------------- |
| `device_user`         | **HAS**               | `mobile_device`                  |
| `device_user`         | **HAS**               | `user_endpoint`                  |
| `jamf_account`        | **HAS**               | `device_user`                    |
| `jamf_account`        | **HAS**               | `jamf_group`                     |
| `jamf_account`        | **HAS**               | `mobile_device`                  |
| `jamf_account`        | **HAS**               | `jamf_osx_configuration_profile` |
| `jamf_account`        | **HAS**               | `jamf_user`                      |
| `jamf_account`        | **HAS**               | `user_endpoint`                  |
| `jamf_group`          | **HAS**               | `jamf_user`                      |
| `user_endpoint`       | **INSTALLED**         | `macos_app`                      |
| `user_endpoint`       | **USES**              | `jamf_osx_configuration_profile` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

[1]: https://developer.jamf.com/documentation#authentication
