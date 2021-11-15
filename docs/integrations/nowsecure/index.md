# Integration with JupiterOne

## NowSecure + JupiterOne Integration Benefits

- Visualize NowSecure users, services, applications, and findings in the
  JupiterOne graph.
- Map NowSecure users to employees in your JupiterOne account.
- Monitor changes to NowSecure users, services, and applications using
  JupiterOne alerts.
- Monitor NowSecure findings within the alerts app.

## How it Works

- JupiterOne periodically fetches users and mobile application security testing
  resources from NowSecure to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires a NowSecure API Token to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In NowSecure

The integration connects directly to [NowSecure REST API][1] to obtain
application scan assets, reports, and findings.

Configure the integration by providing an API Key from your NowSecure account.
JupiterOne by default ingests findings from the past 30 days. The configuration
can be changed to ingest findings from the latest scan reports (this option
requires Enterprise Plan from NowSecure).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **NowSecure** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this NowSecure
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Token** with access to your NowSecure account.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **NowSecure** integration tile and click it.
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

| Resources           | Entity `_type`      | Entity `_class` |
| ------------------- | ------------------- | --------------- |
| Account             | `nowsecure_account` | `Account`       |
| Finding             | `nowsecure_finding` | `Finding`       |
| Mobile Applications | `mobile_app`        | `Application`   |
| Service             | `nowsecure_service` | `Service`       |
| User                | `nowsecure_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `mobile_app`          | **HAS**               | `nowsecure_finding`   |
| `nowsecure_account`   | **HAS**               | `mobile_app`          |
| `nowsecure_account`   | **HAS**               | `nowsecure_user`      |
| `nowsecure_account`   | **PROVIDES**          | `nowsecure_service`   |
| `nowsecure_service`   | **SCANS**             | `mobile_app`          |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

[1]: https://developer.nowsecure.com/
