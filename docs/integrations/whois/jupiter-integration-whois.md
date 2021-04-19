# Integration with JupiterOne

## Whois + JupiterOne Integration Benefits

- Visualize Whois domains in the JupiterOne graph.
- Monitor changes to Whois domains using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches domains from Whois to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, 
or leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, 
or leverage existing alerts.

## Requirements

- JupiterOne requires a list of Domains Token to lookup via the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Whois

The integration instance configuration expects a comma separated lists of
domains. For example:

```
google.com,facebook.com
```

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Whois** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Whois
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Domains** as a comma separated list that JupiterOne will lookup.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Whois** integration tile and click it.
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
| Domain    | `internet_domain` | `Domain`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->