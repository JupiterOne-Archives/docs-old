# Integration with JupiterOne

## Cisco Meraki + JupiterOne Integration Benefits

- Visualize Cisco Meraki administrators, SAML roles, and devices within
  network sites in the JupiterOne graph.
- Map Cisco Meraki users to employees in your JupiterOne account.
- Map Cisco Meraki Wi-Fi, VLAN, and other network devices to your network sites.
- Monitor changes to Cisco Meraki administrators, SAML roles, and devices within
  your network sites using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Cisco Meraki administrators, SAML roles, and devices to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API Key configured in your Cisco Meraki account. 
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Cisco Meraki

Meraki documentation provides detailed [instructions to enable API access][1].

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Cisco Meraki** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
- Enter the **Account Name** by which you'd like to identify this Cisco Meraki
   account in JupiterOne. Ingested entities will have this value stored in
   `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
   the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
   needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** configured for read access in Cisco Meraki.
4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Cisco Meraki** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

## Data Model

### Entities

The following entity resources are ingested when the integration runs.

| Meraki Resources | \_type of the Entity  | \_class of the Entity |
| ---------------- | --------------------- | --------------------- |
| Organization     | `meraki_organization` | `Organization`        |
| Admin            | `meraki_admin`        | `User`                |
| SAML Role        | `meraki_saml_role`    | `AccessRole`          |
| Network          | `meraki_network`      | `Site`                |
| SSID             | `meraki_wifi`         | `Network`             |
| VLAN             | `meraki_vlan`         | `Network`             |
| Device           | `meraki_device`       | `Device`, `Host`      |

### Relationships

The following relationships are created/mapped:

| From                  | Edge    | To                 |
| --------------------- | ------- | ------------------ |
| `meraki_organization` | **HAS** | `meraki_admin`     |
| `meraki_organization` | **HAS** | `meraki_saml_role` |
| `meraki_organization` | **HAS** | `meraki_network`   |
| `meraki_network`      | **HAS** | `meraki_wifi`      |
| `meraki_network`      | **HAS** | `meraki_vlan`      |
| `meraki_network`      | **HAS** | `meraki_device`    |

[1]:
  https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API