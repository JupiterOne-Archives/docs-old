# Integration with JupiterOne

## SentinelOne + JupiterOne Integration Benefits

- Visualize SentinelOne endpoint agents and the devices they protect in the
  JupiterOne graph.
- Map SentinelOne endpoint agents to devices and devices to the employee who is
  the owner.
- Monitor changes to SentinelOne endpoint agents and devices using JupiterOne
  alerts.

## How it Works

- JupiterOne periodically fetches SentinelOne endpoint agents to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the SentinelOne management server hostname/url. JupiterOne
  also requires the API Token used to authenticate with SentinelOne.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In SentinelOne

The integration authenticates using an API Token.

1.  In your Management Console, click **Settings** > **USERS**
2.  Click your username
3.  Click the edit button
4.  **Edit User** > **API Token** -> **Generate**. If you see Revoke and
    Regenerate, you already have a token. If you revoke or regenerate it,
    scripts that use that token will not work. There is no confirmation. Revoke
    removes the token authorization. Regenerate revokes the token and generates
    a new token. If you click Generate or Regenerate, a message shows the token
    string and the date that the token expires.
5.  Click **DOWNLOAD**.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **SentinelOne** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this SentinelOne
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Management Server Hostname/URL** of SentinelOne.
- Enter the **API Token** used to authenticate with SentinelOne.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **SentinelOne** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources | Entity `_type`        | Entity `_class` |
| --------- | --------------------- | --------------- |
| Account   | `sentinelone_account` | `Account`       |
| Agent     | `sentinelone_agent`   | `HostAgent`     |
| Group     | `sentinelone_group`   | `Group`         |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `sentinelone_account` | **HAS**               | `sentinelone_group`   |
| `sentinelone_group`   | **HAS**               | `sentinelone_agent`   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
