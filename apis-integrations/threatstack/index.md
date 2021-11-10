# Integration with JupiterOne

## Threat Stack + JupiterOne Integration Benefits

- Visualize Threat Stack agents in the JupiterOne graph.
- Map Threat Stack agents to aws instances or servers they protect in your JupiterOne account.
- Map Threat Stack agents to cves they identify in your JupiterOne
- Monitor changes to Threat Stack agents using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Threat Stack agents to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the name and id of your Threat Stack organization. JupiterOne also 
requires the user id and API key of a configured application key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Threat Stack

The integration instance configuration requires the following parameters for 
API authentication:

Go to **Settings > Application Keys** from the web console of your Threat Stack
account, then find the following values under **REST API Key**, copy/paste
each of them into your integration configuration screen in JupiterOne.

- **Organization Name** (`orgName`)
- **Organization ID** (`orgId`)
- **User ID** (`userId`)
- **API Key** (`apiKey`)

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Threat Stack** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Threat Stack
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Organization Name** of your Threat Stack account.
- Enter the **Organization ID** of your Threat Stack account.
- Enter the **User ID** configured for API access.
- Enter the **API Key** configured for API access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Threat Stack** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity    |
| ----------------------- | --------------------------------- |
| Account                 | `threatstack_account` : `Account` |
| Threat Stack Agent      | `threatstack_agent` : `HostAgent` |

### Relationships

The following relationships are created/mapped:

| Relationships                                     |
| ------------------------------------------------- |
| `threatstack_account` **HAS** `threatstack_agent` |
| `threatstack_agent` **PROTECTS** `aws_instance`   |
| `threatstack_agent` **PROTECTS** `server`         |
| `threatstack_agent` **IDENTIFIED** `cve`          |