# Integration with JupiterOne

## VMWare AirWatch + JupiterOne Integration Benefits

- Visualize VMWare AirWatch admins, users, groups, and devices in the 
JupiterOne graph.
- Map VMWare AirWatch users to employees in your JupiterOne account.
- Monitor changes to VMWare AirWatch admins, users, groups, and devices 
using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users and devices from VMWare AirWatch 
to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, 
or leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, 
or leverage existing alerts.

## Requirements

- JupiterOne requires a VMWare AirWatch hostname, admin username and password,
and rest API key to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In VMWare AirWatch

After logging into VMWare AirWatch (Workspace ONE™️ UEM), create an
Administrator user account for the integration to authenticate with the REST
API.

1. Select **Accounts** > **Administrators** > **List View**.

2. Press the **Add** > **Add Admin**" button and provide required details. It is
   _recommended_ that you set values representing JupiterOne as a system user
   account. It is _important_ that you set _Title_ on the _Details_ tab to
   "system" so that JupiterOne understands this is a user for automation (it
   will not attempt to map to a Person entity).

3. Once the account is created, navigate to **Groups & Settings** > **All
   Settings** > **System** > **Advanced** > **API** > **REST API**" and click
   **Add** to create a new API key.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **VMWare AirWatch** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this VMWare AirWatch
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Hostname** of your VMWare AirWatch account.
- Enter the **Admin Username** used to authenticate with VMWare Airwatch.
- Enter the **Admin Password** associated with the username.
- Enter the **Rest API Key** (or Tenant Code) used to authenticate with 
VMWare Airwatch.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **VMWare AirWatch** integration tile and click it.
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

| Resources          | Entity `_type`     | Entity `_class`      |
| ------------------ | ------------------ | -------------------- |
| Account            | `airwatch_account` | `Account`            |
| Admin              | `airwatch_user`    | `User`               |
| Device             | `user_endpoint`    | `Host`, `Device`     |
| Device User        | `device_user`      | `User`               |
| Organization Group | `airwatch_group`   | `Group`, `UserGroup` |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `airwatch_account`    | **HAS**               | `airwatch_group`      |
| `airwatch_account`    | **MANAGES**           | `user_endpoint`       |
| `airwatch_group`      | **HAS**               | `airwatch_group`      |
| `airwatch_group`      | **HAS**               | `airwatch_user`       |
| `user_endpoint`       | **HAS**               | `device_user`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->