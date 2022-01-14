# Integration with JupiterOne

## Veracode + JupiterOne Integration Benefits

- Visualize Veracode scans, cwes, vulnerabilities, and findings in the
  JupiterOne graph.
- Map Veracode findings to a code repo, project, or application in your
  JupiterOne account.
- Monitor Veracode cwes, findings, and vulnerabilities within the alerts app.
- Monitor changes to Veracode scans using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Veracode scans, cwes, vulerabilities, and
  findings to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Support

If you need help with this integration, please contact 
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Veracode

The integration instance configuration requires the customer's API ID and secret
to authenticate requests to the Veracode REST APIs. Veracode provides [detailed instructions](https://docs.veracode.com/r/t_create_api_creds) for obtaining these credentials.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Veracode** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Veracode
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API ID** used to authenticate with Veracode.
- Enter the **API Secret** used to authenticate with Veracode.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Veracode** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Veracode Entity Resource | \_type : \_class of the Entity           |
| ------------------------ | ---------------------------------------- |
| Account                  | `veracode_account` : `Account`           |
| Scan Type                | `veracode_scan` : `Service`              |
| CWE                      | `cwe` : `Weakness`                       |
| Vulnerability            | `veracode_vulnerability` : `Vulnerability` |
| Finding                  | `veracode_finding` : `Finding`           |

### Relationships

The following relationships are created/mapped:

#### Intra-Instance

| From                     | Type           | To                       |
| ------------------------ | -------------- | ------------------------ |
| `veracode_account`       | **HAS**        | `veracode_scan`          |
| `veracode_scan`          | **IDENTIFIED** | `veracode_vulnerability` |
| `veracode_vulnerability` | **EXPLOITS**   | `cwe`                    |
| `veracode_finding`       | **IS**         | `veracode_vulnerability` |

#### Extra-Instance / Mapped

| From                           | Type        | To                                       |
| ------------------------------ | ----------- | ---------------------------------------- |
| `CodeRepo/Project/Application` | **HAS/HAD** | `veracode_finding` <br> Note: This is mapped automatically only when the name of the Veracode Application the finding belongs to matches the name of a CodeRepo/Project/Application in JupiterOne. |

[1]:
  https://help.veracode.com/reader/lsoDk5r2cv~YrwLQSI7lfw/6UdIc6di0T5_Lo6qTHTpNA
