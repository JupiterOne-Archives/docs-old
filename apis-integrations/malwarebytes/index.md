# Integration with JupiterOne

## Malwarebytes + JupiterOne Integration Benefits

- Visualize Malwarebytes configurations, findings, groups, and host agents 
in the JupiterOne graph.
- Monitor Malwarebytes findings within the alerts app.
- Monitor changes to Malwarebytes groups, configurations, and host agents
using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches changes to configurations, findings, 
groups, and host agents from Malwarebytes to update the graph.
- Configure alerts to reduce the noise of findings.

## Requirements

- JupiterOne requires a Malwarebytes account ID, API client ID and client 
secret to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Malwarebytes

See instructions to 
[Configure Malwarebytes Nebula integration](https://support.malwarebytes.com/hc/en-us/articles/360046452914-Configure-Malwarebytes-Nebula-integration-for-Cortex-XSOAR).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Malwarebytes** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Malwarebytes
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Account ID** of your Malwarebytes account.
- Enter the **Client ID** configured for this integration.
- Enter the **Client Secret** configured for this integration.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Malwarebytes** integration tile and click it.
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

| Resources     | Entity `_type`               | Entity `_class` |
| ------------- | ---------------------------- | --------------- |
| Account       | `malwarebytes_account`       | `Account`       |
| Configuration | `malwarebytes_configuration` | `Configuration` |
| Finding       | `malwarebytes_finding`       | `Finding`       |
| Group         | `malwarebytes_group`         | `Group`         |
| HostAgent     | `malwarebytes_agent`         | `HostAgent`     |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`        |
| ---------------------- | --------------------- | ---------------------------- |
| `malwarebytes_account` | **HAS**               | `malwarebytes_agent`         |
| `malwarebytes_account` | **HAS**               | `malwarebytes_group`         |
| `malwarebytes_agent`   | **IDENTIFIED**        | `malwarebytes_finding`       |
| `malwarebytes_agent`   | **PROTECTS**          | `USER_ENDPOINT`              |
| `malwarebytes_group`   | **HAS**               | `malwarebytes_agent`         |
| `malwarebytes_group`   | **HAS**               | `malwarebytes_configuration` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
