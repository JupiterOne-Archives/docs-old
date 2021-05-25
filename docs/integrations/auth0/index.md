# Integration with JupiterOne

## Auth0 + JupiterOne Integration Benefits

- Visualize Auth0 clients (applications) and users in the JupiterOne graph.
- Map Auth0 users to employees in your JupiterOne account.
- Monitor changes to Auth0 users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches clients and users from Auth0 to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Auth0 supports the OAuth2 Client Credential flow. You will need to have access
  to the Auth0 management dashboard and be able to enable permissions for a
  Machine-to-Machine application.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Auth0

1. From the dashboard at
   https://manage.auth0.com/dashboard/{YOURREGION}/{YOURDOMAIN}, select
   Applications. Under Applications, select Applications.
2. You can use the default Auth0 Management API (Test Application) Machine to
   Machine application, or you can create your own Machine to Machine
   application to connect to the Auth0 Management API.
3. Go to the settings tab for your chosen Machine to Machine application and
   make note of the Client ID and Client Secret.
4. Go to the APIs tab for your chosen Machine to Machine application and ensure
   that the Auth0 Management API is set to Authorized.
5. To the right of the Authorized slider, click the downward arrow to expand the
   permissions settings for the application. Filter permissions by "read",
   select `read:users` and `read:clients`, and hit Update.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Auth0** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this {{provider}}
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Auth0 Client ID** for the Machine-to-Machine application
  designated for JupiterOne's use.
- Enter the **Auth0 Client Secret** for the Machine-to-Machine application
  designated for JupiterOne's use.
- Enter the **Auth0 Domain** for your Auth0 tenant. Format should be
  `{YOURDOMAIN}.{REGION}.auth0.com`. Do not include `https://`.
- Enter the **Auth0 Audience** for your Auth0 tenant, which points to the specific
  API you will be using. Typically this is 
  `https://{YOURDOMAIN}.{REGION}.auth0.com/api/v2/`

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Auth0** integration tile and click it.
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

| Resources     | Entity `_type`  | Entity `_class` |
| ------------- | --------------- | --------------- |
| Auth0 Account | `auth0_account` | `Account`       |
| Auth0 Client  | `auth0_client`  | `Application`   |
| User          | `auth0_user`    | `User`          |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `auth0_account`       | **HAS**               | `auth0_client`        |
| `auth0_account`       | **HAS**               | `auth0_user`          |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
