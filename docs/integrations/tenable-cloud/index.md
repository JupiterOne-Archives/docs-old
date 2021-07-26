# Integration with JupiterOne

## Tenable Cloud + JupiterOne Integration Benefits

- Visualize Tenable Cloud users, scans, findings, reports, vulnerabilities, and
  container findings in the JupiterOne graph.
- Map Tenable Cloud users to employees in your JupiterOne account.
- Monitor Tenable vulnerabilities and findings within the alerts app.
- Monitor changes to Tenable Cloud users, scans, findings, reports,
  vulnerabilities, and container findings using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Tenable Cloud users, scans, findings, and
  vulnerabilities to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an access key and secret key used to authenticate with
  Tenable Cloud.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Tenable Cloud

See the [Tenable Developer Portal](https://developer.tenable.com/) for details
on how to configure an API access key and secret.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Tenable Cloud** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Tenable Cloud
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Access Key** used to authenticate with Tenable Cloud.
- Enter the **Secret Key** associated with the access key.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Tenable Cloud** integration tile and click it.
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

| Resources                  | Entity `_type`                       | Entity `_class`         |
| -------------------------- | ------------------------------------ | ----------------------- |
| Account                    | `tenable_account`                    | `Account`               |
| Container                  | `tenable_container`                  | `Image`                 |
| Container Finding          | `tenable_container_finding`          | `Finding`               |
| Container Malware          | `tenable_container_malware`          | `Finding`               |
| Container Report           | `tenable_container_report`           | `Assessment`            |
| Container Unwanted Program | `tenable_container_unwanted_program` | `Finding`               |
| Scan                       | `tenable_scan`                       | `Assessment`, `Service` |
| User                       | `tenable_user`                       | `User`                  |
| Vulnerability              | `tenable_vulnerability`              | `Vulnerability`         |
| Vulnerability Finding      | `tenable_vulnerability_finding`      | `Finding`               |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`           | Relationship `_class` | Target Entity `_type`                                         |
| ------------------------------- | --------------------- | ------------------------------------------------------------- |
| `tenable_account`               | **HAS**               | `tenable_container`                                           |
| `tenable_account`               | **HAS**               | `tenable_user`                                                |
| `tenable_container`             | **HAS**               | `tenable_container_report`                                    |
| `tenable_container_report`      | **IDENTIFIED**        | `tenable_container_finding`                                   |
| `tenable_container_report`      | **IDENTIFIED**        | `tenable_container_malware`                                   |
| `tenable_container_report`      | **IDENTIFIED**        | `tenable_container_unwanted_program`                          |
| `tenable_scan`                  | **IDENTIFIED**        | `tenable_vulnerability_finding`                               |
| `tenable_scan`                  | **IDENTIFIED**        | `tenable_vulnerability`                                       |
| `tenable_scan`                  | **SCANS**             | `aws_instance,azure_vm,google_compute_instance,tenable_asset` |
| `tenable_user`                  | **OWNS**              | `tenable_scan`                                                |
| `tenable_vulnerability_finding` | **IS**                | `vulnerability`                                               |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
