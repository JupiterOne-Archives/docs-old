# Integration with JupiterOne

## Fastly + JupiterOne Integration Benefits

- Visualize Fastly users, API tokens, services, and service backends
in the JupiterOne graph.
- Map Fastly users to employees in your JupiterOne account.
- Monitor changes to Fastly users and API tokens using JupiterOne alerts.
- Monitor changes to Fastly services and service backends using JupiterOne 
alerts.

## How it Works

- JupiterOne periodically fetches users, tokens, and services from Fastly to 
update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or leverage
 existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage 
existing alerts.

## Requirements

- JupiterOne requires a Fastly customer ID and API token to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Fastly

To conigure this integration you should have an account in Fastly and create 
an **API Token** with Read-only access (`global:read`). You will also need the
**Customer ID** from the settings page of your Fastly account.

- The **Customer ID** can be obtained from
  https://manage.fastly.com/account/company

- The **API Token** can be created from
  https://manage.fastly.com/account/personal/tokens

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Fastly** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Fastly
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Customer ID** associated with your Fastly account.
- Enter the **API Token** generated from your Fastly account (by a superuser so 
it is associated with the organization, not the user) with global read 
permissions.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Fastly** integration tile and click it.
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

| Resources       | Entity `_type`           | Entity `_class`       |
| --------------- | ------------------------ | --------------------- |
| API Token       | `fastly_api_token`       | `AccessKey`           |
| Account         | `fastly_account`         | `Account`             |
| Service         | `fastly_service`         | `Service`             |
| Service Backend | `fastly_service_backend` | `ApplicationEndpoint` |
| User            | `fastly_user`            | `User`                |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`    | Relationship `_class` | Target Entity `_type`    |
| ------------------------ | --------------------- | ------------------------ |
| `fastly_account`         | **HAS**               | `fastly_api_token`       |
| `fastly_account`         | **HAS**               | `fastly_service`         |
| `fastly_account`         | **HAS**               | `fastly_user`            |
| `fastly_service_backend` | **CONNECTS**          | `Host or Gateway`        |
| `fastly_service`         | **CONNECTS**          | `DomainRecord`           |
| `fastly_service`         | **HAS**               | `fastly_service_backend` |
| `fastly_user`            | **HAS**               | `fastly_api_token`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
