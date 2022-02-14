# Integration with JupiterOne

## Sysdig + JupiterOne Integration Benefits

- Visualize Sysdig account, teams, and users in the JupiterOne graph.
- See relationships between Sysdig teams and users in your JupiterOne account.
- Monitor changes to Sysdig users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches account details, teams, and users from Sysdig
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Sysdig supports an API Token credential. You must have a Administrator user
  account.
- JupiterOne requires a Sysdig account API token. You need permission to create
  a user in Sysdig that will be used to obtain the API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Sysdig

1. [Retrieve the Sysdig API Token](https://docs.sysdig.com/en/docs/administration/administration-settings/user-profile-and-password/retrieve-the-sysdig-api-token/)
2. Look up the
   [SaaS Region](https://docs.sysdig.com/en/docs/administration/saas-regions-and-ip-ranges/)
   for your Sysdig account. The integration configuration needs the endpoint for
   your account (e.g. `us2`)

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Sysdig** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Sysdig account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the Sysdig **API Token** generated for use by JupiterOne.
- Enter the **Region** for your Sysdig account

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Sysdig** integration tile and click it.
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

| Resources  | Entity `_type`      | Entity `_class` |
| ---------- | ------------------- | --------------- |
| Account    | `sysdig_account`    | `Account`       |
| Image Scan | `sysdig_image_scan` | `Assessment`    |
| Team       | `sysdig_team`       | `Team`          |
| User       | `sysdig_user`       | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `sysdig_account`      | **HAS**               | `sysdig_image_scan`   |
| `sysdig_account`      | **HAS**               | `sysdig_team`         |
| `sysdig_account`      | **HAS**               | `sysdig_user`         |
| `sysdig_team`         | **HAS**               | `sysdig_user`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
