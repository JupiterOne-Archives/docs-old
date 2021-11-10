# Integration with JupiterOne

## Snipe-IT + JupiterOne Integration Benefits

- Visualize Snipe-IT account locations, hardware, and hardware owners in the
  JupiterOne graph.
- Map Snipe-IT users to the hardware they have or own.
- Monitor changes to locations, hardware, and hardware owners using using
  JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Snipe-IT hardware and owners data to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the hostname of your Snipe-IT account as well as an 
API Token configured for read access.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Snipe-IT

See the [Snipe-IT API docs](https://snipe-it.readme.io/reference) for information
on how to generate an API token.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Snipe-IT** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Snipe-IT
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Hostname** of your Snipe-IT account.
- Enter the **API Token** generated in your Snipe-IT account, configured for
read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Snipe-IT** integration tile and click it.
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

| Resources | Entity `_type`    | Entity `_class` |
| --------- | ----------------- | --------------- |
| Account   | `snipeit_account` | `Account`       |
| Location  | `location`        | `Site`          |
| Service   | `snipeit_service` | `Service`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `site`                | **HAS**               | `hardware`            |
| `snipeit_account`     | **MANAGES**           | `hardware`            |
| `snipeit_account`     | **MANAGES**           | `location`            |
| `snipeit_account`     | **PROVIDES**          | `snipeit_service`     |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

The following relationships are mapped:

| From     | Relationship  | To         |
| -------- | ------------- | ---------- |
| `Person` | **HAS\|OWNS** | `hardware` |

[1]: https://snipe-it.readme.io/reference
