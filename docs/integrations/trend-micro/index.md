# Integration with JupiterOne

## Trend Micro + JupiterOne Integration Benefits

- Visualize Trend Micro administrators in the JupiterOne graph.
- Visualize Trend Micro endpoint agents and the devices they protect in the
  JupiterOne graph.
- Map Trend Micro endpoint agents to devices and devices to the employee who is
  the owner.
- Monitor changes to Trend Micro administrators, endpoint agents, and devices
  using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Trend Micro administrators, agents, and
  devices to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API Key that has been configured for read access.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Trend Micro

For configuring an API key in Trend Micro, see
[Create and Manage API Keys](https://automation.deepsecurity.trendmicro.com/article/12_0/create-and-manage-api-keys/).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Trend Micro** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Trend Micro
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** configured in Trend Micro for read access.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Trend Micro** integration tile and click it.
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

| Resources          | Entity `_type`                   | Entity `_class` |
| ------------------ | -------------------------------- | --------------- |
| API Key            | `trend_micro_api_key`            | `Key`           |
| Administrator      | `trend_micro_administrator`      | `User`          |
| Administrator Role | `trend_micro_administrator_role` | `AccessRole`    |
| Computer           | `trend_micro_computer`           | `Host`          |
| Computer Group     | `trend_micro_computer_group`     | `Group`         |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`        | Relationship `_class` | Target Entity `_type`            |
| ---------------------------- | --------------------- | -------------------------------- |
| `trend_micro_administrator`  | **ASSIGNED**          | `trend_micro_administrator_role` |
| `trend_micro_computer_group` | **HAS**               | `trend_micro_computer`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
