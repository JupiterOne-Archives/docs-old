# Integration with JupiterOne

## Cloudflare + JupiterOne Integration Benefits

- Visualize Cloudflare users, access roles, domain zones, and domain records
in the JupiterOne graph.
- Map Cloudflare users to employees in your JupiterOne account.
- Monitor changes to Cloudflare users and access roles using JupiterOne alerts.
- Monitor changes to Cloudflare DNS settings using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users and DNS settings from Cloudflare to update 
the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or leverage
 existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage 
existing alerts.

## Requirements

- JupiterOne requires a Cloudflare API Token to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In CloudFlare

The integration connects directly to [Cloudflare REST API][1] to obtain DNS related
configuration information.

Configure the integration by providing an API Token with read-only permissions.
Obtain an API token from the bottom of the ["API Tokens" page][2] in your
Cloudflare account.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Cloudflare** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Cloudflare
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Token** generated from your Cloudflare account, configured for 
read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Cloudflare** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

[1]: https://api.cloudflare.com/
[2]: https://dash.cloudflare.com/profile/api-tokens

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

| Resources      | Entity `_type`              | Entity `_class` |
| -------------- | --------------------------- | --------------- |
| Account        | `cloudflare_account`        | `Account`       |
| Account Member | `cloudflare_account_member` | `User`          |
| Account Role   | `cloudflare_account_role`   | `AccessRole`    |
| DNS Record     | `cloudflare_dns_record`     | `DomainRecord`  |
| DNS Zone       | `cloudflare_dns_zone`       | `DomainZone`    |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`       | Relationship `_class` | Target Entity `_type`       |
| --------------------------- | --------------------- | --------------------------- |
| `cloudflare_account`        | **HAS**               | `cloudflare_dns_zone`       |
| `cloudflare_account`        | **HAS**               | `cloudflare_account_member` |
| `cloudflare_account`        | **HAS**               | `cloudflare_account_role`   |
| `cloudflare_account_member` | **ASSIGNED**          | `cloudflare_account_role`   |
| `cloudflare_dns_zone`       | **HAS**               | `cloudflare_dns_record`     |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->