# Integration with JupiterOne

## Aquasec + JupiterOne Integration Benefits

- Visualize Aquasec accounts, groups, users, and API keys in the JupiterOne
  graph.
- Map Aquasec users to employees in your JupiterOne account.
- Monitor changes to Aquasec users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches account, group, API key, and user data from
  Aquasec to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Aquasec uses generated API keys that consist of a key and secret value to
  authenticate calls to their API.
- JupiterOne requires an API key, secret, and the Account ID in order to make
  the necessary API calls. You must have a user with sufficient permissions in
  Aquasec to generate an API key to get this information.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Aquasec

1. [Generate an API Key](https://cloud.aquasec.com/cspm/#/apikeys) Be sure to
   make note of the secret as it will only be displayed once during generation.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Aquasec** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Aquasec
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** and **API Secret** generated for use by JupiterOne.
- Enter the **Account ID** for your Aquasec account.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: List specific actions that must be taken to uninstall the integration.
Many of the following steps will be reusable; take care to be sure they remain
accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Aquasec** integration tile and click it.
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

| Resources | Entity `_type`    | Entity `_class` |
| --------- | ----------------- | --------------- |
| API Key   | `aquasec_api_key` | `AccessKey`     |
| Account   | `aquasec_account` | `Account`       |
| Group     | `aquasec_group`   | `Group`         |
| User      | `aquasec_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `aquasec_account`     | **HAS**               | `aquasec_api_key`     |
| `aquasec_account`     | **HAS**               | `aquasec_group`       |
| `aquasec_account`     | **HAS**               | `aquasec_user`        |
| `aquasec_group`       | **HAS**               | `aquasec_user`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
