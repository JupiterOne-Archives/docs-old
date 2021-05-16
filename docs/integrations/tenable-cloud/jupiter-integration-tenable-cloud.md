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

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Tenable Entity Resource    | \_type : \_class of the Entity                   |
| -------------------------- | ------------------------------------------------ |
| Account                    | `tenable_account` : `Account`                    |
| User                       | `tenable_user` : `User`                          |
| Scan                       | `tenable_scan` : \[`Assessment`,`Service`\]      |
| Scan Vulnerability         | `tenable_scan_finding` : `Finding`               |
| Vulnerability              | `tenable_vulnerability` : `Vulnerability`        |
| Container                  | `tenable_container` : `Image`                    |
| Container Finding          | `tenable_container_finding` : `Finding`          |
| Container Report           | `tenable_container_report` : `Assessment`        |
| Container Malware          | `tenable_container_malware` : `Finding`          |
| Container Unwanted Program | `tenable_container_unwanted_program` : `Finding` |

Tenable "assets" are not ingested. `Findings` include some asset details,
including asset identifiers on the `targets` property that will be used by the
system to relate findings to entities ingested through other integrations. This
avoids duplicating corporate asset entities (reducing billing costs!) and leaves
asset ingestion to integrations such as AWS, Wazuh, etc.

### Relationships

The following relationships are created/mapped:

| From                            | Type           | To                                   |
| ------------------------------- | -------------- | ------------------------------------ |
| `tenable_account`               | **HAS**        | `tenable_user`                       |
| `tenable_account`               | **HAS**        | `tenable_container`                  |
| `tenable_account`               | **HAS**        | `tenable_user`                       |
| `tenable_user`                  | **OWNS**       | `tenable_scan`                       |
| `tenable_scan`                  | **IDENTIFIED** | `tenable_vulnerability`              |
| `tenable_scan`                  | **IDENTIFIED** | `tenable_vulnerability_finding`      |
| `tenable_vulnerability_finding` | **IS**         | `tenable_vulnerability`              |
| `tenable_container`             | **HAS**        | `tenable_container_report`           |
| `tenable_container_report`      | **IDENTIFIED** | `tenable_container_finding`          |
| `tenable_container_report`      | **IDENTIFIED** | `tenable_container_malware`          |
| `tenable_container_report`      | **IDENTIFIED** | `tenable_container_unwanted_program` |

[1]: https://www.tenable.com/products/tenable-io
[2]: https://developer.tenable.com