# Integration with JupiterOne

## Snyk + JupiterOne Integration Benefits

- Visualize Snyk code repositories and findings in the JupiterOne graph.
- Monitor Snyk findings within the alerts app.
- Monitor changes to Snyk code repositories using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Snyk repositories and findings to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the organisation id where your Snyk projects reside as
  well as the API Key configured to authenticate with Snyk.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

## In Snyk

The integration instance configurations requires the following two parameters:

- **Snyk API Key** (`snykApiKey`) In Snyk: In the upper right hand corner mouse
  over your account name, where a drop down will appear. Click on
  `account settings` and your API token will appear in a hidden form in the
  middle of the page. Click show and copy your key.

- **Snyk Organisation ID** (`snykOrgId`) In Snyk: Go to the dashboard. Click on
  `manage organisation` on the far right of the screen across from `Dashboard`.
  Here, your organisation ID is displayed.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Snyk** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Snyk account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** used to authenticate with Snyk.
- Enter the **Organisation ID** your Snyk projects reside in.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Snyk** integration tile and click it.
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

| Resources    | Entity `_type` | Entity `_class`      |
| ------------ | -------------- | -------------------- |
| CVE          | `cve`          | `Vulnerability`      |
| CWE          | `cwe`          | `Weakness`           |
| Snyk Account | `snyk_account` | `Service`, `Account` |
| Snyk Issue   | `snyk_finding` | `Finding`            |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `snyk_finding`        | **EXPLOITS**          | `cwe`                 |
| `snyk_finding`        | **IS**                | `cve`                 |
| `snyk_account`        | **IDENTIFIED**        | `snyk_finding`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
