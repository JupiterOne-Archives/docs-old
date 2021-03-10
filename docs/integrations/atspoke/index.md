# Integration with JupiterOne

## atSpoke + JupiterOne Integration Benefits

- Visualize atSpoke users, teams, requests and webhooks in the JupiterOne graph.
- Map atSpoke users to employees in your JupiterOne account.
- Maintain awareness of systems atSpoke is interacting with through webhooks.
- Monitor changes to atSpoke users using JupiterOne alerts.
- Correlate atSpoke request types and volume with other security events.

## How it Works

- JupiterOne periodically fetches users, teams, and webhooks from atSpoke to
  update the graph. Optionally, requests and request types are also fetched.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when JupiterOne graph changes.

## Requirements

- You need a Business or Enterprise level atSpoke account in order to create an
  API key for JupiterOne to access the system.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In atSpoke

1. Log into atSpoke on a Business-level or Enterprise-level account (Teams-level
   accounts do not provide API functionality).
2. Go to My Profile.
3. Select the API tab.
4. Generate a token at the bottom of the page. Note that you can only have one
   token for the whole atSpoke account, and it allows access to all things.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **atSpoke** integration tile and click it.
3. Click the **Add Configuration** button.
4. Enter the **Account Name** by which you'd like to identify this atSpoke
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
5. Enter a **Description** that will further assist your team when identifying
   the integration instance.
6. Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
7. Enter the **atSpoke API Key** generated on the atSpoke site.
8. Enter the number of **num atSpoke requests** according to your preference.
   See below for details on this feature.
9. Click **Create Configuration** once all values are provided.

### atSpoke Request Tracking

Tracking atSpoke requests in the JupiterOne graph is optional. If you do not
want to track requests and request-types, set **num atSpoke requests** to 0.

Any number above 0 will tell JupiterOne to retrieve that many requests, starting
with the most recently updated, at each polling interval. These requests will be
Record entities in the JupiterOne graph, and the collection size will grow
indefinitely (ie. old Records will not be deleted, unlike users, teams, and
webhooks which only show current in the J1 graph).

Consider setting this number to a value that correlates to the execution
interval of the integration and the expected number of requests that would have
been created/changed between executions. Setting it on the higher side of that
estimate is not a problem (Records will not be duplicated), but setting it
unnecessarily high could have performance impacts with frequent polling.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **atSpoke** integration tile and click it.
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

| Resources            | Entity `_type`        | Entity `_class`       |
| -------------------- | --------------------- | --------------------- |
| atSpoke Account      | `atspoke_account`     | `Account`             |
| atSpoke Request      | `atspoke_request`     | `Record`              |
| atSpoke Request Type | `atspoke_requesttype` | `Configuration`       |
| atSpoke Team         | `atspoke_team`        | `UserGroup`           |
| atSpoke User         | `atspoke_user`        | `User`                |
| atSpoke Webhook      | `atspoke_webhook`     | `ApplicationEndpoint` |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `atspoke_account`     | **HAS**               | `atspoke_request`     |
| `atspoke_account`     | **HAS**               | `atspoke_requesttype` |
| `atspoke_account`     | **HAS**               | `atspoke_team`        |
| `atspoke_account`     | **HAS**               | `atspoke_user`        |
| `atspoke_account`     | **HAS**               | `atspoke_webhook`     |
| `atspoke_request`     | **HAS**               | `atspoke_requesttype` |
| `atspoke_team`        | **HAS**               | `atspoke_user`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
