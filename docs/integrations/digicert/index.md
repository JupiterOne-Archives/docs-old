# Integration with JupiterOne

## DigiCert + JupiterOne Integration Benefits

- Visualize DigiCert users and certificates in the JupiterOne graph.
- Map DigiCert certificates to the domains using them.
- Monitor changes to DigiCert users and certificates using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches DigiCert certificates and users to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API Key configured in your DigiCert account. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In DigiCert

DigiCert documentation provides detailed [instructions to enable API access][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **DigiCert** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this DigiCert
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** from DigiCert configured for read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **DigiCert** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| DigiCert Resources | \_type of the Entity   | \_class of the Entity |
| ------------------ | ---------------------- | --------------------- |
| Account            | `digicert_account`     | `Account`             |
| Certificate        | `digicert_certificate` | `Certificate`         |
| User               | `digicert_user`        | `User`                |

### Relationships

The following relationships are created:

| From               | Relationship | To                     |
| ------------------ | ------------ | ---------------------- |
| `digicert_account` | **HAS**      | `digicert_certificate` |
| `digicert_account` | **HAS**      | `digicert_user`        |

The following relationships are mapped:

| From     | Relationship | To            |
| -------- | ------------ | ------------- |
| `Domain` | **HAS**      | `Certificate` |

[1]: https://www.digicert.com/rest-api/
