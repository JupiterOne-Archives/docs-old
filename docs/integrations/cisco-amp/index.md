# Integration with JupiterOne

## Cisco AMP + JupiterOne Integration Benefits

- Visualize Cisco AMP endpoint agents and the devices they protect in the
  JupiterOne graph.
- Map Cisco AMP endpoint agents to devices and devices to the employee who is
  the owner.  
- Monitor changes to Cisco AMP endpoints using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Cisco AMP endpoints and the devices they 
protect to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the endpoint hostname of the Cisco AMP account. 
The API Client ID and Key are also required.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

The integration connects directly to [Cisco AMP for Endpoints REST API][1] 
to obtain endpoint protection and configuration information.

## In Cisco AMP 

To generate a Client ID and API Key:

- Log in to your **AMP for Endpoints Console**.
- Go to **Accounts** > **API Credentials**.
- Click **New API Credentials** to generate the Client ID and secure API Key.

Valid API Endpoints include:

- `api.amp.cisco.com`
- `api.apjc.amp.cisco.com`
- `api.eu.amp.cisco.com`

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Cisco AMP** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Cisco AMP
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Endpoint Hostname** associated with your Cisco AMP account.
- Enter the **API Client ID"** configured in your Cisco AMP account.
- Enter the **API Key** associated with the Client ID, configured for read access.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Cisco AMP** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Cisco AMP Resources | \_type of the Entity | \_class of the Entity |
| ------------------- | -------------------- | --------------------- |
| Account             | `cisco_amp_account`  | `Account`             |
| Computer            | `cisco_amp_endpoint` | `HostAgent`           |

### Relationships

The following relationships are created:

| From                | Relationship | To                   |
| ------------------- | ------------ | -------------------- |
| `cisco_amp_account` | **HAS**      | `cisco_amp_endpoint` |

The following relationships are mapped:

| From                 | Relationship | To              |
| -------------------- | ------------ | --------------- |
| `cisco_amp_endpoint` | **Protects** | `user_endpoint` |

[1]: https://api-docs.amp.cisco.com/
