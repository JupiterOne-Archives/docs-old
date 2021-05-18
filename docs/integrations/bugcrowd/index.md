# Integration with JupiterOne

## Bugcrowd + JupiterOne Integration Benefits

- Visualize Bugcrowd bounty programs and submitted findings in the JupiterOne
  graph.
- Monitor Bugcrowd findings within the alerts app.
- Monitor changes to Bugcrowd bounty programs using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches changes to programs and new findings from
  Bugcrowd to update the graph.
- Configure alerts to reduce the noise of submitted findings.

## Requirements

- JupiterOne requires a Bugcrowd API Token to interact with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Bugcrowd

1. To provision API access credentials, follow Bugcrowd's 
[API getting started guide](https://docs.bugcrowd.com/api/getting-started/) 

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Bugcrowd** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Bugcrowd
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Token** token generated from your Bugcrowd account, configured
for read access. 
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Bugcrowd** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Bugcrowd Resources | \_type of the Entity  | \_class of the Entity |
| ------------------ | --------------------- | --------------------- |
| Account            | `bugcrowd_account`    | `Account`             |
| Bounty Program     | `bugcrowd_bounty`     | `Program`             |
| Submission         | `bugcrowd_submission` | `Finding`             |

### Relationships

The following relationships are created:

| From               | Relationship | To                    |
| ------------------ | ------------ | --------------------- |
| `bugcrowd_account` | **HAS**      | `bugcrowd_service`    |
| `bugcrowd_account` | **HAS**      | `bugcrowd_bounty`     |
| `bugcrowd_service` | **MANAGES**  | `bugcrowd_bounty`     |
| `bugcrowd_bounty`  | **HAS**      | `bugcrowd_submission` |

The following relationships are mapped:

| From                  | Relationship | To                 |
| --------------------- | ------------ | ------------------ |
| `<ROOT>`              | **Owns**     | `bugcrowd_account` |
| `bugcrowd` (`Vendor`) | **Hosts**    | `bugcrowd_account` |

[1]: https://docs.bugcrowd.com/reference
