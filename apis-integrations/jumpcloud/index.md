# Integration with JupiterOne

## JumpCloud + JupiterOne Integration Benefits

- Visualize JumpCloud users and groups in the JupiterOne graph.
- Map JumpCloud users to employees in your JupiterOne account.
- Monitor changes to JumpCloud users and groups using JupiterOne alerts.
- Create an employee entity that is used to map users across your organization to an employee 
via a matching email property.

## How it Works

- JupiterOne periodically fetches JumpCloud users and SSO assets to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API key used to authenticate with the JumpCloud account.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In JumpCloud

Instructions on creating an API token within your JumpCloud account can be found
[here][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **JumpCloud** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this JumpCloud
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** used to authenticate to your JumpCloud account.
4. Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: List specific actions that must be taken to uninstall the integration.
Many of the following steps will be reusable; take care to be sure they remain
accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **JumpCloud** integration tile and click it.
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

| Resources     | Entity `_type`      | Entity `_class`           |
| ------------- | ------------------- | ------------------------- |
| Group         | `jumpcloud_group`   | `Group`                   |
| Organizations | `jumpcloud_account` | `Account`, `Organization` |
| User          | `jumpcloud_user`    | `User`                    |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `jumpcloud_account`   | **HAS**               | `jumpcloud_group`     |
| `jumpcloud_account`   | **HAS**               | `jumpcloud_user`      |
| `jumpcloud_group`     | **HAS**               | `jumpcloud_user`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

[1]:
  https://docs.jumpcloud.com/2.0/authentication-and-authorization/authentication-and-authorization-overview
