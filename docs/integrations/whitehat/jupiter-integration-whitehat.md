# Integration with JupiterOne

## WhiteHat Security + JupiterOne Integration Benefits

- Visualize WhiteHat scans, cves, vulnerabilities, and findings in the JupiterOne graph.
- Map WhiteHat findings to a code repo, project, or application in your JupiterOne account.
- Monitor WhiteHat cves, findings, and vulnerabilities within the alerts app.
- Monitor changes to WhiteHat scans using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches WhiteHat scans and findings to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API key to authenticate with WhiteHat.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In WhiteHat

To obtain the API token for a Whitehat account, sign in to Sentinel. Click the
"My Profile" button in the top right and then "API Key". Enter the account
password and copy the displayed API Key.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **WhiteHat** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this WhiteHat
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** used to authenticate with WhiteHat.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **WhiteHat** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Whitehat Entity Resource | \_type : \_class of the Entity             |
| ------------------------ | ------------------------------------------ |
| Account                  | `whitehat_account` : `Account`             |
| Scan Type                | `whitehat_scan` : `Service`                |
| CVE                      | `cve` : `Vulnerability`                    |
| Vulnerability            | `whitehat_vulnerability` : `Vulnerability` |
| Finding                  | `whitehat_finding` : `Finding`             |

### Relationships

The following relationships are created/mapped:

#### Intra-Instance

| From                     | Type           | To                       |
| ------------------------ | -------------- | ------------------------ |
| `whitehat_account`       | **HAS**        | `whitehat_scan`          |
| `whitehat_scan`          | **IDENTIFIED** | `whitehat_vulnerability` |
| `whitehat_vulnerability` | **EXPLOITS**   | `cwe`                    |
| `whitehat_finding`       | **IS**         | `whitehat_vulnerability` |

#### Extra-Instance / Mapped

| From                           | Type        | To                                                                                                                                                                                                 |
| ------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CodeRepo/Project/Application` | **HAS/HAD** | `whitehat_finding` <br> Note: This is mapped automatically only when the name of the Whitehat Application the finding belongs to matches the name of a CodeRepo/Project/Application in JupiterOne. |