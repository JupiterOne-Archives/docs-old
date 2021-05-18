# Integration with JupiterOne

## Duo + JupiterOne Integration Benefits

- Visualize Duo users, groups, devices, applications, and access keys in the JupiterOne graph.
- Map Duo users to employees in your JupiterOne account.
- Monitor changes to Duo users, groups, and access management data using JupiterOne alerts.
- Create an employee entity that is used to map users across your organization to an employee 
via a matching email property.

## How it Works

- JupiterOne periodically fetches Duo users, groups, and access management data to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the Duo API hostname. JupiterOne also requires the API 
integration key and API secret key that have been configured for read access. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Duo

You will need to create an API key (`Integration Key` + `Secret Key`) from your
Duo Admin Panel. You may need to contact Duo Support to request API access. See
up-to-date instructions in [Duo Support Docs][1].

#### Required API Permissions

JupiterOne requires at a minimum the following API permissions be enabled:

- Grant administrators
- Grant settings
- Grant read resource

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Duo** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Duo
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Hostname** of your Duo account.
- Enter the **API Integration Key** configured with read access in Duo.
- Enter the **Secret Key** configured with read access in Duo.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Duo** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

[1]: https://duo.com/docs/adminapi

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

| Resources   | Entity `_type`    | Entity `_class` |
| ----------- | ----------------- | --------------- |
| Account     | `duo_account`     | `Account`       |
| Admin       | `duo_admin`       | `User`          |
| Device      | `duo_phone`       | `Device`        |
| Group       | `duo_group`       | `UserGroup`     |
| Integration | `duo_integration` | `Application`   |
| MFA Token   | `mfa_device`      | `AccessKey`     |
| User        | `duo_user`        | `User`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `duo_account`         | **HAS**               | `duo_admin`           |
| `duo_account`         | **HAS**               | `duo_group`           |
| `duo_account`         | **HAS**               | `duo_integration`     |
| `duo_account`         | **HAS**               | `duo_user`            |
| `duo_group`           | **HAS**               | `duo_user`            |
| `duo_user`            | **ASSIGNED**          | `mfa_device`          |
| `duo_user`            | **USES**              | `duo_phone`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
