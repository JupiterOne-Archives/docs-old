# Integration with JupiterOne

## Rapid7 + JupiterOne Integration Benefits

- Visualize Rapid7 users, devices, scanners, findings, and vulnerabilities
  across sites in the JupiterOne graph.
- Map Rapid7 users to employees in your JupiterOne account.
- Monitor Rapid7 findings and vulnerabilities within the alerts app.
- Monitor changes to Rapid7 users, devices, scanners and sites using JupiterOne
  alerts.

## How it Works

- JupiterOne periodically fetches Rapid7 users, devices, scanners, findings, and
  vulnerabilities to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings and vulnerabilities.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the publicly-accessible socket of the InsightsVM security
  console. JupiterOne also requires the username and password of an admin.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Rapid7

Jupiterone requires the following information to complete authentication:

1. The InsightVM Security Console Socket Address
   - The publicly-accessible socket (host:port) of your InsightVM Security
     Console. e.g. <hostname>:3780.
2. An InsightVM Username and Password
   - Use an existing user or create a user that has at least the
     [Security Manager and Site Owner Role](https://docs.rapid7.com/insightvm/managing-users-and-authentication/#security-manager-and-site-owner)

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Rapid7** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Rapid7 account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **InsightsVM Security Console Socket Address** which is publicly
  accessible.
- Enter the **InsightsVM Username** of an admin user in the security console.
- Enter the **InsightsVM Password** of an admin user in the security console.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Rapid7** integration tile and click it.
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

| Resources     | Entity `_type`            | Entity `_class` |
| ------------- | ------------------------- | --------------- |
| Account       | `insightvm_account`       | `Account`       |
| Asset         | `insightvm_asset`         | `Device`        |
| Finding       | `insightvm_finding`       | `Finding`       |
| Scan          | `insightvm_scan`          | `Assessment`    |
| Site          | `insightvm_site`          | `Site`          |
| User          | `insightvm_user`          | `User`          |
| Vulnerability | `insightvm_vulnerability` | `Vulnerability` |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`     |
| --------------------- | --------------------- | ------------------------- |
| `insightvm_account`   | **HAS**               | `insightvm_asset`         |
| `insightvm_account`   | **HAS**               | `insightvm_site`          |
| `insightvm_account`   | **HAS**               | `insightvm_user`          |
| `insightvm_asset`     | **HAS**               | `insightvm_finding`       |
| `insightvm_finding`   | **IS**                | `insightvm_vulnerability` |
| `insightvm_scan`      | **MONITORS**          | `insightvm_asset`         |
| `insightvm_site`      | **HAS**               | `insightvm_asset`         |
| `insightvm_site`      | **HAS**               | `insightvm_user`          |
| `insightvm_site`      | **PERFORMED**         | `insightvm_scan`          |
| `insightvm_user`      | **OWNS**              | `insightvm_asset`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
