# Integration with JupiterOne

## CrowdStrike + JupiterOne Integration Benefits

- Visualize your CrowdStrike endpoint agents and the devices they protect in the
  JupiterOne graph.
- Map endpoint agents to devices and devices to the employee who is the owner.  
- Monitor changes to CrowdStrike endpoints using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches CrowdStrike agents and devices to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API client ID and client secret configured in your 
CrowdStrike account with the appropriate permissions. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In CrowdStrike

CrowdStrike Falcon provides [detailed instructions on creating API
credentials][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **CrowdStrike** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this CrowdStrike
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API client ID** used to authenticate with the CrowdStrike Falcon
API.
- Enter the **API client secret** used to authenticate with the CrowdStrike 
Falcon API.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **CrowdStrike** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

These entities are ingested when the integration runs:

| Example Entity Resource | \_type : \_class of the Entity                    |
| ----------------------- | ------------------------------------------------- |
| Account                 | `crowdstrike_account` : `Account`                 |
| Service                 | `crowdstrike_endpoint_protection` : `Service`     |
| Device Sensor Agent     | `crowdstrike_sensor` : `HostAgent`                |
| Prevention Policy       | `crowdstrike_prevention_policy` : `ControlPolicy` |

Only hosts that have been seen within past 30 days are maintained.

### Relationships

The following relationships are created/mapped:

| Relationships                                                                  |
| ------------------------------------------------------------------------------ |
| `crowdstrike_account` **HAS** `crowdstrike_sensor`                             |
| `crowdstrike_account` **HAS** `crowdstrike_endpoint_protection`                |
| `crowdstrike_prevention_policy` **ENFORCES** `crowdstrike_endpoint_protection` |
| `crowdstrike_sensor` **ASSIGNED** `crowdstrike_prevention_policy`              |
| `crowdstrike_sensor` **PROTECTS** `user_endpoint`                              |

[1]: https://www.crowdstrike.com/blog/tech-center/get-access-falcon-apis/