# Integration with JupiterOne

## Cisco Meraki + JupiterOne Integration Benefits

- Visualize Cisco Meraki administrators, SAML roles, and devices within network
  sites in the JupiterOne graph.
- Map Cisco Meraki users to employees in your JupiterOne account.
- Map Cisco Meraki Wi-Fi, VLAN, and other network devices to your network sites.
- Monitor changes to Cisco Meraki administrators, SAML roles, and devices within
  your network sites using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Cisco Meraki administrators, SAML roles, and
  devices to update the graph.
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

[1]:
  https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API

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

| Resources    | Entity `_type`         | Entity `_class`  |
| ------------ | ---------------------- | ---------------- |
| Account      | `cisco_meraki_account` | `Account`        |
| Admin        | `meraki_admin`         | `User`           |
| Device       | `meraki_device`        | `Device`, `Host` |
| Network      | `meraki_network`       | `Site`           |
| Organization | `meraki_organization`  | `Organization`   |
| SAML Role    | `meraki_saml_role`     | `AccessRole`     |
| SSID         | `meraki_wifi`          | `Network`        |
| VLAN         | `meraki_vlan`          | `Network`        |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type` |
| ---------------------- | --------------------- | --------------------- |
| `cisco_meraki_account` | **HAS**               | `meraki_organization` |
| `meraki_network`       | **HAS**               | `meraki_device`       |
| `meraki_network`       | **HAS**               | `meraki_vlan`         |
| `meraki_network`       | **HAS**               | `meraki_wifi`         |
| `meraki_organization`  | **HAS**               | `meraki_admin`        |
| `meraki_organization`  | **HAS**               | `meraki_network`      |
| `meraki_organization`  | **HAS**               | `meraki_saml_role`    |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `meraki_device`       | **CONNECTS**          | `*internet*`          | FORWARD   |
| `meraki_network`      | **HAS**               | `*host*`              | FORWARD   |
| `meraki_vlan`         | **HAS**               | `*host*`              | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
