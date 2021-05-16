# Integration with JupiterOne

## Detectify + JupiterOne Integration Benefits

- Visualize Detectify services, domains, subdomains, scan profiles, scan 
reports, and findings in the JupiterOne graph.
- Monitor Detectify findings within the alerts app.
- Monitor changes to Detectify vulnerability scan resources using JupiterOne 
alerts.

## How it Works

- JupiterOne periodically fetches vulnerability scan resources from Detectify to 
update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or 
leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage 
existing alerts.

## Requirements

- JupiterOne requires a Detectify API key to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Detectify

The integration
connects directly to [Detectify REST API][1] to obtain application scan assets,
reports, and findings.

Configure the integration by providing an API Key from your Detectify account.
JupiterOne by default ingests findings from the past 30 days. The configuration
can be changed to ingest findings from the latest scan reports (this option
requires Enterprise Plan from Detectify).

JupiterOne vulnerability management and scanner integration is built on this
high level data model:

```text
Vendor   - HOSTS    ->       Account
Account  - PROVIDES ->       Service (*)
Service  - SCANS or TESTS -> <Entity> (*)
<Entity> - HAS      ->       Finding
```

> (\*) Examples:
>
> - `Service` (e.g. SAST, DAST, IAST, MAST, PenTest, etc.)
> - `<Entity>` (e.g. Application or Host or Device)

Optionally, the following is added when each scan/assessment/report is also
tracked by the integration:

```text
Service    - PERFORMS   -> Assessment
Assessment - IDENTIFIED -> Finding
```

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Detectify** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Detectify
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** generated from your Detectify account, configured for 
read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Detectify** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

[1]: https://developer.detectify.com/

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

| Resources         | Entity `_type`           | Entity `_class`       |
| ----------------- | ------------------------ | --------------------- |
| Account           | `detectify_account`      | `Account`             |
| Asset (Domain)    | `web_app_domain`         | `Application`         |
| Asset (Subdomain) | `web_app_endpoint`       | `ApplicationEndpoint` |
| Finding           | `detectify_finding`      | `Finding`             |
| Scan Profile      | `detectify_scan_profile` | `Configuration`       |
| Scan Report       | `detectify_scan`         | `Assessment`          |
| Service           | `detectify_service`      | `Service`             |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`    |
| --------------------- | --------------------- | ------------------------ |
| `detectify_account`   | **HAS**               | `detectify_scan`         |
| `detectify_account`   | **HAS**               | `web_app_domain`         |
| `detectify_account`   | **PROVIDES**          | `detectify_service`      |
| `detectify_scan`      | **IDENTIFIED**        | `detectify_finding`      |
| `detectify_service`   | **PERFORMED**         | `detectify_scan`         |
| `detectify_service`   | **SCANS**             | `web_app_domain`         |
| `web_app_domain`      | **HAS**               | `detectify_scan_profile` |
| `web_app_domain`      | **HAS**               | `web_app_endpoint`       |
| `web_app_endpoint`    | **HAS**               | `detectify_finding`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

The following relationships are mapped:

| From     | Relationship | To               |
| -------- | ------------ | ---------------- |
| `<ROOT>` | **DEVELOPS** | `web_app_domain` |