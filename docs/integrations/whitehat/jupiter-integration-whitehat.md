# Integration with JupiterOne

## NTT Application Security + JupiterOne Integration Benefits

- Visualize NTT Application Security scans, CVEs, vulnerabilities, and findings in the JupiterOne graph.
- Map NTT Application Security findings to a code repository, project, or application in your JupiterOne account.
- Monitor NTT Application Security CVEs, findings, and vulnerabilities using the Alerts app.
- Monitor changes to NTT Application Security scans using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches NTT Application Security scans and findings to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API key to authenticate with NTT Application Security.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, contact [JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In NTT Application Security

To obtain the API token for a NTT Application Security account, log in to 
Sentinel. Click **My Profile** in the top-right of the screen, and then click **API Key**. 
Enter the account password and copy the displayed API key.

### In JupiterOne

1. From the configuration gear Icon![](../../../assets/icons/gear.png), select **Integrations**.
2. Scroll to the NTT Application Security integration tile and click it.
3. Click **Add Configuration** and configure the following settings:
- Enter the account name by which you want to identify this NTT Application 
   Security account in JupiterOne. Ingested entities have this value stored in
   `tag.AccountName` when **Tag with Account Name** is selected.
- Enter a Description that helps your team identify the integration instance.
- Select a polling interval that is sufficient for your monitoring requirements. 
   You can leave this fiels as `DISABLED` and manually execute the integration.
- Enter the API key to authenticate with NTT Application Security.
4. Click **Create Configuration** after you have entered all the values.

## How to Uninstall NTT Application Security

1. From the configuration gear Icon ![](../../../assets/icons/gear.png), select **Integrations**.
2. Scroll to the NTT Application Security integration tile and click it.
3. Identify and click the integration to delete it.
4. Click the trash can icon ![](../../../assets/icons/trash.png).
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| NTT Application Security Entity Resource | \_type : \_class of the Entity             |
| ---------------------------------------- | ------------------------------------------ |
| Account                                  | `whitehat_account` : `Account`             |
| Scan Type                                | `whitehat_scan` : `Service`                |
| CVE                                      | `cve` : `Vulnerability`                    |
| Vulnerability                            | `whitehat_vulnerability` : `Vulnerability` |
| Finding                                  | `whitehat_finding` : `Finding`             |

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

| From                           | Type        | To                                                           |
| ------------------------------ | ----------- | ------------------------------------------------------------ |
| `CodeRepo/Project/Application` | **HAS/HAD** | `whitehat_finding` <br> Note: This is mapped automatically only when the name of the NTT Application Security application the finding belongs to matches the name of a CodeRepo/Project/Application in JupiterOne. |